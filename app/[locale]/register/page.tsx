import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Script from "next/script";
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
      {/*
        Tally embed script — loads after page is interactive.
        Replace TALLY_FORM_ID in RegisterHero.tsx with your form ID.
        Find it in your Tally dashboard: Share → Popup → the code snippet.
      */}
      <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
    </main>
  );
}
