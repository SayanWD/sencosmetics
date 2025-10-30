'use client'

import { useUIStore } from '@/stores/ui-store'

export function SurveyButton() {
  const { openSurveyModal } = useUIStore()

  return (
    <button
      onClick={openSurveyModal}
      id="survey"
      className="group relative inline-block"
      aria-label="Пройти опрос"
    >
      {/* Пульсирующий круг */}
      <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75"></div>
      
      {/* Основная кнопка */}
      <div className="relative flex items-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-full shadow-2xl transition-all hover:bg-blue-500 hover:shadow-blue-500/50 hover:scale-110">
        <svg
          className="w-7 h-7"
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
        <span className="font-bold text-lg">Пройти опрос</span>
      </div>
    </button>
  )
}

