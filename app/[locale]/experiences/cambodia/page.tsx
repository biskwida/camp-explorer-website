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
  const t = await getTranslations({ locale, namespace: "experiences.cambodia.hero" });
  return {
    title: t("title"),
    description: "A 14-day youth expedition combining ethical elephant conservation and a guided jungle trek through Keo Seima Wildlife Sanctuary in Cambodia.",
  };
}

export default async function CambodiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ExperienceHero slug="cambodia" />
      <ExperienceOverview slug="cambodia" />
      <ExperienceActivities slug="cambodia" />
      <ExperienceTimeline slug="cambodia" />
      <ExperienceHighlights slug="cambodia" />
      <AbdulExperienceBlock slug="cambodia" />
      <ExperienceSafety slug="cambodia" />
      <ExperienceWhoFor slug="cambodia" />
    </main>
  );
}
