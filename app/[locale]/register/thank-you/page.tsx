import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { experiences } from "@/lib/content/experiences";
import type { Locale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "register.thankYou.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    // Thank-you pages should not be indexed — they're transient confirmation screens.
    robots: { index: false, follow: false },
  };
}

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ program?: string }>;
}) {
  const { locale } = await params;
  const { program: slug } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "register" });

  const exp = slug ? experiences.find((e) => e.slug === slug) : null;
  const programTitle = exp ? exp.title[locale as Locale] : undefined;

  // Reuse the "what happens next" steps from the register page translations.
  const steps = t.raw("next.steps") as { n: string; title: string; desc: string }[];

  return (
    <main>
      {/* ── Confirmation hero ───────────────────────── */}
      <section className="bg-navy-deep py-32 sm:py-44">
        <div className="container-page">
          <div className="max-w-2xl">

            {/* Check icon */}
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
              <CheckCircle className="h-7 w-7 text-gold" aria-hidden="true" />
            </div>

            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
              {t("thankYou.kicker")}
            </p>

            <h1 className="font-display text-4xl font-black leading-[1.05] text-cream sm:text-5xl md:text-6xl">
              {t("thankYou.headline")}
              <br />
              <span className="text-gold">{t("thankYou.headlineAccent")}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              {t("thankYou.body")}
            </p>

            {/* Program badge — shown if they came from an experience page */}
            {programTitle && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-sm border border-gold/25 bg-gold/5 px-3.5 py-2 text-xs font-semibold text-cream/70">
                <span className="text-gold/60">{t("thankYou.programLabel")}:</span>
                <span>{programTitle}</span>
              </p>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/experiences"
                className="inline-flex h-14 items-center gap-2.5 rounded-sm bg-gold px-8 text-sm font-bold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light"
              >
                {t("thankYou.exploreBtn")}
              </Link>
              <Link
                href="/"
                className="inline-flex h-14 items-center gap-2.5 rounded-sm border border-gold/30 px-8 text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:border-gold hover:text-gold-light"
              >
                {t("thankYou.homeBtn")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What happens next ───────────────────────── */}
      <section className="bg-navy-deep py-24 sm:py-32">
        <div className="container-page">
          <p className="mb-14 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            {t("next.kicker")}
          </p>

          <div className="grid gap-12 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.n}>
                <p className="font-display text-5xl font-black text-gold/15">{step.n}</p>
                <p className="mt-4 font-display text-lg font-bold text-cream">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-gold/10 pt-14">
            <p className="text-base text-cream/60">
              {t("next.closingNote")}{" "}
              <a
                href="mailto:info@campexplorersa.com"
                className="text-gold underline-offset-2 hover:underline"
              >
                info@campexplorersa.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
