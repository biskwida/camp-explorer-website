import { setRequestLocale } from "next-intl/server";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomePreview } from "@/components/sections/HomePreview";
import { HomeAbdul } from "@/components/sections/HomeAbdul";
import { HomeClosingCta } from "@/components/sections/HomeClosingCta";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HomeHero />
      <HomePreview />
      <HomeAbdul />
      <HomeClosingCta />
    </main>
  );
}
