# InscribeAI Backend (Go + PostgreSQL)

Go HTTP API with PostgreSQL database.

## Requirements
- Go 1.22+
- PostgreSQL 15+ (or Docker)

## Quick Start with Docker

1. Start PostgreSQL:
```bash
cd backend
docker-compose up -d postgres
```

2. Wait for database to be ready, then run the backend:
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
```

3. Run the backend:
```bash
cd backend
go mod tidy
go run ./...
```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (default: postgres://postgres:postgres@localhost:5432/inscribeai?sslmode=disable)

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

## Database Schema

The backend automatically creates tables on startup:
- `users`: User accounts with bcrypt-hashed passwords
- `notes`: User notes with foreign key to users

CORS is open for local development.
