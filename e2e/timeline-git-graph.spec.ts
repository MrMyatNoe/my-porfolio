import { expect, test } from '@playwright/test'

test.describe('Professional experience git-graph timeline', () => {
  test('renders all six roles as commit entries', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('timeline-entry')).toHaveCount(6)
  })

  test('shows the rewritten Allianz achievement bullets and current marker', async ({ page }) => {
    await page.goto('/')
    const timeline = page.getByTestId('experience-timeline')
    await expect(timeline.getByText('#a3f9c2 · current')).toBeVisible()
    await expect(
      timeline.getByText(
        'Architected and implemented high-throughput microservices within an event-driven architecture using Spring Boot and Kafka'
      )
    ).toBeVisible()
  })

  test('only the current role shows the "current" marker', async ({ page }) => {
    await page.goto('/')
    const timeline = page.getByTestId('experience-timeline')
    await expect(timeline.getByText('· current')).toHaveCount(1)
  })
})
