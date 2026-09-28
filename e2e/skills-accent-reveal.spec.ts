import { expect, test } from '@playwright/test'

test.describe('Skills accent rotation, pill styling, and reduced motion', () => {
  test('category left-border colors rotate teal / purple / amber', async ({ page }) => {
    await page.goto('/')
    const categories = page.getByTestId('skill-category')

    const first = await categories.nth(0).evaluate((el) => getComputedStyle(el).borderLeftColor)
    const second = await categories.nth(1).evaluate((el) => getComputedStyle(el).borderLeftColor)
    const third = await categories.nth(2).evaluate((el) => getComputedStyle(el).borderLeftColor)

    expect(first).toBe('rgb(47, 184, 174)')
    expect(second).toBe('rgb(179, 157, 255)')
    expect(third).toBe('rgb(253, 186, 92)')
  })

  test('skill tags render as fully rounded pills', async ({ page }) => {
    await page.goto('/')
    const kafkaTag = page.getByTestId('skills-grid').getByText('kafka', { exact: true })
    const borderRadius = await kafkaTag.evaluate((el) => getComputedStyle(el).borderRadius)
    expect(borderRadius).toBe('9999px')
  })

  test('skill categories are visible immediately when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByTestId('skill-category').first()).toBeVisible()
  })
})
