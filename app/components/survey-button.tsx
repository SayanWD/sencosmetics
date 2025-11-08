'use client'

import { useUIStore } from '@/stores/ui-store'

export function SurveyButton({ label = 'Пройти опрос' }: { label?: string }) {
  const { openSurveyModal } = useUIStore()

  return (
    <button
      onClick={openSurveyModal}
      id="survey"
      className="group relative inline-block"
      aria-label={label}
    >
      {/* Мягкая подсветка */}
      <div className="absolute inset-0 rounded-full bg-rose-500/20 animate-pulse"></div>
      
      {/* Основная кнопка */}
      <div className="relative flex items-center gap-2 bg-rose-600 text-white px-6 py-3 rounded-full shadow-lg transition-transform duration-300 ease-out hover:bg-rose-500 hover:shadow-rose-500/30 hover:scale-[1.03]">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <span className="font-semibold text-sm sm:text-base">{label}</span>
      </div>
    </button>
  )
}

