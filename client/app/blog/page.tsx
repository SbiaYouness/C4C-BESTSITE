import { ArrowRight, NotebookText } from 'lucide-react'
import SiteShell from '../../components/common/SiteShell'
import PageHero from '../../components/common/PageHero'

const posts = [
  {
    title: 'Designing for AI-powered workflows',
    excerpt: 'How we build human-first automation that scales.',
    date: 'May 2026',
  },
  {
    title: 'Why competitive coding builds better teams',
    excerpt: 'The arena as a talent engine for real product delivery.',
    date: 'April 2026',
  },
  {
    title: 'SaaS performance checklist',
    excerpt: 'The stack we use to ship fast and stay stable.',
    date: 'March 2026',
  },
]

export default function BlogPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Blog"
        title="Insights from the edge of AI."
        description="We share frameworks, engineering playbooks, and design explorations from our studio and community."
        actions={[{ label: 'Start a Project', href: '/contact', variant: 'primary' }]}
      />

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <div key={post.title} className="rounded-2xl border border-white/10 bg-dark-900/70 p-6">
              <NotebookText className="h-6 w-6 text-primary-400" />
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-dark-400">{post.date}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{post.title}</h2>
              <p className="mt-2 text-dark-200 text-sm">{post.excerpt}</p>
              <div className="mt-4 inline-flex items-center text-sm text-primary-300">
                Read article <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
