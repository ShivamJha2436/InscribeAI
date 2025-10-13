export default function BrandPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Brand Tone Customization</h1>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">Maintain brand voice by training prompts on team content.</p>
      <div className="mt-6 space-y-4">
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <div className="font-medium">Upload brand samples</div>
          <p className="text-xs text-black/70 dark:text-white/70 mt-1">Articles, emails, or guidelines that represent your voice.</p>
          <button className="mt-3 inline-flex h-9 items-center rounded-md border border-black/10 dark:border-white/15 px-3 text-xs">Upload</button>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/15 p-4">
          <div className="font-medium">Tone presets</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-black/10 dark:border-white/15 px-3 py-1">Professional</span>
            <span className="rounded-full border border-black/10 dark:border-white/15 px-3 py-1">Friendly</span>
            <span className="rounded-full border border-black/10 dark:border-white/15 px-3 py-1">Bold</span>
            <span className="rounded-full border border-black/10 dark:border-white/15 px-3 py-1">Technical</span>
          </div>
        </div>
      </div>
    </div>
  );
}

