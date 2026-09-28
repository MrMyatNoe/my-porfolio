# Dark-Navy / Multi-Accent Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reskin the live portfolio (Remix + Chakra UI) to the dark-navy, teal/purple/amber accent aesthetic explored in `docs/tmn-portfolio-concept.html`, while keeping the existing light/dark toggle, all real content, and every currently-passing Playwright test green.

**Architecture:** A cross-cutting theme change (new semantic color tokens, dark-as-default color mode, Inter body font, an ambient background layer, a shared scroll-reveal wrapper) lands first, since every later task's styling depends on it. Each subsequent task then retones or restructures exactly one existing section file (or adds one new section), reusing the shared `Reveal` component for motion. No new runtime dependencies — `framer-motion` and `@chakra-ui/react`'s own `Drawer` are already installed and cover every new interaction (scroll-reveal, focus-trapped drawer) without hand-rolled JS.

**Tech Stack:** Remix, Chakra UI v2, framer-motion v6, react-icons v4 (`lu` Lucide set, `si` Simple Icons set), Playwright for all tests (this repo has no unit-test framework — every task's test is an `e2e/*.spec.ts` file).

**Spec:** `docs/DESIGN_SPEC.md`, Revision 3 (§R3.1–R3.5), committed at `7c62417`.

## Global Constraints

- Purple (`text.accentPurple`) and amber (`text.accentAmber`) accent tokens are **decorative only** — never used to mark something as clickable. The existing interactive-color rule (DESIGN_SPEC §1) stays: solid teal fill = one primary action per view, teal border+text = secondary actions/links, neutral = non-actionable.
- Dark mode is the **default** (`config.initialColorMode: 'dark'`), but the light/dark toggle must keep working in both directions — do not remove `useColorMode`/the toggle button.
- **No new factual or quantified claims** beyond what's already live today (e.g. no invented uptime percentages, no new architecture specifics for the NDA'd Allianz work). Timeline bullets and case-study drawer copy are restructurings of existing text, not new research.
- Timeline's `data-testid="experience-timeline"` and its centered `maxW="760px"` + `mx="auto"` layout (fixed earlier in this project) must survive the git-graph rewrite unchanged.
- Icon system stays as established in DESIGN_SPEC §1: Simple Icons (`react-icons/si`) for technology/brand marks, Lucide (`react-icons/lu`) for generic/UI icons. No new icon library.
- The case-study detail panel uses Chakra's own `Drawer` (focus trap, `Escape`-to-close, `aria-modal` built in) — do not hand-roll a custom modal/overlay.
- Scroll-reveal motion uses `framer-motion`'s `whileInView` + `useReducedMotion` (already a dependency) via one shared `Reveal` component — do not hand-roll `IntersectionObserver`.

## Review Focus

- **Reduced-motion users** must see every `Reveal`-wrapped element fully visible immediately, never stuck at `opacity: 0` — pinned by a `page.emulateMedia({ reducedMotion: 'reduce' })` test in Task 3.
- **Toggling color mode** after the dark-default load must still flip every retoned surface (canvas/surface/border) correctly in both directions, not just some tokens — pinned in Task 1.
- **NDA scoping** — the "NDA Protected" badge and "Private" lock must appear on the Allianz card only, never on Nan Yan, and the drawer must never show text beyond what's already on the card — pinned by count/content assertions in Task 6.
- **Keyboard users** must be able to close the case-study drawer with `Escape` without getting trapped — pinned in Task 6.
- **Regression of the existing test suite** — the git-graph Timeline rewrite (Task 5) and every other task must keep `e2e/experience-centering.spec.ts`, `e2e/smoke.spec.ts`, `e2e/breakpoints.spec.ts`, and `e2e/interactions.spec.ts` green; the plan's last step is a full-suite run, not just the new spec files.

---

## Task 1: Theme foundation — accent tokens, dark-as-default, Inter body font

**Files:**
- Modify: `app/theme.tsx`
- Modify: `app/root.tsx`
- Test: `e2e/theme-foundation.spec.ts`

**Interfaces:**
- Produces: semantic color tokens `text.accentPurple`, `text.accentAmber` (used by Tasks 3, 4, 6, 7); dark-mode values for `bg.canvas` (`#0A1420`), `bg.surface` (`#111F33`), `bg.surfaceRaised` (`#16283F`), `border.default` (`#223350`); `theme.fonts.body = "'Inter', sans-serif"`.

- [ ] **Step 1: Write the failing test**

```ts
// e2e/theme-foundation.spec.ts
import { expect, test } from '@playwright/test'

test.describe('Dark-as-default theme', () => {
  test('loads in dark mode by default', async ({ page }) => {
    await page.goto('/')
    const bg = await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(10, 20, 32)')
  })

  test('toggling switches to the light-mode canvas color', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: 'Toggle color theme' }).click()
    const bg = await page.locator('body').evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(245, 247, 248)')
  })

  test('body font-family includes Inter', async ({ page }) => {
    await page.goto('/')
    const fontFamily = await page.locator('body').evaluate((el) => getComputedStyle(el).fontFamily)
    expect(fontFamily).toContain('Inter')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx playwright test e2e/theme-foundation.spec.ts`
Expected: all 3 FAIL — first two because the page currently defaults to light mode (`initialColorMode` unset) with the old dark hex values, third because the body font is still `'IBM Plex Sans'`.

- [ ] **Step 3: Update `app/theme.tsx`**

```tsx
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  semanticTokens: {
    colors: {
      'bg.canvas': { default: '#F5F7F8', _dark: '#0A1420' },
      'bg.surface': { default: '#FFFFFF', _dark: '#111F33' },
      'bg.surfaceRaised': { default: '#EEF2F3', _dark: '#16283F' },
      'border.default': { default: '#DCE3E7', _dark: '#223350' },
      'text.primary': { default: '#132029', _dark: '#E7EDF0' },
      'text.secondary': { default: '#51636D', _dark: '#93A5B1' },
      'text.accent': { default: '#0E8074', _dark: '#2FB8AE' },
      'text.accentPurple': { default: '#6B46C1', _dark: '#B39DFF' },
      'text.accentAmber': { default: '#B7791F', _dark: '#FDBA5C' },
    },
  },
  styles: {
    global: {
      html: {
        scrollPaddingTop: '72px',
      },
      body: {
        bg: 'bg.canvas',
        color: 'text.primary',
      },
      '*:focus-visible': {
        outline: '2px solid',
        outlineColor: 'text.accent',
        outlineOffset: '2px',
      },
      '@media (prefers-reduced-motion: no-preference)': {
        '.hero-line': {
          strokeDasharray: 241,
          strokeDashoffset: 241,
          animation: 'drawLine 0.7s ease-out forwards',
        },
        '.hero-avatar': {
          opacity: 0,
          animation: 'revealPop 0.5s ease-out 0.55s forwards',
        },
        '.hero-tag': {
          opacity: 0,
          animation: 'revealPop 0.4s ease-out forwards',
        },
      },
      '@keyframes drawLine': {
        to: { strokeDashoffset: 0 },
      },
      '@keyframes revealPop': {
        from: { opacity: 0, transform: 'scale(0.85)' },
        to: { opacity: 1, transform: 'scale(1)' },
      },
    },
  },
})

export default theme
```

- [ ] **Step 4: Update `app/root.tsx`** — add Inter to the font link (drop IBM Plex Sans, no longer referenced anywhere), and mount `ColorModeScript` as the first child of `<body>` so the dark default paints correctly before hydration

```tsx
import styles from '~/styles/global.css'

import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import theme from './theme'

import type { MetaFunction } from '@remix-run/node'
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Thet Myat Noe',
  viewport: 'width=device-width,initial-scale=1',
})
export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
  },
  { rel: 'stylesheet', href: styles },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <Box
            as="a"
            href="#main-content"
            position="absolute"
            left="-9999px"
            top="auto"
            zIndex={2000}
            bg="text.accent"
            color="bg.canvas"
            px={4}
            py={2}
            borderRadius="6px"
            fontSize="14px"
            fontWeight="600"
            _focus={{ left: '16px', top: '16px' }}
          >
            Skip to content
          </Box>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ChakraProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx playwright test e2e/theme-foundation.spec.ts`
Expected: PASS (3/3)

- [ ] **Step 6: Run the full suite to check for regressions**

Run: `npx playwright test`
Expected: all previously-passing specs stay green (`interactions.spec.ts`'s toggle test is direction-agnostic, so it's unaffected by the new default).

- [ ] **Step 7: Commit**

```bash
git add app/theme.tsx app/root.tsx e2e/theme-foundation.spec.ts
git commit -m "feat: dark-navy default theme with teal/purple/amber accent tokens"
```

---

## Task 2: Ambient dot-grid + glow background

**Files:**
- Create: `app/components/Background.tsx`
- Modify: `app/root.tsx`
- Test: `e2e/ambient-background.spec.ts`

**Interfaces:**
- Consumes: nothing new (uses existing theme tokens indirectly via raw rgba, matching the concept's fixed palette regardless of color mode — the glow is a dark-theme effect and stays subtle/invisible-by-design in light mode).
- Produces: `Background` component from `~/components/Background`, rendered once in `root.tsx`.

- [ ] **Step 1: Write the failing test**

```ts
// e2e/ambient-background.spec.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/ambient-background.spec.ts`
Expected: FAIL — `getByTestId('ambient-background')` finds nothing.

- [ ] **Step 3: Create `app/components/Background.tsx`**

```tsx
import { Box } from '@chakra-ui/react'

export function Background() {
  return (
    <Box
      data-testid="ambient-background"
      aria-hidden="true"
      position="fixed"
      inset={0}
      zIndex={-1}
      pointerEvents="none"
      sx={{
        backgroundImage: [
          'radial-gradient(ellipse 900px 500px at 15% -10%, rgba(45,212,191,0.10), transparent 60%)',
          'radial-gradient(ellipse 700px 500px at 90% 10%, rgba(179,157,255,0.08), transparent 60%)',
          'radial-gradient(rgba(140,160,184,0.10) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: 'auto, auto, 26px 26px',
      }}
    />
  )
}
```

- [ ] **Step 4: Render it once in `app/root.tsx`** — add the import and place `<Background />` as the first child inside `<ChakraProvider>`, before the skip-to-content link

```tsx
import { Background } from '~/components/Background'
import styles from '~/styles/global.css'
// ...rest of imports unchanged

// inside <ChakraProvider theme={theme}>:
        <ChakraProvider theme={theme}>
          <Background />
          <Box
            as="a"
            href="#main-content"
            // ...unchanged
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx playwright test e2e/ambient-background.spec.ts`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add app/components/Background.tsx app/root.tsx e2e/ambient-background.spec.ts
git commit -m "feat: add fixed dot-grid and glow ambient background layer"
```

---

## Task 3: Reveal-on-scroll wrapper + Skills pill restyle with rotating accent

**Files:**
- Create: `app/components/Reveal.tsx`
- Modify: `app/_partials/Skill/Skill.tsx`
- Test: `e2e/skills-accent-reveal.spec.ts`

**Interfaces:**
- Produces: `Reveal({ children: ReactNode, delay?: number })` from `~/components/Reveal` — wraps children in a `framer-motion` fade/slide-up-on-scroll animation, or renders children unwrapped when `prefers-reduced-motion: reduce` is set. Consumed by Tasks 5, 6, 7, 8.
- Consumes: `text.accent` / `text.accentPurple` / `text.accentAmber` tokens from Task 1.

- [ ] **Step 1: Write the failing test**

```ts
// e2e/skills-accent-reveal.spec.ts
import { expect, test } from '@playwright/test'

test.describe('Skills accent rotation, pill styling, and reduced motion', () => {
  test('category left-border colors rotate teal / purple / amber', async ({ page }) => {
    await page.goto('/')
    const categories = page.getByTestId('skill-category')

    const first = await categories.nth(0).evaluate((el) => getComputedStyle(el).borderLeftColor)
    const second = await categories.nth(1).evaluate((el) => getComputedStyle(el).borderLeftColor)
    const third = await categories.nth(2).evaluate((el) => getComputedStyle(el).borderLeftColor)

    expect(first).toBe('rgb(47, 184, 174)')
    expect(second).toBe('rgb(179, 157, 255)')
    expect(third).toBe('rgb(253, 186, 92)')
  })

  test('skill tags render as fully rounded pills', async ({ page }) => {
    await page.goto('/')
    const kafkaTag = page.getByTestId('skills-grid').getByText('kafka', { exact: true })
    const borderRadius = await kafkaTag.evaluate((el) => getComputedStyle(el).borderRadius)
    expect(borderRadius).toBe('9999px')
  })

  test('skill categories are visible immediately when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await expect(page.getByTestId('skill-category').first()).toBeVisible()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npx playwright test e2e/skills-accent-reveal.spec.ts`
Expected: FAIL — `skill-category` testid doesn't exist yet, so all three tests fail (first two on the missing locator, third because there's nothing new to assert visibility of beyond what already renders instantly).

- [ ] **Step 3: Create `app/components/Reveal.tsx`**

```tsx
import type { ReactNode } from 'react'
import { chakra } from '@chakra-ui/react'
import { motion, useReducedMotion } from 'framer-motion'

const MotionBox = chakra(motion.div)

interface RevealProps {
  children: ReactNode
  delay?: number
}

export function Reveal({ children, delay = 0 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <MotionBox
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </MotionBox>
  )
}
```

- [ ] **Step 4: Rewrite `app/_partials/Skill/Skill.tsx`**

```tsx
import type { IconType } from 'react-icons'
import {
  LuCheckCircle,
  LuDatabase,
  LuMonitor,
  LuNetwork,
  LuRocket,
  LuServer,
  LuSmartphone,
} from 'react-icons/lu'
import { Reveal } from '~/components/Reveal'

import { Box, Heading, HStack, SimpleGrid, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react'

interface SkillCategory {
  label: string
  icon: IconType
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  { label: 'Languages & backend', icon: LuServer, skills: ['java', 'spring-boot', 'typescript', 'node.js', 'nestjs'] },
  { label: 'APIs & messaging', icon: LuNetwork, skills: ['rest-api', 'graphql', 'kafka', 'microservices'] },
  { label: 'Databases', icon: LuDatabase, skills: ['postgresql', 'mysql', 'mongodb', 'mssql', 'oracle-db'] },
  { label: 'Frontend', icon: LuMonitor, skills: ['react', 'remix', 'next.js', 'chakra-ui'] },
  { label: 'Mobile', icon: LuSmartphone, skills: ['flutter', 'firebase', 'admob'] },
  { label: 'Testing & quality', icon: LuCheckCircle, skills: ['unit-testing', 'contract-testing', 'playwright'] },
  { label: 'Delivery & DevOps', icon: LuRocket, skills: ['github-actions', 'ci/cd', 'agile'] },
]

const ACCENTS = ['text.accent', 'text.accentPurple', 'text.accentAmber'] as const

export function Skill() {
  return (
    <Box as="section" id="skills" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Skills
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Technologies I work with in production, grouped by where they sit in a system.
      </Text>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={9} mt={8} data-testid="skills-grid">
        {SKILL_CATEGORIES.map(({ label, icon: CategoryIcon, skills }, index) => {
          const accent = ACCENTS[index % ACCENTS.length]
          return (
            <Reveal key={label} delay={index * 0.05}>
              <Box borderLeft="2px solid" borderColor={accent} pl={4} data-testid="skill-category">
                <HStack spacing={2} borderBottom="1px solid" borderColor="border.default" pb={2.5}>
                  <CategoryIcon size={16} color={`var(--chakra-colors-${accent.replace('.', '-')})`} />
                  <Text fontFamily="heading" fontSize="15px" fontWeight="600">
                    {label}
                  </Text>
                </HStack>
                <Wrap spacing={2} mt={3.5}>
                  {skills.map((skill) => (
                    <WrapItem key={skill}>
                      <Tag fontFamily="mono" fontSize="12.5px" color="text.secondary" bg="bg.surfaceRaised" border="1px solid" borderColor="border.default" borderRadius="full" px={4} py={1.5}>
                        {skill}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </Reveal>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx playwright test e2e/skills-accent-reveal.spec.ts`
Expected: PASS (3/3)

- [ ] **Step 6: Run `e2e/breakpoints.spec.ts` to confirm no regression**

Run: `npx playwright test e2e/breakpoints.spec.ts`
Expected: PASS — `skills-grid` testid and column-count behavior are unchanged.

- [ ] **Step 7: Commit**

```bash
git add app/components/Reveal.tsx app/_partials/Skill/Skill.tsx e2e/skills-accent-reveal.spec.ts
git commit -m "feat: add Reveal scroll-in wrapper; restyle Skills as rotating-accent pill tags"
```

---

## Task 4: Hero diagram — alternating teal/purple tag accents

**Files:**
- Modify: `app/_partials/Hero/HeroDiagram.tsx`
- Test: `e2e/hero-diagram-accent.spec.ts`

**Interfaces:**
- Consumes: `text.accent`, `text.accentPurple` from Task 1.

Note: the concept mockup's connector *lines* are neutral gray (`stroke:var(--line)`), same as the current implementation — only its animated "packet" dots are teal, and it has no packet dots on the static Hero diagram used here. This task keeps the four connector lines neutral (matching both today's code and the mockup) and applies the multi-accent system to the four tech-tag pills instead, alternating teal/purple — the smallest faithful reading of DESIGN_SPEC §R3.2's "connector lines/nodes/pills move ... to teal/purple," scoped to what the visual reference actually supports.

- [ ] **Step 1: Write the failing test**

```ts
// e2e/hero-diagram-accent.spec.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/hero-diagram-accent.spec.ts`
Expected: FAIL — `hero-diagram` testid doesn't exist yet, and today's tag borders are all `border.default` (neutral), not teal/purple.

- [ ] **Step 3: Update `app/_partials/Hero/HeroDiagram.tsx`**

```tsx
import { Box } from '@chakra-ui/react'

const CONNECTOR_ENDPOINTS: Array<[number, number]> = [
  [70, 70],
  [410, 70],
  [70, 410],
  [410, 410],
]

const TAGS = [
  { label: 'spring-boot', accent: 'text.accent', pos: { left: { base: '2px', lg: '4px' }, top: { base: '28px', lg: '50px' } } },
  { label: 'kafka', accent: 'text.accentPurple', pos: { right: { base: '2px', lg: '4px' }, top: { base: '28px', lg: '50px' } } },
  { label: 'postgres', accent: 'text.accent', pos: { left: { base: '2px', lg: '4px' }, bottom: { base: '28px', lg: '50px' } } },
  { label: 'rest-api', accent: 'text.accentPurple', pos: { right: { base: '2px', lg: '4px' }, bottom: { base: '28px', lg: '50px' } } },
] as const

const tagStyle = {
  w: { base: '76px', lg: '132px' },
  h: { base: '24px', lg: '40px' },
  borderRadius: { base: '12px', lg: '20px' },
  border: '1px solid',
  bg: 'bg.surface',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'mono',
  fontSize: { base: '9px', lg: '12px' },
} as const

export function HeroDiagram({ name }: { name: string }) {
  return (
    <Box position="relative" w={{ base: '280px', lg: '480px' }} h={{ base: '280px', lg: '480px' }} flexShrink={0} mx="auto" data-testid="hero-diagram">
      <Box as="svg" position="absolute" inset={0} viewBox="0 0 480 480" w="100%" h="100%">
        {CONNECTOR_ENDPOINTS.map(([x, y], index) => (
          <Box
            as="line"
            key={`${x}-${y}`}
            className="hero-line"
            style={{ animationDelay: `${0.05 + index * 0.12}s` }}
            x1={240}
            y1={240}
            x2={x}
            y2={y}
            stroke="var(--chakra-colors-border-default)"
            strokeWidth={1}
          />
        ))}
      </Box>

      <Box
        as="img"
        src="/pp.jpg"
        alt={name}
        className="hero-avatar"
        position="absolute"
        left={{ base: '103px', lg: '176px' }}
        top={{ base: '103px', lg: '176px' }}
        w={{ base: '74px', lg: '128px' }}
        h={{ base: '74px', lg: '128px' }}
        borderRadius="full"
        objectFit="cover"
        border="2px solid"
        borderColor="text.accent"
      />

      {TAGS.map(({ label, accent, pos }, index) => (
        <Box
          key={label}
          className="hero-tag"
          style={{ animationDelay: `${0.2 + index * 0.12}s` }}
          position="absolute"
          {...pos}
          {...tagStyle}
          borderColor={accent}
          color={accent}
        >
          {label}
        </Box>
      ))}
    </Box>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test e2e/hero-diagram-accent.spec.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add app/_partials/Hero/HeroDiagram.tsx e2e/hero-diagram-accent.spec.ts
git commit -m "feat: alternate teal/purple accents on Hero diagram tag pills"
```

---

## Task 5: Professional Experience — git-graph timeline

**Files:**
- Modify: `app/data/career.ts`
- Modify: `app/components/Card.tsx`
- Modify: `app/_partials/Timeline/Timeline.tsx`
- Test: `e2e/timeline-git-graph.spec.ts`

**Interfaces:**
- Consumes: `Reveal` from Task 3.
- Produces: `Milestone` interface (`id`, `hash`, `current?`, `company`, `role`, `date`, `bullets: string[]`, `badges: string[]`) from `~/data/career`; `Card` now takes those same fields as props (replacing the old `categories`/`description`/`icon` shape).

- [ ] **Step 1: Write the failing test**

```ts
// e2e/timeline-git-graph.spec.ts
import { expect, test } from '@playwright/test'

test.describe('Professional experience git-graph timeline', () => {
  test('renders all six roles as commit entries', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('timeline-entry')).toHaveCount(6)
  })

  test('shows the rewritten Allianz achievement bullets and current marker', async ({ page }) => {
    await page.goto('/')
    const timeline = page.getByTestId('experience-timeline')
    await expect(timeline.getByText('#a3f9c2 · current')).toBeVisible()
    await expect(
      timeline.getByText(
        'Architected and implemented high-throughput microservices within an event-driven architecture using Spring Boot and Kafka'
      )
    ).toBeVisible()
  })

  test('only the current role shows the "current" marker', async ({ page }) => {
    await page.goto('/')
    const timeline = page.getByTestId('experience-timeline')
    await expect(timeline.getByText('· current')).toHaveCount(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/timeline-git-graph.spec.ts`
Expected: FAIL — `timeline-entry` testid doesn't exist, and the Allianz bullet text isn't in the current one-line description.

- [ ] **Step 3: Rewrite `app/data/career.ts`**

```ts
export interface Milestone {
  id: number
  hash: string
  current?: boolean
  company: string
  role: string
  date: string
  bullets: string[]
  badges: string[]
}

export const milestones: Milestone[] = [
  {
    id: 1,
    hash: 'a3f9c2',
    current: true,
    company: 'Allianz Technology Thailand',
    role: 'Backend Developer / Architect Focus',
    date: 'July 2022 - Present',
    bullets: [
      'Architected and implemented high-throughput microservices within an event-driven architecture using Spring Boot and Kafka',
      'Led system design and integration of Kafka message brokers to handle high-volume data streaming for underwriting engines',
      'Established automated DevSecOps pipelines via GitHub Actions using contract and Playwright testing',
    ],
    badges: ['Java', 'Spring Boot', 'Kafka', 'Microservices'],
  },
  {
    id: 2,
    hash: '4b8fd1',
    company: 'Personal Project',
    role: 'Fullstack Developer, Product Owner & Designer',
    date: 'December 2021 - Present',
    bullets: [
      'Built and shipped a Flutter mobile app with a companion Next.js/Chakra UI admin console, backed by Firebase for auth, data, and real-time sync',
      'Owned the full product lifecycle solo — design, development, and AdMob monetization',
      'Automated build and release checks with GitHub Actions',
    ],
    badges: ['Flutter', 'Firebase', 'Next.js', 'Chakra UI'],
  },
  {
    id: 3,
    hash: 'c291e4',
    company: 'IHRP',
    role: 'Freelance Frontend Developer',
    date: 'December 2021 - January 2022',
    bullets: [
      'Built the blog frontend in Next.js and Chakra UI, consuming a GraphQL API for content',
      'Delivered the engagement independently as a freelance contractor on a fixed scope',
    ],
    badges: ['Next.js', 'Chakra UI', 'GraphQL', 'Freelance'],
  },
  {
    id: 4,
    hash: '7e12b8',
    company: 'Nanyan Platform, Myanmar',
    role: 'Fullstack Developer',
    date: 'October 2020 - April 2022',
    bullets: [
      'Carried a multi-phase e-commerce and retail platform through four stack iterations — Spring Boot/Hibernate, then NestJS/Prisma, then a Remix + Chakra UI frontend',
      "Worked across backend, frontend, and full-stack roles as the platform's needs shifted phase to phase",
      'Mentored junior developers and helped establish database-modeling and API-integration practices',
    ],
    badges: ['Spring Boot', 'NestJS', 'Prisma', 'Remix'],
  },
  {
    id: 5,
    hash: 'd6a058',
    company: 'MBC Software Development, Myanmar',
    role: 'Fullstack Developer',
    date: 'June 2018 - December 2020',
    bullets: [
      'Built and maintained POS, retail, accounting, and clinic management systems in Java, GWT, and Spring Boot',
      "Shipped two mobile applications (Clinic App, Privilege App) as part of the platform's mobile expansion",
      'Wrote stored procedures and Jasper reports for operational reporting',
    ],
    badges: ['Java', 'Spring Boot', 'GWT', 'MSSQL'],
  },
  {
    id: 6,
    hash: '9f3c71',
    company: 'FPT Software, Myanmar',
    role: 'Junior Java Developer',
    date: 'March 2017 - August 2017',
    bullets: [
      'Added features to and maintained an existing J2EE framework-based application',
      'Worked with Oracle Database for data persistence in a production maintenance role',
    ],
    badges: ['Java', 'J2EE', 'Oracle DB'],
  },
]
```

- [ ] **Step 4: Rewrite `app/components/Card.tsx`**

```tsx
import { Box, HStack, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'

interface CardProps {
  hash: string
  current?: boolean
  company: string
  role: string
  date: string
  bullets: string[]
  badges: string[]
}

const Card = ({ hash, current, company, role, date, bullets, badges }: CardProps) => {
  return (
    <VStack align="stretch" spacing={2} flex={1} data-testid="timeline-entry">
      <Text fontFamily="mono" fontSize="12px" color="text.accent">
        #{hash}
        {current ? ' · current' : ''}
      </Text>
      <HStack spacing={3} flexWrap="wrap" align="baseline">
        <Text fontFamily="heading" fontWeight="600" fontSize="17px">
          {company}
        </Text>
        <Text fontFamily="mono" fontSize="12px" color="text.secondary">
          {date}
        </Text>
      </HStack>
      <Text fontSize="14px" color="text.secondary">
        {role}
      </Text>
      <VStack as="ul" align="stretch" spacing={1.5} mt={1} sx={{ listStyle: 'none' }}>
        {bullets.map((bullet) => (
          <Box
            as="li"
            key={bullet}
            fontSize="13.5px"
            color="text.primary"
            pl={4}
            position="relative"
            lineHeight="1.5"
            _before={{ content: '"+"', position: 'absolute', left: 0, color: 'text.accent', fontFamily: 'mono' }}
          >
            {bullet}
          </Box>
        ))}
      </VStack>
      <Wrap spacing={2} mt={1}>
        {badges.map((badge) => (
          <WrapItem key={badge}>
            <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="bg.surfaceRaised" border="none" borderRadius="full" px={3} py={1}>
              {badge}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  )
}

export { Card }
```

- [ ] **Step 5: Update `app/_partials/Timeline/Timeline.tsx`** — keep the existing `data-testid="experience-timeline"` and centered `maxW`, add the glow to the spine dot, and wrap each entry in `Reveal`

```tsx
import { Card } from '~/components/Card'
import { Reveal } from '~/components/Reveal'
import { milestones } from '~/data/career'

import { Box, Heading, VStack } from '@chakra-ui/react'

export function Timeline() {
  return (
    <Box as="section" id="experience" px={[5, 8, 16]} py={[10, 10, 14]}>
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Professional experience
      </Heading>
      <VStack data-testid="experience-timeline" align="stretch" spacing={0} maxW="760px" mt={9} mx="auto">
        {milestones.map((milestone, index) => {
          const isLast = index === milestones.length - 1
          return (
            <Reveal key={milestone.id} delay={index * 0.05}>
              <Box display="flex" gap={[4, 6]} pb={isLast ? 0 : 6}>
                <Box w={[5, 6]} flexShrink={0} position="relative">
                  {!isLast && (
                    <Box position="absolute" left="50%" top={0} bottom="-24px" w="1px" bg="border.default" />
                  )}
                  <Box
                    position="relative"
                    w={['10px', '12px']}
                    h={['10px', '12px']}
                    borderRadius="full"
                    bg="text.accent"
                    border="2px solid"
                    borderColor="bg.canvas"
                    mx="auto"
                    mt={1}
                    boxShadow="0 0 10px var(--chakra-colors-text-accent)"
                  />
                </Box>
                <Card {...milestone} />
              </Box>
            </Reveal>
          )
        })}
      </VStack>
    </Box>
  )
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `npx playwright test e2e/timeline-git-graph.spec.ts`
Expected: PASS (3/3)

- [ ] **Step 7: Run the centering regression test**

Run: `npx playwright test e2e/experience-centering.spec.ts e2e/smoke.spec.ts`
Expected: PASS — the testid/centering fix and the "Professional experience" heading assertion both still hold.

- [ ] **Step 8: Commit**

```bash
git add app/data/career.ts app/components/Card.tsx app/_partials/Timeline/Timeline.tsx e2e/timeline-git-graph.spec.ts
git commit -m "feat: rewrite Professional Experience as a git-graph commit timeline"
```

---

## Task 6: Architecture Case Studies — thumbnails, NDA badge/lock, detail drawer

**Files:**
- Create: `app/components/CaseStudyThumb.tsx`
- Modify: `app/_partials/CaseStudies/CaseStudies.tsx`
- Test: `e2e/case-study-drawer.spec.ts`

**Interfaces:**
- Consumes: `Reveal` from Task 3; `text.accentAmber` from Task 1.
- Produces: `CaseStudyThumb({ nda: boolean })` from `~/components/CaseStudyThumb`.

- [ ] **Step 1: Write the failing test**

```ts
// e2e/case-study-drawer.spec.ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/case-study-drawer.spec.ts`
Expected: FAIL — there is no "View solution" button today, so all three tests fail on the missing element.

- [ ] **Step 3: Create `app/components/CaseStudyThumb.tsx`** (generic decorative diagram, no real system topology)

```tsx
import { LuLock } from 'react-icons/lu'

import { Box, HStack, Text } from '@chakra-ui/react'

export function CaseStudyThumb({ nda }: { nda: boolean }) {
  return (
    <Box position="relative" w="100%" h="150px" bg="bg.surface" overflow="hidden">
      <Box as="svg" viewBox="0 0 260 100" w="92%" h="auto" mx="auto" mt={6} display="block">
        <rect x="4" y="34" width="66" height="30" rx="5" fill="var(--chakra-colors-bg-surfaceRaised)" stroke="var(--chakra-colors-border-default)" />
        <line x1="70" y1="49" x2="106" y2="49" stroke="var(--chakra-colors-text-accent)" strokeWidth="1.4" />
        <rect x="108" y="34" width="52" height="30" rx="5" fill="var(--chakra-colors-bg-surfaceRaised)" stroke="var(--chakra-colors-border-default)" />
        <line x1="160" y1="49" x2="196" y2="49" stroke="var(--chakra-colors-text-accent)" strokeWidth="1.4" />
        <rect x="198" y="34" width="58" height="30" rx="5" fill="var(--chakra-colors-bg-surfaceRaised)" stroke="var(--chakra-colors-border-default)" />
      </Box>
      {nda && (
        <HStack
          position="absolute"
          top={3}
          right={3}
          spacing={1.5}
          bg="bg.canvas"
          border="1px solid"
          borderColor="text.accentAmber"
          color="text.accentAmber"
          fontFamily="mono"
          fontSize="10px"
          px={2.5}
          py={1}
          borderRadius="full"
        >
          <LuLock size={11} />
          <Text>NDA Protected</Text>
        </HStack>
      )}
    </Box>
  )
}
```

- [ ] **Step 4: Rewrite `app/_partials/CaseStudies/CaseStudies.tsx`**

```tsx
import { useState } from 'react'
import { LuLock } from 'react-icons/lu'

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import { CaseStudyThumb } from '~/components/CaseStudyThumb'
import { Reveal } from '~/components/Reveal'

interface CaseStudy {
  key: string
  meta: string
  title: string
  description: string
  stack: string[]
  nda: boolean
  problem: string
  solution: string
  impact: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    key: 'underwriting',
    meta: 'Allianz Technology Thailand · 2022–Present',
    title: 'Underwriting platform microservices',
    description:
      'Took over backend ownership of the underwriting workbench, splitting a monolith into contract-tested microservices so underwriting and claims teams could ship independently.',
    stack: ['java17', 'spring-boot', 'kafka', 'playwright'],
    nda: true,
    problem:
      'The underwriting workbench was a single backend monolith shared across underwriting and claims teams, making independent releases risky.',
    solution:
      "Took over backend ownership and split the monolith into contract-tested microservices, so each team could ship independently without breaking the other's workflow.",
    impact: "Underwriting and claims teams can now ship independently, without one team's release blocking the other.",
  },
  {
    key: 'mobileweb',
    meta: 'Nan Yan Platform, Myanmar · 2020–2022',
    title: 'Multi-phase commerce platform',
    description:
      'Carried an e-commerce platform through four stack phases across backend, frontend, and full-stack work — from Spring Boot/Hibernate through NestJS/Prisma to a Remix + Chakra UI frontend.',
    stack: ['spring-boot', 'nestjs', 'prisma', 'remix'],
    nda: false,
    problem:
      "The platform's technical needs shifted significantly over its lifetime, requiring the stack to evolve rather than stay fixed.",
    solution:
      'Carried the platform through four stack phases — Spring Boot/Hibernate, then NestJS/Prisma, then a Remix + Chakra UI frontend — working across backend, frontend, and full-stack roles as needs changed.',
    impact: 'The platform kept shipping through each stack transition without a rebuild from scratch.',
  },
]

export function CaseStudies() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const active = CASE_STUDIES.find((study) => study.key === activeKey) ?? null

  const openStudy = (key: string) => {
    setActiveKey(key)
    onOpen()
  }

  return (
    <Box as="section" id="case-studies" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Architecture case studies
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Two systems I&apos;ve designed, built, and operate for employers.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={8}>
        {CASE_STUDIES.map((study, index) => (
          <Reveal key={study.key} delay={index * 0.08}>
            <VStack align="stretch" spacing={0} border="1px solid" borderColor="border.default" borderRadius="12px" bg="bg.surfaceRaised" overflow="hidden">
              <CaseStudyThumb nda={study.nda} />
              <VStack align="flex-start" spacing={4} p={7}>
                <Text fontFamily="mono" fontSize="12px" color="text.secondary">
                  {study.meta}
                </Text>
                <Heading as="h3" fontFamily="heading" fontSize="18px">
                  {study.title}
                </Heading>
                <Text fontSize="14px" lineHeight="1.6" color="text.secondary">
                  {study.description}
                </Text>
                <Wrap spacing={2}>
                  {study.stack.map((item) => (
                    <WrapItem key={item}>
                      <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="transparent" border="1px solid" borderColor="border.default" borderRadius="full">
                        {item}
                      </Tag>
                    </WrapItem>
                  ))}
                </Wrap>
                <HStack spacing={3} pt={1}>
                  <Button size="sm" bg="text.accent" color="bg.canvas" _hover={{ opacity: 0.9 }} borderRadius="8px" fontSize="13px" onClick={() => openStudy(study.key)}>
                    View solution
                  </Button>
                  {study.nda && (
                    <HStack spacing={1.5} border="1px dashed" borderColor="border.default" color="text.secondary" borderRadius="8px" px={3} py={1.5} fontSize="12px">
                      <LuLock size={12} />
                      <Text>Private</Text>
                    </HStack>
                  )}
                </HStack>
              </VStack>
            </VStack>
          </Reveal>
        ))}
      </SimpleGrid>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent bg="bg.surface">
          <DrawerCloseButton />
          {active && (
            <>
              <DrawerHeader fontFamily="heading">{active.title}</DrawerHeader>
              <DrawerBody>
                <VStack align="stretch" spacing={5} pb={6}>
                  <Text fontFamily="mono" fontSize="12px" color="text.secondary">
                    {active.meta}
                    {active.nda ? ' · NDA-safe summary' : ''}
                  </Text>
                  <Box>
                    <Text fontFamily="mono" fontSize="11px" letterSpacing="1.5px" color="text.accent" textTransform="uppercase" mb={2}>
                      Problem
                    </Text>
                    <Text fontSize="14px" color="text.primary" lineHeight="1.6">
                      {active.problem}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontFamily="mono" fontSize="11px" letterSpacing="1.5px" color="text.accent" textTransform="uppercase" mb={2}>
                      Architecture solution
                    </Text>
                    <Text fontSize="14px" color="text.primary" lineHeight="1.6">
                      {active.solution}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontFamily="mono" fontSize="11px" letterSpacing="1.5px" color="text.accent" textTransform="uppercase" mb={2}>
                      Tech stack
                    </Text>
                    <Wrap spacing={2}>
                      {active.stack.map((item) => (
                        <WrapItem key={item}>
                          <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="bg.surfaceRaised" border="none" borderRadius="full">
                            {item}
                          </Tag>
                        </WrapItem>
                      ))}
                    </Wrap>
                  </Box>
                  <Box>
                    <Text fontFamily="mono" fontSize="11px" letterSpacing="1.5px" color="text.accent" textTransform="uppercase" mb={2}>
                      Impact
                    </Text>
                    <Text fontSize="14px" color="text.primary" lineHeight="1.6">
                      {active.impact}
                    </Text>
                  </Box>
                </VStack>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx playwright test e2e/case-study-drawer.spec.ts`
Expected: PASS (3/3)

- [ ] **Step 6: Commit**

```bash
git add app/components/CaseStudyThumb.tsx app/_partials/CaseStudies/CaseStudies.tsx e2e/case-study-drawer.spec.ts
git commit -m "feat: add case-study thumbnails, NDA badge/lock, and detail drawer"
```

---

## Task 7: Continuous Learning — real content + learn-card layout

**Files:**
- Modify: `app/_partials/ContinuousLearning/ContinuousLearning.tsx`
- Test: `e2e/continuous-learning.spec.ts`

**Interfaces:**
- Consumes: `Reveal` from Task 3; `text.accentAmber` from Task 1.

- [ ] **Step 1: Write the failing test**

```ts
// e2e/continuous-learning.spec.ts
import { expect, test } from '@playwright/test'

test.describe('Continuous learning content', () => {
  test('shows the three real learning entries with status and source', async ({ page }) => {
    await page.goto('/')
    const section = page.locator('#learning')

    await expect(section.getByText('Kubernetes for Developers (CKAD Track)')).toBeVisible()
    await expect(section.getByText('AWS Solutions Architect – Associate Prep')).toBeVisible()
    await expect(section.getByText('Designing Data-Intensive Applications')).toBeVisible()
    await expect(section.getByText('In Progress')).toHaveCount(2)
    await expect(section.getByText('Reading', { exact: true })).toHaveCount(1)
    await expect(section.getByText('Udemy')).toBeVisible()
    await expect(section.getByText('LinkedIn Learning')).toBeVisible()
    await expect(section.getByText('Book — Kleppmann')).toBeVisible()
  })

  test('no longer shows the bracketed placeholder text', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('[Certification name]')).toHaveCount(0)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test e2e/continuous-learning.spec.ts`
Expected: FAIL — the section currently only renders the bracketed placeholders.

- [ ] **Step 3: Rewrite `app/_partials/ContinuousLearning/ContinuousLearning.tsx`**

```tsx
import type { IconType } from 'react-icons'
import { LuBookOpen } from 'react-icons/lu'
import { SiAmazonaws, SiKubernetes } from 'react-icons/si'

import { Box, Heading, HStack, SimpleGrid, Tag, Text, VStack } from '@chakra-ui/react'

import { Reveal } from '~/components/Reveal'

interface LearningEntry {
  icon: IconType
  name: string
  status: string
  source: string
  description: string
}

const LEARNING_ENTRIES: LearningEntry[] = [
  {
    icon: SiKubernetes,
    name: 'Kubernetes for Developers (CKAD Track)',
    status: 'In Progress',
    source: 'Udemy',
    description: 'Studying container orchestration, scheduling, and Kubernetes networking (killer.sh simulation exam).',
  },
  {
    icon: SiAmazonaws,
    name: 'AWS Solutions Architect – Associate Prep',
    status: 'In Progress',
    source: 'LinkedIn Learning',
    description: 'Exploring AWS services: EC2, Lambda, S3, RDS, SNS/SQS for cloud scaling.',
  },
  {
    icon: LuBookOpen,
    name: 'Designing Data-Intensive Applications',
    status: 'Reading',
    source: 'Book — Kleppmann',
    description: 'Reading about distributed systems, horizontal scaling, data consistency, and replication.',
  },
]

export function ContinuousLearning() {
  return (
    <Box as="section" id="learning" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Continuous learning
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        What I&apos;m studying right now, outside of day-to-day project work.
      </Text>
      <SimpleGrid columns={1} spacing={4} mt={8} data-testid="learning-grid">
        {LEARNING_ENTRIES.map(({ icon: EntryIcon, name, status, source, description }, index) => (
          <Reveal key={name} delay={index * 0.06}>
            <HStack align="center" spacing={5} border="1px solid" borderColor="border.default" borderRadius="14px" bg="bg.surfaceRaised" p={6}>
              <Box flexShrink={0} w="40px" h="40px" borderRadius="10px" bg="bg.surface" border="1px solid" borderColor="border.default" display="flex" alignItems="center" justifyContent="center">
                <EntryIcon size={20} color="var(--chakra-colors-text-accent)" />
              </Box>
              <VStack align="flex-start" spacing={1.5} flex={1}>
                <HStack spacing={2} flexWrap="wrap">
                  <Text fontFamily="heading" fontWeight="600" fontSize="14.5px">
                    {name}
                  </Text>
                  <Tag fontFamily="mono" fontSize="10px" color="text.accentAmber" border="1px solid" borderColor="text.accentAmber" bg="transparent" borderRadius="full">
                    {status}
                  </Tag>
                  <Tag fontFamily="mono" fontSize="10px" color="text.secondary" border="1px solid" borderColor="border.default" bg="transparent" borderRadius="full">
                    {source}
                  </Tag>
                </HStack>
                <Text fontSize="13.5px" color="text.secondary" lineHeight="1.55">
                  {description}
                </Text>
              </VStack>
            </HStack>
          </Reveal>
        ))}
      </SimpleGrid>
    </Box>
  )
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npx playwright test e2e/continuous-learning.spec.ts`
Expected: PASS (2/2)

- [ ] **Step 5: Commit**

```bash
git add app/_partials/ContinuousLearning/ContinuousLearning.tsx e2e/continuous-learning.spec.ts
git commit -m "feat: replace Continuous Learning placeholders with real learn-card entries"
```

---

## Final Step: Full-suite regression run

- [ ] Run the entire Playwright suite once every task above is committed:

Run: `npx playwright test`
Expected: every spec in `e2e/` passes — the 7 new files from this plan plus the 4 pre-existing ones (`smoke.spec.ts`, `breakpoints.spec.ts`, `interactions.spec.ts`, `experience-centering.spec.ts`).

- [ ] Start the dev server and manually check the app in a browser at a few widths (mobile ~390px, tablet ~820px, desktop ~1280px+), in both color modes, per this project's "test the golden path before claiming a UI change is done" rule — pure-aesthetic details this plan's tests don't (and can't meaningfully) assert on, like the ambient background's visual balance, hover-glow feel, and general legibility of the new dark palette, only surface this way.

Note: **Header, Footer, Hero (outside `HeroDiagram`), and Personal Projects** need no code changes in this plan — they already consume only semantic tokens (`bg.surface`, `bg.surfaceRaised`, `border.default`, `text.accent`, `text.secondary`), so Task 1's new dark-navy values and Inter body font apply to them automatically. Confirm this visually in the manual check above rather than via a dedicated task.
