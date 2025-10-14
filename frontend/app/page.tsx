"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-24 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Write faster. <span className="text-indigo-600">Sound smarter.</span> Stay on brand.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
            InscribeAI helps teams draft, edit, and polish content across emails, blogs, and docs
            using LLMs. Generate on-brand copy in seconds with human-level clarity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-lg text-lg font-semibold">
              Get Started Free
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg font-semibold">
              View Docs
            </Button>
          </div>
        </motion.div>

        {/* Subtle background gradient blob */}
        <div className="absolute -z-10 top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-300/20 dark:bg-indigo-800/20 blur-3xl rounded-full" />
      </section>

      {/* Problem / Solution Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Stop spending hours editing. Let AI handle the polish.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg mb-16">
          InscribeAI empowers content teams to produce professional, consistent writing faster than
          ever. No more rewrites, no more writer’s block — just focused creativity and clarity.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-12">
          {[
            {
              title: "AI-Powered Drafting",
              desc: "Turn bullet points into fully-fleshed articles, blog posts, or emails that sound human and stay on-brand.",
              icon: "🧠",
            },
            {
              title: "Smart Tone Matching",
              desc: "Customize your brand voice. From casual to formal, InscribeAI adapts instantly to your communication style.",
              icon: "🎯",
            },
            {
              title: "Real-Time Collaboration",
              desc: "Collaborate with your team in real time, share drafts, and edit together — just like Google Docs, but smarter.",
              icon: "🤝",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-indigo-50 dark:bg-gray-900 py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            How InscribeAI Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-16 text-lg">
            A simple 3-step workflow that transforms how you and your team write content every day.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Capture your ideas",
                desc: "Start with a note, topic, or rough idea — InscribeAI takes it from there.",
              },
              {
                step: "2",
                title: "Refine with AI",
                desc: "Ask InscribeAI to summarize, rephrase, or expand your writing instantly.",
              },
              {
                step: "3",
                title: "Publish anywhere",
                desc: "Copy your polished content directly into emails, blogs, or documents.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="text-6xl font-bold text-indigo-600 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto text-center py-28 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-3xl py-16 px-10 shadow-xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Writing Smarter with InscribeAI
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Empower your team to write 10x faster, with clarity and consistency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold px-8 py-6">
              Get Started Free
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6">
              Book a Demo
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
