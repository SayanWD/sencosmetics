import { Hero } from './components/hero'
import { SurveyModal } from './components/survey-modal'
import { ContactModal } from './components/contact-modal'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      
      {/* Modals (triggered from header) */}
      <SurveyModal />
      <ContactModal />
    </main>
  )
}

