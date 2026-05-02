// components/sections/ExperienceOverview.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceOverview({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.overview`);

  return (
    <section className="relative bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h2 className="mt-6 font-display text-3xl font-black leading-[1.1] text-cream text-balance sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-8 text-base leading-relaxed text-cream/80 sm:text-lg">
            {t("body")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
