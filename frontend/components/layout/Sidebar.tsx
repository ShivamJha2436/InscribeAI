"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside className={`border-r bg-sidebar text-sidebar-foreground p-3 flex flex-col gap-2 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}>
      <div className="flex items-center justify-between mb-2">
        {!collapsed && <span className="text-sm font-semibold">InscribeAI</span>}
        <button onClick={() => setCollapsed(!collapsed)} className="h-7 w-7 rounded hover:bg-sidebar-accent grid place-items-center" aria-label="Toggle sidebar">
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav className="flex flex-col">
        <SidebarLink href="/dashboard" label="Dashboard" collapsed={collapsed} />
        <SidebarLink href="/dashboard/notes" label="Notes" collapsed={collapsed} />
        <SidebarLink href="/dashboard/notes/new" label="New Note" collapsed={collapsed} />
        <SidebarLink href="/dashboard/settings" label="Settings" collapsed={collapsed} />
      </nav>
    </aside>
  );
}

function SidebarLink({ href, label, collapsed }: { href: string; label: string; collapsed: boolean }) {
  return (
    <Link
      href={href}
      className="px-2 py-2 rounded text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
    >
      {collapsed ? label.charAt(0) : label}
    </Link>
  );
}
