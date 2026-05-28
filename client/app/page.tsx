'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'
import SiteShell from '../components/common/SiteShell'

// ─── Animation helpers ──────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true, margin: '-60px' },
}
const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.9, ease: 'easeOut' },
  viewport: { once: true, margin: '-40px' },
}

// ─── Word Carousel ──────────────────────────────────────────────────────────
const WORDS = ['Communities', 'Clients', 'Coders', 'Companies', 'Creators']

function WordCarousel() {
  const [activeCount, setActiveCount] = useState(0)
  const [moving, setMoving] = useState(false)

  useEffect(() => {
    const id = setInterval(() => {
      setActiveCount(p => p + 1)
      setMoving(true)
      const t = setTimeout(() => setMoving(false), 650)
      return () => clearTimeout(t)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const visibleItems = [-2, -1, 0, 1, 2].map(offset => {
    const index = activeCount + offset
    const wordIndex = ((index % WORDS.length) + WORDS.length) % WORDS.length
    return {
      id: index,
      text: WORDS[wordIndex],
      offset
    }
  })

  return (
    <div 
      className="relative inline-flex flex-col justify-center" 
      style={{ height: '1.2em' }}
    >
      {/* Invisible longest word to define explicit width in flex */}
      <span className="opacity-0 pointer-events-none select-none" aria-hidden>
        Communities
      </span>

      {/* Taller masking container to show top and bottom words */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-full pointer-events-none"
        style={{
          height: '3.6em', // Fits the active word + 1 above + 1 below
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        <AnimatePresence>
          {visibleItems.map(item => {
            const isActive = item.offset === 0
            return (
              <motion.div
                key={item.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0.45,
                  y: `${(item.offset + 0.5) * 100}%` 
                }}
                animate={{ 
                  y: `${item.offset * 100}%`,
                  scale: isActive ? 1 : 0.5,
                  opacity: isActive ? 1 : (Math.abs(item.offset) === 1 ? 0.35 : 0),
                  filter: moving && isActive ? 'blur(1.5px)' : 'blur(0px)'
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.45,
                  y: `${(item.offset - 0.5) * 100}%` 
                }}
                transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  marginTop: '-0.6em', // Center vertically within the 3.6em container (1.2em height / 2)
                  width: '100%',
                  height: '1.2em',
                  display: 'flex',
                  alignItems: 'center',
                  transformOrigin: 'left center',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.7)',
                  willChange: 'transform, opacity, filter'
                }}
              >
                {item.text}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Page data ──────────────────────────────────────────────────────────────
const services = [
  { id: '01', title: 'AI Automation',    body: 'We map every repetitive operation and replace it with something faster, smarter, and invisible.' },
  { id: '02', title: 'Full SaaS Builds', body: 'End-to-end architecture — from the first wireframe to a live, scalable platform.' },
  { id: '03', title: 'Web & Campaign',   body: 'Sites and campaigns that feel cinematic. Brand-first, conversion-ready, never templated.' },
  { id: '04', title: 'Internal Systems', body: 'Custom tools your team actually uses — CRMs, dashboards, workflow engines.' },
]

const work = [
  { title: 'PulseFlow CRM',    category: 'AI + SaaS',   result: 'Revamped a legacy ops platform into a real-time AI command center. 3× faster workflows.',        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop' },
  { title: 'Orbit Health',     category: 'Automation',  result: 'Automated patient onboarding end-to-end. Reduced manual operations by 62% in 90 days.',            img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop' },
  { title: 'Nimbus Ventures',  category: 'Web & Brand', result: 'A brand story and site that doubled qualified inbound in one quarter.',                            img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop' },
]

const gameSlides = [
  { id: 1, title: 'Fractal Resonance', subtitle: 'Math & Pattern Arcade',   accent: '#38bdf8', href: '/game' },
  { id: 2, title: 'Code Duel',         subtitle: '1v1 Algorithm Battles',   accent: '#34d399', href: '/arena' },
  { id: 3, title: 'Bug Hunter',        subtitle: 'Precision Debugging',     accent: '#f472b6', href: '/arena' },
]

// ─── Page ───────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const arenaRef  = useRef<HTMLElement>(null)
  const isArenaInView = useInView(arenaRef, { margin: '-20% 0px -20% 0px' })
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(p => (p + 1) % gameSlides.length), 3200)
    return () => clearInterval(t)
  }, [])

  return (
    <SiteShell className="">

      {/* ── 1. HERO — Kinetic Split Layout ──────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#05080f]">

        {/* Background: ghosted photo, right side only */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1600&q=80&auto=format&fit=crop"
            alt="" aria-hidden
            className="absolute right-0 top-0 h-full w-[55%] object-cover object-left opacity-[0.11]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#05080f] via-[#05080f]/88 to-[#05080f]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080f] via-transparent to-[#05080f]/55" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
          <div className="flex flex-col justify-center min-h-[68vh]">

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sans text-xs font-semibold tracking-[0.2em] text-white/28 uppercase mb-10"
            >
              Edge of AI Studio
            </motion.p>

            {/* Unified strictly single-line headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="font-display font-bold tracking-tighter text-white flex items-center whitespace-nowrap"
              style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)', lineHeight: 1.2, letterSpacing: '-0.04em' }}
            >
              <span className="mr-[0.25em]">CODERS 4</span>
              <WordCarousel />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-10 max-w-sm"
            >
              <div className="h-px bg-white/10 w-full mb-4" />
              <p className="text-white/40 text-sm leading-relaxed">
                One studio. Every layer — AI, engineering, design, and growth.
                All in one. For the price of half one.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#1800AD] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1800AD]/90 transition-colors">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/work" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors">
                See the work <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="flex flex-wrap gap-x-14 gap-y-4 border-t border-white/8 pt-8 mt-6"
          >
            {[
              { v: '120+', l: 'Projects shipped' },
              { v: '48k',  l: 'Automation hours saved' },
              { v: '22',   l: 'Countries served' },
            ].map(s => (
              <div key={s.l}>
                <p className="font-display font-bold text-white text-2xl tracking-tight">{s.v}</p>
                <p className="text-white/30 text-xs font-sans font-semibold tracking-[0.2em] uppercase mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. SERVICES ────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#05080f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_2px_2fr] gap-0">

            <motion.div {...fadeUp} className="lg:pr-16 lg:border-r border-white/8 pb-16 lg:pb-0">
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/30 uppercase">What we build</p>
              <h2 className="mt-6 font-display font-bold text-white leading-tight tracking-tighter" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Human-first systems.<br />AI-grade velocity.
              </h2>
              <p className="mt-5 text-white/45 text-sm leading-relaxed max-w-[36ch]">
                Studio-level design, deep engineering, and a competitive talent engine. Every build feels fast, premium, and built to last.
              </p>
              <Link href="/services" className="mt-8 inline-flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors">
                All services <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div />

            <div className="lg:pl-16 grid sm:grid-cols-2 gap-x-10 gap-y-10">
              {services.map((s, i) => (
                <motion.div key={s.id} {...fadeUp} transition={{ duration: 0.7, ease: [0.22,1,0.36,1], delay: i * 0.08 }} viewport={{ once: true, margin: '-60px' }}>
                  <span className="font-mono text-xs text-white/20">{s.id}</span>
                  <h3 className="mt-3 font-display font-semibold text-white text-xl tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-white/40 text-sm leading-relaxed">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WORK ────────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[#080c0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-14">
            <motion.div {...fadeUp}>
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/28 uppercase">Proof</p>
              <h2 className="mt-4 font-display font-bold text-white tracking-tighter leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                Recent builds.<br />Measurable impact.
              </h2>
            </motion.div>
            <motion.div {...fadeUp}>
              <Link href="/work" className="hidden sm:inline-flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
                All case studies <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {work.map((item, i) => (
              <motion.div key={item.title} {...fadeIn} transition={{ duration: 0.8, delay: i * 0.12 }} viewport={{ once: true, margin: '-40px' }} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={item.img} alt={item.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-xs text-white/60 bg-black/40 px-2.5 py-1 rounded backdrop-blur-sm">{item.category}</span>
                </div>
                <div className="mt-5">
                  <h3 className="font-display font-semibold text-white text-xl tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-white/40 text-sm leading-relaxed">{item.result}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/25 group-hover:text-white/55 transition-colors">
                    Full story <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HUMAN TOUCH ─────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden bg-[#05080f]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

            <motion.div {...fadeIn} className="relative">
              <div className="aspect-[3/4] max-h-[560px] overflow-hidden rounded-2xl relative">
                <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&q=80&auto=format&fit=crop" alt="Team collaborating" className="h-full w-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080f]/80 via-transparent to-transparent" />
                
                <motion.div {...fadeUp} transition={{ delay: 0.4, duration: 0.6 }} className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8 bg-[#05080f] border border-white/10 rounded-xl p-5 min-w-[160px]">
                  <p className="font-display font-bold text-white text-3xl tracking-tight">18k+</p>
                  <p className="font-sans text-[10px] font-semibold text-white/50 uppercase tracking-[0.2em] mt-1">Coders in the arena</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div {...fadeUp}>
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/28 uppercase">The human touch</p>
              <h2 className="mt-6 font-display font-bold text-white tracking-tighter leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>
                We live at the edge of AI.<br />
                <span className="text-white/30">We never forgot the human side.</span>
              </h2>
              <p className="mt-6 text-white/45 leading-relaxed">
                Behind every delivery is a real person who gives a damn about the result. Our coder community keeps us sharp — competitive, curious, and always learning.
              </p>
              <p className="mt-4 text-white/28 leading-relaxed text-sm">
                We're the ultimate freelancer team — the range of a large agency, at a fraction of the price.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/about" className="inline-flex items-center gap-2 rounded-lg border border-white/12 px-5 py-2.5 text-sm text-white/60 hover:border-white/28 hover:text-white transition-all">About us</Link>
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#1800AD] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1800AD]/90 transition-colors">Start a project</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 5. PROCESS ─────────────────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/6 bg-[#030508]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-16">
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-white/25 uppercase">Process</p>
            <h2 className="mt-4 font-display font-bold text-white tracking-tighter" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              We build like a product team.
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-px bg-white/6">
            {[
              { n: '01', title: 'Signal + Strategy', body: 'We read the business goal, the market, and your data before writing a single line.' },
              { n: '02', title: 'Design + Prototype', body: 'High-fidelity UX, real interactions, and fast prototypes that align everyone quickly.' },
              { n: '03', title: 'Ship + Compound',   body: 'Continuous delivery, perf tuning, and analytics loops that compound results over time.' },
            ].map((item, i) => (
              <motion.div key={item.n} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} viewport={{ once: true, margin: '-50px' }} className="bg-[#030508] p-8 lg:p-12">
                <span className="font-mono text-4xl font-bold text-white/7">{item.n}</span>
                <h3 className="mt-5 font-display font-semibold text-white text-lg tracking-tight">{item.title}</h3>
                <p className="mt-3 text-white/35 text-sm leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ARCADE ──────────────────────────────────────────────────────── */}
      <section ref={arenaRef} className={`py-28 transition-colors duration-1000 ${isArenaInView ? 'bg-black' : 'bg-[#030508]'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-14 text-center">
            <motion.p {...fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: gameSlides[activeSlide].accent }}>The Arcade</motion.p>
            <motion.h2 {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true, margin: '-40px' }} className="mt-4 font-display font-bold text-white tracking-tighter" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              We build. We play.<br />We live at the edge.
            </motion.h2>
            <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, margin: '-40px' }} className="mt-4 text-white/30 max-w-lg mx-auto text-sm leading-relaxed">
              Our talent stays sharp through a live competitive arcade. The same engineers who build your product compete in here.
            </motion.p>
          </div>

          <motion.div {...fadeIn} className="relative mx-auto max-w-3xl aspect-video rounded-2xl overflow-hidden border border-white/8">
            <div className="absolute inset-0 transition-all duration-1000" style={{ background: `radial-gradient(ellipse at 50% 100%, ${gameSlides[activeSlide].accent}22, transparent 70%)` }} />
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3 p-8">
              <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-700" style={{ color: gameSlides[activeSlide].accent + 'aa' }}>
                {gameSlides[activeSlide].subtitle}
              </p>
              <h3 className="font-display font-bold text-white text-5xl tracking-tighter text-center">
                {gameSlides[activeSlide].title}
              </h3>
              <Link href={gameSlides[activeSlide].href} className="mt-8 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300" style={{ backgroundColor: gameSlides[activeSlide].accent, color: '#05080f' }}>
                <Zap className="h-4 w-4" />
                Play with Coders
              </Link>
              <div className="absolute bottom-6 flex gap-2">
                {gameSlides.map((slide, idx) => (
                  <button key={slide.id} onClick={() => setActiveSlide(idx)} className="h-1.5 rounded-full transition-all duration-300" style={{ width: activeSlide === idx ? '2rem' : '0.375rem', backgroundColor: activeSlide === idx ? gameSlides[activeSlide].accent : 'rgba(255,255,255,0.2)' }} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 7. CTA ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#05080f] py-32 border-t border-white/6">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&q=70&auto=format&fit=crop" alt="" className="h-full w-full object-cover opacity-[0.08]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <motion.p {...fadeUp} className="font-sans text-xs font-semibold tracking-[0.2em] text-white/22 uppercase">Ready to build?</motion.p>
          <motion.h2 {...fadeUp} transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true, margin: '-40px' }} className="mt-6 font-display font-bold text-white tracking-tighter leading-tight" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            Let's ship the thing your team can't stop talking about.
          </motion.h2>
          <motion.p {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true, margin: '-40px' }} className="mt-6 text-white/35 max-w-2xl mx-auto leading-relaxed">
            Share your idea. We'll craft the strategy, system, and experience. All in one. For the price of half one.
          </motion.p>
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true, margin: '-40px' }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#1800AD] px-8 py-4 text-base font-semibold text-white hover:bg-[#1800AD]/90 transition-colors">
              Start a project <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm text-white/35 hover:text-white transition-colors">
              View services
            </Link>
          </motion.div>
        </div>
      </section>

    </SiteShell>
  )
}
