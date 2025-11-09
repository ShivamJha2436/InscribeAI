"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { contentAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContentPage() {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [contentText, setContentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      loadContent(params.id as string);
    }
  }, [params.id]);

  const loadContent = async (id: string) => {
    try {
      const response = await contentAPI.get(id);
      setContent(response.content);
      setTitle(response.content.title);
      setContentText(response.content.content || "");
    } catch (error) {
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!params.id) return;

    setSaving(true);
    setError("");

    try {
      await contentAPI.update(params.id as string, title, contentText);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!params.id) return;
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      await contentAPI.delete(params.id as string);
      router.push("/dashboard/history");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to delete content");
    }
  };

  if (loading) {
    return <p className="text-gray-600 dark:text-gray-400">Loading...</p>;
  }

  if (!content) {
    return <p className="text-gray-600 dark:text-gray-400">Content not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Edit Content</h1>
        <div className="flex gap-2">
          <Button onClick={handleSave} disabled={saving} variant="outline">
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button onClick={handleDelete} variant="outline">
            Delete
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="content">Content</Label>
          <textarea
            id="content"
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            rows={20}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
          />
        </div>
      </div>
    </div>
  );
}

