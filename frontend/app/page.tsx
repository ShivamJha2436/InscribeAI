import { ThemeToggle } from "@/components/common/ThemeToggle";
import { typography as t } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f7f7f8] dark:from-[#0a0a0a] dark:to-[#0f0f10] text-foreground">
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-black/30 border-b border-black/5 dark:border-white/10">
        <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500"></div>
            <span className="text-base sm:text-lg font-bold tracking-tight">InscribeAI</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm">
            <a className="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded" href="#use-cases">Use Cases</a>
            <a className="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded" href="#testimonials">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/auth/login" className="inline-flex h-10 items-center rounded-full border border-black/10 dark:border-white/15 px-4 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Login</a>
            <a href="/auth/register" className="inline-flex h-10 items-center rounded-full bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">Sign up</a>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 right-1/2 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"></div>
            <div className="absolute -bottom-24 left-1/2 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"></div>
          </div>
          <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24 pb-10 sm:pb-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-medium rounded-full border border-black/10 dark:border-white/15 px-2.5 py-1 text-black/70 dark:text-white/70">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Collaborative AI-powered writing assistant
                </p>
                <h1 className={`mt-4 ${t.display}`}>
                  InscribeAI is a collaborative AI-powered writing assistant for teams.
                </h1>
                <p className={`mt-4 ${t.subhead} leading-relaxed`}>
                  It helps users generate, edit, and refine text across emails, blogs, and documents using LLMs — while staying consistent with brand tone and team context.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href="/dashboard" className="inline-flex h-12 items-center justify-center rounded-full bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                    Open dashboard
                  </a>
                  <a href="#features" className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 dark:border-white/15 px-6 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                    Learn more
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] w-full rounded-2xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/30 shadow-sm backdrop-blur overflow-hidden">
                  <div className="h-full w-full grid place-items-center">
                    <div className="text-center px-6">
                      <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 animate-pulse"></div>
                      <p className="mt-4 text-sm text-black/70 dark:text-white/70">Live editor preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Use Cases */}
        <section id="use-cases" className="mx-auto max-w-6xl px-6 py-12 sm:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Core Use Cases</h2>
            <p className="mt-3 text-black/70 dark:text-white/70">Generate, enhance, and collaborate—always on brand.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon="✍️" title="AI Compose" desc="Generate content from a prompt (e.g., “Write a blog intro about AI trends 2025”)." href="/dashboard/compose" />
            <FeatureCard icon="✨" title="AI Enhance / Rewrite" desc="Improve clarity, grammar, tone, or conciseness of existing text." href="/dashboard/enhance" />
            <FeatureCard icon="🧭" title="Brand Tone Customization" desc="Maintain brand voice by training prompts on team content." href="/dashboard/brand" />
            <FeatureCard icon="📂" title="Content History" desc="Save and revisit previous AI drafts." href="/dashboard/history" />
            <FeatureCard icon="👥" title="Team Collaboration" desc="Multiple users can share, edit, and comment on drafts." href="/dashboard/collaboration" />
            <FeatureCard icon="⚙️" title="Settings" desc="Manage API keys, LLM models, and tone preferences." href="/dashboard/settings" />
          </div>
        </section>

        {/* Social proof */}
        <section id="testimonials" className="px-6 py-12 sm:py-20 bg-white/50 dark:bg-black/20 border-y border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Testimonial quote="InscribeAI cut our content production time by 60%." author="Head of Content, SaaSCo" />
              <Testimonial quote="Best AI writing tool we've tried—on brand, every time." author="Marketing Lead, Fintech" />
              <Testimonial quote="Our team finally ships fast without sacrificing quality." author="Founder, Studio" />
            </div>
          </div>
        </section>

        
      </main>

      <footer className="px-6 py-10 border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-black/70 dark:text-white/70">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500"></div>
            <span>© {new Date().getFullYear()} InscribeAI</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Privacy</a>
            <a href="#" className="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Terms</a>
            <a href="#" className="hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

type FeatureCardProps = {
  icon: string;
  title: string;
  desc: string;
  href?: string;
};

function FeatureCard({ icon, title, desc, href }: FeatureCardProps) {
  const Card = (
    <div className="group relative overflow-hidden rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/30 p-5 shadow-sm backdrop-blur transition hover:shadow">
      <div className="flex items-start gap-3">
        <div className="text-2xl" aria-hidden>{icon}</div>
        <div>
          <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-black/70 dark:text-white/70">{desc}</p>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-indigo-500/10 transition duration-500 group-hover:scale-125"></div>
    </div>
  );
  return href ? (
    <a href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl">{Card}</a>
  ) : Card;
}

type TestimonialProps = {
  quote: string;
  author: string;
};

function Testimonial({ quote, author }: TestimonialProps) {
  return (
    <figure className="rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/30 p-5 shadow-sm backdrop-blur">
      <blockquote className="text-sm leading-relaxed">“{quote}”</blockquote>
      <figcaption className="mt-3 text-xs text-black/70 dark:text-white/70">— {author}</figcaption>
    </figure>
  );
}
