export default function ComposePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">AI Compose</h1>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">Generate content from a prompt.</p>
      <div className="mt-6 grid gap-3">
        <textarea className="min-h-[120px] w-full rounded-lg border border-black/10 dark:border-white/15 bg-transparent p-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500" placeholder="Write a blog intro about AI trends 2025..." />
        <div className="flex gap-3">
          <button className="inline-flex h-10 items-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500">Generate</button>
          <a className="inline-flex h-10 items-center rounded-md border border-black/10 dark:border-white/15 px-4 text-sm" href="/dashboard/enhance">Enhance</a>
        </div>
      </div>
    </div>
  );
}

