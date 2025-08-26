"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const tagArray = tags.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0);
      
      const res = await fetch("http://localhost:8080/api/notes", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          tags: tagArray,
        }),
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create note");
      }

      router.push("/dashboard/notes");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Create new note</h1>
          <p className="text-sm text-muted-foreground">Write your thoughts down</p>
        </div>
        <button
          onClick={() => router.back()}
          className="h-9 inline-flex items-center rounded-full border border-input px-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Note title"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="Start writing your note..."
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="tags" className="text-sm font-medium">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="work, ideas, todo"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className="h-10 px-6 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create note"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="h-10 px-6 border border-input text-sm font-medium rounded-md hover:bg-black/5 dark:hover:bg-white/10"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
