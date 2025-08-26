"use client";

import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search notes..."
      className="border p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
