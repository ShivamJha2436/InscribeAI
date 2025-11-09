# ⚡ Quick Start Checklist

Follow these steps in order to get InscribeAI running:

## ✅ Step-by-Step Checklist

### 1. Set Up PostgreSQL Database

**Choose ONE option:**

#### 🌐 Option A: Cloud Database (Easiest - Recommended)

**Neon (Free):**
1. Go to https://neon.tech
2. Sign up → Create Project
3. Copy connection string (looks like: `postgres://user:pass@host/db?sslmode=require`)

**OR Supabase (Free):**
1. Go to https://supabase.com
2. Sign up → New Project
3. Settings → Database → Copy connection string

#### 💻 Option B: Local PostgreSQL

```bash
# macOS
brew install postgresql@16
brew services start postgresql@16
createdb inscribeai
# Connection: postgres://yourusername@localhost:5432/inscribeai?sslmode=disable

# Ubuntu
sudo apt install postgresql
sudo systemctl start postgresql
sudo -u postgres createdb inscribeai
# Connection: postgres://postgres@localhost:5432/inscribeai?sslmode=disable
```

**✅ Save your connection string - you'll need it next!**

---

### 2. Configure Backend

```bash
cd backend

# Copy environment file
cp env.example .env

# Edit .env file (use nano, vim, or VS Code)
nano .env
```

**Edit these values in `.env`:**
```env
DATABASE_URL=your-connection-string-from-step-1
JWT_SECRET=generate-random-string-min-32-chars
GPT4ALL_PYTHON_SERVICE_URL=http://localhost:8000
PORT=8080
```

**Generate JWT_SECRET:**
```bash
# macOS/Linux
openssl rand -base64 32

# Or use any random string generator (min 32 characters)
```

**✅ Save the `.env` file**

---

### 3. Run Backend

```bash
# Still in backend/ directory
go mod tidy
go run main.go
```

**Expected output:**
```
Database connection established
Database migration completed
Server starting on port 8080
```

**✅ Backend is running! Keep this terminal open.**

---

### 4. Run Frontend

**Open a NEW terminal:**

```bash
cd frontend

# Install dependencies
npm install
# or
pnpm install

# Run development server
npm run dev
# or
pnpm dev
```

**Expected output:**
```
  ▲ Next.js 15.5.0
  - Local:        http://localhost:3000
```

**✅ Frontend is running!**

**Open browser:** http://localhost:3000

---

### 5. (Optional) GPT4All Service

**Open a NEW terminal:**

```bash
cd python/llm

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run service
python main.py
```

**✅ GPT4All service is running!**

**Note:** Without this, backend will return mock AI responses.

---

## 🎉 You're Done!

**What's running:**
- ✅ Backend: http://localhost:8080
- ✅ Frontend: http://localhost:3000
- ✅ GPT4All (optional): http://localhost:8000

**Next:**
1. Open http://localhost:3000
2. Click "Get Started Free"
3. Create an account
4. Start using InscribeAI!

---

## 🐛 Quick Troubleshooting

**Backend won't start?**
- Check `DATABASE_URL` in `.env`
- Verify database is running
- Try different port: change `PORT=8081` in `.env`

**Frontend won't connect?**
- Verify backend is running on port 8080
- Check browser console for errors

**Database connection failed?**
- Verify connection string format
- Check SSL mode (`sslmode=require` for cloud, `sslmode=disable` for local)

---

## 📚 Need More Help?

- **Detailed Setup:** See [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- **Full Documentation:** See [README.md](./README.md)
- **Architecture:** See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

---

**Happy coding! 🚀**

