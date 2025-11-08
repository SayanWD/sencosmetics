import { loadCommonDictionary } from '@/lib/i18n'

export default async function FaqPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'kz' ? 'kz' : 'ru'
  const dict = (await loadCommonDictionary(locale)) as any

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">
        {String(dict?.header?.nav?.faq ?? 'FAQ')}
      </h1>
      <div className="space-y-4 text-lg text-muted-foreground">
        <p>Вопросы и ответы будут добавлены после утверждения контента.</p>
      </div>
    </main>
  )
}


