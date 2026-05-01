"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ABDUL_WEBSITE_URL = "https://abdulexplorer.com/";

const proofPoints = [
  { year: "2018", label: "First Saudi expedition to the geographic North Pole, 90°N" },
  { year: "2024", label: "Founded Camp Explorer to bring real-world learning to Saudi youth" },
  { year: "Ongoing", label: "Continues to lead expeditions in conservation, culture, and adventure" },
];

export function HomeAbdul() {
  const t = useTranslations("home.abdul");

  return (
    <section className="relative overflow-hidden border-y border-gold/10 bg-navy-deep py-24 sm:py-32">
      <div className="container-page relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Photo column — taller, more documentary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-gold/15">
            {/* Drop a new file at /public/images/home/abdul-trust.jpg to swap */}
            <Image
              src="/images/home/abdul-trust.jpg"
              alt="Abdul Explorer at the geographic North Pole, 2017"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover grayscale"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent"
            />
            {/* Caption strip — like a documentary still */}
            <div className="absolute inset-x-0 bottom-0 border-t border-gold/30 bg-navy-deep/90 px-5 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/80">
                {t("name")} · 90°N · 2018
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            {t("kicker")}
          </p>

          <h2 className="font-display text-4xl font-black leading-[1.05] text-cream sm:text-5xl md:text-6xl">
            {t("name")}
          </h2>

          <p className="mt-3 text-base text-cream/65 sm:text-lg">
            {t("credential")}
          </p>

          {/* Pull quote — distinct typographic treatment */}
          <blockquote className="my-10 border-s-2 border-gold/60 ps-6">
            <p className="font-display text-2xl font-bold leading-snug text-cream sm:text-3xl">
              {t("tagline")}
            </p>
          </blockquote>

          <p className="text-base leading-relaxed text-cream/80 sm:text-lg">
            {t("description")}
          </p>

          {/* Proof timeline */}
          <ul className="mt-10 space-y-4 border-t border-gold/10 pt-8">
            {proofPoints.map((point) => (
              <li key={point.year} className="grid grid-cols-[5rem_1fr] items-baseline gap-4">
                <span className="font-display text-sm font-black uppercase tracking-wider text-gold">
                  {point.year}
                </span>
                <span className="text-sm text-cream/75 sm:text-base">
                  {point.label}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={ABDUL_WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:text-gold-light"
          >
            {t("cta")}
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
