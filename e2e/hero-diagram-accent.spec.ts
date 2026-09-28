import { expect, test } from '@playwright/test'

test.describe('Hero diagram accent alternation', () => {
  test('tag pills alternate teal and purple borders', async ({ page }) => {
    await page.goto('/')
    const diagram = page.getByTestId('hero-diagram')

    const springBootColor = await diagram.getByText('spring-boot', { exact: true }).evaluate((el) => getComputedStyle(el).borderColor)
    const kafkaColor = await diagram.getByText('kafka', { exact: true }).evaluate((el) => getComputedStyle(el).borderColor)
    const postgresColor = await diagram.getByText('postgres', { exact: true }).evaluate((el) => getComputedStyle(el).borderColor)
    const restApiColor = await diagram.getByText('rest-api', { exact: true }).evaluate((el) => getComputedStyle(el).borderColor)

    expect(springBootColor).toBe('rgb(47, 184, 174)')
    expect(kafkaColor).toBe('rgb(179, 157, 255)')
    expect(postgresColor).toBe('rgb(47, 184, 174)')
    expect(restApiColor).toBe('rgb(179, 157, 255)')
  })
})
