'use client'

export interface FeaturesProps {
  title: string
  items: Array<{ title: string; description: string }>
}

export function Features({ title, items }: FeaturesProps) {
  return (
    <section className="py-16" aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4">
        <h2 id="features-heading" className="text-2xl sm:text-3xl font-semibold mb-8">
          {title}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((f, idx) => (
            <article
              key={idx}
              className="rounded-xl border border-rose-100/50 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur p-6"
            >
              <h3 className="text-lg font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


