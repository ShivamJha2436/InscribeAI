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
		connString = "postgres://postgres:123@shivamjha@localhost:5432/postgres?sslmode=disable"
		log.Println("Using default database URL:", connString)
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

	// Initialize services
	noteService := services.NewNoteService(store)
	userStore := store // PostgresStore implements UserStore interface
	authService := services.NewAuthService(userStore, "dev-secret-change-me")

	// Create router
	router := api.NewRouter(noteService, authService)

	// Create server
	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	// Start server in goroutine
	go func() {
		log.Printf("InscribeAI backend listening on :8080")
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal("Server error:", err)
		}
	}()

	// Wait for interrupt signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// Graceful shutdown
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30)
	defer shutdownCancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Fatal("Server forced to shutdown:", err)
	}

	log.Println("Server exited")
}
