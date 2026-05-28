import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const caseStudies = [
  {
    title: 'PulseFlow CRM',
    category: 'AI + SaaS',
    impact: 'AI-first operations hub for a 200-seat sales org.',
    metric: '63% faster pipeline velocity',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80&auto=format&fit=crop',
  },
  {
    title: 'Orbit Health',
    category: 'Automation',
    impact: 'Automation suite for patient onboarding and compliance.',
    metric: '62% reduction in manual ops',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1000&q=80&auto=format&fit=crop',
  },
  {
    title: 'Nimbus Ventures',
    category: 'Web & Brand',
    impact: 'Brand narrative + growth site with cinematic UX.',
    metric: '2.4x lift in inbound leads',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80&auto=format&fit=crop',
  },
]

const industries = [
  'Fintech & Web3',
  'Health & Wellness',
  'Enterprise SaaS',
  'Consumer Platforms',
  'E-commerce & Retail',
  'Media & Entertainment',
]

export default function WorkPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Work"
        title="Case studies with real-world impact."
        description="We ship the systems that move the needle: revenue, efficiency, retention, and brand trust."
        actions={[
          { label: 'Start a Project', href: '/contact', variant: 'primary' },
          { label: 'View Services', href: '/services', variant: 'ghost' },
        ]}
      />

      {/* Gallery Section */}
      <section className="py-28 bg-[#080c0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16 lg:space-y-32">
          {caseStudies.map((study, index) => (
            <div key={study.title} className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden group ${index % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <img 
                  src={study.img} 
                  alt={study.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-6 left-6 font-mono text-xs text-white/60 bg-black/40 px-3 py-1.5 rounded backdrop-blur-md">
                  {study.category}
                </span>
              </div>

              <div className={index % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}>
                <h2 className="text-4xl font-display font-bold text-white tracking-tighter">{study.title}</h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-md">{study.impact}</p>
                <div className="mt-8 border-l-2 border-white/20 pl-5">
                  <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/30">Result</p>
                  <p className="mt-2 text-xl font-semibold text-white">{study.metric}</p>
                </div>
                <div className="mt-10">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors cursor-pointer group">
                    Read the full story <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="py-28 border-t border-white/6 bg-[#030508]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-[1fr_1.5fr] gap-16">
          <div>
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">Industries</p>
            <h2 className="mt-6 text-4xl font-display font-bold text-white tracking-tighter">We adapt to your world.</h2>
            <p className="mt-6 text-white/50 leading-relaxed max-w-md">
              We build with the constraints and patterns of your industry in mind, delivering systems that feel native to your teams.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {industries.map((industry) => (
              <div key={industry} className="p-5 border border-white/6 rounded-xl bg-[#05080f] text-white/70">
                {industry}
              </div>
            ))}
          </div>
        </div>
      </section>

    </SiteShell>
  )
}
