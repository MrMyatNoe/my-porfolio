# Portfolio Redesign — Design Spec (rev 2)

Grounded in a full read of `app/_partials/`, `app/components/`, `app/theme.tsx`,
`app/styles/global.css`, `app/root.tsx`, `app/routes/index.tsx`, and
`app/data/`. Spec only — no implementation yet.

This revision reconciles the spec with the visual mockup built and iterated
in a companion Artifact (desktop + mobile artboards, real content, a working
light/dark toggle). Where this doc and the mockup ever disagree, the mockup
is newer — update this doc to match rather than the other way around.

## 0. Content audit (why this matters before layout)

- **Career.tsx** (Allianz/FPT/MBC) and **Freelance.tsx** (IHRP/Nan Yan) are
  plain-text dumps of the *same* jobs already structured in `data/career.ts`
  and rendered by Timeline. If these get switched back on as-is, the page
  roughly doubles in length and repeats itself verbatim — this is very
  likely the real source of "excessive scroll length," more than any single
  section's padding.
- **Persona.tsx** (Best IT Solutions / personal apps) has no equivalent in
  Timeline — it's the one piece of unique content among the three dead
  sections, and it now gets its own section rather than being folded into
  Case Studies (see §2, Personal Projects).
- Recommendation baked into the spec below: **retire Career.tsx and
  Freelance.tsx** as raw content, repurpose Career.tsx into curated case
  studies, give Persona its own section, and keep Timeline as the single
  source of truth for chronological history.

> Also worth flagging up front: `routes/index.tsx` currently only renders
> Hero → Skill → Timeline → Footer. Header, Career, Freelance, and Persona
> are all commented out or dead. `Navbar.tsx` is unrelated scaffold code
> (renders "Political Ideology Dashboard", uses `@chakra-ui/icons`, imported
> nowhere) — treat it as leftover cruft, not a component to revive.
> `global.css` hardcodes `body { background: #1e90ff; color: #ffffff }`,
> which fights Chakra's color-mode system at the root — that's almost
> certainly contributing to the contrast complaints, independent of any
> teal/navy token choice.

## 1. Cross-cutting system (fix once, applies everywhere)

**Color-mode tokens.** `theme.tsx` currently only extends fonts — no
semantic tokens exist, so every component calls `useColorModeValue` inline
or hardcodes a value. Add semantic color tokens once (`bg.canvas`,
`bg.surface`, `bg.surfaceRaised`, `text.primary`, `text.secondary`,
`text.accent`, `border.default`), each with light/dark pairs built from
Chakra's existing gray/teal scale — no new hex. Every section below should
consume these tokens, not call `useColorModeValue` locally.

**Global CSS.** Delete the `background-color`, `color`, and `font-family`
rules from `global.css`'s body selector — they hardcode `#1e90ff`/`#ffffff`
and silently override whatever Chakra's theme decides per color mode. Body
background/text should come from the theme's `styles.global` (currently
commented out in `theme.tsx`) using the new semantic tokens.

**Contrast findings** (computed against real values in the code, not
assumptions):

- `Card.tsx` icon/date text: `teal.400` (#38B2AC) on `gray.800` (#1A202C,
  dark mode) → **6.3:1, passes AA.** Dark-mode teal-on-navy in this specific
  spot is actually fine.
- `Card.tsx` same `teal.400` on `gray.100` (#EDF2F7, **light** mode) →
  **2.3:1, fails AA** (needs 4.5, or 3.0 even for large text). This is the
  real contrast bug, and it's in light mode, not dark.
- Hero description / `Contacts.tsx`: hardcoded `color="gray.500"` (#718096)
  on dark-mode background (#1A202C) → **4.07:1, fails AA** for body text
  (needs 4.5). Passes fine in light mode.
- Fix: replace both fixed colors with a `text.accent` token (light:
  `teal.600`, dark: `teal.300`) and a `text.secondary` token (light:
  `gray.600`, dark: `gray.400`) — both pairs clear 4.5:1 in their respective
  mode.

**Icon system.** Six different icon sets are mixed: `react-icons/fa`, `/si`,
`/bs`, `/lu`, `/md`, plus `@chakra-ui/icons` in the dead Navbar. Standardize:
**Lucide (`react-icons/lu`)** for all UI/system icons (nav, contact rows,
dark-mode toggle), **Simple Icons (`react-icons/si`)** for all technology/
brand badges, **Bootstrap icons (`react-icons/bs`)** reserved only for
social-platform links since those need actual brand marks. Drop
`@chakra-ui/icons` and `react-icons/md` entirely; delete `Navbar.tsx`. The
mockup replaces the three Lottie animations with a technical skill matrix
(see §2, Skills), which also resolves the "inconsistent icon styles" finding
outright — there's no longer a third illustration language to reconcile
against the icon set.

**Breakpoints.** Chakra's responsive array shorthand maps positionally to
`[base, sm, md, lg, xl]`. `Skill.tsx`'s `direction={['column','row']}` and
`Hero.tsx`'s same pattern only have two entries, meaning they flip to row
layout at **`sm` (480px)** — not 1024px as assumed. That's the actual root
cause of the 3-column break: three columns are being forced into a row at
phone-landscape width. Fix: stop using positional array shorthand for major
layout switches; use explicit breakpoint objects (the pattern `Timeline.tsx`
already gets right with `useBreakpointValue({ base: false, md: true })`)
everywhere. The Skills matrix (§2) uses a `repeat(N, minmax(0,1fr))` grid at
3 columns from `lg`, 1 column below it, sidestepping the array-shorthand trap
entirely.

**Scroll/anchor overlap.** No `framer-motion` scroll code currently exists
in `app/` despite being a dependency — Header is commented out entirely,
which is likely a prior workaround for this exact bug rather than a real
fix. Root fix: give every section's heading a `scrollMarginTop` equal to
the sticky header's height, and wire Header's nav links to real in-page
anchors instead of `Link to="/"` (currently all five nav links point at the
same route and do nothing).

**Interactive-element color system** *(new, from mockup iteration)*. The
mockup surfaced a real ambiguity: buttons, tags, and decorative badges all
looked alike, so it wasn't clear what was clickable. The fix is a strict
color rule, not a shape rule:
- **Solid accent fill** = the one primary action in a given view (e.g. "View
  experience"). Never more than one per screen region.
- **Accent-colored text + accent-colored border, transparent background** =
  secondary actions and real links — "Get in touch," social icons, the
  résumé download link, the Personal Projects source-link placeholder.
- **Neutral text, filled neutral background, no border** = information you
  can't click — tech-stack tags, dates, category chips, decorative glyph
  tiles.
- **Neutral, circular, icon-only** = utility controls (theme toggle, mobile
  menu) — shape alone marks these as toggles, deliberately quiet so they
  don't compete with real CTAs.

Implement this as two more semantic tokens on top of §1's set:
`interactive.border`/`interactive.text` (= accent) for secondary actions,
and reuse `text.secondary`/`bg.surfaceRaised` (no border) for tags. Any
component styled as a bordered square/pill must go through this rule before
shipping — it's what caught the social-icon and project-glyph inconsistency
in the mockup.

**Performance** *(new)*. Dropping the three Lottie animations (`backend.json`,
`frontend.json`, `mobile.json`) in favor of the Skills matrix removes the
`lottie-react` runtime plus three JSON payloads from the initial render path
— a real load-time win on top of the scroll-length one, worth calling out
explicitly given the site is meant to demonstrate senior engineering
judgment, not just look good.

**Trust signals** *(new)*. Three gaps worth closing for a hiring audience:
- **Open Graph meta tags.** `root.tsx`'s `meta` export currently sets only
  `charset`/`title`/`viewport` — no `description`, no `og:image`. When this
  link is shared on LinkedIn or emailed to a recruiter it renders as a bare
  title with no preview. Add `description`, `og:title`, `og:description`,
  `og:image` (a static 1200×630 asset), and `twitter:card`.
  This is a route-level/meta change, not a visual one — no mockup
  equivalent.
- **Résumé download.** Added to the mockup's Hero as a tertiary text link
  next to the two CTA buttons ("Download résumé"), styled per the
  interactive-color rule above (accent text, no border/fill, third-tier
  emphasis). Needs a real PDF at e.g. `public/resume.pdf` before this ships
  — currently a placeholder `href="#"`.
- **Source links on real work.** Client/employer case studies (Allianz, Nan
  Yan) are proprietary — a public repo link on those isn't realistic and
  isn't in the mockup. The Personal Projects card (solo-owned code) is the
  one place this is plausible, so the mockup adds a bracketed placeholder
  link there: `[View source — add repo link]`. Replace with a real URL if
  the repo is public, or remove the line if it isn't.

**Accessibility** *(new, beyond the contrast fixes above)*. Two gaps not yet
in the implementation:
- No skip-to-content link — first Tab stop on the live site currently lands
  wherever focus order happens to start, with no way to jump past the nav.
- No defined `:focus-visible` styling in the theme — combined with the
  `global.css` conflict in §1, keyboard-navigation is unverified end to end.
  Add a visible focus ring using the accent token so it holds up in both
  color modes.
Both are code-level fixes with no meaningful static-mockup equivalent (a
skip link is invisible until focused; verify these in the live browser once
implemented, not in the Artifact).

**Motion** *(new)*. The rest of the page stays static and information-dense
by design — the one deliberate page-load moment is the hero's service-
topology diagram: the four connector lines draw in (stroke animation,
~0.7s, staggered ~120ms apart), the portrait fades/scales in after the
lines start, and the four tech-tag pills fade in as their line completes.
Implemented in the mockup as a CSS `@keyframes` animation gated behind
`@media (prefers-reduced-motion: no-preference)` — with reduced motion, the
diagram simply renders in its final state with no animation, no JS branch
needed. Nothing else on the page animates on load or scroll; hover/focus
transitions on interactive elements are fine and are not "page-load motion."

## 2. Per-section spec

Order (matches the mockup): Navbar → Hero → Skills → Professional Experience
→ Architecture Case Studies → Personal Projects → Continuous Learning →
Footer/Contact. Experience was moved above Case Studies from the original
draft of this spec — a hiring manager wants the chronological credibility
check before the narrative deep-dive.

### Navbar (revive `Header.tsx`, delete `Navbar.tsx`)

- **Layout:** sticky top bar, name/logo left, in-page anchor links center,
  dark-mode toggle right. Links become real anchors: `#skills`,
  `#experience`, `#case-studies`, `#projects`, `#learning`, `#contact`.
- **Tokens:** `borderColor` → `border.default` semantic token (currently
  hardcoded `gray.100`, invisible/wrong in dark mode); background →
  `bg.surface` with slight transparency + backdrop blur so sticky scroll
  doesn't look flat.
- **Breakpoints:** collapse link row into a disclosure/hamburger below `md`;
  current `Stack direction={['column','row']}` (column at base, row at sm)
  is too early for 6 nav links — push to `md`.
- **Change vs current:** actually gets rendered (currently commented out);
  non-functional links become functional; icon toggle switches to Lucide
  only.

### Hero

- **Layout:** two-column intro (copy left, portrait right) — the portrait
  sits at the center of a small service-topology diagram (4 connector lines
  to tech-tag pills: `spring-boot`, `kafka`, `postgres`, `rest-api`), the
  one deliberate visual/motion moment on the page (see §1, Motion). Copy
  column: availability status line, name, role, one-line pitch, a 3-stat
  row, then a CTA row of primary button + secondary button + tertiary
  "Download résumé" link, then social icons. Full email/phone/address block
  stays out of Hero, down in Footer/Contact.
- **Fix:** `resumeData.personalInfo.title` ("Senior Software Engineer") must
  match the current role stated in Timeline/Allianz data. The mockup settled
  on **"Senior Backend Developer"**, reconciling Allianz's actual title
  ("Advanced Backend Developer") with the site's senior positioning —
  confirm this exact wording before implementing, since it's a factual
  identity claim, not just a display choice. Reconcile in `data/resume.ts`
  and pull from the same milestone data Timeline uses, so the two can't
  drift again.
- **Tokens:** description text → `text.secondary` (fixes the 4.07:1
  dark-mode fail above). CTA row follows the interactive-color rule in §1.
- **Breakpoints:** switch column→row at `lg` (1024px), not `sm` (480px) as
  today — a phone in landscape shouldn't force image-beside-text.

### Skills (replaces "Core Competencies" / `Skill.tsx`)

- **Layout:** a technical skill matrix, not illustrated pillars — 7
  categories, each a short heading plus wrapped tag chips: Languages &
  Backend, APIs & Messaging, Databases, Frontend, Mobile, Testing &
  Quality, Delivery & DevOps. Content pulled from real technologies across
  all five jobs in `career.ts` (a couple of items — `ci/cd`, `agile` — are
  reasonable generalizations of "GitHub Actions"/"Agile Methodology" already
  present; confirm before treating as literal resume claims).
- **Tokens:** category headings `text.primary`, tag chips `text.secondary`
  on `bg.surfaceRaised`, no border (informational, not actionable — see §1).
- **Breakpoints:** grid at 1 column base, 3 columns from `lg` (1024px) —
  deliberately not the `sm`-triggered row-flip that broke the old 3-pillar
  layout.
- **Change vs current:** the three Lottie animations and their fixed
  `height: 300` constant (`custom-css.tsx`) are removed entirely, along with
  `lottie-react` and the three JSON files if nothing else in the app uses
  them — see §1, Performance.

### Professional Experience (`Timeline.tsx`)

- **Layout:** single left-spine timeline (line + dot, card to the right) —
  simpler and more reliable to implement correctly than the current
  alternating-sides layout, and reads the same on mobile without a separate
  code path. The content genuinely is a sequence, so the structural device
  is earned.
- **Fix:** the role title shown here for the current position stays the
  single source of truth Hero pulls from (see Hero fix above).
- **Tokens:** `Card.tsx`'s `_before` pseudo-element hardcodes `#edf2f6`/
  `#1a202c` — replace with the `bg.surface` / matching border tokens
  instead of manually re-typing the hex of `gray.50`/`gray.800`. Icon color
  moves off fixed `teal.400` onto `text.accent`.
- **Breakpoints:** single-column spine works unchanged from mobile through
  desktop; widen card padding and max-width at `lg` for breathing room.

### Architecture Case Studies (repurpose `Career.tsx`)

- **Layout:** 2 case-study cards — Allianz (underwriting platform
  microservices) and Nan Yan Platform (multi-phase commerce platform) —
  each with a short problem/approach/stack summary rather than the current
  line-by-line job-history format. **Persona/Best IT Solutions is no
  longer folded in here** — it has its own section now (below), since
  mixing a solo personal project into "here's how I solve problems for
  employers" undersold both.
- **Tokens:** card surface → `bg.surfaceRaised`, stack-tech chips follow the
  informational (no-border, neutral) treatment from §1.
- **Breakpoints:** 1-col base, 2-col from `md`.
- **Change vs current:** Career.tsx's raw text content (Allianz/FPT/MBC
  subcomponents) is retired in favor of the 2 curated cards; Freelance.tsx
  is deleted outright (fully covered by Timeline already).

### Personal Projects (new section, absorbs `Persona.tsx`)

- **Layout:** one featured card (there's currently one real personal
  venture) rather than a grid — Best IT Solutions' Astrology & Maritime
  apps, with a short problem/role/stack description, tech chips, two small
  glyph tiles standing in for the two apps, and a source-link placeholder
  (see §1, Trust signals).
- **Tokens:** same card treatment as Case Studies (`bg.surfaceRaised`);
  glyph tiles are neutral fill, no border (decorative, not actionable).
- **Breakpoints:** single card, no grid — reflows from row (desktop: content
  left, tiles right) to stacked (mobile) at `md`.
- **Change vs current:** this section doesn't exist in the current build;
  `Persona/Best.tsx`'s content moves here from the dead `Persona/` folder.

### Continuous Learning (new section)

- Doesn't exist yet; this is what Header's existing "Certificates" nav link
  should point to.
- **Layout:** compact — a horizontal wrap of credential badges/chips (name,
  issuer, year) rather than full cards, deliberately lighter-weight than
  Case Studies or Personal Projects so it doesn't add another full-height
  section to the scroll. Currently no real certification data exists in the
  codebase — the mockup uses clearly bracketed placeholders
  (`[Certification name] — [Issuer], [Year]`); replace with real entries or
  cut the section before shipping.
- **Tokens:** chip background `bg.surface`, border `border.default`.
- **Breakpoints:** wraps naturally at all sizes (flex-wrap).

### Footer / Contact

- **Layout:** full contact block (email/phone/location), the social icon
  row, and a copyright line. Three-part row on desktop (contact / socials /
  copyright), stacked on mobile.
- **Tokens:** text `text.secondary`; social icons follow the interactive-
  color rule (accent border + text, not neutral) from §1.
- **Breakpoints:** column stack below `md`, row above.
- **Change vs current:** currently only renders social icons with two
  empty spacer boxes; gains the contact content moved out of Hero.

## 3. Cleanup list (files, not layout)

- Delete: `Navbar.tsx`, `Freelance/*`, `SkillCard.tsx` (empty/unused),
  `Persona/index.tsx` (empty barrel — `Persona/Best.tsx`'s content itself
  gets reused in the new Personal Projects section, just not through this
  file), `custom-css.tsx`'s fixed Lottie `style` export, `lottie-react`
  dependency and the three `public/jsons/*.json` files if nothing else
  references them.
- Repurpose: `Career/*` → 2 Architecture Case Studies cards (Allianz, Nan
  Yan only — see above).
- New: a Personal Projects section built from `Persona/Best.tsx`'s content.
- Data fix: reconcile `data/resume.ts`'s `title` field against the current
  role in `data/career.ts`/`Allianz.tsx` so Hero and Experience can never
  disagree again — pull Hero's title from the same milestone data rather
  than a separately hand-typed string.
- Add: `public/resume.pdf` (real résumé file, referenced by Hero's download
  link) and a static `public/og-image.png` (1200×630, referenced by
  `root.tsx`'s new `og:image` meta tag).

## 4. Visual reference

The living mockup (desktop + mobile artboards, real content, working
light/dark toggle, the hero's load animation) is the visual source of truth
for anything this doc describes only in prose. Check it before implementing
any section — it's been through several review passes and reflects the
current state of every decision above, including ones made after this doc
was first written.
