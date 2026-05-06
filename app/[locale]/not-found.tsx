import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ArrowRight } from "lucide-react";

// Next.js calls not-found.tsx without params when using generateStaticParams,
// so we read the locale from the Accept-Language header as a best-effort fallback.
export default async function NotFound() {
  // Attempt locale-aware translation; fall back silently to en if unavailable.
  let t: Awaited<ReturnType<typeof getTranslations>>;
  try {
    t = await getTranslations("notFound");
  } catch {
    t = await getTranslations({ locale: "en", namespace: "notFound" });
  }

  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center bg-navy-deep px-6 py-32 text-center">
      <p className="font-display text-[8rem] font-black leading-none text-gold/15 sm:text-[12rem]">
        {t("code")}
      </p>
      <h1 className="mt-2 font-display text-3xl font-black text-cream sm:text-4xl">
        {t("headline")}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-cream/60">
        {t("body")}
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-14 items-center gap-2.5 rounded-sm bg-gold px-8 text-sm font-bold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light"
      >
        {t("cta")}
        <ArrowRight className="h-4 w-4 rtl:[transform:scaleX(-1)]" aria-hidden="true" />
      </Link>
    </main>
  );
}
