'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useUIStore } from '@/stores/ui-store'
import { PrivacyPolicyModal } from './privacy-policy-modal'

const surveySchema = z.object({
  // Основные вопросы
  question1: z.string().min(1, 'Пожалуйста, ответьте на вопрос'),
  question2: z.string().min(1, 'Пожалуйста, ответьте на вопрос'),
  question3: z.string().min(1, 'Пожалуйста, ответьте на вопрос'),
  // Контактные данные
  phone: z.string().min(10, 'Укажите корректный номер телефона'),
  email: z.string().email('Укажите корректный email'),
  // Согласие
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо дать согласие на обработку персональных данных',
  }),
})

type SurveyFormData = z.infer<typeof surveySchema>

export function SurveyModal() {
  const { isSurveyModalOpen, closeSurveyModal } = useUIStore()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
  })

  async function onSubmit(data: SurveyFormData): Promise<void> {
    setErrorMessage('')

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Ошибка отправки опроса')
      }

      setIsSubmitted(true)
      reset()

      // Track conversion with client-side Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'CompleteRegistration')
      }

      // Track conversion with CAPI (server-side)
      try {
        // Hash functions using Web Crypto API
        const hashEmail = async (email: string) => {
          const encoder = new TextEncoder()
          const data = encoder.encode(email.toLowerCase().trim())
          const hashBuffer = await crypto.subtle.digest('SHA-256', data)
          const hashArray = Array.from(new Uint8Array(hashBuffer))
          return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        }

        const hashPhone = async (phone: string) => {
          const cleanPhone = phone.replace(/\D/g, '')
          const encoder = new TextEncoder()
          const data = encoder.encode(cleanPhone)
          const hashBuffer = await crypto.subtle.digest('SHA-256', data)
          const hashArray = Array.from(new Uint8Array(hashBuffer))
          return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        }

        const hashedEmail = data.email ? await hashEmail(data.email) : undefined
        const hashedPhone = data.phone ? await hashPhone(data.phone) : undefined

        await fetch('/api/fb-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'CompleteRegistration',
            userData: {
              em: hashedEmail,
              ph: hashedPhone,
            },
            customData: {
              form_type: 'survey',
            }
          })
        })
      } catch (err) {
        console.error('CAPI error:', err)
      }

      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        closeSurveyModal()
      }, 3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка')
    }
  }

  function handleClose() {
    setIsSubmitted(false)
    setErrorMessage('')
    reset()
    closeSurveyModal()
  }

  if (!isSurveyModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Закрыть"
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
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-semibold text-green-600 mb-2">
                Спасибо за ваши ответы!
              </h3>
              <p className="text-muted-foreground">
                Мы свяжемся с вами в ближайшее время
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Помогите нам стать лучше
                </h2>
                <p className="text-muted-foreground">
                  Ответьте на несколько вопросов о выборе генератора
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Вопрос 1 */}
                <div>
                  <label
                    htmlFor="question1"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    1. Для каких целей вам нужен генератор?{' '}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    {...register('question1')}
                    id="question1"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  >
                    <option value="">Выберите вариант</option>
                    <option value="home">Для дома (резервное питание)</option>
                    <option value="construction">Для стройки</option>
                    <option value="business">Для бизнеса</option>
                    <option value="events">Для мероприятий</option>
                    <option value="other">Другое</option>
                  </select>
                  {errors.question1 && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.question1.message}
                    </p>
                  )}
                </div>

                {/* Вопрос 2 */}
                <div>
                  <label
                    htmlFor="question2"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    2. Какая мощность вам необходима?{' '}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    {...register('question2')}
                    id="question2"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  >
                    <option value="">Выберите вариант</option>
                    <option value="under-3kw">До 3 кВт (освещение, холодильник)</option>
                    <option value="3-5kw">3-5 кВт (дом, небольшой офис)</option>
                    <option value="5-10kw">5-10 кВт (большой дом, котёл)</option>
                    <option value="over-10kw">Более 10 кВт (коттедж, производство)</option>
                    <option value="unknown">Не знаю, нужна консультация</option>
                  </select>
                  {errors.question2 && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.question2.message}
                    </p>
                  )}
                </div>

                {/* Вопрос 3 */}
                <div>
                  <label
                    htmlFor="question3"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    3. Какой бюджет вы планируете?{' '}
                    <span className="text-destructive">*</span>
                  </label>
                  <select
                    {...register('question3')}
                    id="question3"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  >
                    <option value="">Выберите вариант</option>
                    <option value="under-50k">До 50 000 ₸</option>
                    <option value="50-100k">50 000 - 100 000 ₸</option>
                    <option value="100-200k">100 000 - 200 000 ₸</option>
                    <option value="200-500k">200 000 - 500 000 ₸</option>
                    <option value="over-500k">Более 500 000 ₸</option>
                  </select>
                  {errors.question3 && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.question3.message}
                    </p>
                  )}
                </div>

                {/* Разделитель */}
                <div className="border-t border-border my-6"></div>

                <div className="bg-primary/5 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Оставьте контакты для связи
                  </h3>

                  {/* Телефон */}
                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Телефон <span className="text-destructive">*</span>
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      placeholder="+7 (999) 123-45-67"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Согласие */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    {...register('consent')}
                    className="mt-1 w-4 h-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    Я даю согласие на{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        setIsPrivacyModalOpen(true)
                      }}
                      className="text-primary hover:underline"
                    >
                      обработку персональных данных
                    </button>
                    {' '}в соответствии с политикой конфиденциальности
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-destructive">{errors.consent.message}</p>
                )}

                {/* Submit button */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 border border-border rounded-lg font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </div>
  )
}

