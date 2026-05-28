import Link from 'next/link'
import { Check } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const tiers = [
  {
    name: 'Launch Sprint',
    price: 'From $4.5k',
    detail: 'Best for quick builds and campaign launches.',
    features: ['2-4 week sprint', 'Design + build', 'Rapid validation', 'Weekly demos'],
  },
  {
    name: 'Growth Pod',
    price: 'From $12k / mo',
    detail: 'Cross-functional pod for ongoing product delivery.',
    features: ['Dedicated team', 'Product strategy', 'Automation workflows', 'Analytics loop'],
    highlight: true,
  },
  {
    name: 'Enterprise Partner',
    price: 'Custom',
    detail: 'Multi-pod delivery with security and compliance support.',
    features: ['Multi-team delivery', 'Security hardening', 'SLA support', 'Scale architecture'],
  },
]

const faqs = [
  {
    q: 'Do you work with existing teams?',
    a: 'Yes. We embed alongside your engineers and design partners to move faster.',
  },
  {
    q: 'How fast can you start?',
    a: 'Most engagements begin within 2 weeks after discovery.',
  },
  {
    q: 'Do you offer fixed price?',
    a: 'For sprint builds, yes. For ongoing pods, we align on monthly scopes.',
  },
]

export default function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pricing"
        title="Elite delivery without the agency tax."
        description="Choose the engagement model that matches your pace. We keep it transparent, flexible, and outcome-driven."
        actions={[{ label: 'Start a Project', href: '/contact', variant: 'primary' }]}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl border p-7 ${tier.highlight ? 'border-primary-500/60 bg-dark-900/80 shadow-glow' : 'border-white/10 bg-dark-950/80'}`}
            >
              <h2 className="text-2xl font-semibold text-white">{tier.name}</h2>
              <p className="mt-2 text-dark-200">{tier.detail}</p>
              <p className="mt-6 text-3xl font-display text-white">{tier.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-dark-200">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-300" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-white font-semibold hover:bg-primary-500 transition"
              >
                Book a call
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-white/10 bg-dark-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.25em] text-dark-400">FAQ</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-white/10 bg-dark-950/80 p-6">
                <h3 className="text-lg font-semibold text-white">{item.q}</h3>
                <p className="mt-3 text-dark-200 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
