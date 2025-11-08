import { loadCommonDictionary } from '@/lib/i18n'
import { SurveyModal } from '../components/survey-modal'
import { SurveyButton } from '../components/survey-button'
import Image from 'next/image'

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'kz' ? 'kz' : 'ru'
  const dict = (await loadCommonDictionary(locale)) as any

  const brand = String(dict.header?.brand ?? 'Sencosmetics')
  const title = String(dict.hero?.title ?? 'Подбор ухода для вашей кожи')
  const description = String(
    dict.hero?.description ?? 'Ответьте на несколько вопросов — и мы предложим базовый уход под ваши задачи.'
  )
  
  // Homepage: 50/50 split, left image area, right info with CTA

  return (
    <main className="min-h-screen bg-background">
      <header className="sr-only">
        <h1>{brand}</h1>
      </header>

      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="relative">
          <Image
            src="/images/home_image.jpg"
            alt="Продукт Sencosmetics"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative flex items-center overflow-hidden">
          {/* Solid fill background */}
          <div className="absolute inset-0 -z-10 bg-[#eada54]"></div>
          <div className="w-full max-w-xl mx-auto p-6 sm:p-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{title}</h2>
            <p className="text-muted-foreground mb-8">{description}</p>
            <SurveyButton label="Подобрать уход" />
          </div>
        </div>
      </section>

      <SurveyModal />
      
    </main>
  )
}


