import type { IconKey } from "./iconMap";

export type ExperienceSlug =
  | "sri-lanka"
  | "cambodia"
  | "weekend-camp";

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
  // New fields for detail pages:
  meta?: { iconKey: IconKey }[];
  activities?: { iconKey: IconKey; image: string }[];
  timeline?: { iconKey: IconKey }[];
  highlights?: { iconKey: IconKey }[];
  safety?: { iconKey: IconKey }[];
};

export const experiences: Experience[] = [
  {
    slug: "sri-lanka",
    href: "/experiences/sri-lanka",
    cardImage: "/images/experiences/sri-lanka/card.jpg",
    cardImageAlt: {
      en: "Sea turtle being released onto the sand at sunrise",
      ar: "إطلاق سلحفاة بحرية على الرمال عند شروق الشمس",
    },
    cardDescription: {
      en: "Wildlife conservation, community teaching, and coastal adventure across 11 unforgettable days.",
      ar: "حماية الحياة البرية، والتدريس المجتمعي، ومغامرة ساحلية على مدى 11 يومًا لا تُنسى.",
    },
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
  {
    slug: "cambodia",
    href: "/experiences/cambodia",
    cardImage: "/images/experiences/cambodia/card.jpg",
    cardImageAlt: {
      en: "Elephant walking through dense jungle in Mondulkiri",
      ar: "فيل يسير عبر الأدغال الكثيفة في موندولكيري",
    },
    cardDescription: {
      en: "Ethical elephant sanctuary days followed by a guided jungle expedition through Keo Seima.",
      ar: "أيام في محمية الفيلة الأخلاقية تليها رحلة استكشافية في أدغال كيو سيما.",
    },
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
      { iconKey: "paw",  image: "/images/experiences/cambodia/conservation.jpg" },
      { iconKey: "tree", image: "/images/experiences/cambodia/jungle.jpg" },
      { iconKey: "book", image: "/images/experiences/cambodia/cultural.jpg" },
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
  {
    slug: "weekend-camp",
    href: "/experiences/weekend-camp",
    cardImage: "/images/experiences/weekend-camp/card.jpg",
    cardImageAlt: {
      en: "Group of teens around a campfire under stars in the Saudi desert",
      ar: "مجموعة من المراهقين حول نار المخيم تحت النجوم في الصحراء السعودية",
    },
    cardDescription: {
      en: "Outdoor leadership and adventure for teens and families, close to home in Saudi Arabia.",
      ar: "قيادة المغامرة في الهواء الطلق للمراهقين والعائلات، قريبًا من المنزل في المملكة العربية السعودية.",
    },
    heroImage: "/images/experiences/weekend-camp/hero.jpg",
    category: "local",
    kicker: { en: "Local Experience", ar: "تجربة محلية" },
    title: {
      en: "Weekend Camp for Teens & Families",
      ar: "مخيم نهاية الأسبوع للمراهقين والعائلات",
    },
    subtitle: { en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  },
];

// Unsplash placeholders — use these as fallback when local images don't exist.
// Replace by dropping a real file at the path shown above (see IMAGES.md).
export const placeholderImages: Record<string, string> = {
  "/images/home/hero.jpg":
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2400&q=80",
  "/images/home/abdul-trust.jpg":
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80",
  "/images/about/hero.jpg":
    "https://images.unsplash.com/photo-1527824404775-dce343118ebc?w=2400&q=80",
  "/images/about/abdul.jpg":
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80",
  "/images/about/philosophy.jpg":
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=2400&q=80",
  // Sri Lanka uses real local files (drop replacement at the same path to swap)
  "/images/experiences/sri-lanka/hero.jpg":
    "/images/experiences/sri-lanka/hero.jpg",
  "/images/experiences/sri-lanka/card.jpg":
    "/images/experiences/sri-lanka/card.jpg",
  // Cambodia uses real local files (drop replacement at the same path to swap)
  "/images/experiences/cambodia/hero.jpg":
    "/images/experiences/cambodia/hero.jpg",
  "/images/experiences/cambodia/card.jpg":
    "/images/experiences/cambodia/card.jpg",
  // Weekend Camp uses the real local files (drop replacement at the same path to swap)
  "/images/experiences/weekend-camp/hero.jpg":
    "/images/experiences/weekend-camp/hero.jpg",
  "/images/experiences/weekend-camp/card.jpg":
    "/images/experiences/weekend-camp/card.jpg",
  "/images/schools/hero.jpg":
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2400&q=80",
  "/images/schools/saudi/hero.jpg":
    "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=2400&q=80",
  "/images/schools/international/hero.jpg":
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=2400&q=80",
};
