"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className={`bg-white border-r p-4 flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && <h1 className="text-xl font-bold">InscribeAI</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 bg-gray-200 rounded"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="hover:bg-gray-100 p-2 rounded">
          Dashboard
        </Link>
        <Link href="/dashboard/notes" className="hover:bg-gray-100 p-2 rounded">
          Notes
        </Link>
        <Link href="/dashboard/settings" className="hover:bg-gray-100 p-2 rounded">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
