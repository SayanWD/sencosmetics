'use client'

import { useState, useEffect } from 'react'

export interface HeaderProps {
  brandLabel: string
  navHomeLabel: string
  consultLabel: string
  surveyLabel: string
}

export function Header(_props: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation links removed by request

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-transparent supports-[backdrop-filter]:backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand (text-only) */}
          <a href="#home" className="flex items-center gap-2 text-slate-900 dark:text-white transition-colors">
            <span className="text-2xl sm:text-3xl font-bold tracking-tight">Sen</span>
          </a>

          {/* Navigation removed */}
        </div>

      </nav>
    </header>
  )
}

