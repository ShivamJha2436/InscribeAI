package api

import (
	"net/http"
	"strings"

	"inscribeai/backend/models"
	"inscribeai/backend/services"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func NewRouter(notes *services.NoteService, auth *services.AuthService, ai *services.AIService) http.Handler {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Auth endpoints
	r.POST("/api/auth/register", func(c *gin.Context) {
		var body struct{ Name, Email, Password string }
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		user, token, err := auth.Register(c.Request.Context(), body.Name, body.Email, body.Password)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"user": gin.H{"id": user.ID, "name": user.Name, "email": user.Email}, "token": token})
	})

	r.POST("/api/auth/login", func(c *gin.Context) {
		var body struct{ Email, Password string }
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		user, token, err := auth.Login(c.Request.Context(), body.Email, body.Password)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"user": gin.H{"id": user.ID, "name": user.Name, "email": user.Email}, "token": token})
	})

	// AI endpoints (protected)
	authGroup := r.Group("/api/ai", ginAuthMiddleware(auth))
	authGroup.POST("/summarize", func(c *gin.Context) {
		var body struct{ Content string }
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		summary, err := ai.SummarizeNote(c.Request.Context(), body.Content)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"summary": summary})
	})

	authGroup.POST("/suggest-tags", func(c *gin.Context) {
		var body struct{ Content string }
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		tags, err := ai.SuggestTags(c.Request.Context(), body.Content)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"tags": tags})
	})

	authGroup.POST("/enhance", func(c *gin.Context) {
		var body struct{ Content string }
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		enhanced, err := ai.EnhanceContent(c.Request.Context(), body.Content)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"enhanced": enhanced})
	})

	authGroup.POST("/generate", func(c *gin.Context) {
		var body struct{ Bullets string }
		if err := c.BindJSON(&body); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		content, err := ai.GenerateContentFromBullets(c.Request.Context(), body.Bullets)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, gin.H{"content": content})
	})

	// Protected note endpoints
	notesGroup := r.Group("/api/notes", ginAuthMiddleware(auth))
	notesGroup.GET("", func(c *gin.Context) {
		userID := c.GetString("userID")
		ns, err := notes.ListNotes(c.Request.Context(), userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, ns)
	})
	notesGroup.POST("", func(c *gin.Context) {
		userID := c.GetString("userID")
		var n models.Note
		if err := c.BindJSON(&n); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		created, err := notes.CreateNote(c.Request.Context(), n, userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusCreated, created)
	})

	notesGroup.GET("/:id", func(c *gin.Context) {
		userID := c.GetString("userID")
		id := c.Param("id")
		n, err := notes.GetNote(c.Request.Context(), id, userID)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, n)
	})
	notesGroup.PUT("/:id", func(c *gin.Context) {
		userID := c.GetString("userID")
		id := c.Param("id")
		var n models.Note
		if err := c.BindJSON(&n); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		updated, err := notes.UpdateNote(c.Request.Context(), id, userID, n)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, updated)
	})
	notesGroup.DELETE("/:id", func(c *gin.Context) {
		userID := c.GetString("userID")
		id := c.Param("id")
		if err := notes.DeleteNote(c.Request.Context(), id, userID); err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.Status(http.StatusNoContent)
	})

	return r
}

func ginAuthMiddleware(auth *services.AuthService) gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": http.ErrNoLocation.Error()})
			return
		}
		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": http.ErrNoLocation.Error()})
			return
		}
		claims := jwt.MapClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte("dev-secret-change-me"), nil
		})
		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": http.ErrNoLocation.Error()})
			return
		}
		userID, ok := claims["sub"].(string)
		if !ok {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": http.ErrNoLocation.Error()})
			return
		}
		c.Set("userID", userID)
		c.Next()
	}
}
