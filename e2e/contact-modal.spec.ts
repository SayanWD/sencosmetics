import { test, expect } from '@playwright/test'

test.describe('Contact Modal E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens contact modal from header', async ({ page }) => {
    // Click "Получить консультацию" in header
    await page.click('header >> text=Получить консультацию')

    // Modal should be visible
    await expect(page.locator('text=Получить консультацию').nth(1)).toBeVisible()
    await expect(page.locator('input[name="name"]')).toBeVisible()
  })

  test('opens contact modal from hero button', async ({ page }) => {
    // Click "Получить консультацию" button in hero
    await page.click('section#home >> text=Получить консультацию')

    // Modal should be visible
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })

  test('validates required fields', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Получить консультацию')

    // Try to submit empty form
    await page.click('button[type="submit"]')

    // Should show validation errors
    await expect(page.locator('text=/Имя должно содержать/')).toBeVisible()
  })

  test('validates email format', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Получить консультацию')

    // Fill invalid email
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('textarea[name="message"]', 'This is a test message')

    // Submit
    await page.click('button[type="submit"]')

    // Should show email error
    await expect(page.locator('text=/Некорректный email/')).toBeVisible()
  })

  test('submits valid form successfully', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Получить консультацию')

    // Fill form with valid data
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '+7 999 123 45 67')
    await page.fill('textarea[name="message"]', 'This is a valid test message for generator consultation')

    // Submit
    await page.click('button[type="submit"]')

    // Should show success message
    await expect(page.locator('text=/Спасибо за обращение/')).toBeVisible({ timeout: 5000 })
  })

  test('closes modal on close button click', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Получить консультацию')

    // Modal should be visible
    await expect(page.locator('input[name="name"]')).toBeVisible()

    // Click close button (X)
    await page.click('button[aria-label="Закрыть"]')

    // Modal should be hidden
    await expect(page.locator('input[name="name"]')).not.toBeVisible()
  })

  test('closes modal on cancel button click', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Получить консультацию')

    // Click cancel button
    await page.click('text=Отмена')

    // Modal should be hidden
    await expect(page.locator('input[name="name"]')).not.toBeVisible()
  })
})

