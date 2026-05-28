import clsx from 'clsx'
import Link from 'next/link'

type HeroAction = {
  label: string
  href: string
  variant?: 'primary' | 'ghost'
}

type PageHeroProps = {
  eyebrow: string
  title: string
  description: string
  actions?: HeroAction[]
  align?: 'left' | 'center'
}

// Hand-picked curated editorial/tech images for subpage backgrounds
const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b', // Server room
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5', // Matrix code
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa', // Global network
  'https://images.unsplash.com/photo-1618044733300-9472054094ee', // 3D shapes
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31', // Abstract lines
  'https://images.unsplash.com/photo-1518770660439-4636190af475', // Circuit board
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485', // AI abstract
  'https://images.unsplash.com/photo-1531297172867-4d14210367e2', // Coding abstract
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d', // Minimal tech
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40', // Consulting
]

// Stable hash to consistently map a title to an image
function getStableImage(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % HERO_IMAGES.length
  return `${HERO_IMAGES[index]}?w=1600&q=80&auto=format&fit=crop`
}

export default function PageHero({
  eyebrow,
  title,
  description,
  actions = [],
  align = 'left',
}: PageHeroProps) {
  const isCenter = align === 'center'
  const bgImage = getStableImage(title)

  return (
    <section className="relative overflow-hidden bg-[#05080f] pt-40 pb-28 border-b border-white/6 min-h-[50vh] flex items-center">
      {/* Background: ghosted photo, right side only */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={bgImage}
          alt="" aria-hidden
          className="absolute right-0 top-0 h-full w-[75%] object-cover object-center opacity-[0.45]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05080f] via-[#05080f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-[#05080f]/30" />
      </div>

      <div
        className={clsx(
          'max-w-7xl w-full mx-auto px-6 lg:px-8 relative z-10',
          isCenter && 'text-center flex flex-col items-center'
        )}
      >
        <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#1800AD] brightness-150 saturate-150 uppercase">{eyebrow}</p>
        <h1 
          className="mt-6 font-display font-bold text-white tracking-tighter leading-[1.05] max-w-4xl"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {title}
        </h1>
        <p
          className={clsx(
            'mt-6 text-lg text-white/50 leading-relaxed max-w-2xl',
            isCenter && 'mx-auto'
          )}
        >
          {description}
        </p>
        {actions.length > 0 && (
          <div className={clsx('mt-10 flex flex-wrap gap-4', isCenter && 'justify-center')}>
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className={clsx(
                  'inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors duration-200',
                  action.variant === 'ghost'
                    ? 'border border-white/15 text-white/60 hover:text-white hover:border-white/30'
                    : 'bg-[#1800AD] text-white hover:bg-[#1800AD]/90'
                )}
              >
                {action.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
