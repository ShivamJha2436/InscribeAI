"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DocsPage() {
  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      content: [
        {
          heading: "Quick Start",
          text: "Get InscribeAI up and running in minutes. Follow our step-by-step guide to set up your database, configure the backend, and start the frontend.",
        },
        {
          heading: "Prerequisites",
          text: "You'll need Go 1.22+, Node.js 20+, and a PostgreSQL database. We support both cloud and local PostgreSQL setups.",
        },
        {
          heading: "Installation",
          text: "Clone the repository, install dependencies, configure your environment variables, and you're ready to go!",
        },
      ],
    },
    {
      id: "features",
      title: "Features",
      content: [
        {
          heading: "AI Compose",
          text: "Generate new content from scratch using AI. Simply provide a prompt, select your content type (email, blog, doc), and optionally apply a brand tone. The AI will generate professional, on-brand content in seconds.",
        },
        {
          heading: "AI Enhance",
          text: "Improve existing content while maintaining your voice. Paste your content, select a brand tone if desired, and let AI enhance clarity, grammar, and style without losing your unique voice.",
        },
        {
          heading: "Brand Tone Customization",
          text: "Create custom brand tones that define your writing style. Set formality level, tone, and specific guidelines. Apply these tones to all your content generation for consistent brand voice.",
        },
        {
          heading: "Content History",
          text: "All your generated content is automatically saved. View your complete history, search through past content, and easily access previous work.",
        },
        {
          heading: "Team Collaboration",
          text: "Create teams, invite members, and collaborate on content. Share drafts, leave comments, and work together seamlessly. Perfect for marketing teams, content creators, and businesses.",
        },
      ],
    },
    {
      id: "api",
      title: "API Reference",
      content: [
        {
          heading: "Authentication",
          text: "All API endpoints (except /api/auth/*) require JWT authentication. Include the token in the Authorization header: 'Bearer <your-token>'.",
        },
        {
          heading: "Content Endpoints",
          text: "POST /api/content/compose - Generate new content\nPOST /api/content/enhance - Enhance existing content\nGET /api/content - List all content\nGET /api/content/:id - Get specific content",
        },
        {
          heading: "Brand Tone Endpoints",
          text: "POST /api/brand - Create brand tone\nGET /api/brand - List brand tones\nPUT /api/brand/:id - Update brand tone\nDELETE /api/brand/:id - Delete brand tone",
        },
        {
          heading: "Collaboration Endpoints",
          text: "POST /api/collaboration/teams - Create team\nGET /api/collaboration/teams - Get user teams\nPOST /api/collaboration/share - Share content\nPOST /api/collaboration/comment - Add comment",
        },
      ],
    },
    {
      id: "database",
      title: "Database Setup",
      content: [
        {
          heading: "PostgreSQL Setup",
          text: "InscribeAI uses PostgreSQL for data storage. You can use cloud providers like Neon or Supabase (free tiers available), or set up a local PostgreSQL instance.",
        },
        {
          heading: "Connection String",
          text: "Format: postgres://username:password@host:port/database?sslmode=require\nFor cloud databases, use sslmode=require. For local, use sslmode=disable.",
        },
        {
          heading: "Auto-Migration",
          text: "The backend automatically creates all necessary tables on first run. No manual database setup required!",
        },
      ],
    },
    {
      id: "deployment",
      title: "Deployment",
      content: [
        {
          heading: "Backend Deployment",
          text: "Deploy to Railway, Render, Fly.io, or any Go-compatible platform. Set environment variables, build with 'go build', and run the binary.",
        },
        {
          heading: "Frontend Deployment",
          text: "Deploy to Vercel (recommended), Netlify, or any static hosting. Set NEXT_PUBLIC_API_URL to your backend URL.",
        },
        {
          heading: "Database",
          text: "Use managed PostgreSQL services in production. Enable SSL, set up backups, and configure monitoring.",
        },
        {
          heading: "Security",
          text: "Change JWT_SECRET to a strong random string. Use HTTPS, enable CORS properly, and implement rate limiting.",
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      content: [
        {
          heading: "Database Connection Failed",
          text: "Check your DATABASE_URL format, verify credentials, ensure database is running, and check SSL mode settings.",
        },
        {
          heading: "Backend Won't Start",
          text: "Verify all dependencies are installed (go mod tidy), check port availability, and review environment variables.",
        },
        {
          heading: "Frontend Can't Connect",
          text: "Ensure backend is running, check NEXT_PUBLIC_API_URL, verify CORS settings, and check browser console for errors.",
        },
        {
          heading: "Authentication Issues",
          text: "Verify JWT_SECRET is set, check token expiration, ensure Authorization header format is correct, and verify user exists in database.",
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about InscribeAI
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Documentation Sections */}
        <div className="space-y-16">
          {sections.map((section, sectionIdx) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
              viewport={{ once: true }}
              className="scroll-mt-20"
            >
              <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.content.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-xl font-semibold mb-3">
                      {item.heading}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Set up your PostgreSQL database and start creating amazing content with InscribeAI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/auth/register">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-8 py-6">
                Get Started Free
              </Button>
            </Link>
            <Link href="/#features">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6"
              >
                View Features
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

