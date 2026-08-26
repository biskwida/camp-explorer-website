import { getTranslations } from "next-intl/server";
import { experiences, type ExperienceSlug } from "@/lib/content/experiences";
import type { Locale } from "@/lib/i18n/routing";
import { BASE_URL } from "@/lib/seo";

/**
 * TouristTrip + BreadcrumbList structured data for an experience detail page.
 * Only facts already present in lib/content/experiences.ts are emitted.
 */
export async function ExperienceJsonLd({
  slug,
  locale,
}: {
  slug: ExperienceSlug;
  locale: string;
}) {
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp) return null;

  const loc = locale as Locale;
  const t = await getTranslations({ locale, namespace: "nav" });
  const url = `${BASE_URL}/${locale}${exp.href}`;

  const trip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: exp.title[loc],
    ...(exp.cardDescription ? { description: exp.cardDescription[loc] } : {}),
    url,
    image: `${BASE_URL}${exp.heroImage}`,
    touristType: "Youth and school groups",
    inLanguage: locale,
    provider: {
      "@type": "Organization",
      name: "Camp Explorer",
      url: BASE_URL,
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("home"),
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("experiences"),
        item: `${BASE_URL}/${locale}/experiences`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: exp.title[loc],
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trip) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
