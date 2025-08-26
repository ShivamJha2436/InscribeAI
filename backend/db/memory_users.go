package db

import (
	"errors"
	"sync"

	"inscribeai/backend/models"

	"github.com/google/uuid"
)

type MemoryUserStore struct {
	mu      sync.RWMutex
	byID    map[string]models.User
	byEmail map[string]string
}

func NewMemoryUserStore() *MemoryUserStore {
	return &MemoryUserStore{byID: make(map[string]models.User), byEmail: make(map[string]string)}
}

func (m *MemoryUserStore) GetUserByEmail(email string) (models.User, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	id, ok := m.byEmail[email]
	if !ok {
		return models.User{}, errors.New("not found")
	}
	return m.byID[id], nil
}

func (m *MemoryUserStore) CreateUser(u models.User) (models.User, error) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, exists := m.byEmail[u.Email]; exists {
		return models.User{}, errors.New("email exists")
	}
	if u.ID == "" {
		u.ID = uuid.NewString()
	}
	m.byID[u.ID] = u
	m.byEmail[u.Email] = u.ID
	return u, nil
}
