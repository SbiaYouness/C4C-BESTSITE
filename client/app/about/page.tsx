import { Heart, Lightbulb, ShieldCheck, Users } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const values = [
  {
    title: 'Human First',
    description: 'AI accelerates the work, but people craft the experience.',
    icon: Heart,
  },
  {
    title: 'Edge of AI',
    description: 'We experiment, validate, and integrate the best AI patterns for real-world impact.',
    icon: Lightbulb,
  },
  {
    title: 'Radical Ownership',
    description: 'We own outcomes, not just deliverables.',
    icon: ShieldCheck,
  },
  {
    title: 'Elite Community',
    description: 'Our arena keeps talent sharp and accountable.',
    icon: Users,
  },
]

const timeline = [
  {
    title: 'Studio born from competition',
    detail: 'Coders4Coders began as a competitive learning arena, proving talent in real time.',
  },
  {
    title: 'Agency + product merge',
    detail: 'We layered design and product strategy on top of the community to build full systems.',
  },
  {
    title: 'AI-native delivery',
    detail: 'Today we blend automation, engineering, and creative direction to ship with speed.',
  },
]

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About"
        title="We are the ultimate freelancer team."
        description="A studio with top-tier talent, forged inside a competitive coder community and obsessed with craft, speed, and innovation."
        actions={[
          { label: 'Meet the Arena', href: '/arena', variant: 'ghost' },
          { label: 'Start a Project', href: '/contact', variant: 'primary' },
        ]}
      />

      <section className="py-28 bg-[#030508]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">
            
            {/* Text block */}
            <div className="order-2 lg:order-1">
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">The edge</p>
              <h2 className="mt-6 text-4xl font-display font-bold text-white tracking-tighter">We live at the edge of AI.</h2>
              <p className="mt-6 text-lg text-white/50 leading-relaxed">
                We are a team of designers, engineers, and product strategists who build systems that feel futuristic yet human.
                The community proves the talent. The studio ships the product.
              </p>
              <div className="mt-12 space-y-8 border-t border-white/6 pt-8">
                {timeline.map((item, index) => (
                  <div key={item.title} className="flex gap-6">
                    <span className="font-mono text-white/20 mt-1">0{index + 1}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-white tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-white/40 text-sm leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image block */}
            <div className="order-1 lg:order-2">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop" 
                  alt="Team" 
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#05080f]/20 mix-blend-multiply" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-28 border-t border-white/6 bg-[#05080f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/30 uppercase text-center mb-16">Core Values</p>
          <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title}>
                <value.icon className="h-6 w-6 text-white" />
                <h3 className="mt-5 text-xl font-semibold text-white tracking-tight">{value.title}</h3>
                <p className="mt-3 text-white/50 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
