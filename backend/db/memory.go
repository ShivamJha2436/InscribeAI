package db

import (
	"errors"
	"sync"
	"time"

	"inscribeai/backend/models"

	"github.com/google/uuid"
)

type Store interface {
	ListNotes() ([]models.Note, error)
	GetNote(id string) (models.Note, error)
	CreateNote(n models.Note) (models.Note, error)
	UpdateNote(id string, n models.Note) (models.Note, error)
	DeleteNote(id string) error
}

type MemoryStore struct {
	mu    sync.RWMutex
	notes map[string]models.Note
}

func NewMemoryStore() *MemoryStore {
	return &MemoryStore{notes: make(map[string]models.Note)}
}

func (m *MemoryStore) ListNotes() ([]models.Note, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	result := make([]models.Note, 0, len(m.notes))
	for _, n := range m.notes {
		result = append(result, n)
	}
	return result, nil
}

func (m *MemoryStore) GetNote(id string) (models.Note, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	n, ok := m.notes[id]
	if !ok {
		return models.Note{}, errors.New("note not found")
	}
	return n, nil
}

func (m *MemoryStore) CreateNote(n models.Note) (models.Note, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if n.ID == "" {
		n.ID = uuid.NewString()
	}
	n.CreatedAt = time.Now().UTC()
	n.UpdatedAt = n.CreatedAt
	m.notes[n.ID] = n
	return n, nil
}

func (m *MemoryStore) UpdateNote(id string, n models.Note) (models.Note, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.notes[id]; !ok {
		return models.Note{}, errors.New("note not found")
	}
	n.ID = id
	n.CreatedAt = m.notes[id].CreatedAt
	n.UpdatedAt = time.Now().UTC()
	m.notes[id] = n
	return n, nil
}

func (m *MemoryStore) DeleteNote(id string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.notes[id]; !ok {
		return errors.New("note not found")
	}
	delete(m.notes, id)
	return nil
}
