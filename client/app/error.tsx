'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-dark-950 text-white flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-dark-400">Something went wrong</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-display">We hit a snag.</h1>
        <p className="mt-4 text-dark-200">
          The app encountered an unexpected error. You can try again or go back home.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full bg-primary-600 px-6 py-3 font-semibold text-white shadow-glow"
          >
            Try again
          </button>
          <Link href="/" className="rounded-full border border-white/10 bg-dark-900/70 px-6 py-3 font-semibold text-white">
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
