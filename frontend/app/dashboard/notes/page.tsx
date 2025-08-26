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

export default function NotesPage() {
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
      setNotes(data);
    } catch (err: any) {
      setError(err.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-xl font-bold">Notes</h1>
            <p className="text-sm text-muted-foreground">Loading your notes...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
            <h1 className="text-xl font-bold">Notes</h1>
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
          <h1 className="text-xl font-bold">Notes</h1>
          <p className="text-sm text-muted-foreground">
            {notes.length === 0 ? "No notes yet" : `${notes.length} note${notes.length === 1 ? '' : 's'}`}
          </p>
        </div>
        <button 
          onClick={() => router.push("/dashboard/notes/new")}
          className="h-9 inline-flex items-center rounded-full bg-indigo-600 text-white px-3 text-sm font-medium hover:bg-indigo-500"
        >
          Create note
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Create your first note to get started!</p>
          <button 
            onClick={() => router.push("/dashboard/notes/new")}
            className="h-10 inline-flex items-center rounded-full bg-indigo-600 text-white px-6 text-sm font-medium hover:bg-indigo-500"
          >
            Create note
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={{
              id: note.id,
              title: note.title,
              summary: note.content.length > 100 ? note.content.substring(0, 100) + "..." : note.content,
              tags: note.tags,
            }} />
          ))}
        </div>
      )}
    </div>
  );
}
