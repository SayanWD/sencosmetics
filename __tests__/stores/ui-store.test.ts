import { useUIStore } from '@/stores/ui-store'
import { renderHook, act } from '@testing-library/react'

describe('UI Store', () => {
  beforeEach(() => {
    // Reset store before each test - access store directly
    const store = useUIStore.getState()
    store.closeContactModal()
    store.closeSurveyModal()
    store.closeMenu()
  })

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useUIStore())
    
    expect(result.current.isMenuOpen).toBe(false)
    expect(result.current.isSurveyModalOpen).toBe(false)
    expect(result.current.isContactModalOpen).toBe(false)
  })

  it('opens and closes contact modal', () => {
    const { result } = renderHook(() => useUIStore())
    
    act(() => {
      result.current.openContactModal()
    })
    expect(result.current.isContactModalOpen).toBe(true)
    
    act(() => {
      result.current.closeContactModal()
    })
    expect(result.current.isContactModalOpen).toBe(false)
  })

  it('opens and closes survey modal', () => {
    const { result } = renderHook(() => useUIStore())
    
    act(() => {
      result.current.openSurveyModal()
    })
    expect(result.current.isSurveyModalOpen).toBe(true)
    
    act(() => {
      result.current.closeSurveyModal()
    })
    expect(result.current.isSurveyModalOpen).toBe(false)
  })

  it('opens and closes menu', () => {
    const { result } = renderHook(() => useUIStore())
    
    act(() => {
      result.current.openMenu()
    })
    expect(result.current.isMenuOpen).toBe(true)
    
    act(() => {
      result.current.closeMenu()
    })
    expect(result.current.isMenuOpen).toBe(false)
  })

  it('toggles menu state', () => {
    const { result } = renderHook(() => useUIStore())
    
    act(() => {
      result.current.toggleMenu()
    })
    expect(result.current.isMenuOpen).toBe(true)
    
    act(() => {
      result.current.toggleMenu()
    })
    expect(result.current.isMenuOpen).toBe(false)
  })

  it('can have multiple modals open simultaneously', () => {
    const { result } = renderHook(() => useUIStore())
    
    act(() => {
      result.current.openContactModal()
      result.current.openSurveyModal()
    })
    
    expect(result.current.isContactModalOpen).toBe(true)
    expect(result.current.isSurveyModalOpen).toBe(true)
  })
})

