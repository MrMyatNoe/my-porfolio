import { expect, test } from '@playwright/test'

test.describe('Header interactions', () => {
  test('theme toggle changes the page background color', async ({ page }) => {
    await page.goto('/')

    const body = page.locator('body')
    const before = await body.evaluate((el) => getComputedStyle(el).backgroundColor)

    await page.getByRole('button', { name: 'Toggle color theme' }).click()

    await expect
      .poll(() => body.evaluate((el) => getComputedStyle(el).backgroundColor))
      .not.toBe(before)
  })

  test('mobile menu opens, closes on link click, and the link scrolls to its section', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const mobileNav = page.getByTestId('mobile-nav')
    await expect(mobileNav).toBeHidden()

    await page.getByRole('button', { name: 'Toggle menu' }).click()
    await expect(mobileNav).toBeVisible()

    await mobileNav.getByRole('link', { name: 'Experience' }).click()

    await expect(mobileNav).toBeHidden()
    await expect(page).toHaveURL(/#experience$/)
  })

  test('desktop nav links scroll to the matching section', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/')

    await page.getByTestId('desktop-nav').getByRole('link', { name: 'Case studies' }).click()

    await expect(page).toHaveURL(/#case-studies$/)
    await expect(page.locator('#case-studies')).toBeInViewport()
  })
})
