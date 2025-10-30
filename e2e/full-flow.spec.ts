import { test, expect } from '@playwright/test'

test.describe('Full User Flow E2E', () => {
  test('complete user journey - contact form', async ({ page }) => {
    // 1. Load homepage
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Sencosmetics')

    // 2. Open contact modal from hero
    await page.click('section#home >> text=Получить консультацию')
    await expect(page.locator('input[name="name"]')).toBeVisible()

    // 3. Fill form
    await page.fill('input[name="name"]', 'E2E Test User')
    await page.fill('input[name="email"]', 'e2e@test.com')
    await page.fill('input[name="phone"]', '+7 999 999 99 99')
    await page.fill('textarea[name="message"]', 'This is an E2E test message for contact form validation')

    // 4. Submit form
    await page.click('button[type="submit"]')

    // 5. Verify success
    await expect(page.locator('text=/Спасибо за обращение/')).toBeVisible({ timeout: 5000 })

    // 6. Wait for auto-close
    await page.waitForTimeout(3500)

    // Modal should be closed
    await expect(page.locator('input[name="name"]')).not.toBeVisible()
  })

  test('complete user journey - survey', async ({ page }) => {
    // 1. Load homepage
    await page.goto('/')

    // 2. Open survey modal from catalog button
    await page.click('section#home >> text=Каталог генераторов')
    await expect(page.locator('select[name="question1"]')).toBeVisible()

    // 3. Answer questions
    await page.selectOption('select[name="question1"]', 'business')
    await page.selectOption('select[name="question2"]', '5-10kw')
    await page.selectOption('select[name="question3"]', '200-500k')

    // 4. Fill contact info
    await page.fill('input[name="phone"]', '+7 999 888 77 66')
    await page.fill('input[name="email"]', 'survey@test.com')

    // 5. Submit
    await page.click('button[type="submit"]')

    // 6. Verify success
    await expect(page.locator('text=/Спасибо за ваши ответы/')).toBeVisible({ timeout: 5000 })

    // 7. Wait for auto-close
    await page.waitForTimeout(3500)

    // Modal should be closed
    await expect(page.locator('select[name="question1"]')).not.toBeVisible()
  })

  test('navigation between sections', async ({ page }) => {
    await page.goto('/')

    // 1. Click "Главная" in header
    await page.click('header >> text=Главная')
    await page.waitForTimeout(500)
    await expect(page.url()).toContain('#home')

    // 2. Open and close contact modal
    await page.click('header >> text=Получить консультацию')
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await page.click('button[aria-label="Закрыть"]')

    // 3. Open and close survey modal
    await page.click('header >> text=Опрос')
    await expect(page.locator('select[name="question1"]')).toBeVisible()
    await page.click('button[aria-label="Закрыть"]')

    // 4. All modals should be closed
    await expect(page.locator('input[name="name"]')).not.toBeVisible()
    await expect(page.locator('select[name="question1"]')).not.toBeVisible()
  })

  test('mobile menu navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')

    // 1. Open mobile menu
    await page.click('button[aria-label="Toggle menu"]')

    // 2. Click contact link
    await page.click('text=Получить консультацию >> nth=1')
    await expect(page.locator('input[name="name"]')).toBeVisible()

    // 3. Close modal
    await page.click('button[aria-label="Закрыть"]')

    // 4. Open mobile menu again
    await page.click('button[aria-label="Toggle menu"]')

    // 5. Click survey link
    await page.click('text=Опрос >> nth=1')
    await expect(page.locator('select[name="question1"]')).toBeVisible()
  })
})

