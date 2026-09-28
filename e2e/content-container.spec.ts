import { expect, test } from '@playwright/test'

function expectCentered(sectionBox: { x: number; width: number }, containerBox: { x: number; width: number }) {
  const leftGap = containerBox.x - sectionBox.x
  const rightGap = sectionBox.x + sectionBox.width - (containerBox.x + containerBox.width)
  expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(2)
}

test.describe('Section content is centered in a container at wide viewports', () => {
  test('the shared main content container is centered in the viewport at 1920px, and every section renders inside it', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 })
    await page.goto('/')

    const container = page.locator('main').getByTestId('content-container')
    const containerBox = await container.boundingBox()
    if (!containerBox) {
      throw new Error('Expected main\'s content-container to have a bounding box')
    }

    const leftGap = containerBox.x
    const rightGap = 1920 - (containerBox.x + containerBox.width)
    expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(2)

    const sectionIds = ['skills', 'experience', 'case-studies', 'projects', 'learning']
    for (const id of sectionIds) {
      await expect(container.locator(`#${id}`)).toBeVisible()
    }
  })

  test('footer content is centered at 1920px', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 })
    await page.goto('/')

    const footer = page.locator('footer')
    const container = footer.getByTestId('content-container')

    const footerBox = await footer.boundingBox()
    const containerBox = await container.boundingBox()
    if (!footerBox || !containerBox) {
      throw new Error('Expected both footer and its content-container to have a bounding box')
    }

    expectCentered(footerBox, containerBox)
  })

  test('desktop nav content is centered at 1920px', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 })
    await page.goto('/')

    const header = page.locator('header')
    const container = header.getByTestId('content-container')

    const headerBox = await header.boundingBox()
    const containerBox = await container.boundingBox()
    if (!headerBox || !containerBox) {
      throw new Error('Expected both header and its content-container to have a bounding box')
    }

    expectCentered(headerBox, containerBox)
  })
})
