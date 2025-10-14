// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const handleChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4 text-yellow-500" />
      <Switch checked={theme === "dark"} onCheckedChange={handleChange} />
      <Moon className="h-4 w-4 text-indigo-500" />
    </div>
  );
}
