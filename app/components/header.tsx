'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/stores/ui-store'

export interface HeaderProps {
  brandLabel: string
  navHomeLabel: string
  consultLabel: string
  surveyLabel: string
}

export function Header({ brandLabel, navHomeLabel, consultLabel, surveyLabel }: HeaderProps) {
  const { openSurveyModal, openContactModal } = useUIStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#home', label: navHomeLabel },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
          >
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/50">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold">{brandLabel}</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-200 hover:text-white transition-colors text-base font-medium relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={openContactModal}
              className="text-slate-200 hover:text-white transition-colors text-base font-medium relative group"
            >
              {consultLabel}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={openSurveyModal}
              className="text-slate-200 hover:text-white transition-colors text-base font-medium relative group"
            >
              {surveyLabel}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-200 hover:text-white hover:bg-slate-800 transition-colors px-4 py-3 rounded-lg text-base font-medium"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openContactModal()
                }}
                className="text-slate-200 hover:text-white hover:bg-slate-800 transition-colors px-4 py-3 rounded-lg text-base font-medium text-left"
              >
                {consultLabel}
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  openSurveyModal()
                }}
                className="text-slate-200 hover:text-white hover:bg-slate-800 transition-colors px-4 py-3 rounded-lg text-base font-medium text-left"
              >
                {surveyLabel}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

