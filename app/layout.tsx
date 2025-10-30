import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from './components/analytics'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Sencosmetics — Натуральный уход за кожей',
  description: 'Косметика с заботой о коже: чистые формулы, заметный результат, экспертный подход.',
  keywords: ['косметика', 'уход за кожей', 'натуральная косметика', 'beauty', 'sencosmetics'],
  authors: [{ name: 'Sencosmetics' }],
  openGraph: {
    title: 'Sencosmetics — Натуральный уход за кожей',
    description: 'Чистые формулы, забота и заметный результат',
    type: 'website',
    locale: 'ru_RU',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  const fbPixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID

  return (
    <html lang="ru" className="scroll-smooth">
      <body className={inter.className}>
        <Analytics gtmId={gtmId} fbPixelId={fbPixelId} gtagId={gtagId} />
        {children}
      </body>
    </html>
  )
}

