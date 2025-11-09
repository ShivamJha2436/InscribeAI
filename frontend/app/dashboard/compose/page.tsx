"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contentAPI, brandAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ComposePage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [brandToneID, setBrandToneID] = useState("");
  const [brandTones, setBrandTones] = useState<any[]>([]);
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBrandTones();
  }, []);

  const loadBrandTones = async () => {
    try {
      const response = await brandAPI.list();
      setBrandTones(response.brand_tones || []);
    } catch (error) {
      console.error("Failed to load brand tones:", error);
    }
  };

  const handleCompose = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await contentAPI.compose(
        prompt,
        contentType,
        brandToneID || undefined
      );
      setGeneratedContent(response.content);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to generate content");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent.trim()) {
      setError("No content to save");
      return;
    }

    try {
      const content = await contentAPI.create(
        `Generated ${contentType}`,
        contentType,
        brandToneID || undefined
      );
      await contentAPI.update(content.content.id, content.content.title, generatedContent);
      router.push(`/dashboard/content/${content.content.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to save content");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">AI Compose</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="contentType">Content Type</Label>
            <select
              id="contentType"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="email">Email</option>
              <option value="blog">Blog Post</option>
              <option value="doc">Document</option>
            </select>
          </div>

          <div>
            <Label htmlFor="brandTone">Brand Tone (Optional)</Label>
            <select
              id="brandTone"
              value={brandToneID}
              onChange={(e) => setBrandToneID(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="">None</option>
              {brandTones.map((tone) => (
                <option key={tone.id} value={tone.id}>
                  {tone.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="prompt">What would you like to write about?</Label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="Describe what you want to write..."
            />
          </div>

          <Button
            onClick={handleCompose}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Generating..." : "Generate Content"}
          </Button>
        </div>
      </div>

      {generatedContent && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Generated Content</h2>
            <Button onClick={handleSave} variant="outline">
              Save
            </Button>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{generatedContent}</p>
          </div>
        </div>
      )}
    </div>
  );
}

