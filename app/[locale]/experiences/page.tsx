import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExperiencesGrid } from "@/components/sections/ExperiencesGrid";
import { ExperiencesHero } from "@/components/sections/ExperiencesHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "experiencesOverview.metadata",
  });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ExperiencesHero />
      <ExperiencesGrid />
    </main>
  );
}
