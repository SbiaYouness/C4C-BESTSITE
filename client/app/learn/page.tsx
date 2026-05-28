import { GraduationCap, Sparkles } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const tracks = [
  {
    title: 'AI Builder Track',
    detail: 'From prompt engineering to AI-integrated workflows.',
  },
  {
    title: 'Fullstack Speedrun',
    detail: 'Ship complete apps with modern stacks and performance focus.',
  },
  {
    title: 'Systems Thinking',
    detail: 'Architecture, scalability, and engineering leadership foundations.',
  },
]

const sprints = [
  'Weekly missions with live feedback',
  'Code reviews from arena champions',
  'Progress tracking and badges',
]

export default function LearnPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Learn"
        title="Learn to build like an elite studio."
        description="Guided coding paths, real-world challenges, and AI-powered mentoring built directly into the Arena."
        actions={[{ label: 'Join the Arena', href: '/arena', variant: 'primary' }]}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
          {tracks.map((track) => (
            <div key={track.title} className="glass rounded-2xl p-6">
              <GraduationCap className="h-6 w-6 text-primary-400" />
              <h2 className="mt-4 text-xl font-semibold text-white">{track.title}</h2>
              <p className="mt-2 text-dark-200">{track.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-t border-white/10 bg-dark-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-dark-400">Learning sprints</p>
            <h2 className="mt-4 text-3xl font-display text-white">Level up with structure.</h2>
            <p className="mt-4 text-dark-200">
              Each sprint is built around real client scenarios so you learn by shipping and debugging.
            </p>
          </div>
          <div className="space-y-3">
            {sprints.map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-dark-950/80 px-4 py-3 text-sm text-dark-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
