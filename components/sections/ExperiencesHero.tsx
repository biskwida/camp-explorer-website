// components/sections/ExperiencesHero.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function ExperiencesHero() {
  const t = useTranslations("experiencesOverview.hero");

  return (
    <section className="relative bg-navy-deep pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h1 className="mt-6 font-display text-4xl font-black leading-[1.05] text-cream text-balance sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {t("intro")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
