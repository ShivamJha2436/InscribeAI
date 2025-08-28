"use client";

import { useState } from "react";

interface AIHelperProps {
  noteContent: string;
  onSummaryGenerated?: (summary: string) => void;
  onTagsSuggested?: (tags: string[]) => void;
  onContentEnhanced?: (enhanced: string) => void;
}

export default function AIHelper({ 
  noteContent, 
  onSummaryGenerated, 
  onTagsSuggested, 
  onContentEnhanced 
}: AIHelperProps) {
  const [summary, setSummary] = useState("AI summary will appear here...");
  const [tags, setTags] = useState<string[]>([]);
  const [enhancedContent, setEnhancedContent] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  async function callAI(endpoint: string, data: any, setter: (value: any) => void) {
    if (!token) {
      setError("Please login to use AI features");
      return;
    }

    setLoading(endpoint);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8080/api/ai/${endpoint}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "AI request failed");
      }

      const result = await res.json();
      setter(endpoint === "suggest-tags" ? result.tags : result[endpoint]);
      
      // Call callbacks if provided
      if (endpoint === "summarize" && onSummaryGenerated) {
        onSummaryGenerated(result.summary);
      } else if (endpoint === "suggest-tags" && onTagsSuggested) {
        onTagsSuggested(result.tags);
      } else if (endpoint === "enhance" && onContentEnhanced) {
        onContentEnhanced(result.enhanced);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(null);
    }
  }

  const handleSummarize = () => callAI("summarize", { content: noteContent }, setSummary);
  const handleSuggestTags = () => callAI("suggest-tags", { content: noteContent }, setTags);
  const handleEnhance = () => callAI("enhance", { content: noteContent }, setEnhancedContent);
  const handleGenerate = () => callAI("generate", { bullets: noteContent }, setGeneratedContent);

  return (
    <div className="w-80 p-4 border rounded bg-gray-50 dark:bg-gray-800 flex flex-col gap-4">
      <h2 className="font-bold text-lg">AI Assistant</h2>
      
      {error && (
        <div className="p-3 bg-red-100 border border-red-300 rounded text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-3">
        <button
          className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-60"
          onClick={handleSummarize}
          disabled={loading === "summarize" || !noteContent.trim()}
        >
          {loading === "summarize" ? "Generating..." : "📝 Summarize"}
        </button>

        <button
          className="w-full px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-60"
          onClick={handleSuggestTags}
          disabled={loading === "suggest-tags" || !noteContent.trim()}
        >
          {loading === "suggest-tags" ? "Thinking..." : "🏷️ Suggest Tags"}
        </button>

        <button
          className="w-full px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-60"
          onClick={handleEnhance}
          disabled={loading === "enhance" || !noteContent.trim()}
        >
          {loading === "enhance" ? "Enhancing..." : "✨ Enhance Content"}
        </button>

        <button
          className="w-full px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-60"
          onClick={handleGenerate}
          disabled={loading === "generate" || !noteContent.trim()}
        >
          {loading === "generate" ? "Generating..." : "🚀 Generate from Bullets"}
        </button>
      </div>

      <div className="space-y-4">
        {summary && (
          <div>
            <h3 className="font-semibold text-sm mb-2">Summary:</h3>
            <p className="text-sm bg-white dark:bg-gray-700 p-2 rounded border">{summary}</p>
          </div>
        )}

        {tags.length > 0 && (
          <div>
            <h3 className="font-semibold text-sm mb-2">Suggested Tags:</h3>
            <div className="flex gap-1 flex-wrap">
              {tags.map((tag, index) => (
                <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {enhancedContent && (
          <div>
            <h3 className="font-semibold text-sm mb-2">Enhanced Content:</h3>
            <p className="text-sm bg-white dark:bg-gray-700 p-2 rounded border max-h-32 overflow-y-auto">
              {enhancedContent}
            </p>
          </div>
        )}

        {generatedContent && (
          <div>
            <h3 className="font-semibold text-sm mb-2">Generated Content:</h3>
            <p className="text-sm bg-white dark:bg-gray-700 p-2 rounded border max-h-32 overflow-y-auto">
              {generatedContent}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
