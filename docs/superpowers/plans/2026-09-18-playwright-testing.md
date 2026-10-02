# Playwright Testing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Playwright end-to-end testing to the my-porfolio Remix site — smoke tests, interaction tests (theme toggle, mobile menu, nav scrolling), a regression test for the 1024px Skills-grid breakpoint bug fixed earlier this session, and a GitHub Actions workflow to run them on every push/PR.

**Architecture:** `@playwright/test` drives a real Chromium browser against the app served by `npm run dev` (Playwright's `webServer` option starts and waits on it automatically — confirmed locally that `remix dev` serves on `http://localhost:3000`). Tests live in a new top-level `e2e/` folder, one spec file per concern. Three components get a small number of `data-testid` attributes added specifically so tests can address elements unambiguously (Header's desktop nav vs. its mobile dropdown render the same link text, and both exist in the DOM at once at narrow widths — text-based locators alone can't tell them apart).

**Tech Stack:** `@playwright/test` (new devDependency), Chromium only for this pass (no Firefox/WebKit projects — keeps CI fast; add more browsers later if cross-browser bugs actually show up). GitHub Actions for CI (`ubuntu-latest`, Node 20).

**Spec:** No separate spec document — scoped directly in this session via two clarifying questions (test coverage: smoke + interaction + regression; CI: yes, GitHub Actions). This plan is self-contained.

## Global Constraints

- Tests run against `npm run dev` (the Remix dev server), not a production build — this repo's `remix.config.js` targets Vercel's serverless format for production builds, which isn't directly servable with a simple local command, so building a full prod-serve pipeline is out of scope for "add Playwright testing."
- Chromium only, no other browser projects, for this initial pass.
- Any `data-testid` added to app source must be the minimum needed to make a specific test locator unambiguous — not sprinkled everywhere speculatively.
- `package.json`'s `"engines"` field currently claims `"node": ">=14"`. Playwright requires Node 18+ to run at all — Task 1 corrects this claim as part of adding the dependency that makes it false, the same way the earlier UI-refactor plan fixed a `tsconfig.json` gap it uncovered.
- No changes to `app/data/resume.ts` or `app/data/career.ts` (this constraint from the prior plan still applies generally — this plan doesn't touch data files anyway).

---

## Task 1: Install and configure Playwright

**Files:**
- Modify: `package.json`
- Create: `playwright.config.ts`
- Modify: `.gitignore`

**Interfaces:**
- Produces: `npm run test:e2e` (runs the full suite headless) and `npm run test:e2e:ui` (opens Playwright's interactive UI mode) — Tasks 2–5 assume these scripts exist. Produces a `webServer` config pointed at `http://localhost:3000` running `npm run dev` — every later test file's `page.goto('/')` and `page.goto('/#...')` calls rely on this base URL being configured, not hardcoded per-test.

- [ ] **Step 1: Install Playwright and its browser binary**

```bash
npm install --save-dev @playwright/test@^1.40.0
npx playwright install chromium
```

- [ ] **Step 2: Fix the `engines` field and add test scripts to `package.json`**

Open `package.json`. Change:

```json
"engines": {
  "node": ">=14"
}
```

to:

```json
"engines": {
  "node": ">=18"
}
```

(Playwright 1.40 requires Node 18+; the old `>=14` claim is now false. This repo's actual dev machine runs Node 22, so nothing about local development changes — this only corrects the documented floor.)

Add two scripts alongside the existing `build`/`dev`:

```json
"scripts": {
  "build": "remix build",
  "dev": "remix dev",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
}
```

- [ ] **Step 3: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
```

`reuseExistingServer: !process.env.CI` means: locally, if you already have `npm run dev` running in another terminal, Playwright reuses it instead of starting a second one; in CI, it always starts a fresh one.

- [ ] **Step 4: Ignore Playwright's local output directories**

Add to `.gitignore` (the file already has a blank-line-separated block for tool caches — add these there):

```
/test-results/
/playwright-report/
/blob-report/
```

- [ ] **Step 5: Verify**

Run: `npx playwright test --list`
Expected: prints `Total: 0 tests in 0 files` (no test files exist yet — this confirms the config itself loads and parses without error, which is the only thing there is to verify before Task 2 adds real tests).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json playwright.config.ts .gitignore
git commit -m "chore: add Playwright and test:e2e scripts"
```

---

## Task 2: Smoke tests

**Files:**
- Modify: `app/components/Header.tsx`
- Create: `e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: `npm run test:e2e` from Task 1.
- Produces: `data-testid="desktop-nav"` on Header's desktop link row — Task 3's interaction tests also scope locators through this testid, so don't rename it later without updating that task too.

- [ ] **Step 1: Add a `data-testid` to Header's desktop nav row**

In `app/components/Header.tsx`, find:

```tsx
<HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
```

Change it to:

```tsx
<HStack spacing={8} display={{ base: 'none', md: 'flex' }} data-testid="desktop-nav">
```

This exists because at narrow viewports the desktop nav's links are still in the DOM (just `display: none`) at the same time the mobile dropdown's identical-text links can be open — a plain `getByRole('link', { name: 'Skills' })` would match two elements and fail Playwright's strict-mode check. Scoping through this testid picks the right one.

- [ ] **Step 2: Write `e2e/smoke.spec.ts`**

```ts
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
```

- [ ] **Step 3: Run the tests**

Run: `npm run test:e2e -- smoke.spec.ts`
Expected: 3 passed.

- [ ] **Step 4: Commit**

```bash
git add app/components/Header.tsx e2e/smoke.spec.ts
git commit -m "test: add homepage smoke tests"
```

---

## Task 3: Interaction tests — theme toggle, mobile menu, nav scrolling

**Files:**
- Modify: `app/components/Header.tsx`
- Create: `e2e/interactions.spec.ts`

**Interfaces:**
- Consumes: `data-testid="desktop-nav"` from Task 2.
- Produces: `data-testid="mobile-nav"` on Header's mobile dropdown `VStack` — nothing later depends on this, but don't remove or rename it without checking this task's tests still pass.

- [ ] **Step 1: Add a `data-testid` to Header's mobile dropdown**

In `app/components/Header.tsx`, find:

```tsx
<VStack
  align="stretch"
  spacing={4}
  px={5}
  pb={5}
  display={{ base: 'flex', md: 'none' }}
  borderTop="1px solid"
  borderColor="border.default"
>
```

Change it to:

```tsx
<VStack
  align="stretch"
  spacing={4}
  px={5}
  pb={5}
  display={{ base: 'flex', md: 'none' }}
  borderTop="1px solid"
  borderColor="border.default"
  data-testid="mobile-nav"
>
```

- [ ] **Step 2: Write `e2e/interactions.spec.ts`**

```ts
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
```

The theme-toggle test uses `expect.poll` rather than a fixed `waitForTimeout` — it retries the background-color read until it changes or the assertion times out, so the test isn't tied to guessing how long a CSS transition or re-render takes.

- [ ] **Step 3: Run the tests**

Run: `npm run test:e2e -- interactions.spec.ts`
Expected: 3 passed.

- [ ] **Step 4: Commit**

```bash
git add app/components/Header.tsx e2e/interactions.spec.ts
git commit -m "test: add header interaction tests (theme toggle, mobile menu, nav scroll)"
```

---

## Task 4: Breakpoint regression test for the Skills grid

**Files:**
- Modify: `app/_partials/Skill/Skill.tsx`
- Create: `e2e/breakpoints.spec.ts`

**Interfaces:**
- Produces: `data-testid="skills-grid"` on the Skills section's `SimpleGrid` — this task's tests are the only consumer.

- [ ] **Step 1: Add a `data-testid` to the Skills grid**

In `app/_partials/Skill/Skill.tsx`, find:

```tsx
<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={9} mt={8}>
```

Change it to:

```tsx
<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={9} mt={8} data-testid="skills-grid">
```

- [ ] **Step 2: Write `e2e/breakpoints.spec.ts`**

```ts
import { expect, test } from '@playwright/test'

test.describe('Skills grid responsive breakpoint', () => {
  test('stays single-column below the 1024px lg breakpoint', async ({ page }) => {
    await page.setViewportSize({ width: 900, height: 900 })
    await page.goto('/')

    const columnCount = await page
      .getByTestId('skills-grid')
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length)

    expect(columnCount).toBe(1)
  })

  test('becomes three columns at the 1024px lg breakpoint and above', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 900 })
    await page.goto('/')

    const columnCount = await page
      .getByTestId('skills-grid')
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.trim().split(/\s+/).length)

    expect(columnCount).toBe(3)
  })
})
```

This is a direct regression test for the bug documented in `docs/DESIGN_SPEC.md`: the original Skill section used Chakra's 2-value array shorthand for `direction`, which maps to `[base, sm]` (480px) rather than `[base, lg]` (1024px), forcing three columns into phone width. `Skill.tsx` now uses the explicit `{ base: 1, lg: 3 }` object form — these two tests fail loudly if that regresses back to array shorthand or a wrong breakpoint key.

- [ ] **Step 3: Run the tests**

Run: `npm run test:e2e -- breakpoints.spec.ts`
Expected: 2 passed.

- [ ] **Step 4: Commit**

```bash
git add app/_partials/Skill/Skill.tsx e2e/breakpoints.spec.ts
git commit -m "test: add regression test for the Skills grid 1024px breakpoint"
```

---

## Task 5: GitHub Actions CI workflow

**Files:**
- Create: `.github/workflows/playwright.yml`

**Interfaces:**
- Consumes: `npm run test:e2e` (Task 1) and every spec file from Tasks 2–4 — this task should run last since it's the first thing that actually exercises the complete suite in a clean environment.

- [ ] **Step 1: Write `.github/workflows/playwright.yml`**

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]

jobs:
  test:
    timeout-minutes: 15
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run Playwright tests
        run: npm run test:e2e

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
```

`if: always()` on the upload step means the HTML report still gets attached to the workflow run even when tests fail, so a failure is debuggable from the Actions UI instead of just "red X."

- [ ] **Step 2: Verify**

This step can't be fully verified locally (there's no local GitHub Actions runner in this repo). Verify what can be checked locally:

Run: `npm ci && npx playwright install --with-deps chromium && npm run test:e2e`
Expected: same pass count as Tasks 2–4 individually (8 tests total: 3 smoke + 3 interaction + 2 breakpoint), confirming the exact command sequence the workflow uses works end to end before trusting it to CI.

Then push this commit and confirm in GitHub's Actions tab that the workflow runs and passes.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/playwright.yml
git commit -m "ci: run Playwright tests on push and pull request"
```

---

## Plan Self-Review Notes

- **Spec coverage:** both clarifying-question answers are covered — "smoke + interaction + regression" maps to Tasks 2/3/4 respectively, "local + GitHub Actions" maps to Task 1 (local scripts) + Task 5 (CI).
- **Placeholder scan:** no TBD/TODO markers; every step has real, runnable code.
- **Type/name consistency check:** `data-testid` values (`desktop-nav`, `mobile-nav`, `skills-grid`) are each introduced once and referenced consistently by the same string in every test that uses them. `npm run test:e2e` / `test:e2e:ui` script names match between Task 1's "Produces" line and every later task's "Consumes"/verify step.
