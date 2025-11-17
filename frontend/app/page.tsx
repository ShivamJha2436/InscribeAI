"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 scroll-smooth">
      <Navbar />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-32 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            Write smarter.{" "}
            <span className="text-indigo-600 dark:text-indigo-500">
              Sound smarter.
            </span>{" "}
            Stay on brand.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            InscribeAI helps teams draft, edit, and polish content across
            emails, blogs, and docs using LLM&apos;s. Generate on-brand copy in
            seconds with human-level clarity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => router.push("/auth/register")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-lg text-lg font-semibold"
            >
              Get Started Free
            </Button>
            <Button
              onClick={() => router.push("/auth/login")}
              variant="outline"
              className="px-8 py-6 text-lg font-semibold border-indigo-300 hover:bg-indigo-50"
            >
              Sign In
            </Button>
          </div>
        </motion.div>

        <div className="absolute -z-10 top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-indigo-400/30 to-indigo-200/10 dark:from-indigo-700/40 dark:to-indigo-900/10 blur-3xl rounded-full" />
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stop spending hours editing. <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              Let AI handle the polish.
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to create, enhance, and collaborate on content that stays true to your brand.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "AI Compose",
              desc: "Turn ideas into fully-fleshed articles, blog posts, or emails that sound human and stay on-brand.",
              icon: "✍️",
              features: ["Multiple content types", "Brand tone integration", "One-click generation", "Save & edit"],
            },
            {
              title: "AI Enhance",
              desc: "Improve existing content with AI-powered rewriting and enhancement while maintaining your voice.",
              icon: "✨",
              features: ["Tone preservation", "Grammar & style fixes", "Clarity improvements", "Side-by-side comparison"],
            },
            {
              title: "Team Collaboration",
              desc: "Collaborate with your team in real time. Share drafts, leave feedback, and edit together seamlessly.",
              icon: "🤝",
              features: ["Team workspaces", "Content sharing", "Comments & feedback", "Role-based access"],
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{f.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{f.desc}</p>
              <ul className="space-y-2 text-left">
                {f.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Brand Tone Customization",
              desc: "Create and save custom brand voices that match your style.",
              icon: "🎯",
            },
            {
              title: "Content History",
              desc: "Track all your generated content with full version history.",
              icon: "📚",
            },
            {
              title: "Smart Caching",
              desc: "Lightning-fast responses with intelligent caching.",
              icon: "⚡",
            },
            {
              title: "Secure & Private",
              desc: "JWT authentication and encrypted data storage.",
              icon: "🔒",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h4 className="font-semibold mb-2">{f.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-3xl my-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Perfect for Every Team
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Whether you're a startup or enterprise, InscribeAI adapts to your needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Marketing Teams",
              desc: "Create consistent marketing copy across all channels. Maintain brand voice in emails, blogs, and social media.",
              examples: ["Email campaigns", "Blog posts", "Social media content", "Press releases"],
            },
            {
              title: "Content Creators",
              desc: "Speed up your content creation process. Generate drafts, enhance existing content, and maintain your unique style.",
              examples: ["Article drafts", "Content rewriting", "SEO optimization", "Style consistency"],
            },
            {
              title: "Business Teams",
              desc: "Ensure professional communication across departments. Create polished documents, proposals, and internal communications.",
              examples: ["Business proposals", "Internal docs", "Client communications", "Reports"],
            },
          ].map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{useCase.desc}</p>
              <ul className="space-y-2">
                {useCase.examples.map((example, idx) => (
                  <li key={idx} className="text-sm text-gray-500 dark:text-gray-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                    {example}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
