// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * Navbar Component
 * ----------------
 * A clean, minimal navbar with the InscribeAI logo and a "Docs" link.
 */
export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 shadow-sm bg-white/70 backdrop-blur-md sticky top-0 z-50">
      {/* Left: Logo and name */}
      <div className="flex items-center space-x-2">
        <Image
          src="/inscribeai-logo.png"
          alt="InscribeAI Logo"
          width={40}
          height={40}
        />
        <h1 className="font-bold text-xl text-gray-800">InscribeAI</h1>
      </div>

      {/* Right: Docs Link */}
      <div className="flex items-center space-x-6">
        <Link
          href="/docs"
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Docs
        </Link>

        {/* Optional: CTA button */}
        <Link
          href="#get-started"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
