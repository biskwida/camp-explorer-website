import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { ExperienceJsonLd } from "@/components/ExperienceJsonLd";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperienceActivities } from "@/components/sections/ExperienceActivities";
import { ExperienceHero } from "@/components/sections/ExperienceHero";
import { ExperienceHighlights } from "@/components/sections/ExperienceHighlights";
import { ExperienceOverview } from "@/components/sections/ExperienceOverview";
import { ExperienceSafety } from "@/components/sections/ExperienceSafety";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ExperienceProgramDelivery } from "@/components/sections/ExperienceProgramDelivery";
import { ExperienceWhoFor } from "@/components/sections/ExperienceWhoFor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "experiences.sri-lanka.hero" });
  const tMeta = await getTranslations({ locale, namespace: "experiences.sri-lanka.metadata" });
  return {
    title: tHero("title"),
    description: tMeta("description"),
    alternates: pageAlternates(locale, "/experiences/sri-lanka"),
  };
}

export default async function SriLankaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ExperienceJsonLd slug="sri-lanka" locale={locale} />
      <ExperienceHero slug="sri-lanka" />
      <ExperienceOverview slug="sri-lanka" />
      <ExperienceActivities slug="sri-lanka" />
      <ExperienceTimeline slug="sri-lanka" />
      <ExperienceHighlights slug="sri-lanka" />
      <ExperienceProgramDelivery slug="sri-lanka" />
      <ExperienceSafety slug="sri-lanka" />
      <ExperienceWhoFor slug="sri-lanka" />
    </main>
  );
}
