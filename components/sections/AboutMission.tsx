"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function AboutMission() {
  const t = useTranslations("about.mission");

  const pillars = [
    { key: "confidence", text: t("pillars.confidence") },
    { key: "awareness", text: t("pillars.awareness") },
    { key: "mindset", text: t("pillars.mindset") },
  ];

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
          <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </h2>

          <h3 className="mt-6 font-display text-3xl font-black leading-[1.1] text-cream text-balance sm:text-4xl md:text-5xl">
            {t("title")}
          </h3>

          <p className="mt-8 text-lg leading-relaxed text-cream/80 sm:text-xl">
            {t("body")}
          </p>

          <div className="mt-12 grid gap-3 text-start sm:grid-cols-3 sm:gap-6">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="rounded-sm border border-gold/15 bg-navy/40 px-5 py-6"
              >
                <p className="font-display text-base font-bold text-cream sm:text-lg">
                  {pillar.text}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
