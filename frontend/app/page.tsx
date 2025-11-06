"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 scroll-smooth">
      {/* Navbar */}
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
            Write faster.{" "}
            <span className="text-indigo-600 dark:text-indigo-500">
              Sound smarter.
            </span>{" "}
            Stay on brand.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
            InscribeAI helps teams draft, edit, and polish content across
            emails, blogs, and docs using AI. Generate on-brand copy in
            seconds with human-level clarity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-lg text-lg font-semibold">
              Get Started Free
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg font-semibold border-indigo-300 hover:bg-indigo-50"
            >
              View Docs
            </Button>
          </div>
        </motion.div>

        {/* Glowing gradient blob background */}
        <div className="absolute -z-10 top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-indigo-400/30 to-indigo-200/10 dark:from-indigo-700/40 dark:to-indigo-900/10 blur-3xl rounded-full" />
      </section>

      {/* Problem / Solution Section */}
      <section className="max-w-6xl mx-auto px-6 py-28 text-center">
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

        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg mb-20">
          InscribeAI empowers content teams to produce professional,
          consistent writing faster than ever. No more rewrites, no more
          writer’s block — just focused creativity and clarity.
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
              desc: "Customize your brand voice — from casual to formal — InscribeAI instantly adapts to your communication style.",
              icon: "🎯",
            },
            {
              title: "Real-Time Collaboration",
              desc: "Collaborate with your team in real time. Share drafts, leave feedback, and edit together seamlessly.",
              icon: "🤝",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New Feature Highlight Section (Alternating layout) */}
      <section className="bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 py-32">
        <div className="max-w-6xl mx-auto px-6 space-y-24">
          {[
            {
              title: "Collaborate. Edit. Publish — All in one place.",
              desc: "With InscribeAI, your team can co-create documents, refine tone, and publish directly to your content platform. The perfect harmony between humans and AI.",
              img: "/illustration1.svg",
              reverse: false,
            },
            {
              title: "Stay Consistent Across Every Channel.",
              desc: "Maintain a unified brand tone across emails, blogs, and internal docs. InscribeAI learns your brand style and ensures every piece feels ‘you’.",
              img: "/illustration2.svg",
              reverse: true,
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-16 ${
                s.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">
                  {s.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                  {s.desc}
                </p>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-5 rounded-lg">
                  Learn More
                </Button>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full h-72 bg-indigo-200/40 dark:bg-indigo-900/40 rounded-2xl flex items-center justify-center">
                  <span className="text-7xl">📝</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials / Why Teams Love Us */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">
        <h2 className="text-4xl font-bold mb-8">
          Why Teams Love{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            InscribeAI
          </span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-16 max-w-3xl mx-auto text-lg">
          From startups to enterprises, teams rely on InscribeAI to maintain
          consistent brand tone and ship polished content faster than ever.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote:
                "InscribeAI saves our team hours every week. Our content now sounds cohesive across departments.",
              name: "Sarah M.",
              role: "Head of Marketing, Lumina",
            },
            {
              quote:
                "It's like having an AI editor who knows our brand voice better than we do.",
              name: "James R.",
              role: "Content Strategist, Flowbyte",
            },
            {
              quote:
                "We draft blog posts in minutes, not hours. The tone-matching feature is game-changing.",
              name: "Alicia P.",
              role: "Founder, TypeHaus",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
            >
              <p className="italic text-gray-700 dark:text-gray-300 mb-6">
                “{t.quote}”
              </p>
              <h4 className="font-semibold text-indigo-600">{t.name}</h4>
              <p className="text-sm text-gray-500">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto text-center py-32 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-3xl py-20 px-10 shadow-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Writing Smarter with InscribeAI
          </h2>
          <p className="text-indigo-100 mb-10 text-lg">
            Empower your team to write 10x faster, with clarity and consistency.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-100 font-semibold px-8 py-6">
              Get Started Free
            </Button>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 px-8 py-6"
            >
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
