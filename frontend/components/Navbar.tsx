// components/Navbar.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle"

/**
 * Navbar Component
 * ----------------
 * Modern responsive navbar with logo, links, theme toggle, and auth buttons.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">I</span>
          </div>
          <span className="font-bold text-xl text-gray-800 dark:text-gray-100">
            InscribeAI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition text-gray-700 dark:text-gray-300">
            Features
          </Link>
          <Link href="/docs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition text-gray-700 dark:text-gray-300">
            Docs
          </Link>

          <ThemeToggle />

          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <Link href="/#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition text-gray-700 dark:text-gray-300">
            Features
          </Link>
          <Link href="/docs" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition text-gray-700 dark:text-gray-300">
            Docs
          </Link>
          <ThemeToggle />
          <div className="flex gap-3 mt-3">
            <Link href="/auth/login" className="w-full">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/auth/register" className="w-full">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
