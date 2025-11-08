"use client"
import type { ReactNode } from 'react'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

export default function LocaleLayout({
  children,
}: {
  children: ReactNode
}) {

  // Note: layouts cannot be async when using client features; load dict on pages as needed
  const dict = { header: { brand: 'Sencosmetics', nav: { home: 'Home', faq: 'Survey' } }, forms: { contact: { submit: 'Consult' } }, footer: { privacy: 'Политика конфиденциальности', rights: 'Все права защищены' } }

  return (
    <>
      <Header
        brandLabel={dict.header?.brand ?? 'Sencosmetics'}
        navHomeLabel={dict.header?.nav?.home ?? 'Home'}
        consultLabel={dict.forms?.contact?.submit ?? 'Consult'}
        surveyLabel={dict.header?.nav?.faq ?? 'Survey'}
      />
      {children}
      <Footer
        brandLabel={dict.header?.brand ?? 'Sencosmetics'}
        privacyLabel={dict.footer?.privacy ?? 'Privacy Policy'}
        rightsSuffix={dict.footer?.rights ?? 'All rights reserved'}
      />
    </>
  )
}


