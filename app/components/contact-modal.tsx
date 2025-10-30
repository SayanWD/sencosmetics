'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useUIStore } from '@/stores/ui-store'
import { PrivacyPolicyModal } from './privacy-policy-modal'

// Helper function to hash email for Facebook CAPI (using Web Crypto API)
async function hashEmail(email: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(email.toLowerCase().trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Helper function to hash phone for Facebook CAPI
async function hashPhone(phone: string): Promise<string> {
  const cleanPhone = phone.replace(/\D/g, '')
  const encoder = new TextEncoder()
  const data = encoder.encode(cleanPhone)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email адрес'),
  phone: z.string().min(10, 'Укажите корректный номер телефона').optional().or(z.literal('')),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо дать согласие на обработку персональных данных',
  }),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactModal() {
  const { isContactModalOpen, closeContactModal } = useUIStore()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData): Promise<void> {
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Ошибка отправки формы')
      }

      setIsSubmitted(true)
      reset()

      // Track conversion with client-side Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead')
      }

      // Track conversion with CAPI (server-side)
      try {
        const hashedEmail = data.email ? await hashEmail(data.email) : undefined
        const hashedPhone = data.phone ? await hashPhone(data.phone) : undefined

        await fetch('/api/fb-events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventName: 'Lead',
            userData: {
              em: hashedEmail,
              ph: hashedPhone,
            },
            customData: {
              form_type: 'contact',
              name: data.name,
            }
          })
        })
      } catch (err) {
        console.error('CAPI error:', err)
      }

      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: process.env.NEXT_PUBLIC_GTAG_ID,
        })
      }

      // Auto close after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
        closeContactModal()
      }, 3000)
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка при отправке')
    }
  }

  function handleClose() {
    setIsSubmitted(false)
    setErrorMessage('')
    reset()
    closeContactModal()
  }

  if (!isContactModalOpen) return null

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
                Спасибо за обращение!
              </h3>
              <p className="text-muted-foreground">
                Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                  Получить консультацию
                </h2>
                <p className="text-muted-foreground">
                  Оставьте заявку и наш специалист поможет подобрать оптимальный генератор
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Имя <span className="text-destructive">*</span>
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
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

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Телефон <span className="text-muted-foreground text-xs">(опционально)</span>
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

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Сообщение <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={5}
                    placeholder="Опишите ваши требования к генератору или задайте вопрос..."
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

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
                    {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
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

