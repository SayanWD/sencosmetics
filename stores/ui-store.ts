'use client'

import { create } from 'zustand'

interface UIState {
  isMenuOpen: boolean
  isSurveyModalOpen: boolean
  isContactModalOpen: boolean
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
  openSurveyModal: () => void
  closeSurveyModal: () => void
  openContactModal: () => void
  closeContactModal: () => void
}

/**
 * Global UI state management with Zustand
 * For menu, modals, and other UI-related state
 */
export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: false,
  isSurveyModalOpen: false,
  isContactModalOpen: false,
  
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  
  openSurveyModal: () => set({ isSurveyModalOpen: true }),
  closeSurveyModal: () => set({ isSurveyModalOpen: false }),
  
  openContactModal: () => set({ isContactModalOpen: true }),
  closeContactModal: () => set({ isContactModalOpen: false }),
}))

