import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { RegisterHero } from "@/components/sections/RegisterHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "register.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: pageAlternates(locale, "/register"),
  };
}

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <RegisterHero />
    </main>
  );
}
