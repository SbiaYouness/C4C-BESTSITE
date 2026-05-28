import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-dark-950 text-white flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-dark-400">404</p>
        <h1 className="mt-4 text-4xl md:text-6xl font-display">Page not found</h1>
        <p className="mt-4 text-dark-200">
          The route you are looking for does not exist. Head back to the studio or enter the Arena.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="rounded-full bg-primary-600 px-6 py-3 font-semibold text-white shadow-glow">
            Go home
          </Link>
          <Link href="/arena" className="rounded-full border border-white/10 bg-dark-900/70 px-6 py-3 font-semibold text-white">
            Enter Arena
          </Link>
        </div>
      </div>
    </main>
  )
}
