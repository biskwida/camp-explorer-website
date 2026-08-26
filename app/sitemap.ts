import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

const ROUTES = [
  { path: "",                          priority: 1.0, changeFrequency: "weekly"  as const, lastModified: "2026-08-26" },
  { path: "/experiences",              priority: 0.9, changeFrequency: "weekly"  as const, lastModified: "2026-08-26" },
  { path: "/experiences/sri-lanka",    priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2026-08-26" },
  // Hidden: Cambodia destination — re-add when destination is confirmed
  // { path: "/experiences/cambodia",     priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2026-08-26" },
  { path: "/experiences/weekend-camp", priority: 0.9, changeFrequency: "monthly" as const, lastModified: "2026-08-26" },
  { path: "/schools",                  priority: 0.8, changeFrequency: "monthly" as const, lastModified: "2026-08-26" },
  { path: "/about",                    priority: 0.7, changeFrequency: "monthly" as const, lastModified: "2026-08-26" },
  { path: "/register",                 priority: 0.8, changeFrequency: "monthly" as const, lastModified: "2026-08-26" },
  { path: "/privacy",                  priority: 0.3, changeFrequency: "yearly"  as const, lastModified: "2026-05-05" },
  { path: "/terms",                    priority: 0.3, changeFrequency: "yearly"  as const, lastModified: "2026-05-05" },
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
