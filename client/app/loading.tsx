export default function Loading() {
  return (
    <main className="min-h-screen bg-dark-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-40 rounded-full bg-white/10" />
          <div className="h-16 max-w-4xl rounded-3xl bg-white/10" />
          <div className="h-6 max-w-2xl rounded-full bg-white/10" />
          <div className="flex gap-4">
            <div className="h-12 w-40 rounded-full bg-white/10" />
            <div className="h-12 w-40 rounded-full bg-white/10" />
          </div>
          <div className="grid gap-6 md:grid-cols-3 pt-12">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="rounded-3xl border border-white/10 bg-dark-900/70 p-6 space-y-4">
                <div className="h-6 w-1/3 rounded-full bg-white/10" />
                <div className="h-24 rounded-2xl bg-white/10" />
                <div className="h-4 w-2/3 rounded-full bg-white/10" />
                <div className="h-4 w-1/2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
