export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">InscribeAI Docs</h1>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">Learn how to use InscribeAI effectively.</p>

      <div className="mt-8 space-y-8">
        <section>
          <h2 className="text-xl font-semibold">Getting Started</h2>
          <ol className="mt-2 list-decimal pl-5 text-sm space-y-1">
            <li>Create an account and sign in.</li>
            <li>Open the dashboard and pick a use case.</li>
            <li>Compose or enhance content and save drafts.</li>
          </ol>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Core Use Cases</h2>
          <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
            <li><a className="underline" href="/dashboard/compose">AI Compose</a>: Generate content from prompts.</li>
            <li><a className="underline" href="/dashboard/enhance">AI Enhance</a>: Improve clarity, tone, and grammar.</li>
            <li><a className="underline" href="/dashboard/brand">Brand Tone</a>: Configure tone presets and samples.</li>
            <li><a className="underline" href="/dashboard/history">Content History</a>: Revisit previous drafts.</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Settings</h2>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">Manage API keys, LLM models, and team preferences in <a className="underline" href="/dashboard/settings">Settings</a>.</p>
        </section>
      </div>
    </div>
  );
}

