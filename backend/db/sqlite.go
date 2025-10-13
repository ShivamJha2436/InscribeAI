package db

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"inscribeai/backend/models"

	"github.com/google/uuid"
	_ "github.com/mattn/go-sqlite3"
)

// SQLiteStore implements both UserStore and note store interfaces for local development
type SQLiteStore struct {
	db *sql.DB
}

// Ensure SQLiteStore implements Store interface
var _ Store = (*SQLiteStore)(nil)

func NewSQLiteStore() *SQLiteStore {
	db, err := sql.Open("sqlite3", "./inscribeai.db")
	if err != nil {
		panic("Failed to open SQLite database: " + err.Error())
	}

	store := &SQLiteStore{db: db}

	// Run migrations
	if err := store.migrate(); err != nil {
		panic("Failed to run migrations: " + err.Error())
	}

	return store
}

func (s *SQLiteStore) Close() {
	s.db.Close()
}

func (s *SQLiteStore) migrate() error {
	queries := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id TEXT PRIMARY KEY,
			name TEXT NOT NULL,
			email TEXT UNIQUE NOT NULL,
			password TEXT NOT NULL,
			created_at DATETIME NOT NULL
		)`,
		`CREATE TABLE IF NOT EXISTS notes (
			id TEXT PRIMARY KEY,
			user_id TEXT NOT NULL,
			title TEXT NOT NULL,
			content TEXT,
			tags TEXT,
			created_at DATETIME NOT NULL,
			updated_at DATETIME NOT NULL,
			FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
		)`,
		`CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id)`,
		`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
	}

	for _, query := range queries {
		if _, err := s.db.Exec(query); err != nil {
			return err
		}
	}

	return nil
}

// User operations
func (s *SQLiteStore) GetUserByEmail(ctx context.Context, email string) (models.User, error) {
	var user models.User
	query := `SELECT id, name, email, password, created_at FROM users WHERE email = ?`

	err := s.db.QueryRowContext(ctx, query, email).Scan(
		&user.ID, &user.Name, &user.Email, &user.Password, &user.CreatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return models.User{}, errors.New("user not found")
		}
		return models.User{}, err
	}

	return user, nil
}

func (s *SQLiteStore) CreateUser(ctx context.Context, u models.User) (models.User, error) {
	if u.ID == "" {
		u.ID = uuid.NewString()
	}

	query := `INSERT INTO users (id, name, email, password, created_at) VALUES (?, ?, ?, ?, ?)`

	_, err := s.db.ExecContext(ctx, query, u.ID, u.Name, u.Email, u.Password, u.CreatedAt)
	if err != nil {
		return models.User{}, err
	}

	return u, nil
}

// Note operations
func (s *SQLiteStore) ListNotes(ctx context.Context, userID string) ([]models.Note, error) {
	query := `SELECT id, user_id, title, content, tags, created_at, updated_at FROM notes WHERE user_id = ? ORDER BY updated_at DESC`

	rows, err := s.db.QueryContext(ctx, query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var notes []models.Note
	for rows.Next() {
		var note models.Note
		var noteUserID string
		var tagsStr string
		err := rows.Scan(&note.ID, &noteUserID, &note.Title, &note.Content, &tagsStr, &note.CreatedAt, &note.UpdatedAt)
		if err != nil {
			return nil, err
		}

		// Parse tags from string (simple comma-separated for SQLite)
		if tagsStr != "" {
			// Simple parsing - in production you'd want proper JSON handling
			note.Tags = []string{tagsStr} // Simplified for now
		}

		notes = append(notes, note)
	}

	return notes, nil
}

func (s *SQLiteStore) GetNote(ctx context.Context, id, userID string) (models.Note, error) {
	var note models.Note
	var noteUserID string
	var tagsStr string

	query := `SELECT id, user_id, title, content, tags, created_at, updated_at FROM notes WHERE id = ? AND user_id = ?`

	err := s.db.QueryRowContext(ctx, query, id, userID).Scan(
		&note.ID, &noteUserID, &note.Title, &note.Content, &tagsStr, &note.CreatedAt, &note.UpdatedAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return models.Note{}, errors.New("note not found")
		}
		return models.Note{}, err
	}

	// Parse tags
	if tagsStr != "" {
		note.Tags = []string{tagsStr} // Simplified for now
	}

	return note, nil
}

func (s *SQLiteStore) CreateNote(ctx context.Context, n models.Note, userID string) (models.Note, error) {
	if n.ID == "" {
		n.ID = uuid.NewString()
	}

	now := time.Now().UTC()
	n.CreatedAt = now
	n.UpdatedAt = now

	// Convert tags to string for SQLite storage
	var tagsStr string
	if len(n.Tags) > 0 {
		tagsStr = n.Tags[0] // Simplified for now
	}

	query := `INSERT INTO notes (id, user_id, title, content, tags, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`

	_, err := s.db.ExecContext(ctx, query, n.ID, userID, n.Title, n.Content, tagsStr, n.CreatedAt, n.UpdatedAt)
	if err != nil {
		return models.Note{}, err
	}

	return n, nil
}

func (s *SQLiteStore) UpdateNote(ctx context.Context, id, userID string, n models.Note) (models.Note, error) {
	n.UpdatedAt = time.Now().UTC()
	n.ID = id

	// Convert tags to string for SQLite storage
	var tagsStr string
	if len(n.Tags) > 0 {
		tagsStr = n.Tags[0] // Simplified for now
	}

	query := `UPDATE notes SET title = ?, content = ?, tags = ?, updated_at = ? WHERE id = ? AND user_id = ?`

	result, err := s.db.ExecContext(ctx, query, n.Title, n.Content, tagsStr, n.UpdatedAt, id, userID)
	if err != nil {
		return models.Note{}, err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return models.Note{}, err
	}

	if rowsAffected == 0 {
		return models.Note{}, errors.New("note not found")
	}

	return n, nil
}

func (s *SQLiteStore) DeleteNote(ctx context.Context, id, userID string) error {
	query := `DELETE FROM notes WHERE id = ? AND user_id = ?`

	result, err := s.db.ExecContext(ctx, query, id, userID)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return errors.New("note not found")
	}

	return nil
}
