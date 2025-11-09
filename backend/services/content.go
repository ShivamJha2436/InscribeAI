package services

import (
	"errors"
	"time"

	"inscribeai/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ContentService struct {
	db      *gorm.DB
	ai      *AIService
	cache   *CacheService
}

func NewContentService(db *gorm.DB, ai *AIService, cache *CacheService) *ContentService {
	return &ContentService{
		db:    db,
		ai:    ai,
		cache: cache,
	}
}

func (cs *ContentService) CreateContent(userID uuid.UUID, title, contentType string, brandToneID *uuid.UUID) (*models.Content, error) {
	content := &models.Content{
		UserID:      userID,
		Title:       title,
		Content:     "",
		ContentType: contentType,
		BrandToneID: brandToneID,
	}

	if err := cs.db.Create(content).Error; err != nil {
		return nil, err
	}

	return content, nil
}

func (cs *ContentService) GetContentByID(contentID, userID uuid.UUID) (*models.Content, error) {
	var content models.Content
	if err := cs.db.Preload("BrandTone").Where("id = ? AND user_id = ?", contentID, userID).First(&content).Error; err != nil {
		return nil, err
	}
	return &content, nil
}

func (cs *ContentService) ListContent(userID uuid.UUID, limit, offset int) ([]models.Content, int64, error) {
	var contents []models.Content
	var total int64

	query := cs.db.Model(&models.Content{}).Where("user_id = ?", userID)
	query.Count(&total)

	if err := query.Preload("BrandTone").Order("created_at DESC").Limit(limit).Offset(offset).Find(&contents).Error; err != nil {
		return nil, 0, err
	}

	return contents, total, nil
}

func (cs *ContentService) UpdateContent(contentID, userID uuid.UUID, title, content string) (*models.Content, error) {
	var existingContent models.Content
	if err := cs.db.Where("id = ? AND user_id = ?", contentID, userID).First(&existingContent).Error; err != nil {
		return nil, errors.New("content not found")
	}

	existingContent.Title = title
	existingContent.Content = content

	if err := cs.db.Save(&existingContent).Error; err != nil {
		return nil, err
	}

	return &existingContent, nil
}

func (cs *ContentService) DeleteContent(contentID, userID uuid.UUID) error {
	return cs.db.Where("id = ? AND user_id = ?", contentID, userID).Delete(&models.Content{}).Error
}

func (cs *ContentService) ComposeContent(userID uuid.UUID, prompt, contentType string, brandToneID *uuid.UUID) (string, error) {
	var brandTone *models.BrandTone
	if brandToneID != nil {
		if err := cs.db.First(&brandTone, brandToneID).Error; err != nil {
			brandTone = nil
		}
	}

	brandToneMap := make(map[string]interface{})
	if brandTone != nil {
		brandToneMap["description"] = brandTone.Description
	}

	aiReq := AIRequest{
		Prompt:      prompt,
		ContentType: contentType,
		BrandTone:   brandToneMap,
		Action:      "compose",
	}

	return cs.ai.GenerateContent(aiReq)
}

func (cs *ContentService) EnhanceContent(userID uuid.UUID, content string, brandToneID *uuid.UUID) (string, error) {
	var brandTone *models.BrandTone
	if brandToneID != nil {
		if err := cs.db.First(&brandTone, brandToneID).Error; err != nil {
			brandTone = nil
		}
	}

	brandToneMap := make(map[string]interface{})
	if brandTone != nil {
		brandToneMap["description"] = brandTone.Description
	}

	aiReq := AIRequest{
		Prompt:    content,
		BrandTone: brandToneMap,
		Action:    "enhance",
	}

	return cs.ai.GenerateContent(aiReq)
}

