'use client'

import { useUIStore } from '@/stores/ui-store'

export interface HeroProps {
  brandHeadline: string
  subtitle: string
  consultCta: string
  secondaryCta?: string
}

export function Hero({ brandHeadline, subtitle, consultCta, secondaryCta }: HeroProps) {
  const { openContactModal, openSurveyModal } = useUIStore()

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Soft beauty gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-fuchsia-50 to-white dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-900" aria-hidden="true" />
      <div className="orb absolute -top-10 left-1/4 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="orb absolute bottom-10 right-1/4 w-72 h-72 bg-fuchsia-400/20 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-lg">
            {brandHeadline}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-slate-700 dark:text-blue-100 mb-10 max-w-3xl mx-auto drop-shadow">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={secondaryCta ? openContactModal : openSurveyModal}
            className="btn-soft-bounce inline-flex items-center justify-center rounded-lg bg-rose-600 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2 focus:ring-offset-white/0 dark:focus:ring-offset-slate-900"
            >
              {consultCta}
            </button>
            {secondaryCta ? (
              <button
                onClick={openSurveyModal}
                className="btn-soft-bounce inline-flex items-center justify-center rounded-lg border-2 border-rose-300 bg-white/10 backdrop-blur px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:ring-offset-2 focus:ring-offset-white/0 dark:focus:ring-offset-slate-900"
              >
                {secondaryCta}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

