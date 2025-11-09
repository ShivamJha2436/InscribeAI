package services

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type AIService struct {
	cache *CacheService
}

func NewAIService(cache *CacheService) *AIService {
	return &AIService{cache: cache}
}

type AIRequest struct {
	Prompt      string                 `json:"prompt"`
	Context     string                 `json:"context,omitempty"`
	BrandTone   map[string]interface{} `json:"brand_tone,omitempty"`
	ContentType string                 `json:"content_type,omitempty"`
	Action      string                 `json:"action"` // compose, enhance, rewrite
}

type AIResponse struct {
	Content string `json:"content"`
	Error   string `json:"error,omitempty"`
}

func (ais *AIService) GenerateContent(req AIRequest) (string, error) {
	// Check cache first
	cacheKey := fmt.Sprintf("ai:%s:%s", req.Action, req.Prompt)
	if cached, found := ais.cache.Get(cacheKey); found {
		return cached.(string), nil
	}

	// Build prompt with brand tone
	prompt := ais.buildPrompt(req)

	// Call GPT4All service
	gpt4allURL := os.Getenv("GPT4ALL_PYTHON_SERVICE_URL")
	if gpt4allURL == "" {
		gpt4allURL = "http://localhost:8000"
	}

	payload := map[string]interface{}{
		"prompt": prompt,
		"max_tokens": 1000,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	resp, err := http.Post(gpt4allURL+"/generate", "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to call GPT4All service: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var aiResp AIResponse
	if err := json.Unmarshal(body, &aiResp); err != nil {
		return "", err
	}

	if aiResp.Error != "" {
		return "", fmt.Errorf("AI service error: %s", aiResp.Error)
	}

	// Cache the result for 1 hour
	ais.cache.Set(cacheKey, aiResp.Content, 1*time.Hour)

	return aiResp.Content, nil
}

func (ais *AIService) buildPrompt(req AIRequest) string {
	prompt := req.Prompt

	if req.BrandTone != nil {
		toneDesc := ""
		if desc, ok := req.BrandTone["description"].(string); ok {
			toneDesc = desc
		}
		if toneDesc != "" {
			prompt = fmt.Sprintf("Write in the following brand tone: %s\n\n%s", toneDesc, prompt)
		}
	}

	if req.ContentType != "" {
		prompt = fmt.Sprintf("Content type: %s\n\n%s", req.ContentType, prompt)
	}

	if req.Context != "" {
		prompt = fmt.Sprintf("Context: %s\n\n%s", req.Context, prompt)
	}

	switch req.Action {
	case "compose":
		prompt = fmt.Sprintf("Compose the following content:\n\n%s", prompt)
	case "enhance":
		prompt = fmt.Sprintf("Enhance and improve the following content while maintaining its meaning:\n\n%s", prompt)
	case "rewrite":
		prompt = fmt.Sprintf("Rewrite the following content:\n\n%s", prompt)
	}

	return prompt
}

