import { test, expect } from '@playwright/test'

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Sencosmetics/)
    await expect(page.locator('h1')).toContainText('Sencosmetics')
  })

  test('header is visible and sticky', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Scroll down and check header is still visible
    await page.evaluate(() => window.scrollBy(0, 500))
    await expect(header).toBeVisible()
  })

  test('navigation links work correctly', async ({ page }) => {
    // Click "Главная" link
    await page.click('text=Главная')
    await expect(page).toHaveURL('/#home')

    // Wait for scroll animation
    await page.waitForTimeout(500)
  })

  test('hero section is full screen', async ({ page }) => {
    const heroSection = page.locator('#home')
    await expect(heroSection).toBeVisible()

    const viewportHeight = await page.viewportSize()
    const heroHeight = await heroSection.boundingBox()

    expect(heroHeight?.height).toBeGreaterThanOrEqual(viewportHeight!.height * 0.9)
  })

  test('CTA buttons are visible in hero', async ({ page }) => {
    await expect(page.locator('text=Получить консультацию').first()).toBeVisible()
    await expect(page.locator('text=Каталог генераторов')).toBeVisible()
  })
})

