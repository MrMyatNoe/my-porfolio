import { expect, test } from '@playwright/test'

function expectCentered(sectionBox: { x: number; width: number }, containerBox: { x: number; width: number }) {
  const leftGap = containerBox.x - sectionBox.x
  const rightGap = sectionBox.x + sectionBox.width - (containerBox.x + containerBox.width)
  expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(2)
}

test.describe('Section content is centered in a container at wide viewports', () => {
  test('content in each main section has roughly equal left/right margins at 1920px', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 })
    await page.goto('/')

    const sectionIds = ['skills', 'experience', 'case-studies', 'projects', 'learning']
    for (const id of sectionIds) {
      const section = page.locator(`#${id}`)
      const container = section.getByTestId('content-container')

      const sectionBox = await section.boundingBox()
      const containerBox = await container.boundingBox()
      if (!sectionBox || !containerBox) {
        throw new Error(`Expected both #${id} and its content-container to have a bounding box`)
      }

      expectCentered(sectionBox, containerBox)
    }
  })

  test('hero content is centered at 1920px', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1000 })
    await page.goto('/')

    const hero = page.getByTestId('hero-section')
    const container = hero.getByTestId('content-container')

    const heroBox = await hero.boundingBox()
    const containerBox = await container.boundingBox()
    if (!heroBox || !containerBox) {
      throw new Error('Expected both the hero section and its content-container to have a bounding box')
    }

    expectCentered(heroBox, containerBox)
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
