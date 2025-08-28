package services

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
)

type AIService struct {
	apiKey string
	client *http.Client
}

type OpenAIRequest struct {
	Model       string    `json:"model"`
	Messages    []Message `json:"messages"`
	Temperature float64   `json:"temperature"`
	MaxTokens   int       `json:"max_tokens"`
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type OpenAIResponse struct {
	Choices []struct {
		Message struct {
			Content string `json:"content"`
		} `json:"message"`
	} `json:"choices"`
}

func NewAIService() *AIService {
	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		apiKey = "your-openai-api-key-here" // Default for development
	}

	return &AIService{
		apiKey: apiKey,
		client: &http.Client{},
	}
}

// SummarizeNote generates a concise summary of the note content
func (ai *AIService) SummarizeNote(ctx context.Context, content string) (string, error) {
	prompt := fmt.Sprintf(`Please provide a concise summary of the following text in 2-3 sentences:

%s

Summary:`, content)

	return ai.callOpenAI(ctx, prompt, 0.3)
}

// SuggestTags suggests relevant tags based on note content
func (ai *AIService) SuggestTags(ctx context.Context, content string) ([]string, error) {
	prompt := fmt.Sprintf(`Based on the following text, suggest 3-5 relevant tags. Return only the tags separated by commas, no explanations:

%s

Tags:`, content)

	response, err := ai.callOpenAI(ctx, prompt, 0.7)
	if err != nil {
		return nil, err
	}

	// Parse the comma-separated tags
	tags := strings.Split(strings.TrimSpace(response), ",")
	for i, tag := range tags {
		tags[i] = strings.TrimSpace(tag)
	}

	return tags, nil
}

// EnhanceContent improves writing style and grammar
func (ai *AIService) EnhanceContent(ctx context.Context, content string) (string, error) {
	prompt := fmt.Sprintf(`Please improve the writing style and grammar of the following text while maintaining the same meaning and structure:

%s

Enhanced version:`, content)

	return ai.callOpenAI(ctx, prompt, 0.5)
}

// GenerateContentFromBullets creates full content from bullet points
func (ai *AIService) GenerateContentFromBullets(ctx context.Context, bullets string) (string, error) {
	prompt := fmt.Sprintf(`Please convert these bullet points into well-written, coherent paragraphs:

%s

Full content:`, bullets)

	return ai.callOpenAI(ctx, prompt, 0.7)
}

// callOpenAI makes a request to OpenAI's API
func (ai *AIService) callOpenAI(ctx context.Context, prompt string, temperature float64) (string, error) {
	request := OpenAIRequest{
		Model: "gpt-3.5-turbo",
		Messages: []Message{
			{
				Role:    "user",
				Content: prompt,
			},
		},
		Temperature: temperature,
		MaxTokens:   1000,
	}

	jsonData, err := json.Marshal(request)
	if err != nil {
		return "", fmt.Errorf("failed to marshal request: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, "POST", "https://api.openai.com/v1/chat/completions", bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+ai.apiKey)

	resp, err := ai.client.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to make request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("OpenAI API returned status: %d", resp.StatusCode)
	}

	var openAIResp OpenAIResponse
	if err := json.NewDecoder(resp.Body).Decode(&openAIResp); err != nil {
		return "", fmt.Errorf("failed to decode response: %w", err)
	}

	if len(openAIResp.Choices) == 0 {
		return "", fmt.Errorf("no choices in OpenAI response")
	}

	return openAIResp.Choices[0].Message.Content, nil
}
