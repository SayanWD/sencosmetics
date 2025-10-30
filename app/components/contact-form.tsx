'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'

const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Некорректный email адрес'),
  phone: z.string().min(10, 'Укажите корректный номер телефона').optional().or(z.literal('')),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

      // Track conversion if FB Pixel is loaded
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead')
      }

      // Track conversion if gtag is loaded
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: process.env.NEXT_PUBLIC_GTAG_ID,
        })
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Произошла ошибка при отправке')
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-8 rounded-lg bg-green-50 border border-green-200">
        <div className="text-center">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-2xl font-semibold text-green-900 mb-2">
            Спасибо за обращение!
          </h3>
          <p className="text-green-700 mb-6">
            Мы получили ваше сообщение и свяжемся с вами в ближайшее время.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-green-600 hover:text-green-800 font-medium underline"
          >
            Отправить ещё одно сообщение
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-6">
      {errorMessage && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
          {errorMessage}
        </div>
      )}

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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
      </button>
    </form>
  )
}

