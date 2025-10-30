import { test, expect } from '@playwright/test'

test.describe('Accessibility E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page has proper heading hierarchy', async ({ page }) => {
    const h1 = await page.locator('h1').count()
    expect(h1).toBe(1)

    const h1Text = await page.locator('h1').textContent()
    expect(h1Text).toBe('Sencosmetics')
  })

  test('all interactive elements are keyboard accessible', async ({ page }) => {
    // Tab through elements
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Check if elements can be focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['A', 'BUTTON']).toContain(focusedElement)
  })

  test('form inputs have proper labels', async ({ page }) => {
    // Open contact modal
    await page.click('header >> text=Получить консультацию')

    // Check labels
    await expect(page.locator('label[for="name"]')).toBeVisible()
    await expect(page.locator('label[for="email"]')).toBeVisible()
    await expect(page.locator('label[for="message"]')).toBeVisible()
  })

  test('buttons have aria-labels where needed', async ({ page }) => {
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    expect(await menuButton.count()).toBeGreaterThan(0)
  })

  test('can submit contact form using keyboard only', async ({ page }) => {
    // Open modal with keyboard
    await page.keyboard.press('Tab') // Skip to header
    await page.keyboard.press('Tab') 
    await page.keyboard.press('Tab') // To contact button
    await page.keyboard.press('Enter')

    // Wait for modal
    await page.waitForTimeout(500)

    // Fill form with keyboard
    await page.keyboard.press('Tab') // To name field
    await page.keyboard.type('Keyboard Test User')
    
    await page.keyboard.press('Tab') // To email
    await page.keyboard.type('keyboard@test.com')
    
    await page.keyboard.press('Tab') // To phone
    await page.keyboard.type('+7 999 111 22 33')
    
    await page.keyboard.press('Tab') // To message
    await page.keyboard.type('Testing keyboard accessibility for the contact form')
    
    // Submit with keyboard
    await page.keyboard.press('Tab') // To cancel button
    await page.keyboard.press('Tab') // To submit button
    await page.keyboard.press('Enter')

    // Should show success
    await expect(page.locator('text=/Спасибо/')).toBeVisible({ timeout: 5000 })
  })

  test('focus is visible on interactive elements', async ({ page }) => {
    await page.keyboard.press('Tab')
    
    // Check if focused element has focus ring
    const hasFocusRing = await page.evaluate(() => {
      const el = document.activeElement
      const styles = window.getComputedStyle(el!)
      return styles.outline !== 'none' || styles.boxShadow !== 'none'
    })

    expect(hasFocusRing).toBeTruthy()
  })
})

