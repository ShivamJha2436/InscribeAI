package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Collaboration struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	ContentID uuid.UUID `gorm:"type:uuid;not null;index" json:"content_id"`
	UserID    uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	Action    string    `json:"action"` // view, edit, comment
	Comment   string    `gorm:"type:text" json:"comment,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	Content   Content   `gorm:"foreignKey:ContentID" json:"-"`
	User      User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

func (c *Collaboration) BeforeCreate(tx *gorm.DB) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	return nil
}

