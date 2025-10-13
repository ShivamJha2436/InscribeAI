"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const parsed = RegisterSchema.safeParse({ name, email, password });
      if (!parsed.success) {
        const first = parsed.error.errors[0]?.message || "Invalid input";
        throw new Error(first);
      }
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
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
          <h1 className="mt-3 text-xl font-semibold tracking-tight">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Get started with InscribeAI</p>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" className="h-10 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Jane Doe"/>
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-10 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="you@company.com"/>
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="h-10 rounded-md border border-input bg-transparent px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="••••••••"/>
          </div>
          <button disabled={loading} type="submit" className="mt-2 h-10 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 disabled:opacity-60">{loading ? "Creating..." : "Create account"}</button>
        </form>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          Already have an account? <a href="/auth/login" className="underline underline-offset-4 hover:no-underline">Sign in</a>
        </p>
      </div>
    </div>
  );
}

