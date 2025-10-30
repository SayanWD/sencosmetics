'use client'

import { useUIStore } from '@/stores/ui-store'
import Image from 'next/image'

export interface HeroProps {
  brandHeadline: string
  subtitle: string
  consultCta: string
  secondaryCta: string
}

export function Hero({ brandHeadline, subtitle, consultCta, secondaryCta }: HeroProps) {
  const { openContactModal, openSurveyModal } = useUIStore()

  return (
    <section id="home" className="relative overflow-hidden min-h-screen flex items-center">
      {/* Background with generator image and effects */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/generator-background.jpg"
            alt="Generator background"
            fill
            quality={90}
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-slate-800/80 z-10"></div>
        
        {/* Background pattern - generator silhouette in CSS */}
        <div className="absolute inset-0 opacity-30 z-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, 
            transparent 20%, 
            rgba(59, 130, 246, 0.1) 20%, 
            rgba(59, 130, 246, 0.1) 25%, 
            transparent 25%),
          radial-gradient(circle at 50% 50%, 
            transparent 30%, 
            rgba(96, 165, 250, 0.15) 30%, 
            rgba(96, 165, 250, 0.15) 35%, 
            transparent 35%)`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center'
        }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 z-0" style={{
          backgroundImage: `linear-gradient(to right, #60a5fa 1px, transparent 1px),
                           linear-gradient(to bottom, #60a5fa 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse z-0"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse z-0" style={{ animationDelay: '1s' }}></div>
        
        {/* Generator icon SVG pattern overlay */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2360a5fa' fill-opacity='0.1'%3E%3Cpath d='M100 50 C 120 50, 140 70, 140 90 L 140 150 L 60 150 L 60 90 C 60 70, 80 50, 100 50 Z' /%3E%3Crect x='75' y='80' width='50' height='40' rx='5' /%3E%3Ccircle cx='100' cy='40' r='15' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          opacity: 0.3
        }}></div>
        
        {/* Top gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/40 z-0"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            {brandHeadline}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-blue-100 mb-10 max-w-3xl mx-auto drop-shadow">
            {subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={openContactModal}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {consultCta}
            </button>
            <button
              onClick={openSurveyModal}
              className="inline-flex items-center justify-center rounded-lg border-2 border-blue-400 bg-slate-800/50 backdrop-blur px-8 py-3 text-base font-medium text-white transition-all hover:bg-slate-700/50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {secondaryCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

