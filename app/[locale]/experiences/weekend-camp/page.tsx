import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AbdulExperienceBlock } from "@/components/sections/AbdulExperienceBlock";
import { ExperienceActivities } from "@/components/sections/ExperienceActivities";
import { ExperienceHero } from "@/components/sections/ExperienceHero";
import { ExperienceHighlights } from "@/components/sections/ExperienceHighlights";
import { ExperienceOverview } from "@/components/sections/ExperienceOverview";
import { ExperienceSafety } from "@/components/sections/ExperienceSafety";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
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
      <ExperienceActivities slug="weekend-camp" />
      <ExperienceTimeline slug="weekend-camp" />
      <ExperienceHighlights slug="weekend-camp" />
      <AbdulExperienceBlock slug="weekend-camp" />
      <ExperienceSafety slug="weekend-camp" />
      <ExperienceWhoFor slug="weekend-camp" />
    </main>
  );
}
