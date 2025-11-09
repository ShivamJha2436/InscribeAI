# InscribeAI Setup Guide

This guide will help you set up InscribeAI from scratch.

## Prerequisites

Before you begin, ensure you have:

1. **Go 1.22+** installed ([Download](https://go.dev/dl/))
2. **Node.js 20+** and npm/pnpm installed ([Download](https://nodejs.org/))
3. **PostgreSQL** database (local or cloud)
4. **Python 3.8+** (for GPT4All service, optional)

---

## Step 1: Database Setup

### Option A: Local PostgreSQL

1. Install PostgreSQL on your system
2. Create a new database:
```bash
createdb inscribeai
```
3. Note your connection string:
```
postgres://username:password@localhost:5432/inscribeai?sslmode=disable
```

### Option B: Cloud PostgreSQL (Recommended for beginners)

#### Using Neon (Free Tier)

1. Go to [neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string from the dashboard
5. It will look like: `postgres://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

#### Using Supabase (Free Tier)

1. Go to [supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Go to Settings > Database
5. Copy the connection string

#### Using Railway (Free Tier)

1. Go to [railway.app](https://railway.app)
2. Sign up for a free account
3. Create a new PostgreSQL database
4. Copy the connection string from the database settings

---

## Step 2: Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Copy environment file:**
```bash
cp env.example .env
```

3. **Edit `.env` file:**
```bash
# Database - Replace with your actual connection string
DATABASE_URL=postgres://user:password@host:5432/dbname?sslmode=require

# JWT Secret - Change this to a random secure string
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# GPT4All Service URL (default)
GPT4ALL_PYTHON_SERVICE_URL=http://localhost:8000

# Server Port
PORT=8080
ENVIRONMENT=development
```

4. **Install Go dependencies:**
```bash
go mod tidy
```

5. **Run the backend:**
```bash
go run main.go
```

You should see:
```
Database connection established
Database migration completed
Server starting on port 8080
```

The backend is now running on `http://localhost:8080`

---

## Step 3: Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
# or
pnpm install
```

3. **Create `.env.local` file (optional):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

If you don't create this file, it will default to `http://localhost:8080`.

4. **Run the development server:**
```bash
npm run dev
# or
pnpm dev
```

The frontend is now running on `http://localhost:3000`

Open your browser and navigate to `http://localhost:3000`

---

## Step 4: GPT4All Service (Optional)

The GPT4All service provides local AI capabilities. Without it, the backend will return mock responses.

1. **Navigate to Python service directory:**
```bash
cd python/llm
```

2. **Create virtual environment (recommended):**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Download GPT4All model (optional):**
   - Visit [gpt4all.io](https://gpt4all.io/index.html)
   - Download a model (e.g., `ggml-model.bin`)
   - Place it in a `models/` directory

5. **Set model path (optional):**
```bash
export GPT4ALL_MODEL_PATH=models/ggml-model.bin
```

6. **Run the service:**
```bash
python main.py
```

The GPT4All service is now running on `http://localhost:8000`

**Note**: If you don't run this service, the backend will still work but return mock AI responses.

---

## Step 5: Verify Installation

1. **Check backend health:**
```bash
curl http://localhost:8080/health
```
Should return: `{"status":"ok"}`

2. **Open frontend:**
Navigate to `http://localhost:3000` in your browser

3. **Create an account:**
   - Click "Get Started Free" or navigate to `/auth/register`
   - Fill in your details
   - You'll be automatically logged in

4. **Test features:**
   - Try creating content in "Compose"
   - Test "Enhance" feature
   - Create a brand tone
   - View your content history

---

## Common Issues

### Database Connection Failed

**Error**: `failed to connect to database`

**Solutions**:
- Verify your `DATABASE_URL` is correct
- Check if database is running (for local PostgreSQL)
- Ensure SSL mode is correct (`sslmode=require` for cloud providers)
- Check firewall settings if using cloud database

### Backend Won't Start

**Error**: `port already in use`

**Solutions**:
- Change `PORT` in `.env` to a different port (e.g., 8081)
- Kill the process using the port:
  ```bash
  # Find process
  lsof -i :8080
  # Kill process
  kill -9 <PID>
  ```

### Frontend Can't Connect to Backend

**Error**: `Network Error` or `CORS Error`

**Solutions**:
- Verify backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Ensure CORS is configured in backend (should be set for `http://localhost:3000`)

### GPT4All Service Not Working

**Error**: `Failed to call GPT4All service`

**Solutions**:
- Ensure Python service is running on port 8000
- Check `GPT4ALL_PYTHON_SERVICE_URL` in backend `.env`
- Verify GPT4All library is installed: `pip show gpt4all`
- If using a model, verify the path is correct

---

## Next Steps

1. **Customize Brand Tones**: Create brand tones that match your writing style
2. **Set Up Teams**: Create teams for collaboration
3. **Generate Content**: Start using AI Compose and Enhance features
4. **Explore History**: Review and manage your content history

---

## Production Deployment

For production deployment:

1. **Backend**:
   - Set strong `JWT_SECRET`
   - Use production database
   - Enable HTTPS
   - Set proper CORS origins
   - Add rate limiting

2. **Frontend**:
   - Set `NEXT_PUBLIC_API_URL` to production backend URL
   - Build: `npm run build`
   - Deploy to Vercel, Netlify, or similar

3. **Database**:
   - Use managed PostgreSQL service
   - Enable backups
   - Set up monitoring

4. **Security**:
   - Use environment variables for all secrets
   - Enable HTTPS everywhere
   - Implement proper authentication checks
   - Add input validation and sanitization

---

## Getting Help

If you encounter issues:

1. Check the error messages in console/logs
2. Verify all environment variables are set correctly
3. Ensure all services are running
4. Check the [README.md](./README.md) for more details
5. Open an issue on GitHub

---

Happy writing with InscribeAI! 🚀
