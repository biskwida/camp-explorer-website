import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutHero } from "@/components/sections/AboutHero";
import { AboutMission } from "@/components/sections/AboutMission";
import { AboutPhilosophy } from "@/components/sections/AboutPhilosophy";
import { AboutFounder } from "@/components/sections/AboutFounder";
import { AboutContact } from "@/components/sections/AboutContact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <AboutHero />
      <AboutMission />
      <AboutPhilosophy />
      <AboutFounder />
      <AboutContact />
    </main>
  );
}
