// app/page.tsx
import Navbar from "@/components/Navbar";

/**
 * Landing Page
 * -------------
 * This page serves as the public-facing homepage for InscribeAI.
 * It includes a hero section introducing the product.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-20 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Write Smarter with <span className="text-indigo-600">InscribeAI</span>
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-8">
          Empower your writing with intelligent suggestions, seamless note-taking,
          and AI-powered summaries — all in one platform.
        </p>

        <div className="flex gap-4">
          <a
            href="#get-started"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
          >
            Get Started
          </a>
          <a
            href="/docs"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition"
          >
            Read Docs
          </a>
        </div>

        {/* Optional: small gradient line */}
        <div className="w-24 h-1 bg-indigo-600 rounded-full mt-10" />
      </section>

      {/* Footer */}
      <footer className="mt-32 text-center text-gray-500 text-sm py-6 border-t">
        © {new Date().getFullYear()} InscribeAI. All rights reserved.
      </footer>
    </main>
  );
}
