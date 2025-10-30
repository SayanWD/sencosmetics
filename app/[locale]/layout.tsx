import type { ReactNode } from 'react'
import { loadCommonDictionary } from '@/lib/i18n'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const locale = params.locale === 'kz' ? 'kz' : 'ru'
  const dict = await loadCommonDictionary(locale)

  return (
    <>
      <Header
        brandLabel={String(dict.header?.brand ?? 'Sencosmetics')}
        navHomeLabel={String(dict.header?.nav?.home ?? 'Home')}
        consultLabel={String(dict.forms?.contact?.submit ?? 'Consult')}
        surveyLabel={String(dict.header?.nav?.faq ?? 'Survey')}
      />
      {children}
      <Footer
        brandLabel={String(dict.header?.brand ?? 'Sencosmetics')}
        privacyLabel={String(dict.footer?.privacy ?? 'Privacy Policy')}
        rightsSuffix={String(dict.footer?.rights ?? 'All rights reserved')}
      />
    </>
  )
}


