export default function EnhancePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">AI Enhance / Rewrite</h1>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">Improve clarity, grammar, tone, or conciseness.</p>
      <div className="mt-6 grid gap-3">
        <textarea className="min-h-[140px] w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent p-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" placeholder="Paste text to enhance..." />
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex h-9 items-center rounded-md border border-black/10 dark:border-white/15 px-3 text-xs">Clarify</button>
          <button className="inline-flex h-9 items-center rounded-md border border-black/10 dark:border-white/15 px-3 text-xs">Concise</button>
          <button className="inline-flex h-9 items-center rounded-md border border-black/10 dark:border-white/15 px-3 text-xs">Friendly</button>
          <button className="inline-flex h-9 items-center rounded-md border border-black/10 dark:border-white/15 px-3 text-xs">Formal</button>
        </div>
      </div>
    </div>
  );
}

