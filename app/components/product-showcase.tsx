export interface ProductShowcaseProps {
  title: string
  products: Array<{ title: string; caption: string }>
}

export function ProductShowcase({ title, products }: ProductShowcaseProps) {
  return (
    <section className="py-16" aria-labelledby="showcase-heading">
      <div className="max-w-7xl mx-auto px-4">
        <h2 id="showcase-heading" className="text-2xl sm:text-3xl font-semibold mb-8">
          {title}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, idx) => (
            <div key={idx} className="rounded-xl overflow-hidden border border-rose-100/50 dark:border-slate-700">
              <div className="aspect-square bg-rose-100/50 dark:bg-slate-800/40" />
              <div className="p-4">
                <div className="font-medium">{p.title}</div>
                <div className="text-sm text-muted-foreground">{p.caption}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


