'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import clsx from 'clsx'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const communityItems = [
  { label: 'Arena', href: '/arena' },
  { label: 'Learn', href: '/learn' },
  { label: 'Leaderboard', href: '/leaderboard' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open])

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/8 bg-[#05080f]/90 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src="/logo.png" alt="C4C Logo" className="h-8 w-auto" />
            <span className="text-white/20 font-light text-xl">·</span>
            <span className="font-sans text-xs font-semibold tracking-[0.2em] text-white/50 uppercase group-hover:text-white/60 transition-colors">
              Coders4Coders
            </span>
          </Link>

          {/* Desktop nav — business links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm text-white/50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right — community + CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-5 text-sm text-white/30 border-r border-white/10 pr-6">
              {communityItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white/70 transition-colors duration-200 font-sans text-xs font-semibold tracking-[0.1em]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg bg-[#1800AD] text-white text-sm font-semibold hover:bg-[#1800AD]/90 transition-colors duration-200"
            >
              Start a project
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg border border-white/10 text-white/60 hover:text-white transition"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/8 bg-[#05080f]/95 backdrop-blur-xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-px bg-white/8" />
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/40 uppercase">Community</p>
              {communityItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-white/40 hover:text-white/70 transition-colors font-sans text-xs font-semibold tracking-[0.1em]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-[#1800AD] text-white px-4 py-2.5 text-sm font-semibold hover:bg-[#1800AD]/90 transition-colors"
              >
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
