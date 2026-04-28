export type ExperienceSlug =
  | "sri-lanka"
  | "cambodia"
  | "weekend-camp";

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
};

export const experiences: Experience[] = [
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
  },
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
  },
  {
    slug: "weekend-camp",
    href: "/experiences/weekend-camp",
    cardImage: "/images/experiences/weekend-camp/card.jpg",
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
  "/images/experiences/sri-lanka/hero.jpg":
    "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=2400&q=80",
  "/images/experiences/sri-lanka/card.jpg":
    "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1200&q=80",
  "/images/experiences/cambodia/hero.jpg":
    "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=2400&q=80",
  "/images/experiences/cambodia/card.jpg":
    "https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=1200&q=80",
  "/images/experiences/weekend-camp/hero.jpg":
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=2400&q=80",
  "/images/experiences/weekend-camp/card.jpg":
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80",
  "/images/schools/hero.jpg":
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=2400&q=80",
  "/images/schools/saudi/hero.jpg":
    "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=2400&q=80",
  "/images/schools/international/hero.jpg":
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=2400&q=80",
};
