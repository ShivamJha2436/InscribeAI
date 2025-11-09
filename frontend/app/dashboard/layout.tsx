"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { token, user, clear } = useAuthStore();

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

  if (!token) {
    return null;
  }

  const handleLogout = () => {
    clear();
    router.push("/");
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/compose", label: "Compose" },
    { href: "/dashboard/enhance", label: "Enhance" },
    { href: "/dashboard/brand", label: "Brand Tone" },
    { href: "/dashboard/history", label: "History" },
    { href: "/dashboard/collaboration", label: "Collaboration" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            InscribeAI
          </h1>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {user?.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
          >
            Logout
          </Button>
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

