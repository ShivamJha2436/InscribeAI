// app/layout.tsx
import "./globals.css";

import { ReactNode } from "react";

export const metadata = {
  title: "InscribeAI - AI-Powered Writing Assistant",
  description: "Write, organize, and think better with AI-powered tools.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}
