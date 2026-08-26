import type { Metadata } from "next";

// Canonical origin for absolute URLs in metadata, sitemap, robots, and JSON-LD.
// NEXT_PUBLIC_SITE_URL is set per-environment in wrangler.jsonc `vars`.
export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://campexplorersa.com";

/**
 * Canonical + hreflang alternates for one page. Next.js merges metadata
 * shallowly per top-level key, so every indexable page must declare its own
 * `alternates` — a layout-level default would point subpages at the homepage.
 */
export function pageAlternates(
  locale: string,
  path = "",
): Metadata["alternates"] {
  return {
    canonical: `${BASE_URL}/${locale}${path}`,
    languages: {
      en: `${BASE_URL}/en${path}`,
      ar: `${BASE_URL}/ar${path}`,
      "x-default": `${BASE_URL}/en${path}`,
    },
  };
}
