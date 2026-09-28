import { expect, test } from '@playwright/test'

test.describe('Hero and Timeline title consistency', () => {
  test('Hero shows the career-level headline, Timeline shows the literal Allianz job title', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByTestId('hero-section').getByText('Senior Software Engineer', { exact: true })).toBeVisible()

    const timeline = page.getByTestId('experience-timeline')
    await expect(timeline.getByText('Backend Developer', { exact: true })).toBeVisible()
    await expect(timeline.getByText('Senior Backend Developer')).toHaveCount(0)
  })
})
