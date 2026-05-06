"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { experiences, placeholderImages } from "@/lib/content/experiences";
import type { Locale } from "@/lib/i18n/routing";

const INTERNATIONAL_SLUGS = ["sri-lanka", "cambodia"] as const;

export function SchoolsInternational() {
  const t = useTranslations("schools.international");
  const locale = useLocale() as Locale;

  const programs = INTERNATIONAL_SLUGS.map((slug) =>
    experiences.find((e) => e.slug === slug)
  ).filter(Boolean) as (typeof experiences)[number][];

  return (
    <section className="bg-navy py-24 sm:py-32">
      <div className="container-page">

        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-gold"
          >
            {t("kicker")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-3xl font-black leading-tight text-cream sm:text-4xl"
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base leading-relaxed text-cream/70 sm:text-lg"
          >
            {t("body")}
          </motion.p>
        </div>

        {/* Program cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {programs.map((exp, i) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <Link
                href={exp.href as "/experiences/sri-lanka" | "/experiences/cambodia"}
                className="group relative block aspect-[16/9] overflow-hidden rounded-sm border border-gold/15 transition-all hover:border-gold/40"
                aria-label={`${exp.title[locale]} — ${t("cta")}`}
              >
                <Image
                  src={placeholderImages[exp.cardImage] ?? exp.cardImage}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent"
                />

                {/* Arrow badge */}
                <span
                  aria-hidden="true"
                  className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-navy-deep/60 text-cream/85 backdrop-blur-[2px] transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-navy-deep"
                >
                  <ArrowUpRight className="h-4 w-4 rtl:[transform:scaleX(-1)]" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                    {exp.subtitle[locale]}
                    {exp.duration ? <> · {exp.duration[locale]}</> : null}
                  </p>
                  <h3 className="font-display text-xl font-bold leading-tight text-cream">
                    {exp.title[locale]}
                  </h3>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold/80 transition-colors group-hover:text-gold">
                    {t("cta")}
                    <ArrowRight className="h-3 w-3 rtl:[transform:scaleX(-1)]" aria-hidden="true" />
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
