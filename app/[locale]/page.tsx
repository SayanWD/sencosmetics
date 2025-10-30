import { loadCommonDictionary } from '@/lib/i18n'
import { Hero } from '../components/hero'
import { SurveyModal } from '../components/survey-modal'
import { ContactModal } from '../components/contact-modal'

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'kz' ? 'kz' : 'ru'
  const dict = await loadCommonDictionary(locale)

  return (
    <main className="min-h-screen bg-background">
      <Hero
        brandHeadline={String(dict.header?.brand ?? 'Sencosmetics')}
        subtitle={String(dict.hero?.title ?? '')}
        consultCta={String(dict.forms?.contact?.submit ?? 'Contact')}
        secondaryCta={String(dict.hero?.cta ?? 'Learn more')}
      />
      <SurveyModal />
      <ContactModal />
    </main>
  )
}


