import { expect, test } from '@playwright/test'

test.describe('Skills grid responsive breakpoint', () => {
  test('stays single-column below the 1024px lg breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 900 })
    await page.goto('/')

    const columnCount = await page
      .getByTestId('skills-grid')
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length)

    expect(columnCount).toBe(1)
  })

  test('becomes three columns at the 1024px lg breakpoint and above', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/')

    const columnCount = await page
      .getByTestId('skills-grid')
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length)

    expect(columnCount).toBe(3)
  })
})
