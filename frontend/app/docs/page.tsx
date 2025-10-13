export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">InscribeAI Documentation</h1>
        <p className="text-lg text-black/70 dark:text-white/70">
          Learn how to use InscribeAI effectively for collaborative AI-powered writing.
        </p>
      </div>

      <div className="space-y-12">
        {/* Getting Started */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
          <div className="space-y-4 text-sm">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Quick Start</h3>
              <ol className="list-decimal list-inside space-y-1 text-blue-800 dark:text-blue-200">
                <li>Create an account and sign in to InscribeAI</li>
                <li>Open the dashboard and explore the core use cases</li>
                <li>Start with AI Compose to generate content from prompts</li>
                <li>Use AI Enhance to improve existing text</li>
                <li>Configure brand tone settings for consistency</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Core Use Cases */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Core Use Cases</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-black/10 dark:border-white/15 rounded-lg p-6">
              <div className="text-2xl mb-3">✍️</div>
              <h3 className="font-semibold mb-2">AI Compose</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                Generate content from prompts. Perfect for blog posts, emails, and documents.
              </p>
              <ul className="text-xs space-y-1 text-black/60 dark:text-white/60">
                <li>• Write prompts like "Write a blog intro about AI trends 2025"</li>
                <li>• Generate multiple variations</li>
                <li>• Save drafts for later editing</li>
              </ul>
            </div>

            <div className="border border-black/10 dark:border-white/15 rounded-lg p-6">
              <div className="text-2xl mb-3">✨</div>
              <h3 className="font-semibold mb-2">AI Enhance / Rewrite</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                Improve clarity, grammar, tone, and conciseness of existing text.
              </p>
              <ul className="text-xs space-y-1 text-black/60 dark:text-white/60">
                <li>• Paste existing content to enhance</li>
                <li>• Choose enhancement style (clarify, concise, friendly, formal)</li>
                <li>• Compare before and after versions</li>
              </ul>
            </div>

            <div className="border border-black/10 dark:border-white/15 rounded-lg p-6">
              <div className="text-2xl mb-3">🧭</div>
              <h3 className="font-semibold mb-2">Brand Tone Customization</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                Maintain consistent brand voice across all content.
              </p>
              <ul className="text-xs space-y-1 text-black/60 dark:text-white/60">
                <li>• Upload brand samples and guidelines</li>
                <li>• Set tone presets (professional, friendly, bold, technical)</li>
                <li>• Train AI on your team's writing style</li>
              </ul>
            </div>

            <div className="border border-black/10 dark:border-white/15 rounded-lg p-6">
              <div className="text-2xl mb-3">📂</div>
              <h3 className="font-semibold mb-2">Content History</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                Save and revisit previous AI drafts and iterations.
              </p>
              <ul className="text-xs space-y-1 text-black/60 dark:text-white/60">
                <li>• Access all generated content</li>
                <li>• Track version history</li>
                <li>• Reuse successful prompts</li>
              </ul>
            </div>

            <div className="border border-black/10 dark:border-white/15 rounded-lg p-6">
              <div className="text-2xl mb-3">👥</div>
              <h3 className="font-semibold mb-2">Team Collaboration</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                Share, edit, and comment on drafts with your team.
              </p>
              <ul className="text-xs space-y-1 text-black/60 dark:text-white/60">
                <li>• Real-time collaboration features</li>
                <li>• Comment and suggestion system</li>
                <li>• Team approval workflows</li>
              </ul>
            </div>

            <div className="border border-black/10 dark:border-white/15 rounded-lg p-6">
              <div className="text-2xl mb-3">⚙️</div>
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                Manage API keys, LLM models, and tone preferences.
              </p>
              <ul className="text-xs space-y-1 text-black/60 dark:text-white/60">
                <li>• Configure AI provider settings</li>
                <li>• Manage team permissions</li>
                <li>• Customize default prompts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Writing Effective Prompts</h3>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Be specific about the content type and audience</li>
                <li>• Include context about your brand voice</li>
                <li>• Specify the desired length and format</li>
                <li>• Provide examples of the tone you want</li>
              </ul>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Brand Consistency</h3>
              <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                <li>• Upload samples of your best content</li>
                <li>• Set up tone presets for different content types</li>
                <li>• Review AI-generated content before publishing</li>
                <li>• Train your team on brand guidelines</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Team Collaboration</h3>
              <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                <li>• Use comments to provide feedback</li>
                <li>• Establish approval workflows</li>
                <li>• Share successful prompts with the team</li>
                <li>• Maintain version control for important content</li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Integration */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">API Integration</h2>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <p className="text-sm text-black/70 dark:text-white/70 mb-3">
              InscribeAI supports integration with various AI providers:
            </p>
            <ul className="text-sm space-y-1 text-black/60 dark:text-white/60">
              <li>• OpenAI GPT models (default)</li>
              <li>• GPT4All for local/private AI</li>
              <li>• Custom AI provider integration</li>
            </ul>
            <div className="mt-4 p-3 bg-black/5 dark:bg-white/5 rounded text-xs font-mono">
              <div># Example API call</div>
              <div>POST /api/ai/generate</div>
              <div>Authorization: Bearer your-token</div>
              <div>Content-Type: application/json</div>
              <div>{"{"}</div>
              <div>  "bullets": "• AI trends for 2025\n• Impact on businesses"</div>
              <div>{"}"}</div>
            </div>
          </div>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Support & Resources</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border border-black/10 dark:border-white/15 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                Get support and connect with the community.
              </p>
              <ul className="text-xs space-y-1">
                <li>• <a href="#" className="text-indigo-600 hover:underline">Contact Support</a></li>
                <li>• <a href="#" className="text-indigo-600 hover:underline">Community Forum</a></li>
                <li>• <a href="#" className="text-indigo-600 hover:underline">Feature Requests</a></li>
              </ul>
            </div>

            <div className="border border-black/10 dark:border-white/15 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Resources</h3>
              <p className="text-sm text-black/70 dark:text-white/70 mb-3">
                Additional resources to help you succeed.
              </p>
              <ul className="text-xs space-y-1">
                <li>• <a href="#" className="text-indigo-600 hover:underline">Writing Templates</a></li>
                <li>• <a href="#" className="text-indigo-600 hover:underline">Prompt Library</a></li>
                <li>• <a href="#" className="text-indigo-600 hover:underline">Best Practices Guide</a></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}