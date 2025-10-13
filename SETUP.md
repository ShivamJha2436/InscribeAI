# InscribeAI Setup Guide

## 🚀 Quick Start

### 1. Database Setup (PostgreSQL)

Choose one of these free PostgreSQL providers:

#### Option A: Neon (Recommended)
1. Go to [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string
5. Set `DATABASE_URL` environment variable

#### Option B: Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string
6. Set `DATABASE_URL` environment variable

#### Option C: Railway
1. Go to [railway.app](https://railway.app)
2. Create a free account
3. Create a new PostgreSQL database
4. Copy the connection string
5. Set `DATABASE_URL` environment variable

### 2. Backend Setup

```bash
cd backend

# Copy environment file
cp env.example .env

# Edit .env with your database URL
# DATABASE_URL=postgres://user:pass@host:5432/db?sslmode=require

# Install dependencies
go mod tidy

# Run the server
go run main.go
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

### 4. GPT4All Integration (Optional)

#### Setup Python Service
```bash
cd python/llm

# Install dependencies
pip install -r requirements.txt

# Run the service
python main.py
```

#### Configure GPT4All
1. Install GPT4All: `pip install gpt4all`
2. Download a model from [gpt4all.io](https://gpt4all.io/index.html)
3. Update `python/llm/main.py` with actual GPT4All integration
4. Set environment variable: `GPT4ALL_PYTHON_SERVICE_URL=http://localhost:8000`

## 🔧 Environment Variables

### Backend (.env)
```bash
# Database
DATABASE_URL=postgres://user:pass@host:5432/db?sslmode=require

# JWT Secret (change in production)
JWT_SECRET=your-super-secret-jwt-key

# AI Provider
OPENAI_API_KEY=your-openai-api-key  # Optional
GPT4ALL_PYTHON_SERVICE_URL=http://localhost:8000  # Optional

# Server
PORT=8080
ENVIRONMENT=development
```

## 🎨 Features

### ✅ Completed
- Modern SaaS UI design
- Login/Register with password visibility toggle
- Zustand state management
- Zod validation
- PostgreSQL database support
- Gin framework backend
- GPT4All integration ready
- Comprehensive documentation
- Responsive design
- Dark mode support

### 🔄 In Progress
- AI provider switching (OpenAI ↔ GPT4All)
- Real-time collaboration features
- Advanced brand tone customization

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `.next`
4. Deploy

### Backend (Railway/Render)
1. Connect your GitHub repo
2. Set build command: `go build -o main`
3. Set start command: `./main`
4. Add environment variables
5. Deploy

### Database
- Use the same PostgreSQL provider for production
- Consider upgrading to paid tier for production

## 🐛 Troubleshooting

### Database Connection Issues
- Check your `DATABASE_URL` format
- Ensure SSL mode is correct (`sslmode=require` for cloud providers)
- Verify database credentials

### Frontend Issues
- Clear browser cache
- Check console for errors
- Ensure backend is running on port 8080

### Backend Issues
- Check logs for database connection errors
- Verify environment variables
- Ensure PostgreSQL is running

## 📚 API Endpoints

- `GET /health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/ai/generate` - Generate content
- `POST /api/ai/enhance` - Enhance content
- `POST /api/ai/summarize` - Summarize content
- `POST /api/ai/suggest-tags` - Suggest tags
- `GET /api/notes` - List notes
- `POST /api/notes` - Create note
- `GET /api/notes/:id` - Get note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

## 🔐 Security Notes

- Change `JWT_SECRET` in production
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Use environment variables for secrets
