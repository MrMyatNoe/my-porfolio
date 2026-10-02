# Portfolio UI Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild every section of the my-porfolio Remix + Chakra UI site to match the validated design (semantic color tokens, new typography, single left-spine timeline, skills matrix, split Case Studies / Personal Projects sections, real Header/Footer) — presentation layer only, no new routes, no data-file changes.

**Architecture:** Chakra UI semantic tokens defined once in `theme.tsx` and referenced by name everywhere (no hardcoded hex outside that one definition); one Remix route (`routes/index.tsx`) assembling nine section components in order; existing `app/data/resume.ts` and `app/data/career.ts` consumed as-is, never edited. New component-local content (skill categories, case-study copy, credential placeholders) lives as constants inside the components that use it, not in `app/data/`.

**Tech Stack:** Remix v1, Chakra UI v2, Emotion (already a dependency), `react-icons/lu` (Lucide) for all UI icons, `react-icons/bs` for social brand marks. No test framework exists in this repo — see Global Constraints for how each task is verified instead.

**Spec:** `docs/DESIGN_SPEC.md` (rev 2) — this plan implements its per-section layout/token/breakpoint decisions, scoped down per this session's direction: **no case-study/personal-project detail pages, no new data files.** The detail-pages feature described in the spec's "Trust signals" section and validated in the mockup's third artboard is explicitly deferred; this plan builds the summary-card version only, with no dead links to pages that don't exist yet.

## Global Constraints

- No hardcoded hex anywhere except the single semantic-token definition in `theme.tsx` — every component references `bg.canvas` / `bg.surface` / `bg.surfaceRaised` / `border.default` / `text.primary` / `text.secondary` / `text.accent` by name.
- Responsive values always use Chakra's explicit breakpoint **object** syntax (`{ base: ..., md: ..., lg: ... }`), never the 2-value positional array shorthand (`['x','y']`) — that shorthand maps to `[base, sm]`, not `[base, lg]`, and is the exact bug that broke the original 3-column Skill layout at phone width.
- **Never edit `app/data/resume.ts` or `app/data/career.ts`.** Any new content this redesign needs (skill categories, case-study summaries, the reconciled current-role title, credential placeholders) is a local constant inside the component that renders it.
- **No new routes, no new data files, no "Read case study" / "Read the full write-up" / repo-link affordances** — those depend on detail pages that are out of scope for this plan. Case Studies and Personal Projects render as static summary cards only.
- Icon system: `react-icons/lu` (Lucide) for every UI/system icon (nav, theme toggle, menu, category icons). `react-icons/bs` stays for social-platform brand marks (unchanged, already correct). Drop `@chakra-ui/icons`, `react-icons/md`, and `lottie-react` entirely.
- Typography: `Space Grotesk` for headings, `IBM Plex Sans` for body (already the theme default), `IBM Plex Mono` for technical labels (tech tags, dates, meta lines) — loaded via a Google Fonts `<link>` in `root.tsx`.
- **Testing note:** this repo has no test framework configured (`package.json` has only `build`/`dev` scripts; no jest/vitest/testing-library in `devDependencies`). Introducing one is out of scope for a presentation-only refactor. Each task's verification instead uses `npx tsc --noEmit` (structural/type correctness — this repo has `typescript` as a devDependency, so this runs without installing anything new) plus a manual `npm run dev` visual check against the validated mockup at `https://claude.ai/artifact/HSZ9xnNYPMbh5SNYy7nb1s`.

---

## Task 1: Theme foundation — semantic tokens, fonts, global CSS, accessibility base

**Files:**
- Modify: `app/theme.tsx`
- Modify: `app/styles/global.css`
- Modify: `app/root.tsx`

**Interfaces:**
- Produces: semantic color tokens `bg.canvas`, `bg.surface`, `bg.surfaceRaised`, `border.default`, `text.primary`, `text.secondary`, `text.accent` — every later task's components reference these by exact name. Also produces `theme.fonts.heading` (`'Space Grotesk', sans-serif`), `theme.fonts.body` (unchanged, `'IBM Plex Sans', sans-serif`), and a new `theme.fonts.mono` (`'IBM Plex Mono', monospace`) — later tasks use `fontFamily="heading"` / `fontFamily="mono"`.
- Produces: a skip link in `root.tsx` targeting `#main-content` — Task 10 must give the page's main wrapper that exact id.

- [x] **Step 1: Rewrite `app/theme.tsx` with semantic tokens and global styles**

```tsx
import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'IBM Plex Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  semanticTokens: {
    colors: {
      'bg.canvas': { default: '#F5F7F8', _dark: '#0F1720' },
      'bg.surface': { default: '#FFFFFF', _dark: '#16212C' },
      'bg.surfaceRaised': { default: '#EEF2F3', _dark: '#1C2A36' },
      'border.default': { default: '#DCE3E7', _dark: '#25333F' },
      'text.primary': { default: '#132029', _dark: '#E7EDF0' },
      'text.secondary': { default: '#51636D', _dark: '#93A5B1' },
      'text.accent': { default: '#0E8074', _dark: '#2FB8AE' },
    },
  },
  styles: {
    global: {
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

This replaces the entire previous file (which only extended `fonts` and had a commented-out `styles` block). The `text.accent` values match the pair already checked against WCAG AA in `docs/DESIGN_SPEC.md` (≈6.3:1 dark, ≈4.8:1 light) — do not substitute different hex values without re-checking contrast.

- [x] **Step 2: Simplify `app/styles/global.css`**

Replace the entire file contents with:

```css
body {
  margin: 0;
}
```

This removes the hardcoded `--primary-color`/`--secondary-color`/`--font-family` custom properties and the `background-color: var(--primary-color); color: #ffffff` rule that was fighting Chakra's color-mode system — body background/text now come from `theme.tsx`'s `styles.global.body` above.

- [x] **Step 3: Add Google Fonts and a skip link to `app/root.tsx`**

Read the current file first (`app/root.tsx`), then apply these two changes:

Change the `links` export to also load the fonts:

```tsx
export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
  },
  { rel: 'stylesheet', href: styles },
]
```

Add a skip link as the first child inside `<ChakraProvider>`, before `<Outlet />`:

```tsx
import { Box, ChakraProvider } from '@chakra-ui/react'
```

```tsx
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
```

- [x] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no new type errors (the file only changed theme/CSS/link config, no component logic).

Run: `npm run dev`, open the site. Expected: body background is now light gray (`#F5F7F8`) in light mode / navy (`#0F1720`) in dark mode instead of the old hardcoded blue; page text renders in IBM Plex Sans; pressing Tab once from the top of the page reveals a teal "Skip to content" pill.

- [x] **Step 5: Commit**

```bash
git add app/theme.tsx app/styles/global.css app/root.tsx
git commit -m "feat: add semantic color tokens, new typography, and a skip link"
```

---

## Task 2: Navbar — revive Header, delete dead Navbar scaffold

**Files:**
- Create: `app/components/Header.tsx` (full rewrite)
- Delete: `app/components/Navbar.tsx`

**Interfaces:**
- Consumes: `resumeData.personalInfo.name` from `~/data/resume` (unchanged); semantic tokens from Task 1.
- Produces: `Header` component, exported for Task 10 to render at the top of `routes/index.tsx`. Renders anchors `#skills`, `#experience`, `#case-studies`, `#projects`, `#learning`, `#contact` — Tasks 4–9 must give their section wrappers exactly these ids.

- [x] **Step 1: Delete the dead Navbar scaffold**

```bash
rm app/components/Navbar.tsx
```

(This file renders unrelated placeholder content — "Political Ideology Dashboard" — and is imported nowhere in the app.)

- [x] **Step 2: Write `app/components/Header.tsx`**

```tsx
import { LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { resumeData } from '~/data/resume'

import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  useColorMode,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

const NAV_LINKS = [
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#case-studies', label: 'Case studies' },
  { href: '#projects', label: 'Projects' },
  { href: '#learning', label: 'Learning' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onToggle } = useDisclosure()
  const { name } = resumeData.personalInfo
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <Box
      as="header"
      pos="sticky"
      top="0"
      zIndex={1000}
      bg="bg.surface"
      borderBottom="1px solid"
      borderColor="border.default"
      backdropFilter="blur(8px)"
    >
      <Flex align="center" justify="space-between" px={[5, 8]} h="72px">
        <HStack spacing={3}>
          <Flex
            w="36px"
            h="36px"
            border="1px solid"
            borderColor="text.accent"
            borderRadius="8px"
            align="center"
            justify="center"
            fontFamily="mono"
            fontSize="12px"
            color="text.accent"
          >
            {initials}
          </Flex>
          <Box fontFamily="heading" fontWeight="600" fontSize="17px">
            {name}
          </Box>
        </HStack>

        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} fontSize="14px" color="text.secondary">
              {link.label}
            </Link>
          ))}
        </HStack>

        <HStack spacing={2}>
          <IconButton
            aria-label="Toggle color theme"
            icon={colorMode === 'light' ? <LuMoon size={16} /> : <LuSun size={16} />}
            onClick={toggleColorMode}
            variant="outline"
            borderColor="border.default"
            bg="bg.surfaceRaised"
            size="sm"
            borderRadius="8px"
          />
          <IconButton
            aria-label="Toggle menu"
            icon={isOpen ? <LuX size={16} /> : <LuMenu size={16} />}
            onClick={onToggle}
            variant="outline"
            borderColor="border.default"
            bg="bg.surfaceRaised"
            size="sm"
            borderRadius="8px"
            display={{ base: 'inline-flex', md: 'none' }}
          />
        </HStack>
      </Flex>

      {isOpen && (
        <VStack
          align="stretch"
          spacing={4}
          px={5}
          pb={5}
          display={{ base: 'flex', md: 'none' }}
          borderTop="1px solid"
          borderColor="border.default"
        >
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} fontSize="15px" color="text.primary" onClick={onToggle}>
              {link.label}
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  )
}
```

- [x] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: PASS — no references to the deleted `Navbar.tsx` exist anywhere (confirm with a search if the type check doesn't catch it, since it was already unimported).

Run: `npm run dev`. Expected: a sticky header appears at the top with the "TMN" mark and name on the left, six links centered on desktop (≥768px), a theme toggle and (below 768px) a hamburger button on the right. Shrink the window below 768px — the six links disappear from the bar and the hamburger appears; clicking it drops down the same six links; clicking a link or the X closes it again.

- [x] **Step 4: Commit**

```bash
git add app/components/Header.tsx
git rm app/components/Navbar.tsx
git commit -m "feat: revive Header with anchor nav, mobile menu, and delete dead Navbar scaffold"
```

---

## Task 3: Hero — new copy layout, reconciled title, service-topology diagram

**Files:**
- Create: `app/_partials/Hero/HeroDiagram.tsx`
- Modify: `app/_partials/Hero/Hero.tsx` (full rewrite)
- No change: `app/_partials/Hero/index.tsx` (already `export { Hero } from './Hero'`)

**Interfaces:**
- Consumes: `resumeData.personalInfo` (`name`, `description`, `socialLinks`) from `~/data/resume`, unchanged; `SocialLinks` component from `~/components/SocialLinks` (its interface changes in Task 9, but its existing props — `links: SocialLink[]` — stay the same, so this task can be done before or after Task 9 without breakage).
- Produces: `HeroDiagram` component (props: `name: string`), used only by `Hero.tsx`. The `.hero-line` / `.hero-avatar` / `.hero-tag` class names it applies are consumed by the `@keyframes`/media-query rules Task 1 already added to `theme.tsx` — if Task 1 hasn't run yet, the diagram still renders correctly, just without the load animation.

- [x] **Step 1: Write `app/_partials/Hero/HeroDiagram.tsx`**

```tsx
import { Box } from '@chakra-ui/react'

const CONNECTOR_ENDPOINTS: Array<[number, number]> = [
  [70, 70],
  [410, 70],
  [70, 410],
  [410, 410],
]

const tagStyle = {
  w: { base: '76px', lg: '132px' },
  h: { base: '24px', lg: '40px' },
  borderRadius: { base: '12px', lg: '20px' },
  border: '1px solid',
  borderColor: 'border.default',
  bg: 'bg.surface',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'mono',
  fontSize: { base: '9px', lg: '12px' },
  color: 'text.secondary',
} as const

export function HeroDiagram({ name }: { name: string }) {
  return (
    <Box position="relative" w={{ base: '280px', lg: '480px' }} h={{ base: '280px', lg: '480px' }} flexShrink={0} mx="auto">
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

      <Box className="hero-tag" style={{ animationDelay: '0.2s' }} position="absolute" left={{ base: '2px', lg: '4px' }} top={{ base: '28px', lg: '50px' }} {...tagStyle}>
        spring-boot
      </Box>
      <Box className="hero-tag" style={{ animationDelay: '0.32s' }} position="absolute" right={{ base: '2px', lg: '4px' }} top={{ base: '28px', lg: '50px' }} {...tagStyle}>
        kafka
      </Box>
      <Box className="hero-tag" style={{ animationDelay: '0.44s' }} position="absolute" left={{ base: '2px', lg: '4px' }} bottom={{ base: '28px', lg: '50px' }} {...tagStyle}>
        postgres
      </Box>
      <Box className="hero-tag" style={{ animationDelay: '0.56s' }} position="absolute" right={{ base: '2px', lg: '4px' }} bottom={{ base: '28px', lg: '50px' }} {...tagStyle}>
        rest-api
      </Box>
    </Box>
  )
}
```

The `style={{ animationDelay: ... }}` uses React's native `style` prop (a real inline `style` attribute), not Chakra's `sx` — this matters: the `animation` shorthand from Task 1's `@media` rule resets `animation-delay` to `0s` by default, and only a true inline `style` attribute has enough CSS specificity to override that shorthand per-element. `sx` compiles through Emotion's class-based system instead and would not reliably win.

The SVG's `viewBox="0 0 480 480"` stays fixed regardless of the rendered box size — the browser scales it automatically, so the same 4 line coordinates and the same `strokeDasharray: 241` (set globally in Task 1) work correctly at both the 280px mobile size and the 480px desktop size without needing separate math per breakpoint.

- [x] **Step 2: Rewrite `app/_partials/Hero/Hero.tsx`**

```tsx
import { SocialLinks } from '~/components/SocialLinks'
import { resumeData } from '~/data/resume'

import { Box, Button, Flex, HStack, Heading, Link, Text, VStack } from '@chakra-ui/react'

import { HeroDiagram } from './HeroDiagram'

// Reconciles the long-standing mismatch between resumeData.personalInfo.title
// ("Senior Software Engineer") and the current role in career.ts's Allianz
// milestone ("Backend Developer"). Kept as a local constant instead of editing
// either data file — don't revert this to resumeData.personalInfo.title, that
// reintroduces the mismatch.
const CURRENT_TITLE = 'Senior Backend Developer'

export function Hero() {
  const { name, description, socialLinks } = resumeData.personalInfo

  return (
    <Flex
      as="section"
      align="center"
      gap={{ base: 10, lg: 16 }}
      px={[5, 8, 16]}
      py={[10, 10, 16]}
      direction={{ base: 'column', lg: 'row' }}
    >
      <VStack align="flex-start" spacing={5} maxW="600px" flexShrink={0}>
        <HStack spacing={2}>
          <Box w="8px" h="8px" borderRadius="full" bg="text.accent" />
          <Text fontSize="13px" color="text.secondary">
            Available for senior backend &amp; platform roles
          </Text>
        </HStack>

        <Box>
          <Heading as="h1" fontFamily="heading" fontSize={{ base: '36px', md: '44px', lg: '56px' }} lineHeight="1.05">
            {name}
          </Heading>
          <Text fontFamily="heading" fontSize={{ base: '18px', md: '20px', lg: '22px' }} fontWeight="500" color="text.accent" mt={2}>
            {CURRENT_TITLE}
          </Text>
        </Box>

        <Text fontSize="16px" lineHeight="1.6" color="text.secondary" maxW="480px">
          {description}
        </Text>

        <HStack spacing={{ base: 6, md: 8 }} pt={2}>
          <VStack align="flex-start" spacing={0}>
            <Text fontFamily="heading" fontSize="26px" fontWeight="700">7+</Text>
            <Text fontSize="12px" color="text.secondary">Years shipping backend systems</Text>
          </VStack>
          <VStack align="flex-start" spacing={0}>
            <Text fontFamily="heading" fontSize="26px" fontWeight="700">6</Text>
            <Text fontSize="12px" color="text.secondary">Production platforms</Text>
          </VStack>
        </HStack>

        <HStack spacing={3} pt={2} flexWrap="wrap">
          <Button as="a" href="#experience" bg="text.accent" color="bg.canvas" _hover={{ opacity: 0.9 }} borderRadius="8px" fontSize="14px">
            View experience
          </Button>
          <Button as="a" href="#contact" variant="outline" borderColor="text.accent" color="text.accent" borderRadius="8px" fontSize="14px">
            Get in touch
          </Button>
          <Link href="/resume.pdf" download fontSize="14px" fontWeight="600" color="text.accent">
            Download résumé
          </Link>
        </HStack>

        <SocialLinks links={socialLinks} />
      </VStack>

      <HeroDiagram name={name} />
    </Flex>
  )
}
```

The "Download résumé" link points at `public/resume.pdf`, which does not exist in the repo yet — this task's job is the UI, not the file. Add a real résumé PDF at `public/resume.pdf` before shipping; until then the link 404s.

- [x] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: PASS.

Run: `npm run dev`. Expected: Hero shows name + "Senior Backend Developer" (not "Senior Software Engineer" — confirm the old mismatch is gone by comparing against what Timeline shows for the Allianz row once Task 5 is done), the three buttons/link in the CTA row, and the photo-centered diagram on the right (or below, on narrow widths) with connector lines and tag pills animating in once on load. Reload with your OS's "reduce motion" setting on — the diagram should appear instantly in its final state with no animation.

- [x] **Step 4: Commit**

```bash
git add app/_partials/Hero/Hero.tsx app/_partials/Hero/HeroDiagram.tsx
git commit -m "feat: rebuild Hero with reconciled title and animated topology diagram"
```

---

## Task 4: Skills — replace Lottie pillars with the technical skill matrix

**Files:**
- Modify: `app/_partials/Skill/Skill.tsx` (full rewrite)
- Delete: `app/_partials/Skill/Backend.tsx`, `app/_partials/Skill/Frontend.tsx`, `app/_partials/Skill/Mobile.tsx`
- Delete: `app/_partials/custom-css.tsx`
- Delete: `app/components/SkillCard.tsx` (empty, unused)
- Delete: `public/jsons/backend.json`, `public/jsons/frontend.json`, `public/jsons/mobile.json`
- Modify: `package.json` (remove `lottie-react` dependency)
- No change: `app/_partials/Skill/index.tsx` (already `export { Skill } from './Skill'`)

**Interfaces:**
- Produces: `Skill` component, unchanged export name/path — Task 10 imports it exactly as `routes/index.tsx` already does today.

- [x] **Step 1: Delete the Lottie-based sub-components and their assets**

```bash
rm app/_partials/Skill/Backend.tsx app/_partials/Skill/Frontend.tsx app/_partials/Skill/Mobile.tsx
rm app/_partials/custom-css.tsx
rm app/components/SkillCard.tsx
rm public/jsons/backend.json public/jsons/frontend.json public/jsons/mobile.json
rmdir public/jsons
```

- [x] **Step 2: Remove `lottie-react` from `package.json`**

Open `package.json` and delete this line from `dependencies`:

```json
"lottie-react": "^2.3.1",
```

Then run `npm install` (or your package manager's equivalent) to update the lockfile.

- [x] **Step 3: Rewrite `app/_partials/Skill/Skill.tsx`**

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

export function Skill() {
  return (
    <Box as="section" id="skills" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Skills
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Technologies I work with in production, grouped by where they sit in a system.
      </Text>
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={9} mt={8}>
        {SKILL_CATEGORIES.map(({ label, icon: CategoryIcon, skills }) => (
          <Box key={label} borderLeft="2px solid" borderColor="text.accent" pl={4}>
            <HStack spacing={2} borderBottom="1px solid" borderColor="border.default" pb={2.5}>
              <CategoryIcon size={16} color="var(--chakra-colors-text-accent)" />
              <Text fontFamily="heading" fontSize="15px" fontWeight="600">
                {label}
              </Text>
            </HStack>
            <Wrap spacing={2} mt={3.5}>
              {skills.map((skill) => (
                <WrapItem key={skill}>
                  <Tag fontFamily="mono" fontSize="12.5px" color="text.secondary" bg="bg.surfaceRaised" border="1px solid" borderColor="border.default" borderRadius="14px" px={3.5} py={1.5}>
                    {skill}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}
```

Note the grid uses `{ base: 1, lg: 3 }` — 1 column until 1024px, 3 columns from 1024px, deliberately not a 2-value array — this is the exact breakpoint fix `docs/DESIGN_SPEC.md` calls for.

- [x] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: PASS — confirms no remaining imports of the deleted Lottie components or `custom-css.tsx`.

Run: `npm run dev`. Expected: the Skills section shows 7 labeled categories with a small teal icon and a left accent rule each, tag chips below each heading, no animated illustrations. Resize the window: single column until 1024px wide, then 3 columns.

- [x] **Step 5: Commit**

```bash
git add app/_partials/Skill/Skill.tsx package.json package-lock.json
git rm app/_partials/Skill/Backend.tsx app/_partials/Skill/Frontend.tsx app/_partials/Skill/Mobile.tsx app/_partials/custom-css.tsx app/components/SkillCard.tsx
git add public/jsons
git commit -m "feat: replace Lottie skill pillars with a categorized skill matrix"
```

---

## Task 5: Professional Experience — single left-spine Timeline, Card token fixes

**Files:**
- Modify: `app/_partials/Timeline/Timeline.tsx` (full rewrite)
- Modify: `app/components/Card.tsx` (full rewrite)
- Delete: `app/components/EmptyCard.tsx`, `app/components/LineWithDot.tsx`

**Interfaces:**
- Consumes: `milestones` from `~/data/career` (unchanged, read-only).
- Produces: `Timeline` component (unchanged export path) and a simplified `Card` component — `Card`'s prop interface (`id`, `categories`, `title`, `icon`, `description`, `date`) is unchanged from before, so nothing else that might reference `Card` breaks.

- [x] **Step 1: Delete the now-unused alternating-layout helpers**

```bash
rm app/components/EmptyCard.tsx app/components/LineWithDot.tsx
```

- [x] **Step 2: Rewrite `app/components/Card.tsx`**

```tsx
import type { IconType } from 'react-icons'

import { Badge, Box, HStack, Icon, Text, VStack } from '@chakra-ui/react'

interface CardProps {
  id: number
  categories: string[]
  title: string
  icon: IconType
  description: string
  date: string
}

const Card = ({ categories, title, icon, description, date }: CardProps) => {
  return (
    <HStack
      flex={1}
      p={[4, 6]}
      bg="bg.surfaceRaised"
      spacing={5}
      rounded="lg"
      pos="relative"
      _before={{
        content: `""`,
        position: 'absolute',
        left: '-15px',
        top: 0,
        w: 0,
        h: 0,
        borderStyle: 'solid',
        borderWidth: '15px 15px 15px 0',
        borderColor: 'transparent var(--chakra-colors-bg-surfaceRaised) transparent transparent',
      }}
    >
      <Icon as={icon} w={[10, 12]} h={[10, 12]} color="text.accent" />
      <Box>
        <VStack mb={3} textAlign="left" alignItems="flex-start">
          <Text _hover={{ color: 'text.accent' }} fontSize="md" lineHeight={1.2} fontWeight="bold" w="100%">
            {title}
          </Text>
          <Text fontSize="sm" color="text.accent">
            {date}
          </Text>
          <Text fontSize="md" color="text.secondary">
            {description}
          </Text>
          <HStack spacing={2} mb={1} flexWrap="wrap">
            {categories.map((cat) => (
              <Badge variant="outline" colorScheme="green" key={cat}>
                {cat}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </Box>
    </HStack>
  )
}

export { Card }
```

This drops the `isEvenId`/left-right alternating triangle logic entirely — the single left-spine layout below always places the card to the right of the spine, so the pointer triangle always points left. It also replaces the manually-retyped hex (`#edf2f6`/`#1a202c`, the literal values of `gray.50`/`gray.800`) with the `bg.surfaceRaised` token via its generated CSS variable — Chakra exposes every semantic token as `--chakra-colors-<path-with-dots-as-hyphens>`, so `bg.surfaceRaised` becomes `--chakra-colors-bg-surfaceRaised`, which is why the `_before` block's `borderColor` shorthand references `var(--chakra-colors-bg-surfaceRaised)` directly rather than the plain token name — Chakra's prop resolver only substitutes token names when they're the *entire* value of a style prop, not inside a multi-value shorthand string.

- [x] **Step 3: Rewrite `app/_partials/Timeline/Timeline.tsx`**

```tsx
import { Card } from '~/components/Card'
import { milestones } from '~/data/career'

import { Box, Heading, VStack } from '@chakra-ui/react'

export function Timeline() {
  return (
    <Box as="section" id="experience" px={[5, 8, 16]} py={[10, 10, 14]}>
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Professional experience
      </Heading>
      <VStack align="stretch" spacing={0} maxW="760px" mt={9}>
        {milestones.map((milestone, index) => {
          const isLast = index === milestones.length - 1
          return (
            <Box key={milestone.id} display="flex" gap={[4, 6]} pb={isLast ? 0 : 6}>
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
                />
              </Box>
              <Card {...milestone} />
            </Box>
          )
        })}
      </VStack>
    </Box>
  )
}
```

- [x] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: PASS — confirms nothing else imports the deleted `EmptyCard`/`LineWithDot`.

Run: `npm run dev`. Expected: Professional experience shows a single vertical line down the left with a dot per job and the card to its right, all six milestones in order, same on mobile and desktop (no separate alternating-sides code path anymore).

- [x] **Step 5: Commit**

```bash
git add app/_partials/Timeline/Timeline.tsx app/components/Card.tsx
git rm app/components/EmptyCard.tsx app/components/LineWithDot.tsx
git commit -m "feat: switch Timeline to a single left-spine layout, fix Card token usage"
```

---

## Task 6: Architecture Case Studies — repurpose Career into two curated summary cards

**Files:**
- Create: `app/_partials/CaseStudies/CaseStudies.tsx`
- Create: `app/_partials/CaseStudies/index.tsx`
- Delete: `app/_partials/Career/` (entire folder: `Career.tsx`, `Allianz.tsx`, `FPT.tsx`, `MBC.tsx`, `index.tsx`)

**Interfaces:**
- Produces: `CaseStudies` component, exported from `~/_partials/CaseStudies` — Task 10 imports it.

- [x] **Step 1: Delete the old Career folder**

```bash
rm -r app/_partials/Career
```

- [x] **Step 2: Create `app/_partials/CaseStudies/CaseStudies.tsx`**

```tsx
import { Box, Heading, SimpleGrid, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'

interface CaseStudy {
  meta: string
  title: string
  description: string
  stack: string[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    meta: 'Allianz Technology Thailand · 2022–Present',
    title: 'Underwriting platform microservices',
    description:
      'Took over backend ownership of the underwriting workbench, splitting a monolith into contract-tested microservices so underwriting and claims teams could ship independently.',
    stack: ['java17', 'spring-boot', 'kafka', 'playwright'],
  },
  {
    meta: 'Nan Yan Platform, Myanmar · 2020–2022',
    title: 'Multi-phase commerce platform',
    description:
      'Carried an e-commerce platform through four stack phases across backend, frontend, and full-stack work — from Spring Boot/Hibernate through NestJS/Prisma to a Remix + Chakra UI frontend.',
    stack: ['spring-boot', 'nestjs', 'prisma', 'remix'],
  },
]

export function CaseStudies() {
  return (
    <Box as="section" id="case-studies" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Architecture case studies
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Two systems I&apos;ve designed, built, and operate for employers.
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mt={8}>
        {CASE_STUDIES.map((study) => (
          <VStack key={study.title} align="flex-start" spacing={4} border="1px solid" borderColor="border.default" borderRadius="12px" bg="bg.surfaceRaised" p={7}>
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
                  <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="transparent" border="1px solid" borderColor="border.default" borderRadius="14px">
                    {item}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  )
}
```

No "Read case study" link — per Global Constraints, detail pages are out of scope for this plan, so these are pure static summaries. Note there is deliberately no architecture diagram here: employer/client work must not show real (even simplified) system architecture publicly — see `docs/DESIGN_SPEC.md`'s confidentiality note. Only `PersonalProjects` (Task 7) is the user's own IP and has no such restriction, though this plan doesn't add a diagram there either, since detail pages are out of scope.

- [x] **Step 3: Create `app/_partials/CaseStudies/index.tsx`**

```tsx
export { CaseStudies } from './CaseStudies'
```

- [x] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: PASS.

Run: `npm run dev`. Expected: an "Architecture case studies" section with two cards (Allianz, Nan Yan), each with a meta line, title, description, and tech tags — no buttons or links on the cards.

- [x] **Step 5: Commit**

```bash
git add app/_partials/CaseStudies
git rm -r app/_partials/Career
git commit -m "feat: repurpose Career into two curated Architecture Case Studies cards"
```

---

## Task 7: Personal Projects — new section from Persona's content, delete Freelance and old Persona

**Files:**
- Create: `app/_partials/PersonalProjects/PersonalProjects.tsx`
- Create: `app/_partials/PersonalProjects/index.tsx`
- Delete: `app/_partials/Persona/` (entire folder)
- Delete: `app/_partials/Freelance/` (entire folder)

**Interfaces:**
- Produces: `PersonalProjects` component, exported from `~/_partials/PersonalProjects` — Task 10 imports it.

- [x] **Step 1: Delete the old Persona and Freelance folders**

```bash
rm -r app/_partials/Persona app/_partials/Freelance
```

`Freelance.tsx` (IHRP, Nan Yan phases) duplicated data already in `career.ts`/Timeline — deleting it outright per `docs/DESIGN_SPEC.md`. `Persona/index.tsx` was an empty barrel file that made `Persona.tsx`'s real content unreachable via its intended import path; `Persona/Best.tsx`'s content is what becomes the new section below.

- [x] **Step 2: Create `app/_partials/PersonalProjects/PersonalProjects.tsx`**

```tsx
import { Flex, Heading, HStack, Tag, Text, VStack, Wrap, WrapItem } from '@chakra-ui/react'

const STACK = ['flutter', 'firebase', 'admob', 'next.js', 'chakra-ui']

export function PersonalProjects() {
  return (
    <VStack as="section" id="projects" align="stretch" px={[5, 8, 16]} py={[10, 10, 14]} spacing={1}>
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Personal projects
      </Heading>
      <Text fontSize="14px" color="text.secondary">
        What I build on my own initiative, outside of client work.
      </Text>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={8}
        border="1px solid"
        borderColor="border.default"
        borderRadius="12px"
        bg="bg.surfaceRaised"
        p={8}
        mt={6}
      >
        <VStack align="flex-start" spacing={3} flex={1}>
          <Text fontFamily="mono" fontSize="12px" color="text.secondary">
            Best IT Solutions · Independent · Dec 2021 – Present
          </Text>
          <Heading as="h3" fontFamily="heading" fontSize="20px">
            Astrology &amp; Maritime apps
          </Heading>
          <Text fontSize="13px" color="text.accent">
            Full-stack developer, product owner &amp; designer
          </Text>
          <Text fontSize="14px" lineHeight="1.6" color="text.secondary" maxW="520px">
            Sole developer on two consumer Flutter apps, each with a client and admin side, backed by Firebase and a
            Next.js + Chakra UI admin console. Monetized with AdMob.
          </Text>
          <Wrap spacing={2}>
            {STACK.map((item) => (
              <WrapItem key={item}>
                <Tag fontFamily="mono" fontSize="11px" color="text.secondary" bg="transparent" border="1px solid" borderColor="border.default" borderRadius="14px">
                  {item}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
        <HStack spacing={4} flexShrink={0} align="flex-start">
          <Flex w="72px" h="72px" borderRadius="12px" bg="bg.surface" align="center" justify="center" fontFamily="heading" fontSize="24px" fontWeight="700" color="text.accent">
            A
          </Flex>
          <Flex w="72px" h="72px" borderRadius="12px" bg="bg.surface" align="center" justify="center" fontFamily="heading" fontSize="24px" fontWeight="700" color="text.accent">
            M
          </Flex>
        </HStack>
      </Flex>
    </VStack>
  )
}
```

- [x] **Step 3: Create `app/_partials/PersonalProjects/index.tsx`**

```tsx
export { PersonalProjects } from './PersonalProjects'
```

- [x] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: PASS.

Run: `npm run dev`. Expected: a "Personal projects" section with one card — Astrology & Maritime apps — description, three-tier role line, tech tags, and two glyph tiles ("A"/"M") on the side (or below, on mobile).

- [x] **Step 5: Commit**

```bash
git add app/_partials/PersonalProjects
git rm -r app/_partials/Persona app/_partials/Freelance
git commit -m "feat: add Personal Projects section from Persona content, delete Freelance"
```

---

## Task 8: Continuous Learning — new section, placeholder credentials

**Files:**
- Create: `app/_partials/ContinuousLearning/ContinuousLearning.tsx`
- Create: `app/_partials/ContinuousLearning/index.tsx`

**Interfaces:**
- Produces: `ContinuousLearning` component, exported from `~/_partials/ContinuousLearning` — Task 10 imports it.

- [x] **Step 1: Create `app/_partials/ContinuousLearning/ContinuousLearning.tsx`**

```tsx
import { Box, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'

const PLACEHOLDER_CREDENTIALS = ['[Certification name] — [Issuer], [Year]', '[Course name] — [Platform], [Year]']

export function ContinuousLearning() {
  return (
    <Box as="section" id="learning" px={[5, 8, 16]} py={[10, 10, 14]} bg="bg.surface" borderY="1px solid" borderColor="border.default">
      <Heading as="h2" fontFamily="heading" fontSize={{ base: '24px', md: '30px' }}>
        Continuous learning
      </Heading>
      <Text fontSize="14px" color="text.secondary" mt={1}>
        Placeholder — replace with real certifications and courses.
      </Text>
      <Wrap spacing={3} mt={6} maxW="900px">
        {PLACEHOLDER_CREDENTIALS.map((entry) => (
          <WrapItem
            key={entry}
            border="1px solid"
            borderColor="border.default"
            borderRadius="10px"
            bg="bg.surfaceRaised"
            px={5}
            py={3.5}
            fontSize="13px"
            color="text.secondary"
          >
            {entry}
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  )
}
```

The bracketed placeholder text is intentional and must stay visually obvious as placeholder content (not real claims) until real credentials replace it — do not remove the brackets as a "cleanup."

- [x] **Step 2: Create `app/_partials/ContinuousLearning/index.tsx`**

```tsx
export { ContinuousLearning } from './ContinuousLearning'
```

- [x] **Step 3: Verify**

Run: `npx tsc --noEmit`
Expected: PASS.

Run: `npm run dev`. Expected: a "Continuous learning" section with two bracketed placeholder chips that wrap naturally at any width.

- [x] **Step 4: Commit**

```bash
git add app/_partials/ContinuousLearning
git commit -m "feat: add Continuous Learning section with placeholder credentials"
```

---

## Task 9: Footer/Contact — full contact block, token fixes on Contacts and SocialLinks

**Files:**
- Modify: `app/components/Footer.tsx` (full rewrite)
- Modify: `app/components/Contacts.tsx`
- Modify: `app/components/SocialLinks.tsx`

**Interfaces:**
- Consumes: `resumeData.personalInfo.{socialLinks,contacts,name}` from `~/data/resume`, unchanged.
- Produces: `Footer` component (unchanged export path). `SocialLinks`'s prop interface (`links: SocialLink[]`) is unchanged, so `Hero.tsx` (Task 3) keeps working regardless of task order.

- [x] **Step 1: Fix the hardcoded color in `app/components/Contacts.tsx`**

Change this line:

```tsx
<Text fontSize={'sm'} color="gray.500">
```

to:

```tsx
<Text fontSize={'sm'} color="text.secondary">
```

(This is the fix for the 4.07:1 dark-mode contrast failure documented in `docs/DESIGN_SPEC.md` — `gray.500` fails AA in dark mode; `text.secondary` is the token pair that passes in both modes.)

- [x] **Step 2: Rewrite `app/components/SocialLinks.tsx`**

```tsx
import {
  BsFacebook,
  BsGithub,
  BsLinkedin,
  BsMessenger,
  BsTwitter,
} from 'react-icons/bs'

import { Flex, HStack, Link } from '@chakra-ui/react'

const iconMap = {
  BsLinkedin: BsLinkedin,
  BsTwitter: BsTwitter,
  BsGithub: BsGithub,
  BsMessenger: BsMessenger,
  BsFacebook: BsFacebook,
} as const

type IconKey = keyof typeof iconMap

interface SocialLink {
  href: string
  icon: string
  label: string
}

interface SocialLinksProps {
  links: SocialLink[]
}

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <HStack spacing={2.5}>
      {links.map(({ href, icon, label }) => {
        const Icon = iconMap[icon as IconKey]
        return (
          <Link key={label} href={href} isExternal aria-label={label}>
            <Flex
              w="32px"
              h="32px"
              border="1px solid"
              borderColor="text.accent"
              borderRadius="8px"
              align="center"
              justify="center"
              color="text.accent"
            >
              <Icon size={16} />
            </Flex>
          </Link>
        )
      })}
    </HStack>
  )
}
```

This wraps each brand icon in an accent-bordered badge instead of a bare unstyled icon — per the interactive-color system in `docs/DESIGN_SPEC.md`, accent border + accent color signals "this is clickable," which the old bare-icon treatment didn't.

- [x] **Step 3: Rewrite `app/components/Footer.tsx`**

```tsx
import { Contacts } from '~/components/Contacts'
import { SocialLinks } from '~/components/SocialLinks'
import { resumeData } from '~/data/resume'

import { Flex, Text, VStack } from '@chakra-ui/react'

export function Footer() {
  const { socialLinks, contacts, name } = resumeData.personalInfo

  return (
    <Flex
      as="footer"
      id="contact"
      direction={{ base: 'column', md: 'row' }}
      align="center"
      justify="space-between"
      gap={6}
      px={[5, 8, 16]}
      py={10}
    >
      <VStack align={{ base: 'center', md: 'flex-start' }} spacing={1}>
        <Contacts contacts={contacts} />
      </VStack>
      <SocialLinks links={socialLinks} />
      <Text fontSize="12px" color="text.secondary">
        © {new Date().getFullYear()} {name}
      </Text>
    </Flex>
  )
}
```

- [x] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: PASS.

Run: `npm run dev`. Expected: footer shows email/phone/location on the left (or top, stacked, on mobile), social icon badges (now bordered/accent-colored) in the middle, and a copyright line with the current year on the right.

- [x] **Step 5: Commit**

```bash
git add app/components/Footer.tsx app/components/Contacts.tsx app/components/SocialLinks.tsx
git commit -m "feat: rebuild Footer with full contact block, fix Contacts/SocialLinks tokens"
```

---

## Task 10: Assemble the page — wire all sections into `routes/index.tsx`

**Files:**
- Modify: `app/routes/index.tsx` (full rewrite)

**Interfaces:**
- Consumes: `Header` (Task 2), `Hero` (Task 3), `Skill` (Task 4), `Timeline` (Task 5), `CaseStudies` (Task 6), `PersonalProjects` (Task 7), `ContinuousLearning` (Task 8), `Footer` (Task 9). All eight must exist before this task can compile — run this task last.
- Produces: the assembled page, with `id="main-content"` on the wrapping element — this is the skip link's target from Task 1.

- [x] **Step 1: Rewrite `app/routes/index.tsx`**

```tsx
import { CaseStudies } from '~/_partials/CaseStudies'
import { ContinuousLearning } from '~/_partials/ContinuousLearning'
import { Hero } from '~/_partials/Hero'
import { PersonalProjects } from '~/_partials/PersonalProjects'
import { Skill } from '~/_partials/Skill'
import { Timeline } from '~/_partials/Timeline'
import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'

import { Box } from '@chakra-ui/react'

export default function Index() {
  return (
    <>
      <Header />
      <Box as="main" id="main-content">
        <Hero />
        <Skill />
        <Timeline />
        <CaseStudies />
        <PersonalProjects />
        <ContinuousLearning />
      </Box>
      <Footer />
    </>
  )
}
```

This drops the old `<Container maxW="80%">` wrapper and the `<Divider>` elements between sections — each section now manages its own full-width background band and top/bottom hairline border (alternating `bg.canvas`/`bg.surface` per section, matching the validated mockup), which reads as more deliberate than a narrow centered column with generic dividers.

- [x] **Step 2: Verify**

Run: `npx tsc --noEmit`
Expected: PASS with zero errors — this is the integration point where any leftover mismatched import or prop from earlier tasks would surface.

Run: `npm run dev`, scroll the whole page top to bottom. Expected: Header → Hero → Skills → Professional experience → Architecture case studies → Personal projects → Continuous learning → Footer, in that order, each section's background alternating between light/dark canvas and surface tones with a hairline border between them. Click each nav link in the Header and confirm it jumps to the matching section. Compare the whole page against the desktop and mobile artboards at `https://claude.ai/artifact/HSZ9xnNYPMbh5SNYy7nb1s`.

- [x] **Step 3: Commit**

```bash
git add app/routes/index.tsx
git commit -m "feat: assemble the redesigned page in routes/index.tsx"
```

---

## Plan Self-Review Notes

- **Spec coverage:** every per-section item in `docs/DESIGN_SPEC.md` §2 has a task (Navbar→Task 2, Hero→Task 3, Skills→Task 4, Experience→Task 5, Case Studies→Task 6, Personal Projects→Task 7, Continuous Learning→Task 8, Footer/Contact→Task 9) plus the cross-cutting §1 items (tokens/fonts/global CSS/accessibility→Task 1, motion→Tasks 1+3, interactive-color system→Tasks 6/7/8/9's border-only tags vs. Task 2/3/9's accent-bordered actionable elements). The spec's "Trust signals" detail-pages sub-feature and OG meta tags are explicitly out of scope per this session's redirect (see **Spec** field above) — not a gap, a deferred decision.
- **Data boundary:** confirmed no task modifies `app/data/resume.ts` or `app/data/career.ts` — Task 3 reads `resumeData` as-is (title mismatch fixed via a local constant, not a data edit), Task 5/6 read `milestones`/replace `Career`'s hardcoded JSX with a local `CASE_STUDIES` constant, never touching `career.ts` itself.
- **Type/name consistency check:** `CaseStudies`, `PersonalProjects`, `ContinuousLearning`, `Skill`, `Timeline`, `Hero`, `Header`, `Footer` — the exact export names used in Task 10's imports match every task's "Produces" line. `Card`'s prop interface (`id, categories, title, icon, description, date`) is unchanged from the original, so `milestones` (typed against the old interface) still satisfies it.
