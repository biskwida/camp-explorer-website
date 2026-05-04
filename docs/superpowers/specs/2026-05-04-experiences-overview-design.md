# Experiences Overview Page

**Date:** 2026-05-04
**Author:** brainstorming session with biskwida
**Status:** Approved, pending spec review

## Goal

Build the `/experiences` overview page — a simple, scannable index that shows all current trips so a visitor can pick one and click through to the detail page. Match the existing site's visual language (navy-deep + cream + gold, dark editorial, alternating section bands) and the component-per-section composition pattern.

## Non-goals

- Filtering by category (international vs local) — only 3 trips today, filters add cognitive load with no payoff. Revisit if the catalog grows past ~6.
- Custom-program CTA — that lives on the future `/schools` page, not here.
- Schools-specific landing page — separate spec, separate work.
- A search box — same reason as filters.
- Pagination — 3 cards do not need it.

## Information architecture

One new route at `app/[locale]/experiences/page.tsx`. The page is the *parent* of the existing detail routes (`/experiences/sri-lanka`, `/experiences/cambodia`, `/experiences/weekend-camp`).

**Navigation:**
- The home page's "View all experiences" CTA (currently dead-ends) starts linking to `/experiences`.
- The site nav's `Experiences` link points here too.
- Each card on this page links to the corresponding detail page via the `href` already on each `Experience` entry.

## Page structure

Two stacked sections, alternating background bands like every other page:

```
┌───────────────────────────────────────┐
│ ExperiencesHero (bg-navy-deep)         │
│   - kicker: "Our Experiences"          │
│   - h1: "Choose your expedition"       │
│   - intro paragraph (max-w-2xl)        │
├───────────────────────────────────────┤
│ ExperiencesGrid (bg-navy)              │
│   - heading-less; the hero is enough   │
│   - 3 cards in an auto-fit grid        │
└───────────────────────────────────────┘
```

No third "custom programs" band — that content moves to the schools page when it ships.

## Component decomposition

Two new components in `components/sections/`:

| Component | Renders |
|---|---|
| `ExperiencesHero` | Kicker + h1 + intro paragraph, centered, max-w-3xl. Background `bg-navy-deep`. Mirrors `AboutHero`'s rhythm. |
| `ExperiencesGrid` | Maps over `experiences` from `lib/content/experiences.ts` and renders an `ExperienceCard` per entry. Background `bg-navy`. |

Plus one new card primitive:

| Component | Renders |
|---|---|
| `ExperienceCard` | A single trip card. Takes an `Experience` object (not just a slug — this is a list view, the data is already in hand). Renders one `<article>` containing one full-area `<a>`. |

`ExperienceCard` lives in `components/cards/ExperienceCard.tsx` so the schools page (and any future related-trips block) can reuse it.

## Card visual design

The card uses the real `cardImage` already populated for every experience. **No decorative icons or icon-on-rounded-rectangle templates** (an impeccable-flagged AI tell). The photo IS the card.

```
┌────────────────────────┐
│                        │
│      [photo 4:5]       │  ← cardImage, object-cover
│  ┌─────────┐           │
│  │ 11 days │           │  ← duration pill, top-left, only renders if duration exists
│  └─────────┘           │
│                        │
├────────────────────────┤
│ SRI LANKA · INTL       │  ← kicker (gold, tracked uppercase)
│                        │
│ Turtle Conservation    │  ← title (font-display, cream, h3)
│ & Coastal Expedition   │
│                        │
│ Wildlife conservation, │  ← short description (cream/70)
│ teaching, and adventure│
│                        │
│ Explore experience  →  │  ← text link with arrow (gold)
└────────────────────────┘
```

**Hover/focus state:**
- Photo subtly scales to `1.03` over `~500ms` ease-out (transform only, no layout shift).
- A gold underline `0.5px` thick draws under the title from left → right.
- Both effects wrapped in `@media (prefers-reduced-motion: no-preference)`.

**Why no filled "View" pill on the card:** the gold pill is reserved for the high-stakes register CTA on the detail page. If every card shouts, none stand out (60-30-10 rule on visual weight).

**Card content sources:**
- `cardImage` — from `experiences.ts`, real file at `/images/experiences/{slug}/card.jpg` (already exists for all 3 trips).
- Kicker (`{country} · {category}`) — built from `subtitle.{locale}` + `category` ("International" / "Local").
- Title — `title.{locale}`.
- Description — new `cardDescription: { en, ar }` field on each `Experience`. One sentence, ~12-18 words.
- Duration pill — only renders if `duration` exists. Weekend Camp doesn't have one yet, so its card just doesn't show the pill.

## Data shape

### `lib/content/experiences.ts` — extend with `cardDescription`

```ts
type Experience = {
  // …existing fields…
  cardDescription?: { en: string; ar: string };
};
```

Populate for all three:

- **Sri Lanka:** "Wildlife conservation, community teaching, and coastal adventure across 11 unforgettable days."
- **Cambodia:** "Ethical elephant sanctuary days followed by a guided jungle expedition through Keo Seima."
- **Weekend Camp:** "Outdoor leadership and adventure for teens and families, close to home in Saudi Arabia."

(Translator pass for Arabic later — English fallbacks at first, same pattern as the detail pages.)

### `messages/{en,ar}.json` — add `experiencesOverview` namespace

```json
{
  "experiencesOverview": {
    "hero": {
      "kicker": "Our Experiences",
      "title": "Choose your expedition",
      "intro": "Immersive international and local experiences for young explorers aged 14–18 — designed to build confidence, awareness, and a lifelong sense of adventure."
    },
    "card": {
      "cta": "Explore experience"
    }
  }
}
```

The card's "Explore experience" text comes from this namespace so it stays bilingual without per-card translation work.

## Responsive strategy

Single rule does the heavy lifting:

```css
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
```

| Width | Result |
|---|---|
| < 640px | 1 column |
| 640–1023px | 2 columns |
| 1024px+ | 3 columns |

Section vertical padding scales with `clamp()`:
- Hero: `py-[clamp(4rem,10vw,8rem)]`
- Grid: `py-[clamp(4rem,8vw,8rem)]`

Card photo aspect ratio stays `aspect-[4/5]` regardless of viewport — the grid track width is what changes, not the proportions.

Container caps at `max-w-7xl` (matches the rest of the site's `container-page` utility).

## Accessibility

- **Single click target per card:** the entire card is wrapped in one `<Link>` (next-intl's `Link`). No nested links, no separate "Explore" button — clean tab order, one announcement per card.
- **Semantic structure:** page renders `<main>` → `<h1>` (in hero) → `<section>` (grid) → `<article>` per card → `<h3>` for trip title. The grid section has `aria-labelledby="experiences-grid"` pointing to a visually-hidden heading.
- **Real alt text** per card image, sourced from a new `cardImageAlt: { en, ar }` field on each `Experience`. Examples:
  - Sri Lanka: "Sea turtle being released onto the sand at sunrise"
  - Cambodia: "Elephant walking through dense jungle in Mondulkiri"
  - Weekend Camp: "Group of teens around a campfire under stars in the Saudi desert"
- **Focus-visible:** card shows a clear `ring-2 ring-gold ring-offset-2 ring-offset-navy-deep` on keyboard focus. The browser's default outline is not enough on dark backgrounds.
- **Reduced motion:** photo zoom and underline draw both wrapped in `@media (prefers-reduced-motion: no-preference)`. Default state is the resting state — no movement is added when motion is reduced.
- **Contrast:** cream `oklch(0.94 0.02 80)` on navy-deep `oklch(0.18 0.04 250)` is ~13:1 (WCAG AAA). Gold on navy is ~6.1:1 (WCAG AA Large; passes for the kicker and CTA sizes used).
- **RTL:** the underline and arrow flip with `rtl:rotate-180` on the arrow icon, matching the existing pattern in `ExperienceWhoFor`. Grid order naturally reverses under `dir="rtl"`.

## Visual language (inherited)

- **Section background rhythm:** Hero `bg-navy-deep`, Grid `bg-navy` — consecutive bands alternate, same pattern as About + detail pages.
- **Padding:** matches existing convention (clamp-based, generous on desktop).
- **Headings:** `font-display text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-balance text-cream`.
- **Kickers:** `text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] text-gold`.
- **Body:** `text-base sm:text-lg leading-relaxed text-cream/80`.
- **Card surface:** `bg-navy-deep/40` — the photo dominates so the card body wants to recede. Border `border border-gold/15` only — no nested cards, no glassmorphism, no inset shadow.
- **Animation:** entrance uses `initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}}` with stagger across the 3 cards, matching existing detail-page sections.

## Image strategy

- Each `cardImage` is already in place and renders today; no new image work blocks this page.
- If a `cardImage` ever 404s, the gradient fallback shows through (existing `bg-gradient-to-br from-navy-deep via-navy to-gold/20` pattern from `ExperienceActivities`).
- Drop-and-overwrite at `/images/experiences/{slug}/card.jpg` to swap.

## Testing

`features/experiences-overview.feature` (new):

```gherkin
Feature: Experiences overview page lists every available trip

  Scenario: English overview renders all 3 experience cards
    Given I visit the "experiences" page in "en"
    Then I see the headline "Choose your expedition"
    And the document direction is "ltr"
    And I see a link to "/en/experiences/sri-lanka"
    And I see a link to "/en/experiences/cambodia"
    And I see a link to "/en/experiences/weekend-camp"

  Scenario: Arabic overview renders RTL with translated headline
    Given I visit the "experiences" page in "ar"
    Then the document direction is "rtl"
    And the document language is "ar"
    And I see a link to "/ar/experiences/sri-lanka"
    And I see a link to "/ar/experiences/cambodia"

  Scenario: Cards link to detail pages
    Given I visit the "experiences" page in "en"
    When I click the "Sri Lanka" card
    Then I am on "/en/experiences/sri-lanka"
```

Plus manual verification at 375px, 768px, 1280px before deploying.

## Build order

1. Add `cardDescription` and `cardImageAlt` fields to `Experience` type, populate all three trips.
2. Add `experiencesOverview` namespace to `messages/{en,ar}.json`.
3. Build `ExperienceCard` (in `components/cards/`) — the most reusable piece, build it once.
4. Build `ExperiencesHero` and `ExperiencesGrid` section components.
5. Compose `app/[locale]/experiences/page.tsx`.
6. Wire up the home page's "View all experiences" CTA + nav link to actually point at `/experiences`.
7. Write `features/experiences-overview.feature`, run BDD, verify pass.
8. Manual QA at 375px / 768px / 1280px in preview.
9. `/safe-commit` + push + deploy.

## Open follow-ups (not in scope)

- `/schools` overview + custom-program CTA — separate spec.
- Real photography for Weekend Camp card if not yet captured.
- Arabic translator pass on `cardDescription` and `cardImageAlt` strings.
- Future filter/category logic if the catalog grows past ~6 trips.
