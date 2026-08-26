import { test, expect } from "@playwright/test";

// Canonical origin baked into metadata (lib/seo.ts fallback / wrangler vars).
const CANONICAL_ORIGIN = "https://campexplorersa.com";

const LOCALES = ["en", "ar"] as const;

// Every indexable route and a marker string that proves the page rendered
// its real content (not an error boundary or empty shell).
const PAGES: { path: string; marker: { en: string; ar: string } }[] = [
  { path: "", marker: { en: "Be Your Own", ar: "كن مستكشفك" } },
  { path: "/experiences", marker: { en: "Experiences", ar: "التجارب" } },
  {
    path: "/experiences/sri-lanka",
    marker: { en: "Turtle Conservation", ar: "حماية السلاحف" },
  },
  {
    path: "/experiences/weekend-camp",
    marker: { en: "Weekend", ar: "نهاية الأسبوع" },
  },
  { path: "/schools", marker: { en: "Schools", ar: "للمدارس" } },
  { path: "/about", marker: { en: "About", ar: "من نحن" } },
  { path: "/register", marker: { en: "Register", ar: "سجل" } },
  { path: "/privacy", marker: { en: "Privacy", ar: "الخصوصية" } },
  { path: "/terms", marker: { en: "Terms", ar: "الشروط" } },
];

for (const locale of LOCALES) {
  for (const { path, marker } of PAGES) {
    test(`${locale}${path || "/"} renders with correct SEO tags`, async ({
      page,
    }) => {
      const response = await page.goto(`/${locale}${path}`);
      expect(response?.status()).toBe(200);

      // Page actually rendered its content
      await expect(page.locator("body")).toContainText(marker[locale]);

      // Locale + direction on <html>
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );

      // Canonical points at THIS page on the real domain (regression guard:
      // subpages once inherited the homepage canonical from the layout)
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${CANONICAL_ORIGIN}/${locale}${path}`,
      );

      // hreflang pair + x-default, each pointing at the same path
      for (const [hreflang, loc] of [
        ["en", "en"],
        ["ar", "ar"],
        ["x-default", "en"],
      ]) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${hreflang}"]`),
        ).toHaveAttribute("href", `${CANONICAL_ORIGIN}/${loc}${path}`);
      }

      // Every page carries valid Organization JSON-LD
      const jsonLd = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const types = jsonLd.map((s) => JSON.parse(s)["@type"]);
      expect(types).toContain("Organization");
    });
  }
}

test("experience pages carry TouristTrip and BreadcrumbList JSON-LD", async ({
  page,
}) => {
  for (const path of [
    "/en/experiences/sri-lanka",
    "/ar/experiences/weekend-camp",
  ]) {
    await page.goto(path);
    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const types = jsonLd.map((s) => JSON.parse(s)["@type"]);
    expect(types).toContain("TouristTrip");
    expect(types).toContain("BreadcrumbList");
  }
});

test("root redirects to a locale", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/(en|ar)$/);
});

test("hidden Cambodia page returns 404", async ({ page }) => {
  const response = await page.goto("/en/experiences/cambodia");
  expect(response?.status()).toBe(404);
});

test("llms.txt serves plain text summary", async ({ request }) => {
  const response = await request.get("/llms.txt");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("text/plain");
  const body = await response.text();
  expect(body).toContain("# Camp Explorer");
  expect(body).toContain(CANONICAL_ORIGIN);
});

test("sitemap.xml lists every indexable page in both locales", async ({
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.status()).toBe(200);
  const xml = await response.text();
  for (const locale of LOCALES) {
    for (const { path } of PAGES) {
      expect(xml).toContain(`<loc>${CANONICAL_ORIGIN}/${locale}${path}</loc>`);
    }
  }
  expect(xml).not.toContain("cambodia");
  expect(xml).not.toContain("workers.dev");
});

test("robots.txt allows crawling and links the sitemap", async ({
  request,
}) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("Allow: /");
  expect(body).toContain(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`);
});
