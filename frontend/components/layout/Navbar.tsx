"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SearchBar } from "../common/SearchBar";
import { ThemeToggle } from "../common/ThemeToggle";
import { useAuthStore } from "@/lib/store/auth";

export default function Navbar() {
  const router = useRouter();
  const clear = useAuthStore((s) => s.clear);

  function handleLogout() {
    clear();
    router.push("/auth/login");
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-white/70 dark:bg-black/30 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link href="/dashboard" className="text-sm font-semibold hover:opacity-80 flex items-center gap-2">
          <img src="/inscribe-ai-logo.png" alt="InscribeAI" className="h-6 w-6 rounded" />
          InscribeAI
        </Link>
        <nav className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:opacity-80">Docs</Link>
        </nav>
        <div className="flex-1"><SearchBar /></div>
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="px-3 h-9 inline-flex items-center rounded-full border border-input text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
