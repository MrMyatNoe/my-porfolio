import { expect, test } from '@playwright/test'

test.describe('Hero diagram accent alternation', () => {
  test('tag pills alternate teal and purple borders', async ({ page }) => {
    await page.goto('/')
    const diagram = page.getByTestId('hero-diagram')

    const teal = 'rgb(47, 184, 174)'
    const purple = 'rgb(179, 157, 255)'
    const expected: Array<[string, string]> = [
      ['spring-boot', teal],
      ['next.js', purple],
      ['kubernetes', teal],
      ['aws', purple],
      ['system-design', purple],
      ['event-driven', teal],
      ['api-design', teal],
      ['microservices', purple],
    ]

    for (const [label, color] of expected) {
      const actual = await diagram.getByText(label, { exact: true }).evaluate((el) => getComputedStyle(el).borderColor)
      expect(actual).toBe(color)
    }
  })
})
