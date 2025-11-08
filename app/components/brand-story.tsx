export interface BrandStoryProps {
  heading: string
  body: string
}

export function BrandStory({ heading, body }: BrandStoryProps) {
  return (
    <section className="py-16" aria-labelledby="brand-story-heading">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 id="brand-story-heading" className="text-2xl sm:text-3xl font-semibold mb-6">
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">{body}</p>
      </div>
    </section>
  )
}


