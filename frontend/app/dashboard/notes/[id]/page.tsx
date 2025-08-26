"use client";

import { useState } from "react";
import AIHelper from "@/components/notes/AIHelper";

export default function NoteEditorPage({ params }: { params: { id: string } }) {
  const [content, setContent] = useState("Start writing your note here...");

  return (
    <div className="flex gap-4">
      <textarea
        className="flex-1 p-4 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={20}
      />
      <AIHelper noteContent={content} />
    </div>
  );
}
