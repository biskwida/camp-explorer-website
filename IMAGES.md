# Camp Explorer — Image Inventory

This is the **single source of truth** for every image the website needs. To swap an image, drop the new file at the path shown (overwriting). Filenames never change.

**Status legend:**
- ✅ Final (your owned/licensed photo)
- ⚠️ Placeholder (Unsplash or AI-generated, must replace before launch)
- ❌ Missing (dev currently broken until provided)

---

## Home page (`/`)

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/home/hero.jpg` | ❌ | 21:9, ≥1920×824, <250KB, JPG/WebP | Cinematic landscape — explorer silhouetted on a peak at sunrise. Subject in **left third** for English text overlay. Warm color grading. |
| `public/images/home/abdul-trust.jpg` | ❌ | 4:5 portrait, ≥1200×1500, <200KB | Abdul Explorer environmental portrait. Genuine moment, not posed. Cold-weather gear OK to reference North Pole credential. |

## About page (`/about`)

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/about/hero.jpg` | ❌ | 16:9, ≥1920×1080, <250KB | Group of explorers walking into landscape — back-view, aspirational. |
| `public/images/about/abdul.jpg` | ❌ | 4:5 portrait, ≥1200×1500, <200KB | Abdul Explorer larger portrait — North Pole context if available. |
| `public/images/about/philosophy.jpg` | ❌ | 16:9, ≥1600×900, <200KB | Lifestyle: hands-on activity moment (rope work, fire-building, conservation work). |

## Experiences

### Sri Lanka — Turtle Conservation (`/experiences/sri-lanka`)

**Reference source for trip photos:**
[planmygapyear.com — Sri Lanka Turtle Conservation Volunteers](https://www.planmygapyear.com/volunteer-in-sri-lanka/sri-lanka-turtle-conservation-volunteers)
*(check before launch: licensing — may require permission for commercial use)*

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/experiences/sri-lanka/hero.jpg` | ❌ | 21:9, ≥1920×824, <250KB | Sea turtle on beach at golden hour. Sri Lankan coast feel. |
| `public/images/experiences/sri-lanka/card.jpg` | ❌ | 16:9, ≥1200×675, <120KB | Tighter turtle shot for card thumbnail. |
| `public/images/experiences/sri-lanka/gallery-1.jpg` | ❌ | 4:3, ≥1200×900, <150KB | Conservation work / hatchery. |
| `public/images/experiences/sri-lanka/gallery-2.jpg` | ❌ | 4:3, ≥1200×900, <150KB | Teaching session with local students. |
| `public/images/experiences/sri-lanka/gallery-3.jpg` | ❌ | 4:3, ≥1200×900, <150KB | Safari / hill country landscape. |

### Cambodia — Elephant Conservation (`/experiences/cambodia`)

**Reference source for trip photos:**
[globalteer.org — Cambodia Elephant Sanctuary](https://www.globalteer.org/volunteer-programmes/cambodia-elephant-sanctuary/)
*(check before launch: licensing — may require permission for commercial use)*

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/experiences/cambodia/hero.jpg` | ❌ | 21:9 | Elephant in jungle (rescued sanctuary, no riding). |
| `public/images/experiences/cambodia/card.jpg` | ❌ | 16:9 | Elephant portrait close-up. |
| `public/images/experiences/cambodia/gallery-1.jpg` | ❌ | 4:3 | Mondulkiri sanctuary ambient. |
| `public/images/experiences/cambodia/gallery-2.jpg` | ❌ | 4:3 | Jungle trekking group. |
| `public/images/experiences/cambodia/gallery-3.jpg` | ❌ | 4:3 | Bunong village cultural visit. |

### Weekend Camp (`/experiences/weekend-camp`)

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/experiences/weekend-camp/hero.jpg` | ❌ | 21:9 | Group around campfire under stars, Saudi desert. |
| `public/images/experiences/weekend-camp/card.jpg` | ❌ | 16:9 | Tents at golden hour. |
| `public/images/experiences/weekend-camp/gallery-individual.jpg` | ❌ | 4:5 | Teen participants together. |
| `public/images/experiences/weekend-camp/gallery-family.jpg` | ❌ | 4:5 | Family at activity. |

## Schools

### Schools landing (`/schools`)

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/schools/hero.jpg` | ❌ | 21:9 | Students engaged in outdoor learning, school uniform if possible. |

### Saudi school programs (`/schools/saudi`)

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/schools/saudi/hero.jpg` | ❌ | 21:9 | Bedouin cultural experience, students. |

### International school programs (`/schools/international`)

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/schools/international/hero.jpg` | ❌ | 21:9 | School group abroad — temple/landscape with uniformed students. |

## Open Graph share images (`/og`)

These are auto-generated 1200×630 JPGs for WhatsApp / Twitter / Facebook share previews.

| Path | Status | Recommended | Subject |
|---|---|---|---|
| `public/images/og/default.jpg` | ❌ | 1200×630, <300KB | Hero composition with logo + "Be Your Own Explorer". Used as fallback. |
| `public/images/og/home.jpg` | ❌ | 1200×630 | Home variant. |
| `public/images/og/sri-lanka.jpg` | ❌ | 1200×630 | Sri Lanka variant with title. |
| `public/images/og/cambodia.jpg` | ❌ | 1200×630 | Cambodia variant. |
| `public/images/og/weekend-camp.jpg` | ❌ | 1200×630 | Weekend Camp variant. |
| `public/images/og/about.jpg` | ❌ | 1200×630 | About variant. |
| `public/images/og/schools.jpg` | ❌ | 1200×630 | Schools variant. |

---

## Logo & brand

| Path | Status | Recommended | Notes |
|---|---|---|---|
| `public/logo.svg` | ❌ | SVG, single colour or gold | Primary logo for header & footer. Should work on dark navy bg. |
| `public/logo-mark.svg` | ❌ | SVG, square | Compact mark for favicons / OG images. |
| `public/favicon.ico` | ⚠️ | 32×32 ICO | Default Next.js scaffold favicon — replace before launch. |

---

## How to swap an image

1. Open Finder.
2. Navigate to the path shown above (e.g., `public/images/home/hero.jpg`).
3. Drag your new file on top — confirm "Replace" when Finder asks.
4. Refresh the browser. Done.

**Don't rename the file.** Components reference it by exact path.

## Recommended image prep

- Compress to spec at [squoosh.app](https://squoosh.app) before adding (saves 60–80% file size with no visible quality loss).
- For hero images, ensure the focal point is in the **left third** for English text overlay. The same image will mirror automatically for Arabic (focal point becomes right third).
- All photos involving identifiable minors require **written parental consent** before use (Saudi PDPL Article 12).
