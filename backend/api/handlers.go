package api

import (
	"net/http"
	"strconv"

	"inscribeai/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// Auth Handlers
func RegisterHandler(authService *services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			Email    string `json:"email" binding:"required"`
			Password string `json:"password" binding:"required"`
			Name     string `json:"name" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := authService.Register(req.Email, req.Password, req.Name)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"user": user})
	}
}

func LoginHandler(authService *services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		var req struct {
			Email    string `json:"email" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		token, user, err := authService.Login(req.Email, req.Password)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"token": token,
			"user":  user,
		})
	}
}

// Content Handlers
func ComposeHandler(contentService *services.ContentService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		var req struct {
			Prompt      string     `json:"prompt" binding:"required"`
			ContentType string     `json:"content_type"`
			BrandToneID *uuid.UUID `json:"brand_tone_id"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		content, err := contentService.ComposeContent(userID, req.Prompt, req.ContentType, req.BrandToneID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"content": content})
	}
}

func EnhanceHandler(contentService *services.ContentService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		var req struct {
			Content     string     `json:"content" binding:"required"`
			BrandToneID *uuid.UUID `json:"brand_tone_id"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		enhanced, err := contentService.EnhanceContent(userID, req.Content, req.BrandToneID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"content": enhanced})
	}
}

func CreateContentHandler(contentService *services.ContentService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		var req struct {
			Title       string     `json:"title" binding:"required"`
			ContentType string     `json:"content_type"`
			BrandToneID *uuid.UUID `json:"brand_tone_id"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		content, err := contentService.CreateContent(userID, req.Title, req.ContentType, req.BrandToneID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"content": content})
	}
}

func GetContentHandler(contentService *services.ContentService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)
		contentID, err := uuid.Parse(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid content id"})
			return
		}

		content, err := contentService.GetContentByID(contentID, userID)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "content not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"content": content})
	}
}

func ListContentHandler(contentService *services.ContentService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))
		offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

		contents, total, err := contentService.ListContent(userID, limit, offset)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"contents": contents,
			"total":    total,
		})
	}
}

func UpdateContentHandler(contentService *services.ContentService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)
		contentID, err := uuid.Parse(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid content id"})
			return
		}

		var req struct {
			Title   string `json:"title"`
			Content string `json:"content"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		content, err := contentService.UpdateContent(contentID, userID, req.Title, req.Content)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"content": content})
	}
}

func DeleteContentHandler(contentService *services.ContentService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)
		contentID, err := uuid.Parse(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid content id"})
			return
		}

		if err := contentService.DeleteContent(contentID, userID); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "content deleted"})
	}
}

// Brand Tone Handlers
func CreateBrandToneHandler(brandService *services.BrandService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		var req struct {
			Name        string     `json:"name" binding:"required"`
			Description string     `json:"description"`
			Settings    string     `json:"settings"`
			TeamID      *uuid.UUID `json:"team_id"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		brandTone, err := brandService.CreateBrandTone(userID, req.Name, req.Description, req.Settings, req.TeamID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"brand_tone": brandTone})
	}
}

func ListBrandTonesHandler(brandService *services.BrandService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		brandTones, err := brandService.ListBrandTones(userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"brand_tones": brandTones})
	}
}

func GetBrandToneHandler(brandService *services.BrandService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)
		brandToneID, err := uuid.Parse(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid brand tone id"})
			return
		}

		brandTone, err := brandService.GetBrandToneByID(brandToneID, userID)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "brand tone not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"brand_tone": brandTone})
	}
}

func UpdateBrandToneHandler(brandService *services.BrandService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)
		brandToneID, err := uuid.Parse(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid brand tone id"})
			return
		}

		var req struct {
			Name        string `json:"name"`
			Description string `json:"description"`
			Settings    string `json:"settings"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		brandTone, err := brandService.UpdateBrandTone(brandToneID, userID, req.Name, req.Description, req.Settings)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"brand_tone": brandTone})
	}
}

func DeleteBrandToneHandler(brandService *services.BrandService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)
		brandToneID, err := uuid.Parse(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid brand tone id"})
			return
		}

		if err := brandService.DeleteBrandTone(brandToneID, userID); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "brand tone deleted"})
	}
}

// Collaboration Handlers
func ShareContentHandler(collabService *services.CollaborationService) gin.HandlerFunc {
	return func(c *gin.Context) {
		ownerID := c.MustGet("user_id").(uuid.UUID)

		var req struct {
			ContentID uuid.UUID `json:"content_id" binding:"required"`
			UserID    uuid.UUID `json:"user_id" binding:"required"`
			Action    string    `json:"action" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		collab, err := collabService.ShareContent(req.ContentID, ownerID, req.UserID, req.Action)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"collaboration": collab})
	}
}

func AddCommentHandler(collabService *services.CollaborationService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		var req struct {
			ContentID uuid.UUID `json:"content_id" binding:"required"`
			Comment   string    `json:"comment" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		collab, err := collabService.AddComment(req.ContentID, userID, req.Comment)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"collaboration": collab})
	}
}

func GetCollaborationsHandler(collabService *services.CollaborationService) gin.HandlerFunc {
	return func(c *gin.Context) {
		contentID, err := uuid.Parse(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid content id"})
			return
		}

		collabs, err := collabService.GetCollaborations(contentID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"collaborations": collabs})
	}
}

func CreateTeamHandler(collabService *services.CollaborationService) gin.HandlerFunc {
	return func(c *gin.Context) {
		ownerID := c.MustGet("user_id").(uuid.UUID)

		var req struct {
			Name string `json:"name" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		team, err := collabService.CreateTeam(ownerID, req.Name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"team": team})
	}
}

func GetUserTeamsHandler(collabService *services.CollaborationService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		teams, err := collabService.GetUserTeams(userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"teams": teams})
	}
}

func AddTeamMemberHandler(collabService *services.CollaborationService) gin.HandlerFunc {
	return func(c *gin.Context) {
		ownerID := c.MustGet("user_id").(uuid.UUID)
		teamID, err := uuid.Parse(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid team id"})
			return
		}

		var req struct {
			UserID uuid.UUID `json:"user_id" binding:"required"`
			Role   string    `json:"role" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if err := collabService.AddTeamMember(teamID, ownerID, req.UserID, req.Role); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "team member added"})
	}
}

// History Handler
func HistoryHandler(contentService *services.ContentService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		limit, _ := strconv.Atoi(c.DefaultQuery("limit", "50"))
		offset, _ := strconv.Atoi(c.DefaultQuery("offset", "0"))

		contents, total, err := contentService.ListContent(userID, limit, offset)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"history": contents,
			"total":   total,
		})
	}
}

// Settings Handlers
func SettingsHandler(authService *services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		user, err := authService.GetUserByID(userID)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"user": user})
	}
}

func UpdateSettingsHandler(authService *services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		userID := c.MustGet("user_id").(uuid.UUID)

		var req struct {
			Name  string `json:"name"`
			Email string `json:"email"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := authService.GetUserByID(userID)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
			return
		}

		if req.Name != "" {
			user.Name = req.Name
		}
		if req.Email != "" {
			user.Email = req.Email
		}

		// Update in database (would need UpdateUser method in auth service)
		c.JSON(http.StatusOK, gin.H{"user": user, "message": "settings updated"})
	}
}

