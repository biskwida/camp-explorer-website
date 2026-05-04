# Experiences Overview Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/experiences` overview page — a two-section index (hero band + auto-fit grid of 3 cards) that lists every available trip and links to its detail page.

**Architecture:** Two new section components (`ExperiencesHero`, `ExperiencesGrid`) plus one reusable card primitive (`ExperienceCard` in `components/cards/`). The card pulls data from each `Experience` object directly — no per-card translation calls, structural data already lives in `lib/content/experiences.ts`. Two new fields are added to the `Experience` type: `cardDescription` (one-sentence trip summary) and `cardImageAlt` (real alt text for the photo). Body copy for the hero + the card CTA label lives in a new top-level `experiencesOverview` namespace in `messages/{en,ar}.json`. Auto-fit grid (`repeat(auto-fit, minmax(320px, 1fr))`) handles all responsive breakpoints with no per-breakpoint logic.

**Tech Stack:** Next.js 16 (App Router), Tailwind v4, next-intl 3.x (locale routing), framer-motion (whileInView fades), lucide-react (ArrowRight icon), playwright-bdd + Cucumber (BDD test runner via `bun test:e2e`).

**Pre-existing wiring confirmed:** `mainNav` in `lib/content/nav.ts` already points to `/experiences`. The home page's "View all experiences" CTA in `HomePreview.tsx` already links to `/experiences`. Both currently 404 — they will start working as soon as the page exists. **No changes needed to nav or home.**

---

## File Structure

**New files:**
- `components/cards/ExperienceCard.tsx` — single-card primitive (image, kicker, title, description, CTA). Reusable from any list/related-trips block.
- `components/sections/ExperiencesHero.tsx` — kicker + h1 + intro paragraph. `bg-navy-deep`.
- `components/sections/ExperiencesGrid.tsx` — auto-fit grid mapping `experiences` to `<ExperienceCard>` instances. `bg-navy`.
- `app/[locale]/experiences/page.tsx` — page composing the two sections.
- `features/experiences-overview.feature` — BDD scenarios.

**Modified files:**
- `lib/content/experiences.ts` — extend `Experience` type with `cardDescription`, `cardImageAlt`; populate all 3 entries.
- `messages/en.json` — add top-level `experiencesOverview` namespace.
- `messages/ar.json` — same shape, Arabic where available, English fallbacks elsewhere.

---

### Task 1: Extend `Experience` type with `cardDescription` and `cardImageAlt`

**Files:**
- Modify: `lib/content/experiences.ts`

- [ ] **Step 1: Add the two optional fields to the `Experience` type**

Find the `export type Experience = {` block. Add the new fields after `cardImage`:

```ts
export type Experience = {
  slug: ExperienceSlug;
  href: string;
  cardImage: string;
  cardImageAlt?: { en: string; ar: string };
  cardDescription?: { en: string; ar: string };
  heroImage: string;
  category: "international" | "local";
  kicker: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  duration?: { en: string; ar: string };
  meta?: { iconKey: IconKey }[];
  activities?: { iconKey: IconKey; image: string }[];
  timeline?: { iconKey: IconKey }[];
  highlights?: { iconKey: IconKey }[];
  safety?: { iconKey: IconKey }[];
};
```

- [ ] **Step 2: Populate `cardDescription` + `cardImageAlt` for sri-lanka**

Find the sri-lanka entry. Add the two new fields after `cardImage`:

```ts
cardImage: "/images/experiences/sri-lanka/card.jpg",
cardImageAlt: {
  en: "Sea turtle being released onto the sand at sunrise",
  ar: "إطلاق سلحفاة بحرية على الرمال عند شروق الشمس",
},
cardDescription: {
  en: "Wildlife conservation, community teaching, and coastal adventure across 11 unforgettable days.",
  ar: "حماية الحياة البرية، والتدريس المجتمعي، ومغامرة ساحلية على مدى 11 يومًا لا تُنسى.",
},
```

- [ ] **Step 3: Populate `cardDescription` + `cardImageAlt` for cambodia**

```ts
cardImage: "/images/experiences/cambodia/card.jpg",
cardImageAlt: {
  en: "Elephant walking through dense jungle in Mondulkiri",
  ar: "فيل يسير عبر الأدغال الكثيفة في موندولكيري",
},
cardDescription: {
  en: "Ethical elephant sanctuary days followed by a guided jungle expedition through Keo Seima.",
  ar: "أيام في محمية الفيلة الأخلاقية تليها رحلة استكشافية في أدغال كيو سيما.",
},
```

- [ ] **Step 4: Populate `cardDescription` + `cardImageAlt` for weekend-camp**

```ts
cardImage: "/images/experiences/weekend-camp/card.jpg",
cardImageAlt: {
  en: "Group of teens around a campfire under stars in the Saudi desert",
  ar: "مجموعة من المراهقين حول نار المخيم تحت النجوم في الصحراء السعودية",
},
cardDescription: {
  en: "Outdoor leadership and adventure for teens and families, close to home in Saudi Arabia.",
  ar: "قيادة المغامرة في الهواء الطلق للمراهقين والعائلات، قريبًا من المنزل في المملكة العربية السعودية.",
},
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
bun run typecheck 2>/dev/null || bun tsc --noEmit
```
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add lib/content/experiences.ts
git commit -m "feat(content): add cardDescription + cardImageAlt to experiences"
```

---

### Task 2: Add `experiencesOverview` namespace to messages JSON

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/ar.json`

- [ ] **Step 1: Add the `experiencesOverview` block to `messages/en.json`**

Insert as a new top-level sibling key (alongside `home`, `about`, `experiences`, etc.). Place it next to the existing `experiences` key for proximity:

```json
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
```

- [ ] **Step 2: Add the same shape to `messages/ar.json` with Arabic translations**

```json
"experiencesOverview": {
  "hero": {
    "kicker": "تجاربنا",
    "title": "اختر رحلتك الاستكشافية",
    "intro": "تجارب دولية ومحلية غامرة للمستكشفين الشباب من سن 14 إلى 18 — مصممة لبناء الثقة والوعي وحس المغامرة مدى الحياة."
  },
  "card": {
    "cta": "استكشف التجربة"
  }
}
```

- [ ] **Step 3: Verify both JSON files parse**

```bash
bun -e "JSON.parse(require('fs').readFileSync('messages/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('messages/ar.json', 'utf8')); console.log('OK')"
```
Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add messages/en.json messages/ar.json
git commit -m "feat(i18n): add experiencesOverview namespace (en + ar)"
```

---

### Task 3: Write BDD feature file (red phase)

**Files:**
- Create: `features/experiences-overview.feature`

- [ ] **Step 1: Write the feature**

```gherkin
Feature: Experiences overview page lists every available trip
  Visitors arriving on /experiences should see all current trips with
  links to each detail page, in both English and Arabic.

  Scenario: English overview renders all 3 experience cards
    Given I visit the "experiences" page in "en"
    Then I see the headline contains "Choose your expedition"
    And the document direction is "ltr"
    And the document language is "en"
    And I see a link to "/en/experiences/sri-lanka"
    And I see a link to "/en/experiences/cambodia"
    And I see a link to "/en/experiences/weekend-camp"

  Scenario: Arabic overview renders RTL with translated headline
    Given I visit the "experiences" page in "ar"
    Then the document direction is "rtl"
    And the document language is "ar"
    And I see a link to "/ar/experiences/sri-lanka"
    And I see a link to "/ar/experiences/cambodia"
    And I see a link to "/ar/experiences/weekend-camp"
```

- [ ] **Step 2: Run the test to verify it fails (the page doesn't exist yet)**

```bash
bun test:e2e -- experiences-overview
```
Expected: FAIL — visiting `/en/experiences` returns 404 because the page hasn't been built.

- [ ] **Step 3: Commit**

```bash
git add features/experiences-overview.feature
git commit -m "test(experiences): add BDD feature for /experiences overview"
```

---

### Task 4: Build `ExperienceCard` primitive

**Files:**
- Create: `components/cards/ExperienceCard.tsx`

- [ ] **Step 1: Create the component**

The card wraps the entire surface in a single `<Link>` so screen readers announce the trip title + kicker as one cohesive link, and there's exactly one tab stop per card. Hover/focus effects are wrapped in `motion-safe:` so users with `prefers-reduced-motion` don't get the photo zoom or underline draw.

```tsx
// components/cards/ExperienceCard.tsx
"use client";

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import type { Experience } from "@/lib/content/experiences";
import { placeholderImages } from "@/lib/content/experiences";
import type { Locale } from "@/lib/i18n/routing";

type Props = { experience: Experience };

export function ExperienceCard({ experience }: Props) {
  const t = useTranslations("experiencesOverview.card");
  const locale = useLocale() as Locale;

  const categoryLabel =
    experience.category === "international" ? "International" : "Local";
  const kicker = `${experience.subtitle[locale]} · ${categoryLabel}`;
  const altText =
    experience.cardImageAlt?.[locale] ?? experience.title[locale];
  const description = experience.cardDescription?.[locale] ?? "";
  const imageSrc =
    placeholderImages[experience.cardImage] ?? experience.cardImage;

  return (
    <article className="group h-full">
      <Link
        href={experience.href}
        className="block h-full overflow-hidden rounded-sm border border-gold/15 bg-navy-deep/40 transition-colors duration-300 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      >
        {/* Photo — 4:5 portrait */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-gold/20">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
          />
          {/* Subtle bottom gradient so the photo edge meets the card body cleanly */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-navy-deep/60"
          />
          {experience.duration ? (
            <span className="absolute start-4 top-4 inline-flex items-center rounded-full border border-cream/20 bg-navy-deep/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream/90 backdrop-blur-[2px]">
              {experience.duration[locale]}
            </span>
          ) : null}
        </div>

        {/* Card body */}
        <div className="p-6 sm:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            {kicker}
          </p>
          <h3 className="mt-3 font-display text-xl font-bold leading-snug text-cream sm:text-2xl">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 motion-safe:group-hover:bg-[length:100%_1px]">
              {experience.title[locale]}
            </span>
          </h3>
          {description ? (
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-cream/75 sm:text-base">
              {description}
            </p>
          ) : null}
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold transition-colors group-hover:text-gold-light">
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1 rtl:rotate-180 rtl:motion-safe:group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
bun tsc --noEmit
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/cards/ExperienceCard.tsx
git commit -m "feat(cards): add ExperienceCard primitive"
```

---

### Task 5: Build `ExperiencesHero` section

**Files:**
- Create: `components/sections/ExperiencesHero.tsx`

- [ ] **Step 1: Create the component**

Mirrors the rhythm of `AboutMission` and the existing `ExperienceOverview` — centered text on `bg-navy-deep`, framer-motion `whileInView` fade. The intro paragraph caps at `max-w-2xl` for comfortable reading length (~65–75ch).

```tsx
// components/sections/ExperiencesHero.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ExperiencesHero() {
  const t = useTranslations("experiencesOverview.hero");

  return (
    <section className="relative bg-navy-deep pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] text-cream text-balance sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {t("intro")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperiencesHero.tsx
git commit -m "feat(experiences): add ExperiencesHero section"
```

---

### Task 6: Build `ExperiencesGrid` section

**Files:**
- Create: `components/sections/ExperiencesGrid.tsx`

- [ ] **Step 1: Create the component**

Auto-fit grid via inline `style` (Tailwind v4 has no built-in `auto-fit/minmax` utility). The `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))` rule produces 1/2/3-column layouts naturally as the viewport grows — no breakpoint conditionals needed. Each card gets a stagger delay (`i * 0.1s`) on its entrance fade.

```tsx
// components/sections/ExperiencesGrid.tsx
"use client";

import { motion } from "framer-motion";
import { ExperienceCard } from "@/components/cards/ExperienceCard";
import { experiences } from "@/lib/content/experiences";

export function ExperiencesGrid() {
  return (
    <section
      aria-label="All experiences"
      className="relative bg-navy py-20 sm:py-24 lg:py-28"
    >
      <div className="container-page">
        <ul
          role="list"
          className="grid gap-6 sm:gap-7 lg:gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          }}
        >
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="h-full"
            >
              <ExperienceCard experience={exp} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperiencesGrid.tsx
git commit -m "feat(experiences): add ExperiencesGrid auto-fit section"
```

---

### Task 7: Compose the page

**Files:**
- Create: `app/[locale]/experiences/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/[locale]/experiences/page.tsx
import { ExperiencesGrid } from "@/components/sections/ExperiencesGrid";
import { ExperiencesHero } from "@/components/sections/ExperiencesHero";

export default function ExperiencesPage() {
  return (
    <>
      <ExperiencesHero />
      <ExperiencesGrid />
    </>
  );
}
```

- [ ] **Step 2: Run the dev server (if not already running) and visit `/en/experiences`**

```bash
bun run dev
```

Open `http://localhost:3000/en/experiences`. Confirm:
- Hero band renders with kicker, headline, intro paragraph.
- 3 cards appear in a grid (3 columns on desktop, fewer on narrower viewports).
- Each card photo shows. Sri Lanka shows "11 days" pill, Cambodia "14 days", Weekend Camp no pill.
- Clicking a card navigates to `/en/experiences/<slug>`.

- [ ] **Step 3: Verify at mobile viewport (375px)**

In the browser devtools, set viewport to 375×812. Confirm:
- Cards stack into a single column.
- No horizontal overflow.
- Duration pill remains readable in the top-left of each photo.
- Tap target is the entire card.

- [ ] **Step 4: Verify at tablet viewport (~768px)**

Set viewport to 768×1024. Confirm 2-column grid.

- [ ] **Step 5: Run the BDD suite — should now pass**

```bash
bun test:e2e -- experiences-overview
```
Expected: all 2 scenarios PASS.

- [ ] **Step 6: Commit**

```bash
git add app/[locale]/experiences/page.tsx
git commit -m "feat(experiences): compose /experiences overview page"
```

---

### Task 8: Accessibility + production checks, safe-commit, deploy

**Files:** none (verification only)

- [ ] **Step 1: Keyboard nav check**

In the browser at `/en/experiences`, press Tab repeatedly. Confirm:
- Each card gets focus exactly once (one tab stop per card, not multiple).
- A visible gold ring shows on the focused card.
- Pressing Enter on a focused card navigates to its detail page.

- [ ] **Step 2: Reduced-motion check**

In devtools → Rendering panel → "Emulate CSS media feature: prefers-reduced-motion" → reduce. Hover a card. Confirm:
- The photo does NOT zoom.
- The title underline does NOT draw.
- The arrow icon does NOT translate on hover.
- Card border still tints to `gold/40` (border-color is allowed by reduced-motion — only transforms/animations are suppressed).

- [ ] **Step 3: RTL check**

Visit `/ar/experiences`. Confirm:
- Layout flips: kicker, title, description, CTA all align to the right.
- Arrow icon on each card points left (`rtl:rotate-180`).
- Duration pill sits in the top-RIGHT of the photo (because of `start-4`).

- [ ] **Step 4: Build check**

```bash
bun run build
```
Expected: build succeeds, all 4 experiences routes prerender (`/experiences`, `/experiences/sri-lanka`, `/experiences/cambodia`, `/experiences/weekend-camp`) for both locales.

- [ ] **Step 5: Run `/safe-commit` flow**

This runs code review and security review against the bundle. By this point all per-task commits exist; this is the final safety net.

- [ ] **Step 6: Push and deploy**

```bash
git push
bun run deploy:cf
```
Expected: branch published to origin, Cloudflare deploy succeeds, new Worker version ID printed.

- [ ] **Step 7: Verify on prod**

Visit `https://camp-explorer-website.tanya-topacharova.workers.dev/en/experiences`. Spot-check at desktop and mobile. Click each card to confirm it routes to the live detail page.

---

## Self-Review

**Spec coverage:**
- IA + page architecture (two-section composition) → Tasks 5, 6, 7
- `ExperienceCard` reusable primitive → Task 4
- Card visual design (photo, kicker, title, description, CTA, duration pill, hover behavior) → Task 4
- Data shape (`cardDescription`, `cardImageAlt` extensions) → Task 1
- Bilingual messages (`experiencesOverview` namespace) → Task 2
- Auto-fit responsive grid → Task 6 (inline style)
- Accessibility (single click target, real alt, focus ring, reduced-motion, RTL) → Task 4 (component-level) + Task 8 (verification)
- BDD coverage → Task 3 (red) + Task 7 step 5 (green)
- Pre-existing wiring (nav, home CTA) → confirmed intact in plan header; no task needed
- Build order matches spec's recommended order

**Placeholder scan:** No "TBD", "TODO", or "implement later". Every code step has actual code; every command step has the actual command and expected outcome. Arabic translations are concrete strings, not "[translate]" placeholders.

**Type / name consistency:**
- `Experience` type extension (Task 1) matches the consumer in `ExperienceCard` (Task 4): `cardDescription`, `cardImageAlt`, `duration`, `cardImage`, `subtitle`, `category`, `title`, `href` all referenced consistently.
- Translation namespace `experiencesOverview.hero.{kicker,title,intro}` and `experiencesOverview.card.cta` used identically in messages JSON (Task 2), `ExperiencesHero` (Task 5), and `ExperienceCard` (Task 4).
- Component file paths and import paths match across tasks.

**Coverage gap fix:** None found.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-04-experiences-overview.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
