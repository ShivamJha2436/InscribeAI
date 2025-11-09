package services

import (
	"errors"

	"inscribeai/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type BrandService struct {
	db *gorm.DB
}

func NewBrandService(db *gorm.DB) *BrandService {
	return &BrandService{db: db}
}

func (bs *BrandService) CreateBrandTone(userID uuid.UUID, name, description, settings string, teamID *uuid.UUID) (*models.BrandTone, error) {
	brandTone := &models.BrandTone{
		UserID:      userID,
		Name:        name,
		Description: description,
		Settings:    settings,
		TeamID:      teamID,
	}

	if err := bs.db.Create(brandTone).Error; err != nil {
		return nil, err
	}

	return brandTone, nil
}

func (bs *BrandService) GetBrandToneByID(brandToneID, userID uuid.UUID) (*models.BrandTone, error) {
	var brandTone models.BrandTone
	if err := bs.db.Where("id = ? AND (user_id = ? OR team_id IN (SELECT team_id FROM team_members WHERE user_id = ?))", brandToneID, userID, userID).First(&brandTone).Error; err != nil {
		return nil, err
	}
	return &brandTone, nil
}

func (bs *BrandService) ListBrandTones(userID uuid.UUID) ([]models.BrandTone, error) {
	var brandTones []models.BrandTone
	if err := bs.db.Where("user_id = ? OR team_id IN (SELECT team_id FROM team_members WHERE user_id = ?)", userID, userID).Find(&brandTones).Error; err != nil {
		return nil, err
	}
	return brandTones, nil
}

func (bs *BrandService) UpdateBrandTone(brandToneID, userID uuid.UUID, name, description, settings string) (*models.BrandTone, error) {
	var brandTone models.BrandTone
	if err := bs.db.Where("id = ? AND user_id = ?", brandToneID, userID).First(&brandTone).Error; err != nil {
		return nil, errors.New("brand tone not found")
	}

	brandTone.Name = name
	brandTone.Description = description
	brandTone.Settings = settings

	if err := bs.db.Save(&brandTone).Error; err != nil {
		return nil, err
	}

	return &brandTone, nil
}

func (bs *BrandService) DeleteBrandTone(brandToneID, userID uuid.UUID) error {
	return bs.db.Where("id = ? AND user_id = ?", brandToneID, userID).Delete(&models.BrandTone{}).Error
}

