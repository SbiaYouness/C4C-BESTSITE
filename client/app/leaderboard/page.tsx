import { Crown, Medal } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const players = [
  { name: 'NovaByte', score: 9820, rank: 1 },
  { name: 'CircuitFox', score: 9450, rank: 2 },
  { name: 'AlgoWave', score: 9120, rank: 3 },
  { name: 'PixelSmith', score: 8870, rank: 4 },
  { name: 'StackRider', score: 8640, rank: 5 },
]

export default function LeaderboardPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Leaderboard"
        title="Top coders in the Arena."
        description="Rankings update weekly based on speed, accuracy, and collaboration wins."
        actions={[{ label: 'Join the Arena', href: '/arena', variant: 'primary' }]}
      />

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/10 bg-dark-900/70 overflow-hidden">
            <div className="grid grid-cols-[1fr_120px_120px] gap-4 border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.2em] text-dark-400">
              <span>Player</span>
              <span>Rank</span>
              <span>Score</span>
            </div>
            {players.map((player) => (
              <div key={player.name} className="grid grid-cols-[1fr_120px_120px] gap-4 px-6 py-4 border-b border-white/5 text-dark-200">
                <div className="flex items-center gap-3">
                  <Crown className="h-4 w-4 text-primary-400" />
                  {player.name}
                </div>
                <div className="flex items-center gap-2">
                  <Medal className="h-4 w-4 text-emerald-300" /> #{player.rank}
                </div>
                <span>{player.score}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
