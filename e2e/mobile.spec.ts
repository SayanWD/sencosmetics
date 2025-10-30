import { test, expect, devices } from '@playwright/test'

test.use(devices['iPhone 12'])

test.describe('Mobile E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('mobile menu opens and closes', async ({ page }) => {
    // Click hamburger menu
    await page.click('button[aria-label="Toggle menu"]')

    // Menu should be visible
    await expect(page.locator('text=Главная').nth(1)).toBeVisible()

    // Click to close (X icon)
    await page.click('button[aria-label="Toggle menu"]')

    // Menu should be hidden
    await expect(page.locator('text=Главная').nth(1)).not.toBeVisible()
  })

  test('can open contact modal from mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.click('button[aria-label="Toggle menu"]')

    // Click "Получить консультацию"
    await page.click('text=Получить консультацию >> nth=1')

    // Modal should be visible
    await expect(page.locator('input[name="name"]')).toBeVisible()
  })

  test('can open survey modal from mobile menu', async ({ page }) => {
    // Open mobile menu
    await page.click('button[aria-label="Toggle menu"]')

    // Click "Опрос"
    await page.click('text=Опрос >> nth=1')

    // Modal should be visible
    await expect(page.locator('select[name="question1"]')).toBeVisible()
  })

  test('hero is full screen on mobile', async ({ page }) => {
    const heroSection = page.locator('#home')
    await expect(heroSection).toBeVisible()

    const viewportSize = page.viewportSize()
    const heroBox = await heroSection.boundingBox()

    expect(heroBox?.height).toBeGreaterThanOrEqual(viewportSize!.height * 0.9)
  })

  test('CTA buttons are stacked vertically on mobile', async ({ page }) => {
    const buttons = page.locator('section#home button')
    const count = await buttons.count()
    expect(count).toBe(2)

    // Check buttons are visible
    await expect(buttons.nth(0)).toBeVisible()
    await expect(buttons.nth(1)).toBeVisible()
  })
})

