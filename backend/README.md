# InscribeAI Backend (Go + PostgreSQL + AI)

Go HTTP API with PostgreSQL database and OpenAI AI integration.

## Requirements
- Go 1.22+
- PostgreSQL 15+ (or Docker)
- OpenAI API key

## Quick Start with Docker

1. Start PostgreSQL:
```bash
cd backend
docker-compose up -d postgres
```

2. Set your OpenAI API key:
```bash
export OPENAI_API_KEY="your-openai-api-key-here"
```

3. Wait for database to be ready, then run the backend:
```bash
go mod tidy
go run ./...
```

## Manual Setup

1. Create PostgreSQL database:
```sql
CREATE DATABASE inscribeai;
```

2. Set environment variables:
```bash
export DATABASE_URL="postgres://username:password@localhost:5432/inscribeai?sslmode=disable"
export OPENAI_API_KEY="your-openai-api-key-here"
```

3. Run the backend:
```bash
cd backend
go mod tidy
go run ./...
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (default: postgres://postgres:123@shivamjha@localhost:5432/postgres?sslmode=disable)
- `OPENAI_API_KEY`: Your OpenAI API key for AI features

## Endpoints

### Public
- GET /health
- POST /api/auth/register
- POST /api/auth/login

### Protected (requires JWT token)
- GET /api/notes
- POST /api/notes
- GET /api/notes/{id}
- PUT /api/notes/{id}
- DELETE /api/notes/{id}

### AI Endpoints (protected)
- POST /api/ai/summarize - Generate note summaries
- POST /api/ai/suggest-tags - Suggest relevant tags
- POST /api/ai/enhance - Improve writing style and grammar
- POST /api/ai/generate - Convert bullet points to full content

## AI Features

The backend integrates with OpenAI's GPT-3.5-turbo to provide:

1. **Smart Summarization**: Generate concise summaries of long notes
2. **Tag Suggestions**: AI-powered tag recommendations based on content
3. **Content Enhancement**: Improve writing style and grammar
4. **Content Generation**: Convert bullet points into coherent paragraphs

## Database Schema

The backend automatically creates tables on startup:
- `users`: User accounts with bcrypt-hashed passwords
- `notes`: User notes with foreign key to users

CORS is open for local development.
