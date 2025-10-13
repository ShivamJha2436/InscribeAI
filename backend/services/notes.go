package services

import (
	"context"
	"inscribeai/backend/db"
	"inscribeai/backend/models"
)

type NoteService struct {
	store db.Store
}

func NewNoteService(store db.Store) *NoteService {
	return &NoteService{store: store}
}

func (s *NoteService) ListNotes(ctx context.Context, userID string) ([]models.Note, error) {
	return s.store.ListNotes(ctx, userID)
}

func (s *NoteService) GetNote(ctx context.Context, id, userID string) (models.Note, error) {
	return s.store.GetNote(ctx, id, userID)
}

func (s *NoteService) CreateNote(ctx context.Context, n models.Note, userID string) (models.Note, error) {
	return s.store.CreateNote(ctx, n, userID)
}

func (s *NoteService) UpdateNote(ctx context.Context, id, userID string, n models.Note) (models.Note, error) {
	return s.store.UpdateNote(ctx, id, userID, n)
}

func (s *NoteService) DeleteNote(ctx context.Context, id, userID string) error {
	return s.store.DeleteNote(ctx, id, userID)
}
