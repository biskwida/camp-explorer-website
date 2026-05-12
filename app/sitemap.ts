import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://campexplorer.sa";

const ROUTES = [
  { path: "",                          priority: 1.0, changeFrequency: "weekly"  as const, lastModified: "2025-04-01" },
  { path: "/experiences",              priority: 0.9, changeFrequency: "weekly"  as const, lastModified: "2025-04-01" },
  { path: "/experiences/sri-lanka",    priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2025-04-01" },
  // Hidden: Cambodia destination — re-add when destination is confirmed
  // { path: "/experiences/cambodia",     priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2025-04-01" },
  { path: "/experiences/weekend-camp", priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2025-04-01" },
  { path: "/schools",                  priority: 0.8, changeFrequency: "monthly" as const, lastModified: "2025-04-01" },
  { path: "/about",                    priority: 0.7, changeFrequency: "monthly" as const, lastModified: "2025-04-01" },
  { path: "/register",                 priority: 0.8, changeFrequency: "monthly" as const, lastModified: "2025-04-01" },
  { path: "/privacy",                  priority: 0.3, changeFrequency: "yearly"  as const, lastModified: "2025-04-01" },
  { path: "/terms",                    priority: 0.3, changeFrequency: "yearly"  as const, lastModified: "2025-04-01" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency, lastModified } of ROUTES) {
    const enUrl = `${BASE_URL}/en${path}`;
    const arUrl = `${BASE_URL}/ar${path}`;
    const alternates = {
      languages: {
        en: enUrl,
        ar: arUrl,
        "x-default": enUrl,
      },
    };

    // Both locale variants appear as top-level entries with mutual hreflang
    entries.push({
      url: enUrl,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
      alternates,
    });

    entries.push({
      url: arUrl,
      lastModified: new Date(lastModified),
      changeFrequency,
      priority,
      alternates,
    });
  }

  return entries;
}
