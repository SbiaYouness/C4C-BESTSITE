import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const roles = [
  {
    title: 'Senior Fullstack Engineer',
    location: 'Remote / Global',
    focus: 'Typescript, Next.js, Node, AI automation',
  },
  {
    title: 'Product Designer',
    location: 'Remote / GMT-5 to GMT+2',
    focus: 'Design systems, UX, motion',
  },
  {
    title: 'DevOps + Infrastructure',
    location: 'Remote',
    focus: 'Cloud architecture, CI/CD, security',
  },
]

const culture = [
  'We ship with purpose and move fast.',
  'We keep human-first design at the core.',
  'We sharpen skills in the Arena every week.',
  'We share knowledge and grow together.',
]

export default function CareersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Careers"
        title="Build the future with the edge-of-AI team."
        description="We are always looking for elite builders, designers, and thinkers who want to push product boundaries."
        actions={[{ label: 'Contact Us', href: '/contact', variant: 'primary' }]}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {roles.map((role) => (
              <div key={role.title} className="rounded-2xl border border-white/10 bg-dark-900/70 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{role.title}</h2>
                    <p className="text-dark-300 text-sm">{role.location}</p>
                  </div>
                  <Link href="/contact" className="inline-flex items-center text-primary-300">
                    Apply now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
                <p className="mt-3 text-dark-200">{role.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/10 bg-dark-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-dark-950/80 p-8">
            <div className="flex items-center gap-3 text-primary-400">
              <Sparkles className="h-5 w-5" />
              <p className="text-sm uppercase tracking-[0.25em]">Culture</p>
            </div>
            <h3 className="mt-4 text-2xl font-display text-white">How we work</h3>
            <ul className="mt-6 space-y-3 text-dark-200">
              {culture.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
