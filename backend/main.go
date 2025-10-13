package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"inscribeai/backend/api"
	"inscribeai/backend/db"
	"inscribeai/backend/services"
)

func main() {
	// Get database connection string from environment
	connString := os.Getenv("DATABASE_URL")
	if connString == "" {
		// Try SQLite for local development if no PostgreSQL URL provided
		log.Println("No DATABASE_URL found. Using SQLite for local development.")
		log.Println("To use PostgreSQL, set DATABASE_URL environment variable")
		log.Println("Example: DATABASE_URL=postgres://user:pass@host:5432/db?sslmode=require")

		// Use SQLite for local development
		store := db.NewSQLiteStore()
		defer store.Close()

		log.Println("✅ SQLite database initialized")

		// Initialize services
		noteService := services.NewNoteService(store)
		authService := services.NewAuthService(store, "dev-secret-change-me-in-production")
		aiService := services.NewAIService()

		log.Println("✅ Services initialized")

		// Create router
		router := api.NewRouter(noteService, authService, aiService)

		// Get port from environment
		port := os.Getenv("PORT")
		if port == "" {
			port = "8080"
		}

		// Create server
		server := &http.Server{
			Addr:    ":" + port,
			Handler: router,
		}

		// Start server in goroutine
		go func() {
			log.Printf("🚀 InscribeAI backend listening on :%s", port)
			log.Printf("📚 API Documentation: http://localhost:%s/health", port)
			if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
				log.Fatal("Server error:", err)
			}
		}()

		// Wait for interrupt signal
		quit := make(chan os.Signal, 1)
		signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
		<-quit

		log.Println("🛑 Shutting down server...")

		// Graceful shutdown
		shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30)
		defer shutdownCancel()

		if err := server.Shutdown(shutdownCtx); err != nil {
			log.Fatal("Server forced to shutdown:", err)
		}

		log.Println("✅ Server exited gracefully")
		return
	}

	// Get JWT secret from environment
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "dev-secret-change-me-in-production"
		log.Println("Using default JWT secret. Set JWT_SECRET environment variable for production.")
	}

	// Create context for graceful shutdown
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Initialize PostgreSQL store
	store, err := db.NewPostgresStore(ctx, connString)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer store.Close()

	log.Println("✅ Database connected successfully")

	// Initialize services
	noteService := services.NewNoteService(store)
	authService := services.NewAuthService(store, jwtSecret)
	aiService := services.NewAIService()

	log.Println("✅ Services initialized")

	// Create router
	router := api.NewRouter(noteService, authService, aiService)

	// Get port from environment
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Create server
	server := &http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	// Start server in goroutine
	go func() {
		log.Printf("🚀 InscribeAI backend listening on :%s", port)
		log.Printf("📚 API Documentation: http://localhost:%s/health", port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Server error:", err)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("🛑 Shutting down server...")

	// Graceful shutdown
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30)
	defer shutdownCancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("✅ Server exited gracefully")
}
