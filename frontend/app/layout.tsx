// app/layout.tsx
import "./globals.css";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export const metadata = {
  title: "InscribeAI - AI-Powered Writing Assistant",
  description:
    "Write smarter, summarize faster, and organize your thoughts with AI.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-gray-950 transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
