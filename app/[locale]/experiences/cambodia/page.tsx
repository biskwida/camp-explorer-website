import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperienceActivities } from "@/components/sections/ExperienceActivities";
import { ExperienceHero } from "@/components/sections/ExperienceHero";
import { ExperienceHighlights } from "@/components/sections/ExperienceHighlights";
import { ExperienceOverview } from "@/components/sections/ExperienceOverview";
import { ExperienceSafety } from "@/components/sections/ExperienceSafety";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ExperienceProgramDelivery } from "@/components/sections/ExperienceProgramDelivery";
import { ExperienceWhoFor } from "@/components/sections/ExperienceWhoFor";
import { experiences } from "@/lib/content/experiences";

// Visibility gate — Cambodia is currently hidden via the experiences array.
// When the cambodia entry is uncommented in lib/content/experiences.ts,
// this page automatically becomes active again.
const isVisible = experiences.some((e) => e.slug === "cambodia");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  if (!isVisible) return {};
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "experiences.cambodia.hero" });
  const tMeta = await getTranslations({ locale, namespace: "experiences.cambodia.metadata" });
  return {
    title: tHero("title"),
    description: tMeta("description"),
    alternates: pageAlternates(locale, "/experiences/cambodia"),
  };
}

export default async function CambodiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if (!isVisible) notFound();
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ExperienceHero slug="cambodia" />
      <ExperienceOverview slug="cambodia" />
      <ExperienceActivities slug="cambodia" />
      <ExperienceTimeline slug="cambodia" />
      <ExperienceHighlights slug="cambodia" />
      <ExperienceProgramDelivery slug="cambodia" />
      <ExperienceSafety slug="cambodia" />
      <ExperienceWhoFor slug="cambodia" />
    </main>
  );
}
