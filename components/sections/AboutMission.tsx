"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function AboutMission() {
  const t = useTranslations("about.mission");

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
        <p className="mt-6 text-base leading-relaxed text-cream/80 sm:text-lg">
          {t("body")}
        </p>
      </motion.div>

      {/* Pillars as a typographic statement, not a card grid.
          Three short lines stacked, each ending in a gold verb — reads as a
          declaration rather than a feature list. */}
      <motion.ul
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mt-16 space-y-4 border-t border-gold/15 pt-10 sm:mt-20 sm:space-y-6 sm:pt-14"
      >
        <li className="font-display text-2xl font-bold leading-snug text-cream sm:text-3xl md:text-4xl">
          {t("pillars.confidence")}
        </li>
        <li className="font-display text-2xl font-bold leading-snug text-cream sm:text-3xl md:text-4xl">
          {t("pillars.awareness")}
        </li>
        <li className="font-display text-2xl font-bold leading-snug text-cream sm:text-3xl md:text-4xl">
          {t("pillars.mindset")}
        </li>
      </motion.ul>
    </section>
  );
}
