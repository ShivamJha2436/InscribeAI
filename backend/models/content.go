package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Content struct {
	ID          uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	UserID      uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	Title       string    `json:"title"`
	Content     string    `gorm:"type:text" json:"content"`
	ContentType string    `json:"content_type"` // email, blog, doc
	BrandToneID *uuid.UUID `gorm:"type:uuid;index" json:"brand_tone_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	User        User      `gorm:"foreignKey:UserID" json:"-"`
	BrandTone   *BrandTone `gorm:"foreignKey:BrandToneID" json:"brand_tone,omitempty"`
}

func (c *Content) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return nil
}

