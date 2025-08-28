package api

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"inscribeai/backend/models"
	"inscribeai/backend/services"

	"github.com/golang-jwt/jwt/v5"
)

func NewRouter(notes *services.NoteService, auth *services.AuthService, ai *services.AIService) http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		_ = json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
	})

	// Auth endpoints
	mux.Handle("/api/auth/register", cors(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		var body struct{ Name, Email, Password string }
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			writeErr(w, http.StatusBadRequest, err)
			return
		}
		user, token, err := auth.Register(r.Context(), body.Name, body.Email, body.Password)
		if err != nil {
			writeErr(w, http.StatusBadRequest, err)
			return
		}
		_ = json.NewEncoder(w).Encode(map[string]any{"user": map[string]any{"id": user.ID, "name": user.Name, "email": user.Email}, "token": token})
	})))

	mux.Handle("/api/auth/login", cors(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}
		var body struct{ Email, Password string }
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			writeErr(w, http.StatusBadRequest, err)
			return
		}
		user, token, err := auth.Login(r.Context(), body.Email, body.Password)
		if err != nil {
			writeErr(w, http.StatusUnauthorized, err)
			return
		}
		_ = json.NewEncoder(w).Encode(map[string]any{"user": map[string]any{"id": user.ID, "name": user.Name, "email": user.Email}, "token": token})
	})))

	// AI endpoints (protected)
	mux.Handle("/api/ai/summarize", cors(authMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}

		var body struct{ Content string }
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			writeErr(w, http.StatusBadRequest, err)
			return
		}

		summary, err := ai.SummarizeNote(r.Context(), body.Content)
		if err != nil {
			writeErr(w, http.StatusInternalServerError, err)
			return
		}

		_ = json.NewEncoder(w).Encode(map[string]string{"summary": summary})
	}), auth)))

	mux.Handle("/api/ai/suggest-tags", cors(authMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}

		var body struct{ Content string }
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			writeErr(w, http.StatusBadRequest, err)
			return
		}

		tags, err := ai.SuggestTags(r.Context(), body.Content)
		if err != nil {
			writeErr(w, http.StatusInternalServerError, err)
			return
		}

		_ = json.NewEncoder(w).Encode(map[string]any{"tags": tags})
	}), auth)))

	mux.Handle("/api/ai/enhance", cors(authMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}

		var body struct{ Content string }
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			writeErr(w, http.StatusBadRequest, err)
			return
		}

		enhanced, err := ai.EnhanceContent(r.Context(), body.Content)
		if err != nil {
			writeErr(w, http.StatusInternalServerError, err)
			return
		}

		_ = json.NewEncoder(w).Encode(map[string]string{"enhanced": enhanced})
	}), auth)))

	mux.Handle("/api/ai/generate", cors(authMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusMethodNotAllowed)
			return
		}

		var body struct{ Bullets string }
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			writeErr(w, http.StatusBadRequest, err)
			return
		}

		content, err := ai.GenerateContentFromBullets(r.Context(), body.Bullets)
		if err != nil {
			writeErr(w, http.StatusInternalServerError, err)
			return
		}

		_ = json.NewEncoder(w).Encode(map[string]string{"content": content})
	}), auth)))

	// Protected note endpoints
	mux.Handle("/api/notes", cors(authMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		userID := r.Context().Value("userID").(string)

		switch r.Method {
		case http.MethodGet:
			ns, err := notes.ListNotes(r.Context(), userID)
			if err != nil {
				writeErr(w, http.StatusInternalServerError, err)
				return
			}
			_ = json.NewEncoder(w).Encode(ns)
		case http.MethodPost:
			var n models.Note
			if err := json.NewDecoder(r.Body).Decode(&n); err != nil {
				writeErr(w, http.StatusBadRequest, err)
				return
			}
			created, err := notes.CreateNote(r.Context(), n, userID)
			if err != nil {
				writeErr(w, http.StatusInternalServerError, err)
				return
			}
			w.WriteHeader(http.StatusCreated)
			_ = json.NewEncoder(w).Encode(created)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	}), auth)))

	mux.Handle("/api/notes/", cors(authMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		userID := r.Context().Value("userID").(string)
		id := strings.TrimPrefix(r.URL.Path, "/api/notes/")
		if id == "" {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		switch r.Method {
		case http.MethodGet:
			n, err := notes.GetNote(r.Context(), id, userID)
			if err != nil {
				writeErr(w, http.StatusNotFound, err)
				return
			}
			_ = json.NewEncoder(w).Encode(n)
		case http.MethodPut, http.MethodPatch:
			var n models.Note
			if err := json.NewDecoder(r.Body).Decode(&n); err != nil {
				writeErr(w, http.StatusBadRequest, err)
				return
			}
			updated, err := notes.UpdateNote(r.Context(), id, userID, n)
			if err != nil {
				writeErr(w, http.StatusNotFound, err)
				return
			}
			_ = json.NewEncoder(w).Encode(updated)
		case http.MethodDelete:
			if err := notes.DeleteNote(r.Context(), id, userID); err != nil {
				writeErr(w, http.StatusNotFound, err)
				return
			}
			w.WriteHeader(http.StatusNoContent)
		default:
			w.WriteHeader(http.StatusMethodNotAllowed)
		}
	}), auth)))

	return mux
}

func writeErr(w http.ResponseWriter, code int, err error) {
	w.WriteHeader(code)
	_ = json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
}

func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func authMiddleware(next http.Handler, auth *services.AuthService) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			writeErr(w, http.StatusUnauthorized, http.ErrNoLocation)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			writeErr(w, http.StatusUnauthorized, http.ErrNoLocation)
			return
		}

		// For now, we'll just extract userID from the token without full validation
		// In production, you'd want to validate the JWT signature
		claims := jwt.MapClaims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			return []byte("dev-secret-change-me"), nil
		})

		if err != nil || !token.Valid {
			writeErr(w, http.StatusUnauthorized, http.ErrNoLocation)
			return
		}

		userID, ok := claims["sub"].(string)
		if !ok {
			writeErr(w, http.StatusUnauthorized, http.ErrNoLocation)
			return
		}

		ctx := context.WithValue(r.Context(), "userID", userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
