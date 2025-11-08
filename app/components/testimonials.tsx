export interface TestimonialsProps {
  title: string
  quotes: Array<{ name: string; text: string }>
}

export function Testimonials({ title, quotes }: TestimonialsProps) {
  return (
    <section className="py-16 bg-rose-50/50 dark:bg-slate-800/40" aria-labelledby="testimonials-heading">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="testimonials-heading" className="text-2xl sm:text-3xl font-semibold mb-8">
          {title}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((q, idx) => (
            <figure key={idx} className="rounded-xl border border-rose-100/50 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-6">
              <blockquote className="text-sm text-muted-foreground">“{q.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium">{q.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}


