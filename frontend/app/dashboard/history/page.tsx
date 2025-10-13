export default function HistoryPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Content History</h1>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">Revisit saved AI drafts.</p>
      <div className="mt-6 grid gap-3">
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <div className="text-sm font-medium">No history yet</div>
          <div className="text-xs text-black/70 dark:text-white/70">Generate or enhance content to see it here.</div>
        </div>
      </div>
    </div>
  );
}

