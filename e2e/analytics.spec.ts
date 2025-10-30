import { test, expect } from '@playwright/test'

test.describe('Analytics E2E Tests', () => {
  test('GTM script loads in production mode', async ({ page }) => {
    // Note: This test should run against production build
    await page.goto('/')

    // Check if GTM ID is in page source
    const content = await page.content()
    expect(content).toContain('GTM-NFVD9SSW')
  })

  test('page has correct meta tags for SEO', async ({ page }) => {
    await page.goto('/')

    // Check title
    await expect(page).toHaveTitle(/Sencosmetics — Натуральный уход за кожей/)

    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content')
    expect(metaDescription).toContain('генераторов')

    // Check Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    expect(ogTitle).toContain('Sencosmetics')
  })

  test('robots.txt is accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt')
    expect(response?.status()).toBe(200)

    const content = await page.content()
    expect(content).toContain('User-agent')
  })

  test('sitemap.xml is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml')
    expect(response?.status()).toBe(200)
  })

  test('page has correct lang attribute', async ({ page }) => {
    await page.goto('/')
    const htmlLang = await page.locator('html').getAttribute('lang')
    expect(htmlLang).toBe('ru')
  })

  test('smooth scroll is enabled', async ({ page }) => {
    await page.goto('/')
    const scrollBehavior = await page.locator('html').evaluate((el) => 
      window.getComputedStyle(el).scrollBehavior
    )
    expect(scrollBehavior).toBe('smooth')
  })
})

