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
      <section id="features" className="max-w-6xl mx-auto px-6 py-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-10"
        >
          Stop spending hours editing. <br />
          <span className="text-indigo-600 dark:text-indigo-400">
            Let AI handle the polish.
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {[
            {
              title: "AI Compose",
              desc: "Turn ideas into fully-fleshed articles, blog posts, or emails that sound human and stay on-brand.",
              icon: "✍️",
            },
            {
              title: "AI Enhance",
              desc: "Improve existing content with AI-powered rewriting and enhancement while maintaining your voice.",
              icon: "✨",
            },
            {
              title: "Team Collaboration",
              desc: "Collaborate with your team in real time. Share drafts, leave feedback, and edit together seamlessly.",
              icon: "🤝",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
