import { Download, Globe, Sparkles } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const coverage = [
  'Featured as a top AI-native studio in 2026',
  'Recognized for community-driven talent sourcing',
  'Built award-winning campaign experiences',
]

export default function PressPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Press"
        title="Media kit and studio highlights."
        description="For interviews, collaborations, and press inquiries, reach out and download the latest assets."
        actions={[{ label: 'Contact Press', href: '/contact', variant: 'primary' }]}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-dark-900/70 p-8 space-y-4">
            <div className="flex items-center gap-3 text-primary-400">
              <Sparkles className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.25em]">Highlights</p>
            </div>
            <ul className="space-y-3 text-dark-200">
              {coverage.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-dark-950/80 px-4 py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-dark-950/80 p-8">
            <div className="flex items-center gap-3 text-primary-400">
              <Globe className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.25em]">Media kit</p>
            </div>
            <p className="mt-4 text-dark-200">
              Download logos, product screenshots, and brand guidelines for official use.
            </p>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-white font-semibold shadow-glow">
              <Download className="h-4 w-4" /> Download assets
            </button>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
