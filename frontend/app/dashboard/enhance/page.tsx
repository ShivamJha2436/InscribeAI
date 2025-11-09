"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { contentAPI, brandAPI } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function EnhancePage() {
  const router = useRouter();
  const [originalContent, setOriginalContent] = useState("");
  const [enhancedContent, setEnhancedContent] = useState("");
  const [brandToneID, setBrandToneID] = useState("");
  const [brandTones, setBrandTones] = useState<any[]>([]);
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

  const handleEnhance = async () => {
    if (!originalContent.trim()) {
      setError("Please enter content to enhance");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await contentAPI.enhance(
        originalContent,
        brandToneID || undefined
      );
      setEnhancedContent(response.content);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to enhance content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">AI Enhance</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-4">
            <Label htmlFor="brandTone">Brand Tone (Optional)</Label>
            <select
              id="brandTone"
              value={brandToneID}
              onChange={(e) => setBrandToneID(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            >
              <option value="">None</option>
              {brandTones.map((tone) => (
                <option key={tone.id} value={tone.id}>
                  {tone.name}
                </option>
              ))}
            </select>
          </div>

          <Label htmlFor="original">Original Content</Label>
          <textarea
            id="original"
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            rows={20}
            className="w-full mt-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
            placeholder="Paste your content here..."
          />

          <Button
            onClick={handleEnhance}
            disabled={loading}
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700"
          >
            {loading ? "Enhancing..." : "Enhance Content"}
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <Label>Enhanced Content</Label>
          <div className="mt-2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 min-h-[500px]">
            {enhancedContent ? (
              <p className="whitespace-pre-wrap">{enhancedContent}</p>
            ) : (
              <p className="text-gray-400">Enhanced content will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

