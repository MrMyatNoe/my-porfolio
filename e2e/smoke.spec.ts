import { expect, test } from '@playwright/test'

test.describe('Homepage smoke test', () => {
  test('loads successfully and renders every section', async ({ page }) => {
    const response = await page.goto('/')
    expect(response?.status()).toBe(200)

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    const sectionIds = ['skills', 'experience', 'case-studies', 'projects', 'learning', 'contact']
    for (const id of sectionIds) {
      await expect(page.locator(`#${id}`)).toBeVisible()
    }
  })

  test('shows the expected section headings', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('heading', { name: 'Skills' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Professional experience' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Architecture case studies' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Personal projects' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Continuous learning' })).toBeVisible()
  })

  test('desktop nav shows all six links at desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    const desktopNav = page.getByTestId('desktop-nav')
    for (const label of ['Skills', 'Experience', 'Case studies', 'Projects', 'Learning', 'Contact']) {
      await expect(desktopNav.getByRole('link', { name: label })).toBeVisible()
    }
  })
})
