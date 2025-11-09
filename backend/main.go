package main

import (
	"log"
	"os"

	"inscribeai/api"
	"inscribeai/db"
	"inscribeai/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Initialize database
	database, err := db.Initialize()
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Initialize services
	cacheService := services.NewCacheService()
	aiService := services.NewAIService(cacheService)
	authService := services.NewAuthService(database)
	contentService := services.NewContentService(database, aiService, cacheService)
	brandService := services.NewBrandService(database)
	collabService := services.NewCollaborationService(database)

	// Setup router
	router := gin.Default()

	// CORS configuration
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowCredentials = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	router.Use(cors.New(config))

	// Setup routes
	api.SetupRoutes(router, authService, contentService, brandService, collabService)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

