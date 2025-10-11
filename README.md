# InscribeAI 📝🤖

**InscribeAI** is a lightweight, fast, and fully free smart note-taking application powered by AI.  
It allows you to create, organize, search, and summarize your notes effortlessly using integrated AI models—all while staying performant and easy to use.

---

## Features

- 🗒 **Smart Notes**: Create and manage notes with ease.  
- 🤖 **AI Summarization**: Automatically summarize your notes using local or cloud-based open-source LLMs.  
- 🏷 **Tagging & Search**: Organize notes with AI-generated tags and search quickly using a lightweight full-text engine.  
- ⚡ **Fast & Lightweight**: Built with Go for the backend and Next.js for the frontend.  
- 💾 **Offline-Friendly**: Notes stored locally in SQLite, enabling offline access and quick loading.  
- 💻 **Free & Open-Source**: No paid APIs required. Fully functional using free tools and models.  

---

## Tech Stack

- **Backend**: Go, SQLite / BadgerDB  
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS  
- **AI Integration**: GPT4All, MPT, or HuggingFace free LLM models  
- **Optional**: Local caching, in-memory or Redis for speed  

---

## Installation

### Prerequisites
- Go 1.22+  
- Node.js 20+ / npm 10+  
- SQLite (or let the app handle it automatically)  

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/inscribeai.git
cd inscribeai
```
2. **Backend Setup**
```bash
cd backend
go mod tidy
go run cmd/main.go
```
