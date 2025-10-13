"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const parsed = LoginSchema.safeParse({ email, password });
      if (!parsed.success) {
        const first = parsed.error.errors[0]?.message || "Invalid input";
        throw new Error(first);
      }
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-0px)] grid place-items-center px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500" />
          <h1 className="mt-3 text-xl font-semibold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account</p>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-10 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@company.com"/>
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="h-10 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="••••••••"/>
          </div>
          <button disabled={loading} type="submit" className="mt-2 h-10 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Don’t have an account? <a href="/auth/register" className="underline underline-offset-4 hover:no-underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

