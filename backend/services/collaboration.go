package services

import (
	"errors"

	"inscribeai/models"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CollaborationService struct {
	db *gorm.DB
}

func NewCollaborationService(db *gorm.DB) *CollaborationService {
	return &CollaborationService{db: db}
}

func (cs *CollaborationService) ShareContent(contentID, ownerID, userID uuid.UUID, action string) (*models.Collaboration, error) {
	// Verify content ownership
	var content models.Content
	if err := cs.db.Where("id = ? AND user_id = ?", contentID, ownerID).First(&content).Error; err != nil {
		return nil, errors.New("content not found or unauthorized")
	}

	collab := &models.Collaboration{
		ContentID: contentID,
		UserID:    userID,
		Action:    action,
	}

	if err := cs.db.Create(collab).Error; err != nil {
		return nil, err
	}

	return collab, nil
}

func (cs *CollaborationService) AddComment(contentID, userID uuid.UUID, comment string) (*models.Collaboration, error) {
	collab := &models.Collaboration{
		ContentID: contentID,
		UserID:    userID,
		Action:    "comment",
		Comment:   comment,
	}

	if err := cs.db.Create(collab).Error; err != nil {
		return nil, err
	}

	return collab, nil
}

func (cs *CollaborationService) GetCollaborations(contentID uuid.UUID) ([]models.Collaboration, error) {
	var collabs []models.Collaboration
	if err := cs.db.Preload("User").Where("content_id = ?", contentID).Order("created_at DESC").Find(&collabs).Error; err != nil {
		return nil, err
	}
	return collabs, nil
}

func (cs *CollaborationService) CreateTeam(ownerID uuid.UUID, name string) (*models.Team, error) {
	team := &models.Team{
		Name:    name,
		OwnerID: ownerID,
	}

	if err := cs.db.Create(team).Error; err != nil {
		return nil, err
	}

	// Add owner as team member
	member := &models.TeamMember{
		TeamID: team.ID,
		UserID: ownerID,
		Role:   "owner",
	}

	if err := cs.db.Create(member).Error; err != nil {
		return nil, err
	}

	return team, nil
}

func (cs *CollaborationService) AddTeamMember(teamID, ownerID, userID uuid.UUID, role string) error {
	// Verify ownership
	var team models.Team
	if err := cs.db.Where("id = ? AND owner_id = ?", teamID, ownerID).First(&team).Error; err != nil {
		return errors.New("team not found or unauthorized")
	}

	member := &models.TeamMember{
		TeamID: teamID,
		UserID: userID,
		Role:   role,
	}

	return cs.db.Create(member).Error
}

func (cs *CollaborationService) GetUserTeams(userID uuid.UUID) ([]models.Team, error) {
	var teams []models.Team
	if err := cs.db.Joins("JOIN team_members ON teams.id = team_members.team_id").
		Where("team_members.user_id = ?", userID).
		Preload("Members.User").
		Find(&teams).Error; err != nil {
		return nil, err
	}
	return teams, nil
}

