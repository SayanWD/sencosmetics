import { cn } from '@/lib/utils'

describe('cn utility function', () => {
  it('merges class names correctly', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500')
    expect(result).toBe('px-4 py-2 bg-blue-500')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toContain('base-class')
    expect(result).toContain('active-class')
  })

  it('merges Tailwind conflicting classes correctly', () => {
    const result = cn('px-2', 'px-4')
    expect(result).toBe('px-4')
  })

  it('handles arrays of classes', () => {
    const result = cn(['px-4', 'py-2'], 'bg-blue-500')
    expect(result).toBe('px-4 py-2 bg-blue-500')
  })

  it('handles undefined and null values', () => {
    const result = cn('px-4', undefined, null, 'py-2')
    expect(result).toBe('px-4 py-2')
  })
})

