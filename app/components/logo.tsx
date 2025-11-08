export function Logo({ label = 'Sencosmetics' }: { label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block h-3 w-12 rounded-full bg-rose-500 animate-pulse" aria-hidden="true" />
      <span className="inline-block h-3 w-6 rounded-full border border-rose-300" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  )
}




