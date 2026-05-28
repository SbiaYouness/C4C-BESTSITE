import { Bot, Brush, CircuitBoard, Cloud, Layers, Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const serviceCards = [
  {
    id: '01',
    title: 'AI + Automation',
    description: 'We design workflows that remove friction, from internal systems to customer-facing automation.',
  },
  {
    id: '02',
    title: 'Product Engineering',
    description: 'Full SaaS builds with hardened architecture, product analytics, and enterprise-grade QA.',
  },
  {
    id: '03',
    title: 'Brand Experience',
    description: 'Human-first digital experiences that look cinematic and convert with intent.',
  },
  {
    id: '04',
    title: 'Infrastructure',
    description: 'Secure, scalable cloud systems with high observability and zero chaos.',
  },
]

const capabilities = [
  'AI workflow automation',
  'Internal tooling',
  'Custom SaaS platforms',
  'Real-time dashboards',
  'Design systems',
  'Growth experiments',
  'API orchestration',
  'Security reviews',
  'Performance tuning',
  'Data pipelines',
  'Campaign microsites',
  'Conversion optimization',
]

const engagementModels = [
  {
    title: 'Sprint Build',
    detail: '2-4 week sprints for high-impact launches and rapid validation.',
  },
  {
    title: 'Dedicated Pod',
    detail: 'A cross-functional squad embedded with your team to ship continuously.',
  },
  {
    title: 'Long-Term Partner',
    detail: 'Ongoing product growth, AI optimization, and new feature delivery.',
  },
]

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Services"
        title="Everything a modern team needs to ship faster."
        description="We are a multi-disciplinary studio that blends AI automation, premium design, and product-grade engineering. One partner, every layer."
        actions={[
          { label: 'Start a Project', href: '/contact', variant: 'primary' },
          { label: 'View Work', href: '/work', variant: 'ghost' },
        ]}
      />

      {/* Services Grid */}
      <section className="py-28 bg-[#05080f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-px bg-white/6">
            {serviceCards.map((card) => (
              <div key={card.title} className="bg-[#05080f] p-10 lg:p-14">
                <p className="font-mono text-xs text-white/30">{card.id}</p>
                <h2 className="mt-5 text-2xl font-display font-semibold text-white tracking-tight">{card.title}</h2>
                <p className="mt-4 text-white/50 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-28 border-t border-white/6 bg-[#030508]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">Capabilities</p>
              <h2 className="mt-6 text-4xl font-display font-bold text-white tracking-tighter">We can build anything you can imagine.</h2>
              <p className="mt-6 text-white/50 leading-relaxed">
                From low-level data pipelines to high-fidelity brand sites, we have the range of an agency and the depth of a specialized engineering firm.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {capabilities.map((cap) => (
                <div key={cap} className="py-3 border-b border-white/6 text-white/70 text-sm">
                  {cap}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-28 border-t border-white/6 bg-[#05080f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-12">Engagement Models</p>
          <div className="grid md:grid-cols-3 gap-8">
            {engagementModels.map((model) => (
              <div key={model.title} className="p-8 border border-white/10 rounded-2xl">
                <CircuitBoard className="h-5 w-5 text-white/40" />
                <h3 className="mt-5 text-xl font-semibold text-white tracking-tight">{model.title}</h3>
                <p className="mt-3 text-white/50 text-sm leading-relaxed">{model.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer inside page */}
      <section className="py-24 border-t border-white/6 bg-[#030508]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tighter">Ready for a build sprint?</h3>
          <p className="mt-4 text-white/50 text-lg">Tell us what you want to ship, and we will assemble the right pod.</p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-[#05080f] hover:bg-white/90 transition-colors"
          >
            Book a discovery call <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  )
}
