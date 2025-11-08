import { loadCommonDictionary } from '@/lib/i18n'

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'kz' ? 'kz' : 'ru'
  const dict = (await loadCommonDictionary(locale)) as any

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">
        {String(dict?.header?.nav?.about ?? 'О бренде')}
      </h1>
      <p className="text-lg text-muted-foreground">
        Sencosmetics — бренд, создающий уходовые решения с акцентом на чистые формулы и заметный результат.
      </p>
    </main>
  )
}