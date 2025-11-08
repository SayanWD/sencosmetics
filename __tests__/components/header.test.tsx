import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/app/components/header'

// Mock Zustand store
jest.mock('@/stores/ui-store', () => ({
  useUIStore: () => ({
    openSurveyModal: jest.fn(),
    openContactModal: jest.fn(),
  }),
}))

describe('Header Component', () => {
  it('renders logo and company name', () => {
    render(
      <Header
        brandLabel="Sencosmetics"
        navHomeLabel="Главная"
        consultLabel="Получить консультацию"
        surveyLabel="Опрос"
      />
    )
    expect(screen.getByText('Sencosmetics')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(
      <Header
        brandLabel="Sencosmetics"
        navHomeLabel="Главная"
        consultLabel="Получить консультацию"
        surveyLabel="Опрос"
      />
    )
    expect(screen.getByText('Главная')).toBeInTheDocument()
    expect(screen.getByText('Получить консультацию')).toBeInTheDocument()
    expect(screen.getByText('Опрос')).toBeInTheDocument()
  })

  it('shows mobile menu button on small screens', () => {
    render(
      <Header
        brandLabel="Sencosmetics"
        navHomeLabel="Главная"
        consultLabel="Получить консультацию"
        surveyLabel="Опрос"
      />
    )
    const menuButton = screen.getByLabelText('Toggle menu')
    expect(menuButton).toBeInTheDocument()
  })

  it('toggles mobile menu on button click', () => {
    render(
      <Header
        brandLabel="Sencosmetics"
        navHomeLabel="Главная"
        consultLabel="Получить консультацию"
        surveyLabel="Опрос"
      />
    )
    const menuButton = screen.getByLabelText('Toggle menu')
    
    fireEvent.click(menuButton)
    // Menu should be visible after click
    const mobileMenuItems = screen.getAllByText('Главная')
    expect(mobileMenuItems.length).toBeGreaterThan(1)
  })

  it('has correct logo link to #home', () => {
    render(
      <Header
        brandLabel="Sencosmetics"
        navHomeLabel="Главная"
        consultLabel="Получить консультацию"
        surveyLabel="Опрос"
      />
    )
    const logoLink = screen.getByRole('link', { name: /sencosmetics/i })
    expect(logoLink).toHaveAttribute('href', '#home')
  })
})

