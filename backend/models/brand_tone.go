package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type BrandTone struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	UserID      uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	TeamID      *uuid.UUID `gorm:"type:uuid;index" json:"team_id"`
	Name        string    `json:"name"`
	Description string    `gorm:"type:text" json:"description"`
	Settings    string    `gorm:"type:jsonb" json:"settings"` // JSON string for tone settings
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	User        User      `gorm:"foreignKey:UserID" json:"-"`
	Team        *Team     `gorm:"foreignKey:TeamID" json:"team,omitempty"`
}

func (b *BrandTone) BeforeCreate(tx *gorm.DB) error {
	if b.ID == uuid.Nil {
		b.ID = uuid.New()
	}
	return nil
}

