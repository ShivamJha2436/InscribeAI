package db

import (
	"context"
	"errors"
	"fmt"
	"log"
	"time"

	"inscribeai/backend/models"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// PostgresStore implements both UserStore and note store interfaces
type PostgresStore struct {
	pool *pgxpool.Pool
}

// Ensure PostgresStore implements UserStore interface
var _ UserStore = (*PostgresStore)(nil)

// UserStore interface for auth service
type UserStore interface {
	GetUserByEmail(ctx context.Context, email string) (models.User, error)
	CreateUser(ctx context.Context, u models.User) (models.User, error)
}

func NewPostgresStore(ctx context.Context, connString string) (*PostgresStore, error) {
	pool, err := pgxpool.New(ctx, connString)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %w", err)
	}

	// Test connection
	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	store := &PostgresStore{pool: pool}

	// Run migrations
	if err := store.migrate(ctx); err != nil {
		return nil, fmt.Errorf("failed to run migrations: %w", err)
	}

	return store, nil
}

func (p *PostgresStore) Close() {
	p.pool.Close()
}

func (p *PostgresStore) migrate(ctx context.Context) error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id UUID PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			email VARCHAR(255) UNIQUE NOT NULL,
			password VARCHAR(255) NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE NOT NULL
		)`,
		`CREATE TABLE IF NOT EXISTS notes (
			id UUID PRIMARY KEY,
			user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
			title VARCHAR(255) NOT NULL,
			content TEXT,
			tags TEXT[],
			created_at TIMESTAMP WITH TIME ZONE NOT NULL,
			updated_at TIMESTAMP WITH TIME ZONE NOT NULL
		)`,
		`CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id)`,
		`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
	}

	for _, query := range queries {
		if _, err := p.pool.Exec(ctx, query); err != nil {
			return fmt.Errorf("failed to execute migration: %w", err)
		}
	}

	log.Println("Database migrations completed successfully")
	return nil
}

// User operations
func (p *PostgresStore) GetUserByEmail(ctx context.Context, email string) (models.User, error) {
	var user models.User
	query := `SELECT id, name, email, password, created_at FROM users WHERE email = $1`

	err := p.pool.QueryRow(ctx, query, email).Scan(
		&user.ID, &user.Name, &user.Email, &user.Password, &user.CreatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return models.User{}, errors.New("user not found")
		}
		return models.User{}, fmt.Errorf("failed to get user: %w", err)
	}

	return user, nil
}

func (p *PostgresStore) CreateUser(ctx context.Context, u models.User) (models.User, error) {
	if u.ID == "" {
		u.ID = uuid.NewString()
	}

	query := `INSERT INTO users (id, name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, password, created_at`

	err := p.pool.QueryRow(ctx, query, u.ID, u.Name, u.Email, u.Password, u.CreatedAt).Scan(
		&u.ID, &u.Name, &u.Email, &u.Password, &u.CreatedAt,
	)

	if err != nil {
		return models.User{}, fmt.Errorf("failed to create user: %w", err)
	}

	return u, nil
}

// Note operations
func (p *PostgresStore) ListNotes(ctx context.Context, userID string) ([]models.Note, error) {
	query := `SELECT id, user_id, title, content, tags, created_at, updated_at FROM notes WHERE user_id = $1 ORDER BY updated_at DESC`

	rows, err := p.pool.Query(ctx, query, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to query notes: %w", err)
	}
	defer rows.Close()

	var notes []models.Note
	for rows.Next() {
		var note models.Note
		var noteUserID string
		err := rows.Scan(&note.ID, &noteUserID, &note.Title, &note.Content, &note.Tags, &note.CreatedAt, &note.UpdatedAt)
		if err != nil {
			return nil, fmt.Errorf("failed to scan note: %w", err)
		}
		notes = append(notes, note)
	}

	return notes, nil
}

func (p *PostgresStore) GetNote(ctx context.Context, id, userID string) (models.Note, error) {
	var note models.Note
	var noteUserID string

	query := `SELECT id, user_id, title, content, tags, created_at, updated_at FROM notes WHERE id = $1 AND user_id = $2`

	err := p.pool.QueryRow(ctx, query, id, userID).Scan(
		&note.ID, &noteUserID, &note.Title, &note.Content, &note.Tags, &note.CreatedAt, &note.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return models.Note{}, errors.New("note not found")
		}
		return models.Note{}, fmt.Errorf("failed to get note: %w", err)
	}

	return note, nil
}

func (p *PostgresStore) CreateNote(ctx context.Context, n models.Note, userID string) (models.Note, error) {
	if n.ID == "" {
		n.ID = uuid.NewString()
	}

	now := time.Now().UTC()
	n.CreatedAt = now
	n.UpdatedAt = now

	query := `INSERT INTO notes (id, user_id, title, content, tags, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, user_id, title, content, tags, created_at, updated_at`

	var noteUserID string
	err := p.pool.QueryRow(ctx, query, n.ID, userID, n.Title, n.Content, n.Tags, n.CreatedAt, n.UpdatedAt).Scan(
		&n.ID, &noteUserID, &n.Title, &n.Content, &n.Tags, &n.CreatedAt, &n.UpdatedAt,
	)

	if err != nil {
		return models.Note{}, fmt.Errorf("failed to create note: %w", err)
	}

	return n, nil
}

func (p *PostgresStore) UpdateNote(ctx context.Context, id, userID string, n models.Note) (models.Note, error) {
	n.UpdatedAt = time.Now().UTC()
	n.ID = id

	query := `UPDATE notes SET title = $1, content = $2, tags = $3, updated_at = $4 WHERE id = $5 AND user_id = $6 RETURNING id, user_id, title, content, tags, created_at, updated_at`

	var noteUserID string
	err := p.pool.QueryRow(ctx, query, n.Title, n.Content, n.Tags, n.UpdatedAt, id, userID).Scan(
		&n.ID, &noteUserID, &n.Title, &n.Content, &n.Tags, &n.CreatedAt, &n.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return models.Note{}, errors.New("note not found")
		}
		return models.Note{}, fmt.Errorf("failed to update note: %w", err)
	}

	return n, nil
}

func (p *PostgresStore) DeleteNote(ctx context.Context, id, userID string) error {
	query := `DELETE FROM notes WHERE id = $1 AND user_id = $2`

	result, err := p.pool.Exec(ctx, query, id, userID)
	if err != nil {
		return fmt.Errorf("failed to delete note: %w", err)
	}

	if result.RowsAffected() == 0 {
		return errors.New("note not found")
	}

	return nil
}
