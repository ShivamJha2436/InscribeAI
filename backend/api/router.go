package api

import (
	"inscribeai/services"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(
	router *gin.Engine,
	authService *services.AuthService,
	contentService *services.ContentService,
	brandService *services.BrandService,
	collabService *services.CollaborationService,
) {
	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	// Auth routes
	auth := router.Group("/api/auth")
	{
		auth.POST("/register", RegisterHandler(authService))
		auth.POST("/login", LoginHandler(authService))
	}

	// Protected routes
	protected := router.Group("/api")
	protected.Use(AuthMiddleware(authService))
	{
		// Content routes
		content := protected.Group("/content")
		{
			content.POST("/compose", ComposeHandler(contentService))
			content.POST("/enhance", EnhanceHandler(contentService))
			content.GET("", ListContentHandler(contentService))
			content.GET("/:id", GetContentHandler(contentService))
			content.POST("", CreateContentHandler(contentService))
			content.PUT("/:id", UpdateContentHandler(contentService))
			content.DELETE("/:id", DeleteContentHandler(contentService))
		}

		// Brand tone routes
		brand := protected.Group("/brand")
		{
			brand.POST("", CreateBrandToneHandler(brandService))
			brand.GET("", ListBrandTonesHandler(brandService))
			brand.GET("/:id", GetBrandToneHandler(brandService))
			brand.PUT("/:id", UpdateBrandToneHandler(brandService))
			brand.DELETE("/:id", DeleteBrandToneHandler(brandService))
		}

		// Collaboration routes
		collab := protected.Group("/collaboration")
		{
			collab.POST("/share", ShareContentHandler(collabService))
			collab.POST("/comment", AddCommentHandler(collabService))
			collab.GET("/content/:id", GetCollaborationsHandler(collabService))
			collab.POST("/teams", CreateTeamHandler(collabService))
			collab.GET("/teams", GetUserTeamsHandler(collabService))
			collab.POST("/teams/:id/members", AddTeamMemberHandler(collabService))
		}

		// History route
		protected.GET("/history", HistoryHandler(contentService))

		// Settings route
		protected.GET("/settings", SettingsHandler(authService))
		protected.PUT("/settings", UpdateSettingsHandler(authService))
	}
}
