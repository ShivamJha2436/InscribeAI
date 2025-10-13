export default function DashboardIndex() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">Choose a use case to get started.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="/dashboard/compose" className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10">
          <div className="text-xl">✍️</div>
          <div className="mt-2 font-semibold">AI Compose</div>
          <div className="text-sm text-black/70 dark:text-white/70">Generate content from a prompt.</div>
        </a>
        <a href="/dashboard/enhance" className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10">
          <div className="text-xl">✨</div>
          <div className="mt-2 font-semibold">AI Enhance / Rewrite</div>
          <div className="text-sm text-black/70 dark:text-white/70">Improve clarity, tone, and conciseness.</div>
        </a>
        <a href="/dashboard/brand" className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10">
          <div className="text-xl">🧭</div>
          <div className="mt-2 font-semibold">Brand Tone Customization</div>
          <div className="text-sm text-black/70 dark:text-white/70">Maintain consistent brand voice.</div>
        </a>
        <a href="/dashboard/history" className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10">
          <div className="text-xl">📂</div>
          <div className="mt-2 font-semibold">Content History</div>
          <div className="text-sm text-black/70 dark:text-white/70">Revisit previous AI drafts.</div>
        </a>
        <a href="/dashboard/collaboration" className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10">
          <div className="text-xl">👥</div>
          <div className="mt-2 font-semibold">Team Collaboration</div>
          <div className="text-sm text-black/70 dark:text-white/70">Share, edit, and comment on drafts.</div>
        </a>
        <a href="/dashboard/settings" className="rounded-lg border border-black/10 dark:border-white/15 p-4 hover:bg-black/5 dark:hover:bg-white/10">
          <div className="text-xl">⚙️</div>
          <div className="mt-2 font-semibold">Settings</div>
          <div className="text-sm text-black/70 dark:text-white/70">Manage API keys, models, and tone.</div>
        </a>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NoteCard from "@/components/notes/NoteCard";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function DashboardHomePage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    fetchNotes(token);
  }, [router]);

  async function fetchNotes(token: string) {
    try {
      const res = await fetch("http://localhost:8080/api/notes", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/auth/login");
          return;
        }
        throw new Error("Failed to fetch notes");
      }

      const data = await res.json();
      setNotes(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load notes");
      setNotes([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Loading your notes...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 bg-white rounded shadow animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-red-600">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            {notes && notes.length === 0 ? "No notes yet" : `${notes?.length || 0} note${(notes?.length || 0) === 1 ? '' : 's'}`}
          </p>
        </div>
        <a href="/dashboard/notes" className="h-9 inline-flex items-center rounded-full border border-input px-3 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10">
          All notes
        </a>
      </div>

      {notes && notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Create your first note to get started!</p>
        </div>
      ) : (
        <section>
          <h2 className="text-sm font-semibold mb-3">Recent notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes?.slice(0, 6).map((note) => (
              <NoteCard key={note.id} note={{
                id: note.id,
                title: note.title,
                summary: note.content.length > 100 ? note.content.substring(0, 100) + "..." : note.content,
                tags: note.tags,
              }} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}


