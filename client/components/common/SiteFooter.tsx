import Link from 'next/link'

const footerColumns = [
  {
    title: 'Studio',
    links: [
      { label: 'Services', href: '/services' },
      { label: 'Work', href: '/work' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Arena', href: '/arena' },
      { label: 'Learn', href: '/learn' },
      { label: 'Leaderboard', href: '/leaderboard' },
      { label: 'Labs', href: '/labs' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Press Kit', href: '/press' },
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms', href: '/legal/terms' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-[#030508]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="space-y-6">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="C4C Logo" className="h-8 w-auto" />
                <span className="text-white/20 font-light text-xl">·</span>
                <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/40">Coders4Coders</span>
              </Link>
              <p className="mt-3 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/30">We live at the edge of AI.</p>
            </div>
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">
              The ultimate freelancer team. Full SaaS, AI automation, and premium web — one studio, every layer.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#05080f] hover:bg-white/90 transition-colors"
            >
              Start a project
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-3">
                <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-white/25">{column.title}</p>
                <ul className="space-y-2 text-white/40">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-white/20">© 2026 Coders4Coders. All rights reserved.</p>
          <p className="font-mono text-xs text-white/15">Built with precision, powered by people + AI.</p>
        </div>
      </div>
    </footer>
  )
}
