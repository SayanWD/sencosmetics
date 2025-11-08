'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Image from 'next/image'
import { useUIStore } from '@/stores/ui-store'
import { PrivacyPolicyModal } from './privacy-policy-modal'

const surveySchema = z.object({
  // Вопросы — необязательные
  question1: z.string().optional(),
  question2: z.array(z.string()).optional().default([]),
  question3: z.array(z.string()).optional().default([]),
  question3_other: z.string().optional(),
  question4: z.string().optional(),
  question4_other: z.string().optional(),
  // Контакты
  name: z.string().optional(),
  phone: z.string().regex(/^\+77\d{9}$/, 'Формат: +77XXXXXXXXX (9 цифр после +77)'),
  email: z.string().email('Укажите корректный email').optional(),
  // Согласие
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо дать согласие на обработку персональных данных',
  }),
})

type SurveyFormData = z.infer<typeof surveySchema>

export function SurveyModal() {
  const { isSurveyModalOpen, closeSurveyModal } = useUIStore()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [step, setStep] = useState(1)
  const totalSteps = 4
  const [errorMessage, setErrorMessage] = useState('')
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    setValue,
    watch,
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
    setStep(1)
    closeSurveyModal()
  }

  if (!isSurveyModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-white/60 animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full h-full md:h-[92vh] md:w-[92vw] overflow-y-auto rounded-none md:rounded-2xl border border-black/10 shadow-2xl bg-white text-slate-900 animate-in slide-in-from-bottom-8 md:zoom-in-95 duration-300"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Выйти"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <span className="text-sm font-medium">Выйти</span>
        </button>

        <div className="p-6 sm:p-10">
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
                  Подбор ухода за кожей
                </h2>
                {/* Описание убрано по требованию */}
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Прогресс */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Шаг</span>
                  <input
                    type="range"
                    min={1}
                    max={totalSteps}
                    step={1}
                    value={step}
                    onChange={(e) => setStep(parseInt(e.target.value))}
                    className="flex-1 accent-emerald-600"
                    aria-label="Перемещение по шагам"
                  />
                  <span className="text-sm text-muted-foreground">{step}/{totalSteps}</span>
                </div>

                {/* Вопрос 1 — список (radio list) с изображением справа */}
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300">
                    <div>
                      <p className="block text-sm font-medium text-foreground mb-3">
                        1. Кому хотите подобрать уход? <span className="text-destructive">*</span>
                      </p>
                      <fieldset className="space-y-2">
                        <legend className="sr-only">Кому подобрать уход</legend>
                        {[
                          { value: 'mom_for_teen', label: 'Я мама, хочу подобрать уход подростку' },
                          { value: 'teen_self', label: 'Я подросток 10–17 лет, хочу подобрать уход себе' },
                          { value: 'female_18_plus', label: 'Я девушка 18+, хочу подобрать уход себе' },
                          { value: 'male_18_plus', label: 'Я парень 18+, хочу подобрать уход себе' },
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-3 cursor-pointer rounded-lg border border-input bg-white px-4 py-3 hover:bg-white/80 transition">
                            <input type="radio" value={opt.value} {...register('question1')} className="accent-primary" />
                            <span className="text-sm font-medium">{opt.label}</span>
                          </label>
                        ))}
                      </fieldset>
                      {errors.question1 && (
                        <p className="mt-2 text-sm text-destructive">{errors.question1.message}</p>
                      )}
                    </div>
                    <div className="relative w-full h-56 sm:h-72 md:h-full rounded-xl overflow-hidden border border-white/30">
                      <Image src="/images/home_image.jpg" alt="Sencosmetics продукт" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                )}

                {/* Вопрос 2 — мультивыбор тип кожи */}
                {step === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300">
                    <div>
                      <p className="block text-sm font-medium text-foreground mb-3">
                        2. Какой у вас тип кожи? <span className="text-destructive">*</span>
                        <span className="block text-xs text-muted-foreground">Отметьте один или несколько вариантов</span>
                      </p>
                      <fieldset className="space-y-2">
                        <legend className="sr-only">Тип кожи</legend>
                        {[
                          { value: 'normal', label: 'Нормальная' },
                          { value: 'dry', label: 'Сухая' },
                          { value: 'oily', label: 'Жирная' },
                          { value: 'combination', label: 'Комбинированная' },
                          { value: 'sensitive', label: 'Чувствительная' },
                          { value: 'unsure', label: 'Хочу узнать' },
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-3 cursor-pointer rounded-lg border border-input bg-white px-4 py-3 hover:bg-white/80 transition">
                            <input
                              type="checkbox"
                              value={opt.value}
                              checked={(watch('question2') ?? []).includes(opt.value)}
                              onChange={(e) => {
                                const current = new Set(watch('question2') ?? [])
                                if (e.target.checked) current.add(opt.value); else current.delete(opt.value)
                                setValue('question2', Array.from(current), { shouldValidate: true })
                              }}
                              className="accent-emerald-600"
                            />
                            <span className="text-sm font-medium">{opt.label}</span>
                          </label>
                        ))}
                      </fieldset>
                      {errors.question2 && (
                        <p className="mt-2 text-sm text-destructive">{errors.question2.message}</p>
                      )}
                    </div>
                    <div className="relative w-full h-56 sm:h-72 md:h-full rounded-xl overflow-hidden border border-white/30">
                      <Image src="/images/product_image.jpg" alt="Sencosmetics продукт" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                )}

                {/* Вопрос 3 — беспокоит (мультивыбор + свой вариант) */}
                {step === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-opacity duration-300">
                    <div>
                      <p className="block text-sm font-medium text-foreground mb-3">
                        3. Меня беспокоит <span className="text-destructive">*</span>
                        <span className="block text-xs text-muted-foreground">Выберете вариант или опишите свой запрос максимально подробно</span>
                        <span className="block text-xs text-muted-foreground">Отметьте один или несколько вариантов</span>
                      </p>
                      <fieldset className="space-y-2">
                        <legend className="sr-only">Запрос</legend>
                        {[
                          { value: 'face_acne', label: 'Акне на лице' },
                          { value: 'body_breakouts', label: 'Высыпания на теле' },
                          { value: 'natural_care', label: 'Хочу попробовать натуральный уход а не бренды с химией' },
                          { value: 'other', label: 'Свой вариант' },
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-3 cursor-pointer rounded-lg border border-input bg-white px-4 py-3 hover:bg-white/80 transition">
                            <input
                              type="checkbox"
                              value={opt.value}
                              checked={(watch('question3') ?? []).includes(opt.value)}
                              onChange={(e) => {
                                const current = new Set(watch('question3') ?? [])
                                if (e.target.checked) current.add(opt.value); else current.delete(opt.value)
                                setValue('question3', Array.from(current), { shouldValidate: true })
                              }}
                              className="accent-emerald-600"
                            />
                            <span className="text-sm font-medium">{opt.label}</span>
                          </label>
                        ))}
                      </fieldset>
                      {(watch('question3') ?? []).includes('other') && (
                        <div className="mt-3">
                          <label htmlFor="question3_other" className="block text-sm text-muted-foreground mb-1">Опишите свой вариант</label>
                          <textarea id="question3_other" {...register('question3_other')} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all" rows={3} />
                        </div>
                      )}
                      {errors.question3 && (
                        <p className="mt-2 text-sm text-destructive">{errors.question3.message}</p>
                      )}
                    </div>
                    <div className="relative w-full h-56 sm:h-72 md:h-full rounded-xl overflow-hidden border border-white/30">
                      <Image src="/images/main_image.jpg" alt="Sencosmetics продукт" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                    </div>
                  </div>
                )}

                {/* Контакты + согласие */}
                {step === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="block text-sm font-medium text-foreground mb-3">
                        4. Как часто меняете уход?
                        <span className="block text-xs text-muted-foreground">Чем точнее ответ, тем эффективнее мы сможем подобрать уход</span>
                      </p>
                      <fieldset className="space-y-2 mb-4">
                        <legend className="sr-only">Частота смены ухода</legend>
                        {[
                          { value: 'brand_3y', label: 'Пользуюсь одним брендом больше 3 лет' },
                          { value: 'brand_1y', label: 'Пользуюсь одним брендом больше 1 года' },
                          { value: 'change_3m', label: 'Меняю уход каждые 3 месяца' },
                          { value: 'always_new', label: 'Пробую каждый раз разное' },
                          { value: 'other', label: 'Свой вариант' },
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-3 cursor-pointer rounded-lg border border-input bg-white px-4 py-3 hover:bg-white/80 transition">
                            <input type="radio" value={opt.value} {...register('question4')} className="accent-emerald-600" />
                            <span className="text-sm font-medium">{opt.label}</span>
                          </label>
                        ))}
                      </fieldset>
                      {watch('question4') === 'other' && (
                        <div className="mb-4">
                          <label htmlFor="question4_other" className="block text-sm text-muted-foreground mb-1">Опишите свой вариант</label>
                          <input id="question4_other" type="text" {...register('question4_other')} className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all" />
                        </div>
                      )}
                    </div>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Оставьте контакты для связи
                      </h3>

                      {/* Имя (необяз.) */}
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Имя <span className="text-muted-foreground text-xs">(необязательно)</span>
                        </label>
                        <input
                          {...register('name')}
                          type="text"
                          id="name"
                          placeholder="Ваше имя"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                        />
                      </div>

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
                          placeholder="+77XXXXXXXXX"
                          inputMode="tel"
                          pattern="\+77\d{9}"
                          autoComplete="tel"
                          onFocus={(e) => { if (!e.currentTarget.value) e.currentTarget.value = '+77' }}
                          onChange={(e) => {
                            const raw = e.currentTarget.value.replace(/[^\d+]/g, '')
                            const digits = raw.startsWith('+') ? raw.slice(1) : raw
                            let normalized = '+77'
                            const rest = digits.replace(/^77?/, '')
                            normalized += rest.slice(0, 9)
                            e.currentTarget.value = normalized
                          }}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Пример: +77700123456</p>
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
                          Email <span className="text-muted-foreground text-xs">(необязательно)</span>
                        </label>
                        <input
                          {...register('email')}
                          type="email"
                          id="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                        />
                        {/* Email необязателен */}
                      </div>
                    </div>
                    <div className="relative w-full h-56 sm:h-72 md:h-full rounded-xl overflow-hidden border border-white/30">
                      <Image src="/images/home_image.jpg" alt="Sencosmetics продукт" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
                    </div>

                    {/* Согласие */}
                    <div className="md:col-span-2 flex items-start gap-3">
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
                  </div>
                )}

                {/* Кнопки навигации */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-6 py-3 border border-border rounded-lg font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                  >
                    Отмена
                  </button>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep((s) => Math.max(1, s - 1))}
                      className="px-6 py-3 border border-border rounded-lg font-medium text-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                    >
                      Назад
                    </button>
                  )}
                  {step < totalSteps && (
                    <button
                      type="button"
                      onClick={async () => {
                        const fieldsByStep: Record<number, (keyof SurveyFormData)[]> = {
                          1: [],
                          2: [],
                          3: [],
                          4: ['phone', 'consent'],
                        }
                        const valid = await trigger(fieldsByStep[step])
                        if (valid) setStep((s) => Math.min(totalSteps, s + 1))
                      }}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                    >
                      Далее
                    </button>
                  )}
                  {step === totalSteps && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Отправка' : 'Подобрать уход'}
                    </button>
                  )}
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

