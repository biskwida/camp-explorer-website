import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AbdulExperienceBlock } from "@/components/sections/AbdulExperienceBlock";
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
  const tHero = await getTranslations({ locale, namespace: "experiences.cambodia.hero" });
  const tMeta = await getTranslations({ locale, namespace: "experiences.cambodia.metadata" });
  return {
    title: tHero("title"),
    description: tMeta("description"),
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
      <ExperienceProgramDelivery slug="cambodia" />
      <ExperienceSafety slug="cambodia" />
      <ExperienceWhoFor slug="cambodia" />
    </main>
  );
}
