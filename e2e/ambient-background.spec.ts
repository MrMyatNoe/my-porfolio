import { expect, test } from '@playwright/test'

test.describe('Ambient background layer', () => {
  test('sits behind content, fixed, and non-interactive', async ({ page }) => {
    await page.goto('/')
    const bg = page.getByTestId('ambient-background')
    await expect(bg).toBeAttached()

    const computed = await bg.evaluate((el) => {
      const cs = getComputedStyle(el)
      return {
        position: cs.position,
        pointerEvents: cs.pointerEvents,
        ariaHidden: el.getAttribute('aria-hidden'),
      }
    })

    expect(computed.position).toBe('fixed')
    expect(computed.pointerEvents).toBe('none')
    expect(computed.ariaHidden).toBe('true')
  })
})
