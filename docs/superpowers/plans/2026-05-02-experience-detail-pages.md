# Experience Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Sri Lanka and Cambodia experience detail pages — `/experiences/sri-lanka` and `/experiences/cambodia` — using 8 reusable section components, with bilingual EN/AR content and BDD coverage.

**Architecture:** Each route is a thin page file composing 8 section components (matching the existing about-page pattern). Section components pull body text from `messages/{locale}.json` via next-intl, and structural data (icon refs, image paths) from an extended `Experience` type in `lib/content/experiences.ts`. Icons are referenced by string keys mapped to lucide-react components in a small `iconMap.ts`, keeping data files JSON-serializable.

**Tech Stack:** Next.js 16 (App Router), Tailwind v4, next-intl 3.x (locale routing), framer-motion (whileInView fades), lucide-react (icons), playwright-bdd + Cucumber (BDD test runner via `bun test:e2e`).

---

## File Structure

**New files:**
- `lib/content/iconMap.ts` — string → lucide-react icon component
- `components/sections/ExperienceHero.tsx`
- `components/sections/ExperienceOverview.tsx`
- `components/sections/ExperienceActivities.tsx`
- `components/sections/ExperienceTimeline.tsx`
- `components/sections/ExperienceHighlights.tsx`
- `components/sections/AbdulExperienceBlock.tsx`
- `components/sections/ExperienceSafety.tsx`
- `components/sections/ExperienceWhoFor.tsx`
- `app/[locale]/experiences/sri-lanka/page.tsx`
- `app/[locale]/experiences/cambodia/page.tsx`
- `features/experiences-detail.feature`

**Modified files:**
- `lib/content/experiences.ts` — extend `Experience` type with optional fields, populate sri-lanka and cambodia structural data
- `messages/en.json` — add `experiences.sriLanka` and `experiences.cambodia` namespaces
- `messages/ar.json` — parallel namespaces (Arabic copy where provided, English fallbacks otherwise)

---

### Task 1: Icon map utility

**Files:**
- Create: `lib/content/iconMap.ts`

- [ ] **Step 1: Create the icon map**

```ts
// lib/content/iconMap.ts
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  Compass,
  GraduationCap,
  Heart,
  Leaf,
  MapPin,
  Mountain,
  PawPrint,
  Plane,
  Shield,
  Star,
  Sun,
  Target,
  Tent,
  TreePine,
  Users,
} from "lucide-react";

export const iconMap = {
  alert: AlertCircle,
  book: BookOpen,
  calendar: CalendarDays,
  community: Users,
  compass: Compass,
  graduation: GraduationCap,
  heart: Heart,
  leaf: Leaf,
  map: MapPin,
  mountain: Mountain,
  paw: PawPrint,
  plane: Plane,
  shield: Shield,
  star: Star,
  sun: Sun,
  target: Target,
  tent: Tent,
  tree: TreePine,
  users: Users,
} as const;

export type IconKey = keyof typeof iconMap;
```

- [ ] **Step 2: Commit**

```bash
git add lib/content/iconMap.ts
git commit -m "feat(content): add icon map for experience detail pages"
```

---

### Task 2: Extend experiences.ts with structural data

**Files:**
- Modify: `lib/content/experiences.ts`

- [ ] **Step 1: Add IconKey import and extend the Experience type**

At the top of the file, add the import and extend the type. Find the `export type Experience = {` block and add the optional fields:

```ts
import type { IconKey } from "./iconMap";

export type Experience = {
  slug: ExperienceSlug;
  href: string;
  cardImage: string;
  heroImage: string;
  category: "international" | "local";
  kicker: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  duration?: { en: string; ar: string };
  // New fields for detail pages:
  meta?: { iconKey: IconKey }[];
  activities?: { iconKey: IconKey; image: string }[];
  timeline?: { iconKey: IconKey }[];
  highlights?: { iconKey: IconKey }[];
  safety?: { iconKey: IconKey }[];
};
```

- [ ] **Step 2: Populate sri-lanka structural data**

Find the sri-lanka entry in the `experiences` array. Add the new fields after `duration`:

```ts
{
  slug: "sri-lanka",
  href: "/experiences/sri-lanka",
  cardImage: "/images/experiences/sri-lanka/card.jpg",
  heroImage: "/images/experiences/sri-lanka/hero.jpg",
  category: "international",
  kicker: { en: "International Expedition", ar: "رحلة دولية" },
  title: {
    en: "Turtle Conservation & Coastal Expedition",
    ar: "حماية السلاحف والاستكشاف الساحلي",
  },
  subtitle: { en: "Sri Lanka", ar: "سريلانكا" },
  duration: { en: "11 days", ar: "11 يومًا" },
  meta: [
    { iconKey: "calendar" },
    { iconKey: "leaf" },
    { iconKey: "community" },
    { iconKey: "compass" },
  ],
  activities: [
    { iconKey: "leaf",       image: "/images/experiences/sri-lanka/conservation.jpg" },
    { iconKey: "graduation", image: "/images/experiences/sri-lanka/teaching.jpg" },
    { iconKey: "mountain",   image: "/images/experiences/sri-lanka/adventure.jpg" },
  ],
  timeline: [
    { iconKey: "plane" },
    { iconKey: "sun" },
    { iconKey: "leaf" },
    { iconKey: "mountain" },
    { iconKey: "plane" },
  ],
  highlights: [
    { iconKey: "leaf" },
    { iconKey: "target" },
    { iconKey: "heart" },
    { iconKey: "star" },
  ],
  safety: [
    { iconKey: "calendar" },
    { iconKey: "users" },
    { iconKey: "shield" },
    { iconKey: "map" },
  ],
},
```

- [ ] **Step 3: Populate cambodia structural data**

Find the cambodia entry. Add the same new fields:

```ts
{
  slug: "cambodia",
  href: "/experiences/cambodia",
  cardImage: "/images/experiences/cambodia/card.jpg",
  heroImage: "/images/experiences/cambodia/hero.jpg",
  category: "international",
  kicker: { en: "International Expedition", ar: "رحلة دولية" },
  title: {
    en: "Elephant Conservation & Jungle Expedition",
    ar: "حماية الفيلة واستكشاف الأدغال",
  },
  subtitle: { en: "Cambodia", ar: "كمبوديا" },
  duration: { en: "14 days", ar: "14 يومًا" },
  meta: [
    { iconKey: "calendar" },
    { iconKey: "paw" },
    { iconKey: "tree" },
    { iconKey: "compass" },
  ],
  activities: [
    { iconKey: "paw",      image: "/images/experiences/cambodia/conservation.jpg" },
    { iconKey: "tree",     image: "/images/experiences/cambodia/jungle.jpg" },
    { iconKey: "book",     image: "/images/experiences/cambodia/cultural.jpg" },
  ],
  timeline: [
    { iconKey: "plane" },
    { iconKey: "sun" },
    { iconKey: "paw" },
    { iconKey: "tree" },
    { iconKey: "plane" },
  ],
  highlights: [
    { iconKey: "paw" },
    { iconKey: "tree" },
    { iconKey: "heart" },
    { iconKey: "star" },
  ],
  safety: [
    { iconKey: "calendar" },
    { iconKey: "users" },
    { iconKey: "shield" },
    { iconKey: "map" },
  ],
},
```

- [ ] **Step 4: Commit**

```bash
git add lib/content/experiences.ts
git commit -m "feat(content): extend experiences with structural data for sri-lanka + cambodia"
```

---

### Task 3: Sri Lanka body content in messages JSON

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/ar.json`

- [ ] **Step 1: Add the `experiences.sriLanka` namespace to `messages/en.json`**

Locate the top-level `experiences` key in `messages/en.json` (it currently holds shared experience-related strings used by the home page). Add a `sriLanka` sub-namespace inside it (or create the `experiences` key if absent). The block to insert:

```json
"sriLanka": {
  "hero": {
    "kicker": "Sri Lanka",
    "title": "Turtle Conservation & Coastal Expedition",
    "meta": [
      "11-day experience",
      "Wildlife conservation",
      "Community engagement",
      "Adventure & culture"
    ]
  },
  "overview": {
    "kicker": "Program Overview",
    "title": "Protecting what matters",
    "body": "Join an unforgettable 11-day youth experience in Sri Lanka, combining wildlife conservation, community engagement, and adventure travel. Participants work on a turtle conservation project while engaging with local communities through creative teaching sessions. Hands-on, meaningful, and culturally immersive."
  },
  "activities": {
    "kicker": "What Participants Will Do",
    "items": [
      {
        "title": "Turtle Conservation",
        "subtitle": "Morning Activities",
        "items": [
          "Care for injured and rescued sea turtles",
          "Support rehabilitation and release back into the ocean",
          "Protect turtle eggs and hatcheries",
          "Beach clean-ups to protect nesting areas",
          "Learn about endangered species"
        ]
      },
      {
        "title": "Teaching & Community Engagement",
        "subtitle": "Afternoons",
        "items": [
          "Conduct fun, creative sessions with local students",
          "English conversation",
          "Games & interactive learning",
          "Team-building activities"
        ]
      },
      {
        "title": "Weekend Adventure",
        "subtitle": "",
        "items": [
          "Wildlife safari — elephants, leopards in their natural habitat",
          "Trek through hill country to panoramic viewpoints",
          "Visit waterfalls and tea plantations",
          "Explore historic towns with expert guides"
        ]
      }
    ]
  },
  "timeline": {
    "kicker": "Program Structure",
    "title": "11 Days",
    "items": [
      { "range": "Day 1–2",  "label": "Travel" },
      { "range": "Day 2",     "label": "Arrival + Orientation + Town Tour" },
      { "range": "Day 3–7",  "label": "Conservation + Teaching" },
      { "range": "Day 8–10", "label": "Weekend Adventure" },
      { "range": "Day 10",   "label": "Departure" }
    ]
  },
  "highlights": {
    "kicker": "Key Highlights",
    "items": [
      "Work with 5 different turtle species in Sri Lanka",
      "Make a real environmental impact through conservation",
      "Combine volunteering, adventure, and cultural immersion",
      "Develop confidence, teamwork, and global awareness"
    ]
  },
  "abdul": {
    "kicker": "Abdul Explorer Experience",
    "title": "A guided youth expedition",
    "items": [
      "Daily evening activities and group challenges",
      "Adventure-focused itinerary",
      "Cultural immersion (local dress & cooking experience)",
      "Full guidance and leadership throughout the trip"
    ]
  },
  "safety": {
    "kicker": "Safety & Structure",
    "items": [
      "Structured daily program",
      "1–2 adults per 10 participants",
      "Risk assessments in place",
      "On-ground support"
    ]
  },
  "whoFor": {
    "kicker": "Who It's For",
    "cards": [
      { "label": "Participants", "subtitle": "Ages 14–18" },
      { "label": "Schools & groups", "subtitle": "Group bookings" }
    ],
    "note": "Application required — participants are selected",
    "cta": "Register your interest"
  }
}
```

- [ ] **Step 2: Add the same shape to `messages/ar.json` with Arabic where available, English fallbacks elsewhere**

Mirror the structure exactly — same keys, translated values where you have them. For copy not yet translated, leave the English string as a placeholder; the page won't break (the translator pass is a separate follow-up per the spec).

Example for the hero block:

```json
"sriLanka": {
  "hero": {
    "kicker": "سريلانكا",
    "title": "حماية السلاحف والاستكشاف الساحلي",
    "meta": [
      "تجربة 11 يومًا",
      "حماية الحياة البرية",
      "المشاركة المجتمعية",
      "مغامرة وثقافة"
    ]
  },
  ...
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
git commit -m "feat(i18n): add Sri Lanka experience body content (en + ar)"
```

---

### Task 4: Cambodia body content in messages JSON

**Files:**
- Modify: `messages/en.json`
- Modify: `messages/ar.json`

- [ ] **Step 1: Add the `experiences.cambodia` namespace to `messages/en.json`**

Same shape as Sri Lanka, different content. Insert next to `sriLanka`:

```json
"cambodia": {
  "hero": {
    "kicker": "Cambodia",
    "title": "Elephant Conservation & Jungle Expedition",
    "meta": [
      "14-day experience",
      "Elephant conservation",
      "Jungle adventure",
      "Cultural immersion"
    ]
  },
  "overview": {
    "kicker": "Program Overview",
    "title": "Experience the wild, responsibly",
    "body": "Spend the core of the program immersed in a protected elephant sanctuary in Mondulkiri, focusing on ethical conservation and environmental learning, then transition into a guided jungle expedition through Keo Seima Wildlife Sanctuary."
  },
  "activities": {
    "kicker": "What Participants Will Do",
    "items": [
      {
        "title": "Elephant Conservation",
        "subtitle": "Mondulkiri",
        "items": [
          "Observe rescued elephants in their natural forest environment (no riding)",
          "Daily conservation routines: food preparation, forest walks",
          "Learn each elephant's history, rehabilitation, and behavior",
          "Connect wildlife conservation with local communities"
        ]
      },
      {
        "title": "Jungle Expedition",
        "subtitle": "Keo Seima",
        "items": [
          "Guided trekking through Keo Seima Wildlife Sanctuary",
          "Track gibbons, macaques, and tropical bird species",
          "Day and night jungle walks with expert local guides",
          "Overnight stay in a remote forest bamboo camp"
        ]
      },
      {
        "title": "Cultural Immersion",
        "subtitle": "",
        "items": [
          "Visit a local Bunong village",
          "Traditional cooking experience",
          "Group reflection and discussion sessions",
          "Cultural introduction in Phnom Penh"
        ]
      }
    ]
  },
  "timeline": {
    "kicker": "Program Structure",
    "title": "14 Days",
    "items": [
      { "range": "Day 1–2",   "label": "Arrival & cultural introduction" },
      { "range": "Day 2",      "label": "Transfer to Mondulkiri" },
      { "range": "Day 3–7",   "label": "Elephant conservation experience" },
      { "range": "Day 8",      "label": "Rest & reflection" },
      { "range": "Day 9–14",  "label": "Jungle expedition + return" }
    ]
  },
  "highlights": {
    "kicker": "Key Highlights",
    "items": [
      "Ethical elephant conservation in a natural forest setting",
      "Wild jungle trekking and wildlife tracking in protected reserves",
      "Cultural immersion with Bunong communities and traditions",
      "Balanced program combining impact, adventure, and education"
    ]
  },
  "abdul": {
    "kicker": "Abdul Explorer Experience",
    "title": "A guided youth expedition",
    "items": [
      "Structured orientation and daily engagement sessions",
      "Guided reflection and group discussions",
      "Focus on leadership, teamwork, and personal development",
      "Carefully curated balance of challenge, learning, and fun"
    ]
  },
  "safety": {
    "kicker": "Safety & Structure",
    "items": [
      "Structured daily program",
      "1–2 adults per 10 participants",
      "Risk assessments in place",
      "On-ground support"
    ]
  },
  "whoFor": {
    "kicker": "Who It's For",
    "cards": [
      { "label": "Participants", "subtitle": "Ages 14–18" },
      { "label": "Schools & groups", "subtitle": "Group bookings" }
    ],
    "note": "Application required — participants are selected",
    "cta": "Register your interest"
  }
}
```

- [ ] **Step 2: Add the same shape to `messages/ar.json` with Arabic where available, English fallbacks elsewhere**

- [ ] **Step 3: Verify both JSON files parse**

```bash
bun -e "JSON.parse(require('fs').readFileSync('messages/en.json', 'utf8')); JSON.parse(require('fs').readFileSync('messages/ar.json', 'utf8')); console.log('OK')"
```

- [ ] **Step 4: Commit**

```bash
git add messages/en.json messages/ar.json
git commit -m "feat(i18n): add Cambodia experience body content (en + ar)"
```

---

### Task 5: Write the BDD feature file

**Files:**
- Create: `features/experiences-detail.feature`

- [ ] **Step 1: Write the feature file**

```gherkin
Feature: Experience detail pages render full content for both countries
  Visitors arriving on /experiences/sri-lanka or /experiences/cambodia should
  see the hero, overview, activities, timeline, highlights, Abdul block,
  safety, and who-it's-for sections, with a working register CTA.

  Scenario: Sri Lanka detail page renders all sections in English
    Given I visit the "experiences/sri-lanka" page in "en"
    Then I see the headline contains "Turtle Conservation"
    And the document direction is "ltr"
    And the document language is "en"
    And I see a section titled "Program Overview"
    And I see a section titled "What Participants Will Do"
    And I see a section titled "Program Structure"
    And I see a section titled "Key Highlights"
    And I see a section titled "Abdul Explorer Experience"
    And I see a section titled "Safety & Structure"
    And I see a section titled "Who It's For"
    And I see a link with text "Register your interest"

  Scenario: Cambodia detail page renders all sections in English
    Given I visit the "experiences/cambodia" page in "en"
    Then I see the headline contains "Elephant Conservation"
    And the document direction is "ltr"
    And the document language is "en"
    And I see a section titled "Program Overview"
    And I see a section titled "What Participants Will Do"
    And I see a section titled "Program Structure"
    And I see a section titled "Key Highlights"
    And I see a section titled "Abdul Explorer Experience"
    And I see a section titled "Safety & Structure"
    And I see a section titled "Who It's For"
    And I see a link with text "Register your interest"

  Scenario: Sri Lanka renders in Arabic with RTL layout
    Given I visit the "experiences/sri-lanka" page in "ar"
    Then the document direction is "rtl"
    And the document language is "ar"
```

- [ ] **Step 2: Run the test to verify it fails**

```bash
bun test:e2e -- experiences-detail
```
Expected: tests FAIL — pages don't exist yet (404).

- [ ] **Step 3: Commit**

```bash
git add features/experiences-detail.feature
git commit -m "test(experiences): add BDD feature for sri-lanka + cambodia detail pages"
```

---

### Task 6: ExperienceHero component

**Files:**
- Create: `components/sections/ExperienceHero.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/ExperienceHero.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceHero({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.hero`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.meta) return null;

  const meta = t.raw("meta") as string[];

  return (
    <section className="relative isolate flex min-h-[80dvh] items-end overflow-hidden">
      <Image
        src={exp.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-navy-deep via-navy-deep/70 via-40% to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-navy-deep"
      />

      <div className="container-page relative z-10 flex w-full flex-col items-start pt-32 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] text-cream text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {exp.meta.map((m, i) => {
              const Icon = iconMap[m.iconKey];
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-navy-deep/60 text-gold backdrop-blur-[2px]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cream/85 sm:text-sm">
                    {meta[i]}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperienceHero.tsx
git commit -m "feat(experiences): add ExperienceHero section component"
```

---

### Task 7: ExperienceOverview component

**Files:**
- Create: `components/sections/ExperienceOverview.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/ExperienceOverview.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceOverview({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.overview`);

  return (
    <section className="relative bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h2 className="mt-6 font-display text-3xl font-black leading-[1.1] text-cream text-balance sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-8 text-base leading-relaxed text-cream/80 sm:text-lg">
            {t("body")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperienceOverview.tsx
git commit -m "feat(experiences): add ExperienceOverview section component"
```

---

### Task 8: ExperienceActivities component (with placeholder gradient)

**Files:**
- Create: `components/sections/ExperienceActivities.tsx`

- [ ] **Step 1: Create the component**

The card image uses a graceful fallback: when the source image is missing on disk, the `<Image>` will 404 silently and the gradient placeholder behind it remains visible. This means dropping a real photo at the fixed path automatically takes effect on next deploy with no code change.

```tsx
// components/sections/ExperienceActivities.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };
type ActivityCopy = { title: string; subtitle: string; items: string[] };

export function ExperienceActivities({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.activities`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.activities) return null;

  const items = t.raw("items") as ActivityCopy[];

  return (
    <section className="relative bg-navy py-24 sm:py-32">
      <div className="container-page">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm"
        >
          {t("kicker")}
        </motion.h2>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {exp.activities.map((a, i) => {
            const Icon = iconMap[a.iconKey];
            const copy = items[i];
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="overflow-hidden rounded-sm border border-gold/15 bg-navy-deep/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-gold/20">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-navy-deep/80 text-gold backdrop-blur-[2px]"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-cream">{copy.title}</h3>
                  {copy.subtitle ? (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                      {copy.subtitle}
                    </p>
                  ) : null}
                  <ul className="mt-4 space-y-2">
                    {copy.items.map((it, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm leading-relaxed text-cream/80 sm:text-base"
                      >
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperienceActivities.tsx
git commit -m "feat(experiences): add ExperienceActivities with placeholder gradient backdrop"
```

---

### Task 9: ExperienceTimeline component (responsive)

**Files:**
- Create: `components/sections/ExperienceTimeline.tsx`

- [ ] **Step 1: Create the component**

The component renders a single ordered list. On `md+` it uses `grid grid-cols-5` so the 5 entries lay horizontally as the journey arc with a dotted connector behind them. On mobile it stays a vertical stack with the connector hidden.

```tsx
// components/sections/ExperienceTimeline.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };
type Entry = { range: string; label: string };

export function ExperienceTimeline({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.timeline`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.timeline) return null;

  const items = t.raw("items") as Entry[];

  return (
    <section className="relative bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h2 className="mt-6 font-display text-3xl font-black leading-[1.1] text-cream text-balance sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        <div className="relative mt-14">
          {/* Dotted connector — desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px border-t border-dashed border-gold/30 md:block"
          />
          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
            {exp.timeline.map((entry, i) => {
              const Icon = iconMap[entry.iconKey];
              const copy = items[i];
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 md:flex-col md:items-center md:text-center"
                >
                  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="md:mt-3">
                    <p className="font-display text-base font-bold text-cream sm:text-lg">
                      {copy.range}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/75">
                      {copy.label}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperienceTimeline.tsx
git commit -m "feat(experiences): add ExperienceTimeline (vertical mobile, horizontal arc desktop)"
```

---

### Task 10: ExperienceHighlights component

**Files:**
- Create: `components/sections/ExperienceHighlights.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/ExperienceHighlights.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceHighlights({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.highlights`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.highlights) return null;

  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-navy py-24 sm:py-32">
      <div className="container-page">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm"
        >
          {t("kicker")}
        </motion.h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {exp.highlights.map((h, i) => {
            const Icon = iconMap[h.iconKey];
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-sm border border-gold/15 bg-navy-deep/60 p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 font-display text-base font-bold leading-snug text-cream sm:text-lg">
                  {items[i]}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperienceHighlights.tsx
git commit -m "feat(experiences): add ExperienceHighlights icon grid"
```

---

### Task 11: AbdulExperienceBlock component

**Files:**
- Create: `components/sections/AbdulExperienceBlock.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/AbdulExperienceBlock.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function AbdulExperienceBlock({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.abdul`);
  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl border-s-2 border-gold/60 ps-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-cream sm:text-3xl">
            {t("title")}
          </h2>
          <ul className="mt-6 space-y-3">
            {items.map((it, i) => (
              <li
                key={i}
                className="flex gap-3 text-base leading-relaxed text-cream/85 sm:text-lg"
              >
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/AbdulExperienceBlock.tsx
git commit -m "feat(experiences): add AbdulExperienceBlock branded callout"
```

---

### Task 12: ExperienceSafety component

**Files:**
- Create: `components/sections/ExperienceSafety.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/ExperienceSafety.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceSafety({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.safety`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.safety) return null;

  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-navy py-20 sm:py-24">
      <div className="container-page">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm"
        >
          {t("kicker")}
        </motion.h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {exp.safety.map((s, i) => {
            const Icon = iconMap[s.iconKey];
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-sm border border-gold/15 bg-navy-deep/60 px-4 py-4"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-snug text-cream/85 sm:text-base">{items[i]}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperienceSafety.tsx
git commit -m "feat(experiences): add ExperienceSafety icon row"
```

---

### Task 13: ExperienceWhoFor component

**Files:**
- Create: `components/sections/ExperienceWhoFor.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/ExperienceWhoFor.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };
type Card = { label: string; subtitle: string };

export function ExperienceWhoFor({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.whoFor`);
  const cards = t.raw("cards") as Card[];
  const cardIcons = [UserCheck, GraduationCap];

  return (
    <section className="relative bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {cards.map((card, i) => {
              const Icon = cardIcons[i] ?? UserCheck;
              return (
                <li
                  key={i}
                  className="flex items-center gap-4 rounded-sm border border-gold/15 bg-navy/40 px-6 py-5 text-start"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-cream sm:text-lg">
                      {card.label}
                    </p>
                    <p className="text-sm text-cream/70">{card.subtitle}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-sm text-cream/70 sm:text-base">{t("note")}</p>

          <Link
            href={{ pathname: "/register", query: { program: slug } }}
            className="group mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gold px-10 text-sm font-semibold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ExperienceWhoFor.tsx
git commit -m "feat(experiences): add ExperienceWhoFor with deep-linked register CTA"
```

---

### Task 14: Compose Sri Lanka page

**Files:**
- Create: `app/[locale]/experiences/sri-lanka/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/[locale]/experiences/sri-lanka/page.tsx
import { AbdulExperienceBlock } from "@/components/sections/AbdulExperienceBlock";
import { ExperienceActivities } from "@/components/sections/ExperienceActivities";
import { ExperienceHero } from "@/components/sections/ExperienceHero";
import { ExperienceHighlights } from "@/components/sections/ExperienceHighlights";
import { ExperienceOverview } from "@/components/sections/ExperienceOverview";
import { ExperienceSafety } from "@/components/sections/ExperienceSafety";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ExperienceWhoFor } from "@/components/sections/ExperienceWhoFor";

export default function SriLankaPage() {
  return (
    <>
      <ExperienceHero slug="sri-lanka" />
      <ExperienceOverview slug="sri-lanka" />
      <ExperienceActivities slug="sri-lanka" />
      <ExperienceTimeline slug="sri-lanka" />
      <ExperienceHighlights slug="sri-lanka" />
      <AbdulExperienceBlock slug="sri-lanka" />
      <ExperienceSafety slug="sri-lanka" />
      <ExperienceWhoFor slug="sri-lanka" />
    </>
  );
}
```

- [ ] **Step 2: Verify in preview at desktop**

Run the dev server (or reuse the existing one) and navigate to `/en/experiences/sri-lanka`. Confirm all 8 sections render top-to-bottom: hero photo, overview, 3 activity cards, 5-step timeline, 4 highlight cards, Abdul block, 4 safety items, 2 who-for cards + register button.

- [ ] **Step 3: Verify in preview at mobile (375px)**

Resize the preview to mobile. Confirm:
- Hero meta icons stack into a 2-col grid
- Activity cards stack vertically
- Timeline stacks vertically as a numbered list (no horizontal connector visible)
- Highlights stack into a 1-col list
- Safety items stack vertically

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/experiences/sri-lanka/page.tsx
git commit -m "feat(experiences): compose Sri Lanka detail page"
```

---

### Task 15: Compose Cambodia page

**Files:**
- Create: `app/[locale]/experiences/cambodia/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/[locale]/experiences/cambodia/page.tsx
import { AbdulExperienceBlock } from "@/components/sections/AbdulExperienceBlock";
import { ExperienceActivities } from "@/components/sections/ExperienceActivities";
import { ExperienceHero } from "@/components/sections/ExperienceHero";
import { ExperienceHighlights } from "@/components/sections/ExperienceHighlights";
import { ExperienceOverview } from "@/components/sections/ExperienceOverview";
import { ExperienceSafety } from "@/components/sections/ExperienceSafety";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ExperienceWhoFor } from "@/components/sections/ExperienceWhoFor";

export default function CambodiaPage() {
  return (
    <>
      <ExperienceHero slug="cambodia" />
      <ExperienceOverview slug="cambodia" />
      <ExperienceActivities slug="cambodia" />
      <ExperienceTimeline slug="cambodia" />
      <ExperienceHighlights slug="cambodia" />
      <AbdulExperienceBlock slug="cambodia" />
      <ExperienceSafety slug="cambodia" />
      <ExperienceWhoFor slug="cambodia" />
    </>
  );
}
```

- [ ] **Step 2: Verify in preview at desktop and mobile**

Same checks as Task 14, but at `/en/experiences/cambodia`. The structure is identical; only the body content differs.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/experiences/cambodia/page.tsx
git commit -m "feat(experiences): compose Cambodia detail page"
```

---

### Task 16: Run BDD test suite + safe-commit + deploy

**Files:** none (verification only)

- [ ] **Step 1: Run the BDD suite to confirm scenarios pass**

```bash
bun test:e2e -- experiences-detail
```
Expected: all 3 scenarios PASS (sri-lanka EN, cambodia EN, sri-lanka AR/RTL).

- [ ] **Step 2: Hard-refresh both pages in the preview at 1280px and 375px**

Visit `/en/experiences/sri-lanka` and `/en/experiences/cambodia` at desktop and mobile viewports. Visually confirm the rendering matches the mockup: section order, spacing rhythm, no horizontal overflow on mobile, hero photo readable, activity cards aligned.

- [ ] **Step 3: Run the `/safe-commit` flow**

This runs code review and security review against the bundle, then commits anything not yet committed. By this point all individual task commits exist; this is a safety net for any final tweaks.

- [ ] **Step 4: Push and deploy**

```bash
git push
bun run deploy:cf
```
Expected: branch published to origin, Cloudflare deploy succeeds, new Worker version ID printed.

- [ ] **Step 5: Verify on prod**

Visit `https://camp-explorer-website.tanya-topacharova.workers.dev/en/experiences/sri-lanka` and `/en/experiences/cambodia`. Spot-check both pages on mobile and desktop.

---

## Self-Review

**Spec coverage:** Each spec section maps to at least one task —
- IA + page architecture → Tasks 14, 15
- 8 components → Tasks 6–13
- Data shape (iconMap, experiences.ts, messages JSON) → Tasks 1–4
- Responsive strategy → enforced inside each component task; verified in Task 14 step 3 and Task 15 step 2
- Visual language → applied via inherited Tailwind classes inside each component
- Image strategy → Activities task (8) ships gradient placeholder behind `<Image>`; real images drop at fixed paths
- BDD coverage → Task 5 writes feature, Task 16 runs the suite
- Build order → matches the spec's recommended order

**Placeholder scan:** No "TBD" / "TODO" / "implement later". Each step has actual code or an actual command. The Arabic translations in messages JSON are explicitly framed as "English fallback if not yet translated" which is the spec's stated open follow-up, not a deferred plan item.

**Type / name consistency:** `ExperienceSlug` used consistently across all components. `iconMap` import path uniform. Translation namespace `experiences.${slug}.{section}` follows the same pattern in every component. Section component names match between their declaration, page imports, and the file structure list.

**Coverage gap fix:** None found.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-02-experience-detail-pages.md`.

Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
