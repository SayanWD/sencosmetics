'use client'

import { useState } from 'react'
import { PrivacyPolicyModal } from './privacy-policy-modal'

export interface FooterProps {
  brandLabel: string
  privacyLabel: string
  rightsSuffix: string
}

export function Footer({ brandLabel, privacyLabel, rightsSuffix }: FooterProps) {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-border py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {brandLabel}. {rightsSuffix}{' '}
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded"
            >
              {privacyLabel}
            </button>
          </p>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={isPrivacyModalOpen} 
        onClose={() => setIsPrivacyModalOpen(false)} 
      />
    </>
  )
}
