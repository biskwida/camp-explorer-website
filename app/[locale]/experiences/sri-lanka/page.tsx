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
  const t = await getTranslations({ locale, namespace: "experiences.sri-lanka.hero" });
  return {
    title: t("title"),
    description: "An 11-day youth expedition combining turtle conservation, community teaching, and coastal adventure in Sri Lanka.",
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
      <ExperienceHero slug="sri-lanka" />
      <ExperienceOverview slug="sri-lanka" />
      <ExperienceActivities slug="sri-lanka" />
      <ExperienceTimeline slug="sri-lanka" />
      <ExperienceHighlights slug="sri-lanka" />
      <AbdulExperienceBlock slug="sri-lanka" />
      <ExperienceSafety slug="sri-lanka" />
      <ExperienceWhoFor slug="sri-lanka" />
    </main>
  );
}
