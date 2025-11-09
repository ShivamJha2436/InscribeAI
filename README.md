# InscribeAI 📝🤖

<div align="center">

**AI Writing Copilot for Teams**

*Write smarter. Sound smarter. Stay on brand.*

[![Go Version](https://img.shields.io/badge/Go-1.22+-00ADD8?style=for-the-badge&logo=go)](https://go.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-316192?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 🎯 What is InscribeAI?

InscribeAI is a powerful AI writing copilot designed for teams. It helps you draft, edit, and polish content across emails, blogs, and documents using LLM's. Generate on-brand copy in seconds with human-level clarity.

### Key Benefits

- ⚡ **10x Faster Writing** - Generate professional content in seconds
- 🎯 **Brand Consistency** - Maintain your brand voice across all content
- 🤝 **Team Collaboration** - Share, comment, and collaborate seamlessly
- 🧠 **AI-Powered** - Leverage GPT4All for intelligent content generation
- 💾 **Full History** - Track and manage all your content

---

## ✨ Features

### Core Features

- **✍️ AI Compose** - Generate new content from prompts with AI assistance
- **✨ AI Enhance/Rewrite** - Improve existing content while maintaining your voice
- **🎯 Brand Tone Customization** - Create and apply custom brand tones
- **📚 Content History** - Track and manage all generated content
- **🤝 Team Collaboration** - Create teams, share content, and collaborate
- **⚙️ Settings** - Manage your profile and preferences
- **🌓 Dark Mode** - Beautiful dark mode support

### Technical Features

- **🔐 JWT Authentication** - Secure token-based authentication
- **💾 PostgreSQL Database** - Robust data persistence
- **⚡ In-Memory Caching** - Fast response times with intelligent caching
- **🎨 Modern UI** - Beautiful, responsive design with Tailwind CSS
- **📱 Mobile Responsive** - Works seamlessly on all devices

---

## 🚀 Quick Start

### Prerequisites

- **Go** 1.22+ ([Download](https://go.dev/dl/))
- **Node.js** 20+ and npm/pnpm ([Download](https://nodejs.org/))
- **PostgreSQL** database (local or cloud)
- **Python** 3.8+ (optional, for GPT4All service)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/inscribeai.git
cd inscribeai
```

### 2️⃣ Set Up PostgreSQL Database

Choose one of these options:

#### Option A: Cloud Database (Recommended for beginners)

**Neon (Free Tier)**
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy your connection string

**Supabase (Free Tier)**
1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Go to Settings > Database and copy connection string

#### Option B: Local PostgreSQL

```bash
# Install PostgreSQL (if not installed)
# macOS: brew install postgresql
# Ubuntu: sudo apt install postgresql

# Create database
createdb inscribeai
```

### 3️⃣ Backend Setup

```bash
cd backend

# Copy environment file
cp env.example .env

# Edit .env file with your database URL
nano .env  # or use your preferred editor
```

**Required `.env` variables:**
```env
DATABASE_URL=postgres://user:password@host:5432/dbname?sslmode=require
JWT_SECRET=your-super-secret-jwt-key-change-in-production
GPT4ALL_PYTHON_SERVICE_URL=http://localhost:8000
PORT=8080
ENVIRONMENT=development
```

```bash
# Install Go dependencies
go mod tidy

# Run the backend
go run main.go
```

✅ Backend is now running on `http://localhost:8080`

### 4️⃣ Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
# or
pnpm install

# (Optional) Create .env.local for custom API URL
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local

# Run the development server
npm run dev
# or
pnpm dev
```

✅ Frontend is now running on `http://localhost:3000`

### 5️⃣ (Optional) GPT4All Service

```bash
cd python/llm

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the service
python main.py
```

✅ GPT4All service is now running on `http://localhost:8000`

**Note:** Without GPT4All service, the backend will return mock responses. Install and configure it for full AI functionality.

---

## 📖 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup instructions
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - Architecture and implementation details

---

## 🏗️ Project Structure

```
InscribeAI/
├── backend/              # Go backend
│   ├── api/             # API routes and handlers
│   ├── db/              # Database connection
│   ├── models/          # Database models
│   ├── services/        # Business logic
│   └── main.go          # Entry point
│
├── frontend/            # Next.js frontend
│   ├── app/             # Next.js app router
│   ├── components/      # React components
│   └── lib/             # Utilities and API client
│
└── python/              # GPT4All service
    └── llm/
        └── main.py      # Flask service
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Content
- `POST /api/content/compose` - Generate new content
- `POST /api/content/enhance` - Enhance existing content
- `GET /api/content` - List all content
- `GET /api/content/:id` - Get specific content
- `POST /api/content` - Create new content
- `PUT /api/content/:id` - Update content
- `DELETE /api/content/:id` - Delete content

### Brand Tone
- `POST /api/brand` - Create brand tone
- `GET /api/brand` - List brand tones
- `GET /api/brand/:id` - Get brand tone
- `PUT /api/brand/:id` - Update brand tone
- `DELETE /api/brand/:id` - Delete brand tone

### Collaboration
- `POST /api/collaboration/share` - Share content
- `POST /api/collaboration/comment` - Add comment
- `GET /api/collaboration/content/:id` - Get collaborations
- `POST /api/collaboration/teams` - Create team
- `GET /api/collaboration/teams` - Get user teams

### History & Settings
- `GET /api/history` - Get content history
- `GET /api/settings` - Get user settings
- `PUT /api/settings` - Update settings

---

## 🛠️ Tech Stack

### Backend
- **Go** 1.22+ - Programming language
- **Gin** - Web framework
- **GORM** - ORM for database operations
- **PostgreSQL** - Database
- **JWT** - Authentication
- **GPT4All** - Local LLM integration

### Frontend
- **Next.js** 15.5 - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client
- **Framer Motion** - Animations

---

## 🧪 Development

### Running in Development Mode

1. Start PostgreSQL database
2. Start backend: `cd backend && go run main.go`
3. Start frontend: `cd frontend && npm run dev`
4. (Optional) Start GPT4All: `cd python/llm && python main.py`

### Building for Production

**Backend:**
```bash
cd backend
go build -o inscribeai main.go
./inscribeai
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

---

## 🚢 Deployment

### Backend Deployment

Deploy to platforms like:
- [Railway](https://railway.app)
- [Render](https://render.com)
- [Fly.io](https://fly.io)
- AWS/GCP/Azure

Set environment variables in your deployment platform.

### Frontend Deployment

Deploy to:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- Any static hosting

Set `NEXT_PUBLIC_API_URL` to your backend URL.

---

## 🔒 Security

⚠️ **Important for Production:**

- Change `JWT_SECRET` to a strong random string
- Use HTTPS in production
- Implement rate limiting
- Add input validation
- Set proper CORS origins
- Use environment variables for secrets
- Enable database SSL connections

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [GPT4All](https://gpt4all.io) for local LLM support
- [Next.js](https://nextjs.org) for the amazing framework
- [Gin](https://gin-gonic.com) for the Go web framework
- All contributors and users of InscribeAI

---

## 📧 Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/yourusername/inscribeai/issues)
- Check the [Documentation](./SETUP.md)

---

<div align="center">

**Made with ❤️ by the InscribeAI team**

[⭐ Star us on GitHub](https://github.com/yourusername/inscribeai) • [📖 Read the Docs](./SETUP.md) • [🐛 Report Bug](https://github.com/yourusername/inscribeai/issues)

</div>
