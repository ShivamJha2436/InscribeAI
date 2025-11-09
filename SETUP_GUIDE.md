# 🚀 InscribeAI Setup Guide - Step by Step

This guide will walk you through setting up InscribeAI from scratch. Follow each step carefully.

---

## 📋 Prerequisites Checklist

Before you begin, make sure you have:

- [ ] **Go 1.22+** installed ([Download here](https://go.dev/dl/))
- [ ] **Node.js 20+** and npm/pnpm installed ([Download here](https://nodejs.org/))
- [ ] **PostgreSQL** database (we'll set this up)
- [ ] **Python 3.8+** (optional, for GPT4All service)
- [ ] **Git** installed
- [ ] A code editor (VS Code recommended)

---

## Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/inscribeai.git

# Navigate to the project directory
cd inscribeai
```

---

## Step 2: Set Up PostgreSQL Database

You have two options: **Cloud Database** (easier) or **Local Database**.

### Option A: Cloud Database (Recommended) 🌐

#### Using Neon (Free Tier - Recommended)

1. **Go to [neon.tech](https://neon.tech)**
2. **Click "Sign Up"** and create a free account
3. **Click "Create Project"**
4. **Give your project a name** (e.g., "InscribeAI")
5. **Select a region** closest to you
6. **Click "Create Project"**
7. **Copy the connection string** from the dashboard
   - It will look like: `postgres://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`
   - **Save this string** - you'll need it in Step 3

✅ **Done!** You now have a PostgreSQL database.

#### Using Supabase (Free Tier)

1. **Go to [supabase.com](https://supabase.com)**
2. **Click "Start your project"** and sign up
3. **Click "New Project"**
4. **Fill in project details:**
   - Name: InscribeAI
   - Database Password: (choose a strong password)
   - Region: (select closest)
5. **Click "Create new project"** (wait 2-3 minutes)
6. **Go to Settings > Database**
7. **Copy the connection string** under "Connection string" > "URI"
   - It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres?sslmode=require`
   - Replace `[YOUR-PASSWORD]` with your actual password

✅ **Done!** You now have a PostgreSQL database.

### Option B: Local PostgreSQL 💻

#### macOS

```bash
# Install PostgreSQL using Homebrew
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Create database
createdb inscribeai

# Your connection string will be:
# postgres://yourusername@localhost:5432/inscribeai?sslmode=disable
```

#### Ubuntu/Debian

```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb inscribeai

# Your connection string will be:
# postgres://postgres@localhost:5432/inscribeai?sslmode=disable
```

#### Windows

1. **Download PostgreSQL** from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. **Run the installer** and follow the setup wizard
3. **Remember the password** you set for the `postgres` user
4. **Open pgAdmin** or Command Prompt
5. **Create database:**
   ```sql
   CREATE DATABASE inscribeai;
   ```
6. **Your connection string will be:**
   ```
   postgres://postgres:yourpassword@localhost:5432/inscribeai?sslmode=disable
   ```

---

## Step 3: Configure Backend Environment Variables

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Copy the example environment file:**
```bash
cp env.example .env
```

3. **Open `.env` file in your editor:**
```bash
# On macOS/Linux
nano .env
# or
code .env  # if using VS Code

# On Windows
notepad .env
```

4. **Edit the `.env` file with your values:**

```env
# Database - Replace with YOUR connection string from Step 2
DATABASE_URL=postgres://user:password@host:5432/dbname?sslmode=require

# JWT Secret - Generate a random string (keep this secret!)
# You can generate one using: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars

# GPT4All Service URL (default, change if needed)
GPT4ALL_PYTHON_SERVICE_URL=http://localhost:8000

# Server Port (default)
PORT=8080
ENVIRONMENT=development
```

**Important:**
- Replace `DATABASE_URL` with your actual connection string from Step 2
- Generate a strong `JWT_SECRET` (at least 32 characters)
  - You can use: `openssl rand -base64 32` or any random string generator
- Save the file

5. **Verify your `.env` file:**
```bash
# Check if file exists and has content
cat .env  # macOS/Linux
type .env  # Windows
```

✅ **Backend configuration complete!**

---

## Step 4: Install Backend Dependencies and Run

1. **Install Go dependencies:**
```bash
go mod tidy
```

This will download all required Go packages.

2. **Run the backend:**
```bash
go run main.go
```

**Expected output:**
```
Database connection established
Database migration completed
Server starting on port 8080
```

✅ **Backend is running!** Keep this terminal open.

**If you see errors:**
- **Database connection failed**: Check your `DATABASE_URL` in `.env`
- **Port already in use**: Change `PORT=8080` to `PORT=8081` in `.env`
- **Module not found**: Run `go mod tidy` again

---

## Step 5: Configure Frontend

1. **Open a NEW terminal window** (keep backend running)

2. **Navigate to frontend directory:**
```bash
cd frontend
```

3. **Install dependencies:**
```bash
npm install
# or if you prefer pnpm
pnpm install
```

This may take a few minutes. Wait for it to complete.

4. **Create `.env.local` file (optional):**
```bash
# Create the file
touch .env.local  # macOS/Linux
# or
type nul > .env.local  # Windows

# Add this line (if backend is on different port, change it)
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local
```

**Note:** If you don't create this file, it will default to `http://localhost:8080`.

✅ **Frontend configuration complete!**

---

## Step 6: Run Frontend

1. **Start the development server:**
```bash
npm run dev
# or
pnpm dev
```

**Expected output:**
```
  ▲ Next.js 15.5.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

✅ **Frontend is running!**

2. **Open your browser:**
   - Go to [http://localhost:3000](http://localhost:3000)
   - You should see the InscribeAI landing page!

---

## Step 7: (Optional) Set Up GPT4All Service

The GPT4All service provides local AI capabilities. Without it, the backend will return mock responses.

1. **Open a NEW terminal window** (keep backend and frontend running)

2. **Navigate to Python service directory:**
```bash
cd python/llm
```

3. **Create virtual environment (recommended):**
```bash
# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

4. **Install dependencies:**
```bash
pip install -r requirements.txt
```

5. **Download GPT4All model (optional but recommended):**
   - Visit [gpt4all.io/index.html](https://gpt4all.io/index.html)
   - Download a model (e.g., `mistral-7b-openorca.Q4_0.gguf`)
   - Create a `models/` directory: `mkdir models`
   - Place the model file in `models/` directory

6. **Set model path (if you downloaded a model):**
```bash
# macOS/Linux
export GPT4ALL_MODEL_PATH=models/your-model-name.gguf

# Windows
set GPT4ALL_MODEL_PATH=models/your-model-name.gguf
```

7. **Run the service:**
```bash
python main.py
```

**Expected output:**
```
 * Running on http://0.0.0.0:8000
```

✅ **GPT4All service is running!**

**Note:** If you don't run this service, the backend will still work but return mock AI responses.

---

## Step 8: Test the Application

1. **Open browser:** [http://localhost:3000](http://localhost:3000)

2. **Create an account:**
   - Click "Get Started Free" or "Sign Up"
   - Fill in:
     - Name: Your name
     - Email: your@email.com
     - Password: (at least 6 characters)
   - Click "Create Account"
   - You'll be automatically logged in

3. **Test features:**
   - ✅ **Dashboard**: Should show your dashboard
   - ✅ **Compose**: Try generating content
   - ✅ **Enhance**: Try enhancing some text
   - ✅ **Brand Tone**: Create a brand tone
   - ✅ **History**: View your content history
   - ✅ **Settings**: Update your profile
   - ✅ **Dark Mode**: Toggle theme in navbar

---

## 🎉 Success! You're All Set!

You now have InscribeAI running locally. Here's what's running:

- ✅ **Backend**: `http://localhost:8080`
- ✅ **Frontend**: `http://localhost:3000`
- ✅ **GPT4All** (optional): `http://localhost:8000`

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** `failed to connect to database`
- ✅ Check your `DATABASE_URL` in `.env`
- ✅ Verify database is running (for local PostgreSQL)
- ✅ Check SSL mode (`sslmode=require` for cloud, `sslmode=disable` for local)
- ✅ Verify credentials are correct

**Problem:** `port already in use`
- ✅ Change `PORT=8080` to `PORT=8081` in `.env`
- ✅ Or kill the process: `lsof -i :8080` then `kill -9 <PID>`

**Problem:** `module not found`
- ✅ Run `go mod tidy`
- ✅ Check your Go version: `go version` (should be 1.22+)

### Frontend Issues

**Problem:** `Cannot connect to backend`
- ✅ Verify backend is running on port 8080
- ✅ Check `NEXT_PUBLIC_API_URL` in `.env.local`
- ✅ Check browser console for CORS errors

**Problem:** `npm install fails`
- ✅ Check Node.js version: `node --version` (should be 20+)
- ✅ Try deleting `node_modules` and `package-lock.json`, then `npm install` again
- ✅ Use `pnpm` instead: `pnpm install`

### GPT4All Issues

**Problem:** `Failed to call GPT4All service`
- ✅ Ensure Python service is running: `python main.py`
- ✅ Check `GPT4ALL_PYTHON_SERVICE_URL` in backend `.env`
- ✅ Verify GPT4All is installed: `pip show gpt4all`

**Problem:** `Model not found`
- ✅ Download a model from [gpt4all.io](https://gpt4all.io/index.html)
- ✅ Set `GPT4ALL_MODEL_PATH` environment variable
- ✅ Verify model path is correct

---

## 📚 Next Steps

1. **Explore the Dashboard**: Try all the features
2. **Create Brand Tones**: Set up your brand voice
3. **Generate Content**: Use AI Compose to create content
4. **Invite Team Members**: Set up teams for collaboration
5. **Customize**: Modify the code to fit your needs

---

## 🚀 Production Deployment

When ready to deploy:

1. **Backend:**
   - Set strong `JWT_SECRET`
   - Use production database
   - Enable HTTPS
   - Set proper CORS origins

2. **Frontend:**
   - Set `NEXT_PUBLIC_API_URL` to production backend
   - Build: `npm run build`
   - Deploy to Vercel/Netlify

3. **Database:**
   - Use managed PostgreSQL (Neon, Supabase, etc.)
   - Enable backups
   - Set up monitoring

See [README.md](./README.md) for more deployment details.

---

## 💡 Tips

- **Keep terminals open**: You need backend, frontend, and optionally GPT4All running
- **Use separate terminals**: One for each service
- **Check logs**: If something doesn't work, check terminal output
- **Database first**: Always set up database before backend
- **Environment variables**: Double-check your `.env` files

---

## 📞 Need Help?

- Check the [README.md](./README.md) for more information
- Open an issue on [GitHub](https://github.com/yourusername/inscribeai/issues)
- Review error messages in terminal output

---

**Happy coding! 🎉**

