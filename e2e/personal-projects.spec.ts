import { expect, test } from '@playwright/test'

test.describe('Personal projects content', () => {
  test('shows both project cards with their descriptions', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#projects')

    await expect(section.getByText('Astrology & Maritime apps')).toBeVisible()
    await expect(section.getByText('High Volume Analyzer')).toBeVisible()
    await expect(
      section.getByText('Ticket systems including Core Engine, Realtime Gateway, and Smart Bank.')
    ).toBeVisible()
  })

  test('shows the High Volume Analyzer badges', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#projects')

    const badges = ['java', 'spring-boot', 'next.js', 'typescript', 'nestjs', 'golang', 'rest-api', 'kafka', 'redis', 'mongodb']
    for (const badge of badges) {
      await expect(section.getByText(badge, { exact: true }).first()).toBeVisible()
    }
  })
})
