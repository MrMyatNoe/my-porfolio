import { expect, test } from '@playwright/test'

test.describe('Continuous learning content', () => {
  test('shows the three real learning entries with status and source', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#learning')

    await expect(section.getByText('Kubernetes for Developers (CKAD Track)')).toBeVisible()
    await expect(section.getByText('AWS Solutions Architect – Associate Prep')).toBeVisible()
    await expect(section.getByText('Designing Data-Intensive Applications')).toBeVisible()
    await expect(section.getByText('In Progress')).toHaveCount(2)
    await expect(section.getByText('Reading', { exact: true })).toHaveCount(1)
    await expect(section.getByText('Udemy')).toBeVisible()
    await expect(section.getByText('LinkedIn Learning')).toBeVisible()
    await expect(section.getByText('Book — Kleppmann')).toBeVisible()
  })

  test('no longer shows the bracketed placeholder text', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('[Certification name]')).toHaveCount(0)
  })
})
