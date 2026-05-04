import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://campexplorer.sa";

const LOCALES = ["en", "ar"] as const;

const ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/experiences", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/experiences/sri-lanka", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/experiences/cambodia", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/experiences/weekend-camp", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/schools", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/register", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of ROUTES) {
    entries.push({
      url: `${BASE_URL}/en${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          en: `${BASE_URL}/en${path}`,
          ar: `${BASE_URL}/ar${path}`,
        },
      },
    });
  }

  return entries;
}
