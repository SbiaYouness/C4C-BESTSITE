import Link from 'next/link'
import { Beaker, Sparkles } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const experiments = [
  {
    title: 'Realtime Code Arena',
    detail: 'Low-latency multiplayer engine powering the next wave of coder games.',
  },
  {
    title: 'AI Ops Navigator',
    detail: 'Voice-driven dashboards for internal systems and monitoring.',
  },
  {
    title: 'Adaptive Learning Paths',
    detail: 'Personalized challenge generation based on performance data.',
  },
]

export default function LabsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Labs"
        title="Where we test the future."
        description="Experiments, prototypes, and internal tools that push our studio and community forward."
        actions={[{ label: 'Start a Project', href: '/contact', variant: 'primary' }]}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
          {experiments.map((experiment) => (
            <div key={experiment.title} className="rounded-2xl border border-white/10 bg-dark-900/70 p-6">
              <Beaker className="h-6 w-6 text-primary-400" />
              <h2 className="mt-4 text-xl font-semibold text-white">{experiment.title}</h2>
              <p className="mt-2 text-dark-200">{experiment.detail}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-white/10 bg-dark-950/80 p-6 flex flex-col justify-between">
            <Sparkles className="h-6 w-6 text-emerald-300" />
            <p className="mt-4 text-dark-200">
              Want to collaborate on a new experiment? We are always open to co-building.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-600 px-5 py-2.5 text-white font-semibold shadow-glow"
            >
              Pitch an experiment
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
