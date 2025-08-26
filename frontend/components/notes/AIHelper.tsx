"use client";
import { useState } from "react";

export default function AIHelper({ noteContent }: { noteContent: string }) {
  const [summary, setSummary] = useState("AI summary will appear here...");
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="w-64 p-4 border rounded bg-gray-50 flex flex-col gap-2">
      <h2 className="font-bold">AI Tools</h2>
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded"
        onClick={() => setSummary("This is a mock AI summary.")}
      >
        Summarize
      </button>
      <button
        className="px-3 py-1 bg-green-500 text-white rounded"
        onClick={() => setTags(["AI", "Mock"])}
      >
        Suggest Tags
      </button>

      <div className="mt-2">
        <h3 className="font-semibold">Summary:</h3>
        <p>{summary}</p>
      </div>
      <div>
        <h3 className="font-semibold">Tags:</h3>
        <div className="flex gap-1 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-300 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
