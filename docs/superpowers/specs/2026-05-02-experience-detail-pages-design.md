# Experience Detail Pages: Sri Lanka & Cambodia

**Date:** 2026-05-02
**Author:** brainstorming session with biskwida
**Status:** Approved, pending spec review

## Goal

Build the two flagship international experience detail pages — `/experiences/sri-lanka` and `/experiences/cambodia` — using the design mockup as the visual reference and the source content doc as the body copy. Match existing site conventions (component-per-section composition, next-intl for body copy, Tailwind v4 design tokens). Keep the build BDD-first.

## Non-goals

- The `/experiences` overview page, `/experiences/weekend-camp`, `/schools/*` pages — separate work, separate specs.
- The `/register` form backend (Resend + Google Sheets) — separate work, blocked on secrets.
- Designing photography or producing real activity-card images — placeholders ship now, real images dropped later via the existing fixed-path overwrite convention.

## Information architecture

Two new pages, each composing the same 8 section components with different `slug` props:

```
app/[locale]/experiences/
├── sri-lanka/page.tsx     # composes 8 sections, slug="sri-lanka"
└── cambodia/page.tsx      # composes 8 sections, slug="cambodia"
```

**Navigation:** existing home-page experience cards already link to these routes. The Register CTA on each detail page deep-links to `/register?program=<slug>` so the eventual form pre-selects the program.

## Component decomposition

Eight new components in `components/sections/`:

| Component | Renders | Reused by |
|---|---|---|
| `ExperienceHero` | Full-bleed photo + kicker + title + 4-icon meta row | sri-lanka, cambodia |
| `ExperienceOverview` | Narrative paragraph, max-w-3xl, centered | sri-lanka, cambodia |
| `ExperienceActivities` | 3 cards: image + title + bullet list | sri-lanka, cambodia |
| `ExperienceTimeline` | Day-by-day journey; horizontal arc on `md+`, numbered vertical list on mobile | sri-lanka, cambodia |
| `ExperienceHighlights` | 4-card icon grid | sri-lanka, cambodia |
| `AbdulExperienceBlock` | Branded callout w/ bullet list (mirrors `AboutFounder` quote treatment) | sri-lanka, cambodia, future weekend + schools |
| `ExperienceSafety` | 4 small icon labels (structured / 1-2 adults per 10 / risk assessment / on-ground support) | sri-lanka, cambodia, future weekend + schools |
| `ExperienceWhoFor` | 2 eligibility cards + application note + Register CTA | sri-lanka, cambodia, future weekend + schools |

Each component takes `slug: ExperienceSlug` as its only prop and pulls its body text via `useTranslations(\`experiences.${slug}.{section}\`)`. Where a section needs structural data (icons, image paths), it pulls from `lib/content/experiences.ts` by slug.

## Data shape

### `lib/content/iconMap.ts` (new)

A small map from string keys (used in `experiences.ts`) to lucide-react icon components. Keeps `experiences.ts` JSON-serializable (no JSX in data files).

```ts
import { CalendarDays, Leaf, Users, Compass, /* ... */ } from "lucide-react";
export const iconMap = {
  calendar: CalendarDays,
  leaf: Leaf,
  community: Users,
  compass: Compass,
  // …expand as needed
} as const;
export type IconKey = keyof typeof iconMap;
```

### `lib/content/experiences.ts` extensions

Add optional structural fields to the `Experience` type:

```ts
type Experience = {
  // …existing fields…
  meta?:        { iconKey: IconKey }[];                    // 4 entries (hero meta row)
  activities?:  { iconKey: IconKey; image: string }[];     // 3 entries (activity cards)
  timeline?:    { iconKey: IconKey }[];                    // 5 entries (day groupings)
  highlights?:  { iconKey: IconKey }[];                    // 4 entries
  safety?:      { iconKey: IconKey }[];                    // 4 entries
};
```

Each entry's body copy (label, sublabel, bullet items) lives in messages JSON; this file holds only the icon ref + image path. Component uses `experiences.find(e => e.slug === slug)` to read.

### `messages/en.json` + `messages/ar.json` extensions

New top-level `experiences.{sriLanka,cambodia}` namespaces. Each has nested keys per section, with arrays where needed:

```json
{
  "experiences": {
    "sriLanka": {
      "hero": {
        "kicker": "Sri Lanka",
        "title": "Turtle Conservation & Coastal Expedition",
        "meta": ["11-day experience", "Wildlife conservation", "Community engagement", "Adventure & culture"]
      },
      "overview": "Join an unforgettable 11-day youth experience in Sri Lanka …",
      "activities": [
        { "title": "Turtle Conservation", "subtitle": "Morning Activities",
          "items": ["Care for injured and rescued sea turtles", "…"] },
        { "title": "Teaching & Community Engagement", "subtitle": "Afternoons",
          "items": ["Conduct fun, creative sessions with local students", "…"] },
        { "title": "Weekend Adventure", "subtitle": "",
          "items": ["Wildlife safari experience", "…"] }
      ],
      "timeline": {
        "heading": "Program Structure (11 Days)",
        "items": [
          { "range": "Day 1–2", "label": "Travel" },
          { "range": "Day 2",   "label": "Arrival + Orientation + Town Tour" },
          /* … */
        ]
      },
      "highlights": ["Work with 5 different turtle species…", "…"],
      "abdul": {
        "heading": "Abdul Explorer Experience",
        "items": ["Daily evening activities and group challenges", "…"]
      },
      "safety": ["Structured daily program", "1–2 adults per 10 participants", "Risk assessments in place", "On-ground support"],
      "whoFor": {
        "heading": "Who It's For",
        "cards": [
          { "label": "Participants", "subtitle": "Ages 14–18" },
          { "label": "Schools & groups", "subtitle": "Group bookings" }
        ],
        "note": "Application required — participants are selected",
        "cta": "Register your interest"
      }
    },
    "cambodia": { /* same shape, different content */ }
  }
}
```

Arabic file gets parallel structure with translated copy.

## Responsive strategy

| Breakpoint | Behavior |
|---|---|
| `< sm` (375px+) | Single column; timeline = numbered vertical list; activity cards stacked; meta-row icons in 2×2 grid |
| `sm:` (640px+) | Highlights 2-col; safety icons 4-col; meta-row icons inline |
| `md:` (768px+) | Activities 3-col; timeline horizontal arc (5-col) |
| `lg:` (1024px+) | Section padding bumps from `py-24` → `py-32`; container caps at `max-w-7xl` |

The timeline's mobile-vs-desktop divergence is the most distinctive responsive behavior:

- **Desktop (`md:` and up):** horizontal "journey arc" — five icon nodes evenly spaced, connected by a dotted gold line behind them; below each node, the day-range label (e.g. "Day 3–7") and the activity label (e.g. "Conservation + Teaching") stack vertically.
- **Mobile:** same five entries become a numbered vertical list, day-range bold inline, activity label below it; no connector line (the visual flow is implicit in the stacked column).

## Visual language (inherited)

- **Section background rhythm:** `ExperienceHero` carries its own photo background; everything below alternates `bg-navy-deep` and `bg-navy` between consecutive sections so the visual rhythm reads without dividers. Each section component owns its own `bg-*` class — the page composition produces the alternation by ordering. No hairlines (we removed those from `AboutMission`/`AboutFounder` already).
- Padding: `py-24 sm:py-32` per section, matching about pages.
- Headings: `font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-balance text-cream`.
- Kickers: `text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] text-gold`.
- Body: `text-base sm:text-lg leading-relaxed text-cream/80`.
- Cards: `rounded-sm border border-gold/15 bg-navy/40`.
- Animation: framer-motion `initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}}` with `viewport={{once:true, margin:"-100px"}}`.
- Register CTA: gold filled pill matching existing pattern in `HomeHero` and `AboutContact`.

## Image strategy

**Real images** — `hero.jpg` and `card.jpg` already exist for both countries at `public/images/experiences/{sri-lanka,cambodia}/`.

**Activity card images** — 3 per country expected at fixed paths:
- Sri Lanka: `conservation.jpg`, `teaching.jpg`, `adventure.jpg`
- Cambodia: `conservation.jpg`, `jungle.jpg`, `cultural.jpg`

Until real images arrive, the `ExperienceActivities` component renders a **gradient placeholder** keyed to brand colors (navy → gold tint) with the activity icon centered. Drop-and-overwrite at the fixed paths to swap in real photos — no code change needed.

## Testing

`features/experiences-detail.feature` (new):
```gherkin
Feature: Experience detail pages

Scenario: Sri Lanka detail page renders all sections
  Given I am on /en/experiences/sri-lanka
  Then I see the hero with title "Turtle Conservation & Coastal Expedition"
  And I see the program overview paragraph
  And I see 3 activity cards
  And I see the 11-day program structure
  And I see 4 key highlights
  And I see the Abdul Explorer Experience block
  And I see 4 safety items
  And I see 2 who-it's-for cards
  And the register CTA links to /register?program=sri-lanka

Scenario: Cambodia detail page renders all sections
  …same checks against /en/experiences/cambodia and /register?program=cambodia

Scenario: Timeline stacks vertically on mobile
  Given I am on /en/experiences/sri-lanka with viewport 375x812
  Then the timeline items are stacked vertically (one column)

Scenario: Timeline shows horizontal arc on desktop
  Given I am on /en/experiences/sri-lanka with viewport 1280x800
  Then the timeline items are arranged horizontally (5 columns)
```

Plus manual verification in the preview tool at 375px and 1280px before deploying.

## Build order

1. `lib/content/iconMap.ts` (new) + extend `Experience` type in `lib/content/experiences.ts` with optional fields, populate sri-lanka and cambodia structural data.
2. Add `experiences.sriLanka` namespace to `messages/en.json` (real content from source doc) and `messages/ar.json` (parallel structure, Arabic translations stubbed if not yet provided).
3. Build the 8 section components one at a time, verifying each in preview at 375px and 1280px.
4. Compose `app/[locale]/experiences/sri-lanka/page.tsx` from the section components.
5. Add `experiences.cambodia` namespace (real content from source doc).
6. Compose `app/[locale]/experiences/cambodia/page.tsx` (same components, `slug="cambodia"`).
7. Drop placeholder gradient logic in `ExperienceActivities` for missing activity images.
8. Run BDD feature manually (or via Playwright if step infra exists), check both viewports.
9. `/safe-commit` + deploy.

## Open follow-ups (not in scope of this build)

- Real activity-card photography (drop-in via fixed paths once available).
- Arabic translations review (Arabic copy may need a translator pass; English ships immediately).
- `/experiences` overview page — once both detail pages ship, the overview can link into them.
- `/register?program=<slug>` deep-link handling — requires the `/register` page to exist, which is its own phase.
