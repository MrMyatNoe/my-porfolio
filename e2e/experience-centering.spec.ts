import { expect, test } from '@playwright/test'

test.describe('Professional experience section content centering', () => {
  test('timeline content is horizontally centered within the section at desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')

    const section = page.locator('#experience')
    const timeline = page.getByTestId('experience-timeline')

    const sectionBox = await section.boundingBox()
    const timelineBox = await timeline.boundingBox()

    if (!sectionBox || !timelineBox) {
      throw new Error('Expected both #experience and experience-timeline to have a bounding box')
    }

    const leftGap = timelineBox.x - sectionBox.x
    const rightGap = sectionBox.x + sectionBox.width - (timelineBox.x + timelineBox.width)

    expect(Math.abs(leftGap - rightGap)).toBeLessThanOrEqual(2)
  })
})
