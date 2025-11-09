package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Team struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	Name      string    `json:"name"`
	OwnerID   uuid.UUID `gorm:"type:uuid;not null;index" json:"owner_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Owner     User      `gorm:"foreignKey:OwnerID" json:"-"`
	Members   []TeamMember `gorm:"foreignKey:TeamID" json:"members,omitempty"`
}

func (t *Team) BeforeCreate(tx *gorm.DB) error {
	if t.ID == uuid.Nil {
		t.ID = uuid.New()
	}
	return nil
}

type TeamMember struct {
	ID        uuid.UUID `gorm:"type:uuid;primary_key;default:gen_random_uuid()" json:"id"`
	TeamID    uuid.UUID `gorm:"type:uuid;not null;index" json:"team_id"`
	UserID    uuid.UUID `gorm:"type:uuid;not null;index" json:"user_id"`
	Role      string    `json:"role"` // owner, admin, member
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Team      Team      `gorm:"foreignKey:TeamID" json:"-"`
	User      User      `gorm:"foreignKey:UserID" json:"user,omitempty"`
}

func (tm *TeamMember) BeforeCreate(tx *gorm.DB) error {
	if tm.ID == uuid.Nil {
		tm.ID = uuid.New()
	}
	return nil
}

