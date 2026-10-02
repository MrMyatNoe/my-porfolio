import { expect, test } from '@playwright/test'

test.describe('Case study drawer', () => {
  test('opens the Allianz case study with problem/solution/impact detail', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'View solution' }).first().click()

    const drawer = page.getByRole('dialog')
    await expect(drawer).toBeVisible()
    await expect(drawer.getByText('Problem')).toBeVisible()
    await expect(drawer.getByText('Architecture solution')).toBeVisible()
    await expect(drawer.getByText('NDA-safe summary', { exact: false })).toBeVisible()
  })

  test('closes on Escape', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'View solution' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toBeHidden()
  })

  test('only the Allianz card shows the NDA badge and Private lock', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('NDA Protected')).toHaveCount(1)
    await expect(page.getByText('Private')).toHaveCount(1)
  })
})
