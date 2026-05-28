import { ArrowRight, Code2, Swords, Target } from 'lucide-react'
import Link from 'next/link'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const games = [
  {
    title: 'Bug Hunter',
    description: 'Find and fix bugs in real-world code scenarios under pressure.',
    href: '/game/bug-hunter',
    icon: Target,
  },
  {
    title: 'Code Duel',
    description: 'Live 1v1 battles to prove who can solve problems fastest.',
    href: '/game/code-duel',
    icon: Swords,
  },
  {
    title: 'Guess Output',
    description: 'Predict console output and sharpen logic speed.',
    href: '/game/guess-output',
    icon: Code2,
  },
]

const benefits = [
  'Rank on global leaderboards',
  'Unlock expert walkthroughs',
  'Join elite studio projects',
  'Sharpen skills with weekly challenges',
]

export default function ArenaPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Arena"
        title="The proving ground for elite coders."
        description="Compete, learn, and show your skills. The Arena powers our studio and keeps our engineers battle-tested."
        actions={[
          { label: 'Join the Arena', href: '/learn', variant: 'primary' },
          { label: 'View Leaderboard', href: '/leaderboard', variant: 'ghost' },
        ]}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {games.map((game) => (
              <Link key={game.title} href={game.href} className="glass rounded-2xl p-7 transition hover:-translate-y-1">
                <game.icon className="h-7 w-7 text-primary-400" />
                <h2 className="mt-4 text-2xl font-semibold text-white">{game.title}</h2>
                <p className="mt-2 text-dark-200">{game.description}</p>
                <span className="mt-6 inline-flex items-center text-sm text-primary-300">
                  Play now <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-white/10 bg-dark-900/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-dark-400">Why it matters</p>
            <h2 className="mt-4 text-3xl font-display text-white">The Arena is our talent engine.</h2>
            <p className="mt-4 text-dark-200">
              Businesses trust our studio because our team trains in public, every week. You can see the performance and
              depth that powers every build.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-dark-950/80 p-6 space-y-3 text-dark-200">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-xl border border-white/10 bg-dark-900/70 px-4 py-3 text-sm">
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
