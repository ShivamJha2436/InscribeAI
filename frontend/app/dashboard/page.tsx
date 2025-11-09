"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { contentAPI } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [recentContent, setRecentContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentContent();
  }, []);

  const loadRecentContent = async () => {
    try {
      const response = await contentAPI.list(5, 0);
      setRecentContent(response.contents || []);
    } catch (error) {
      console.error("Failed to load content:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Start creating amazing content.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link href="/dashboard/compose">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">AI Compose</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Generate new content from scratch
            </p>
          </div>
        </Link>

        <Link href="/dashboard/enhance">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">AI Enhance</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Improve and rewrite existing content
            </p>
          </div>
        </Link>

        <Link href="/dashboard/brand">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Brand Tone</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Customize your brand voice
            </p>
          </div>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Recent Content</h2>
          <Link href="/dashboard/history">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        ) : recentContent.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">
            No content yet. Start by creating something new!
          </p>
        ) : (
          <div className="space-y-4">
            {recentContent.map((content) => (
              <Link
                key={content.id}
                href={`/dashboard/content/${content.id}`}
                className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <h3 className="font-semibold mb-1">{content.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {content.content_type || "Document"} • {new Date(content.created_at).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

