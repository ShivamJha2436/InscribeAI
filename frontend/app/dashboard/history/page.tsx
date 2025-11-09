"use client";

import { useState, useEffect } from "react";
import { historyAPI } from "@/lib/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await historyAPI.get(50, offset);
      setHistory(response.history || []);
      setHasMore((response.history || []).length === 50);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const newOffset = offset + 50;
    try {
      const response = await historyAPI.get(50, newOffset);
      setHistory([...history, ...(response.history || [])]);
      setHasMore((response.history || []).length === 50);
      setOffset(newOffset);
    } catch (error) {
      console.error("Failed to load more:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Content History</h1>

      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      ) : history.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No content history yet.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {history.map((item) => (
              <Link
                key={item.id}
                href={`/dashboard/content/${item.id}`}
                className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {item.content_type || "Document"} •{" "}
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 line-clamp-2">
                      {item.content?.substring(0, 200)}...
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="mt-6 text-center">
              <Button onClick={loadMore} variant="outline">
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

