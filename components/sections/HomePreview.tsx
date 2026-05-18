"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, GraduationCap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { experiences, placeholderImages } from "@/lib/content/experiences";
import type { Locale } from "@/lib/i18n/routing";

export function HomePreview() {
  const t = useTranslations("home.preview");
  const locale = useLocale() as Locale;

  return (
    <section className="container-page py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
          {t("kicker")}
        </p>
        <h2 className="font-display text-3xl font-black leading-tight text-balance text-cream sm:text-4xl md:text-5xl">
          {t("title")}
        </h2>
      </motion.div>

      {/* Experience cards — grid columns adapt to the number of visible experiences */}
      <div
        className={`mt-14 grid gap-5 lg:gap-6 ${
          experiences.length >= 3
            ? "md:grid-cols-2 lg:grid-cols-3"
            : "mx-auto max-w-4xl md:grid-cols-2"
        }`}
      >
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link
              href={exp.href}
              // isolate          → new stacking context fixes iOS Safari edge
              //                    compositing bug during momentum scroll
              // transform-gpu    → forces GPU layer (translateZ(0)) so the card
              //                    composes onto its own buffer, preventing the
              //                    "white edge during scroll up" iOS bug
              // transition-colors → only animate border-color (was transition-all,
              //                    which could ripple unintended properties)
              // tap-highlight     → kill iOS Safari's default tap overlay that
              //                    flashed a lighter band along the bottom edge
              //                    when fingers touched-then-scrolled
              className="group relative isolate block aspect-[4/5] transform-gpu overflow-hidden rounded-sm border border-gold/15 bg-card transition-colors duration-300 hover:border-gold/40 [-webkit-tap-highlight-color:transparent]"
            >
              <Image
                src={placeholderImages[exp.cardImage]}
                alt=""
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent"
              />

              <span
                aria-hidden="true"
                className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-navy-deep/60 text-cream/85 backdrop-blur-[2px] transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep"
              >
                <ArrowUpRight className="h-4 w-4 rtl:[transform:scaleX(-1)]" />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                  {exp.kicker[locale]}
                </p>
                <p className="mb-1 text-sm text-cream/70">
                  {exp.subtitle[locale]}
                  {exp.duration ? <> · {exp.duration[locale]}</> : null}
                </p>
                <h3 className="font-display text-xl font-bold leading-tight text-cream">
                  {exp.title[locale]}
                </h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* For Schools band — B2B path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6"
      >
        <Link
          href="/schools"
          // Mobile: 4:5 portrait card matching the experience tiles above.
          // Desktop (sm+): horizontal flex band with icon + text + CTA inline.
          className="group relative isolate block aspect-[4/5] overflow-hidden rounded-sm border border-gold/20 transition-colors hover:border-gold/50 sm:flex sm:aspect-auto sm:min-h-[340px] sm:flex-row sm:items-center sm:gap-6 sm:p-10 [-webkit-tap-highlight-color:transparent]"
        >
          {/* Mobile background — portrait horse + EtonHouse photo. Already
              shot in portrait orientation, so it fills the 4:5 tile naturally.
              Replaces the kids-on-horseback crop for stronger brand resonance
              between this CTA and the Schools page hero. */}
          <Image
            src="/images/home/schools-mobile.jpg"
            alt=""
            fill
            sizes="100vw"
            className="-z-20 object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:hidden"
          />
          {/* Desktop background — EtonHouse-horse photo for the horizontal band. */}
          <Image
            src="/images/home/schools-sunset.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="-z-20 hidden object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:block"
          />
          {/* Overlay — mobile: matches experience tile gradient (transparent top → solid bottom for text).
              Desktop: keeps the prior darker top-left → lighter bottom-right wash. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent sm:bg-gradient-to-br sm:from-navy-deep/90 sm:via-navy-deep/75 sm:to-navy-deep/55"
          />

          {/* ─── MOBILE-ONLY CONTENT ─────────────────────────────────── */}
          {/* Graduation cap badge top-right (matches the slot where the
              experience tiles show their ArrowUpRight icon — same shape,
              different glyph, so this card reads as "the schools one"). */}
          <span
            aria-hidden="true"
            className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-navy-deep/60 text-cream/85 backdrop-blur-[2px] transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep sm:hidden"
          >
            <GraduationCap className="h-4 w-4" />
          </span>
          {/* Bottom-left text block — kicker + title only (no body description),
              matching the experience tiles' bottom text layout. */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:hidden">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              {t("schoolsKicker")}
            </p>
            <h3 className="font-display text-xl font-bold leading-tight text-cream">
              {t("schoolsTitle")}
            </h3>
          </div>

          {/* ─── DESKTOP-ONLY CONTENT ────────────────────────────────── */}
          <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy-deep/60 text-gold backdrop-blur-[2px] sm:flex">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="hidden flex-1 sm:block">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              {t("schoolsKicker")}
            </p>
            <h3 className="font-display text-xl font-bold text-cream sm:text-2xl">
              {t("schoolsTitle")}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-cream/80 sm:text-base">
              {t("schoolsDescription")}
            </p>
          </div>
          <span className="hidden items-center gap-2 self-start text-sm font-semibold uppercase tracking-wider text-gold transition-colors group-hover:text-gold-light sm:inline-flex sm:self-center">
            {t("schoolsCta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </span>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 text-center"
      >
        <Link
          href="/experiences"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
        >
          {t("viewAll")}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </Link>
      </motion.div>
    </section>
  );
}
