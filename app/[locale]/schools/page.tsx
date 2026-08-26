import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SchoolsHero } from "@/components/sections/SchoolsHero";
import { SchoolsLocal } from "@/components/sections/SchoolsLocal";
import { SchoolsInternational } from "@/components/sections/SchoolsInternational";
import { SchoolsCustom } from "@/components/sections/SchoolsCustom";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "schools.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: pageAlternates(locale, "/schools"),
  };
}

export default async function SchoolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <SchoolsHero />
      <SchoolsLocal />
      <SchoolsInternational />
      <SchoolsCustom />
    </main>
  );
}
