'use client'

import { useState } from 'react'

type FormState = {
  name: string
  email: string
  summary: string
}

const initialState: FormState = {
  name: '',
  email: '',
  summary: '',
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setForm(initialState)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitted && (
        <div className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Thanks. Your request is staged. We will respond within 24 hours.
        </div>
      )}

      <div>
        <label htmlFor="contact-name" className="text-sm text-white/50">
          Full name
        </label>
        <input
          id="contact-name"
          type="text"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          placeholder="Jane Developer"
          className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition focus:border-white focus:bg-white/5"
          required
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm text-white/50">
          Work email
        </label>
        <input
          id="contact-email"
          type="email"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          placeholder="jane@company.com"
          className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition focus:border-white focus:bg-white/5"
          required
        />
      </div>

      <div>
        <label htmlFor="contact-summary" className="text-sm text-white/50">
          Project summary
        </label>
        <textarea
          id="contact-summary"
          rows={5}
          value={form.summary}
          onChange={(event) => updateField('summary', event.target.value)}
          placeholder="Tell us what you want to build..."
          className="mt-2 w-full rounded-lg border border-white/15 bg-transparent px-4 py-3 text-white outline-none transition focus:border-white focus:bg-white/5"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-white px-6 py-4 text-[#05080f] font-semibold transition-colors hover:bg-white/90"
      >
        Send request
      </button>

      <p className="text-xs text-white/30 text-center mt-6">By submitting, you agree to our Terms and Privacy Policy.</p>
    </form>
  )
}
