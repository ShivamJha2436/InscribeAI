package services

import (
	"sync"
	"time"
)

type CacheEntry struct {
	Value      interface{}
	ExpiresAt  time.Time
}

type CacheService struct {
	mu    sync.RWMutex
	cache map[string]*CacheEntry
}

func NewCacheService() *CacheService {
	cs := &CacheService{
		cache: make(map[string]*CacheEntry),
	}
	// Start cleanup goroutine
	go cs.cleanup()
	return cs
}

func (cs *CacheService) Set(key string, value interface{}, ttl time.Duration) {
	cs.mu.Lock()
	defer cs.mu.Unlock()
	cs.cache[key] = &CacheEntry{
		Value:     value,
		ExpiresAt: time.Now().Add(ttl),
	}
}

func (cs *CacheService) Get(key string) (interface{}, bool) {
	cs.mu.RLock()
	defer cs.mu.RUnlock()
	entry, exists := cs.cache[key]
	if !exists {
		return nil, false
	}
	if time.Now().After(entry.ExpiresAt) {
		delete(cs.cache, key)
		return nil, false
	}
	return entry.Value, true
}

func (cs *CacheService) Delete(key string) {
	cs.mu.Lock()
	defer cs.mu.Unlock()
	delete(cs.cache, key)
}

func (cs *CacheService) cleanup() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()
	for range ticker.C {
		cs.mu.Lock()
		now := time.Now()
		for key, entry := range cs.cache {
			if now.After(entry.ExpiresAt) {
				delete(cs.cache, key)
			}
		}
		cs.mu.Unlock()
	}
}

