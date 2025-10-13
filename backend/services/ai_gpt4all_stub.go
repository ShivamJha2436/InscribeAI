package services

import (
	"context"
	"fmt"
)

// GPT4AllProvider is a stub for future GPT4All integration.
// It satisfies AIProvider but returns a placeholder response for now.
type GPT4AllProvider struct{}

func NewGPT4AllProvider() *GPT4AllProvider { return &GPT4AllProvider{} }

func (p *GPT4AllProvider) Chat(ctx context.Context, prompt string, temperature float64) (string, error) {
	return fmt.Sprintf("[GPT4All stub] echo: %s", prompt), nil
}
