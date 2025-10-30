import { test, expect } from '@playwright/test'

test.describe('Survey Modal E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens survey modal from header', async ({ page }) => {
    // Click "Опрос" in header
    await page.click('header >> text=Опрос')

    // Modal should be visible
    await expect(page.locator('text=Помогите нам стать лучше')).toBeVisible()
  })

  test('opens survey modal from hero catalog button', async ({ page }) => {
    // Click "Каталог генераторов" button in hero
    await page.click('section#home >> text=Каталог генераторов')

    // Modal should be visible
    await expect(page.locator('select[name="question1"]')).toBeVisible()
  })

  test('has three question dropdowns', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Опрос')

    // Check all three questions
    await expect(page.locator('select[name="question1"]')).toBeVisible()
    await expect(page.locator('select[name="question2"]')).toBeVisible()
    await expect(page.locator('select[name="question3"]')).toBeVisible()
  })

  test('validates all fields are required', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Опрос')

    // Try to submit empty form
    await page.click('button[type="submit"]')

    // Should show validation errors
    await expect(page.locator('text=/Пожалуйста, ответьте/')).toHaveCount(3)
  })

  test('submits valid survey successfully', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Опрос')

    // Fill all questions
    await page.selectOption('select[name="question1"]', 'home')
    await page.selectOption('select[name="question2"]', '3-5kw')
    await page.selectOption('select[name="question3"]', '100-200k')

    // Fill contact info
    await page.fill('input[name="phone"]', '+7 999 123 45 67')
    await page.fill('input[name="email"]', 'test@example.com')

    // Submit
    await page.click('button[type="submit"]')

    // Should show success message
    await expect(page.locator('text=/Спасибо за ваши ответы/')).toBeVisible({ timeout: 5000 })
  })

  test('displays all question options correctly', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Опрос')

    // Check question 1 options
    const q1Options = await page.locator('select[name="question1"] option').allTextContents()
    expect(q1Options).toContain('Для дома (резервное питание)')
    expect(q1Options).toContain('Для стройки')

    // Check question 2 options
    const q2Options = await page.locator('select[name="question2"] option').allTextContents()
    expect(q2Options).toContain('До 3 кВт (освещение, холодильник)')

    // Check question 3 options
    const q3Options = await page.locator('select[name="question3"] option').allTextContents()
    expect(q3Options).toContain('До 50 000 ₸')
  })

  test('closes modal and resets form', async ({ page }) => {
    // Open modal
    await page.click('header >> text=Опрос')

    // Fill some data
    await page.selectOption('select[name="question1"]', 'home')
    await page.fill('input[name="phone"]', '+7 999 123 45 67')

    // Close modal
    await page.click('button[aria-label="Закрыть"]')

    // Reopen modal
    await page.click('header >> text=Опрос')

    // Form should be reset
    const q1Value = await page.locator('select[name="question1"]').inputValue()
    expect(q1Value).toBe('')
  })
})

