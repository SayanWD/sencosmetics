'use client'

import { useState } from 'react'

export interface NewsletterSignupProps {
  title: string
  placeholder: string
  cta: string
  success: string
  error: string
}

export function NewsletterSignup({ title, placeholder, cta, success, error }: NewsletterSignupProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [botField, setBotField] = useState('')

  async function onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setStatus('loading')
    try {
      if (botField) {
        setStatus('success')
        setEmail('')
        return
      }
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-16" aria-labelledby="newsletter-heading">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 id="newsletter-heading" className="text-2xl sm:text-3xl font-semibold mb-6">
          {title}
        </h2>
        <form onSubmit={onSubmit} className="flex gap-3" noValidate>
          <label className="sr-only" htmlFor="newsletter-email">{placeholder}</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            className="flex-1 rounded-lg border border-rose-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 px-4 py-3"
          />
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            aria-hidden="true"
            tabIndex={-1}
            value={botField}
            onChange={(e) => setBotField(e.target.value)}
            className="hidden"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-rose-600 px-5 py-3 text-white font-medium disabled:opacity-60"
          >
            {cta}
          </button>
        </form>
        {status === 'success' && <p className="mt-3 text-sm text-green-600">{success}</p>}
        {status === 'error' && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>
    </section>
  )
}


