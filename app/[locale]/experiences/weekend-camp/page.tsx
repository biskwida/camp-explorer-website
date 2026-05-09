import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperienceActivities } from "@/components/sections/ExperienceActivities";
import { ExperienceHero } from "@/components/sections/ExperienceHero";
import { ExperienceHighlights } from "@/components/sections/ExperienceHighlights";
import { ExperienceLocalHighlights } from "@/components/sections/ExperienceLocalHighlights";
import { ExperienceOverview } from "@/components/sections/ExperienceOverview";
import { ExperienceSafety } from "@/components/sections/ExperienceSafety";
import { ExperienceWhatToExpect } from "@/components/sections/ExperienceWhatToExpect";
import { ExperienceWhoFor } from "@/components/sections/ExperienceWhoFor";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tHero = await getTranslations({ locale, namespace: "experiences.weekend-camp.hero" });
  const tMeta = await getTranslations({ locale, namespace: "experiences.weekend-camp.metadata" });
  return {
    title: tHero("title"),
    description: tMeta("description"),
  };
}

export default async function WeekendCampPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ExperienceHero slug="weekend-camp" />
      <ExperienceOverview slug="weekend-camp" />
      <ExperienceLocalHighlights slug="weekend-camp" />
      <ExperienceActivities slug="weekend-camp" />
      <ExperienceWhatToExpect slug="weekend-camp" />
      <ExperienceHighlights slug="weekend-camp" />
      <ExperienceSafety slug="weekend-camp" />
      <ExperienceWhoFor slug="weekend-camp" />
    </main>
  );
}
