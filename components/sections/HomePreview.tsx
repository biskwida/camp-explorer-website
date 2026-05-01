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

      {/* 3 equal experience cards */}
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
              className="group relative block aspect-[4/5] overflow-hidden rounded-sm border border-gold/15 bg-card transition-all duration-300 hover:border-gold/40"
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
                <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
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
          className="group flex flex-col items-start gap-6 rounded-sm border border-gold/20 bg-card/40 p-8 transition-colors hover:border-gold/50 hover:bg-card/60 sm:flex-row sm:items-center sm:p-10"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
              {t("schoolsKicker")}
            </p>
            <h3 className="font-display text-xl font-bold text-cream sm:text-2xl">
              {t("schoolsTitle")}
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-cream/70 sm:text-base">
              {t("schoolsDescription")}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-wider text-gold transition-colors group-hover:text-gold-light sm:self-center">
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
