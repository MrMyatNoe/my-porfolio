import { expect, test } from '@playwright/test'

test.describe('Dark-as-default theme', () => {
  test('loads in dark mode by default', async ({ page }) => {
    await page.goto('/')
    const bg = await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(10, 20, 32)')
  })

  test('toggling switches to the light-mode canvas color', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Toggle color theme' }).click()
    const bg = await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(245, 247, 248)')
  })

  test('body font-family includes Inter', async ({ page }) => {
    await page.goto('/')
    const fontFamily = await page.locator('body').evaluate((el) => getComputedStyle(el).fontFamily)
    expect(fontFamily).toContain('Inter')
  })
})
