"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function AboutPhilosophy() {
  const t = useTranslations("about.philosophy");

  const principles = [
    t("principles.challenge"),
    t("principles.build"),
    t("principles.develop"),
    t("principles.encourage"),
    t("principles.create"),
  ];

  return (
    <section className="relative border-y border-gold/10 bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
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
          <p className="text-base text-cream/65 sm:text-lg">
            {t("lead")}
          </p>
          <h2 className="mt-3 font-display text-3xl font-black leading-tight text-balance text-cream sm:text-4xl md:text-5xl">
            {t("headline")}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-cream/80 sm:text-lg">
            {t("transformation")}
          </p>
        </motion.div>

        {/* Principles as a numbered enumeration — expedition-log feel, not a bullet list.
            Each line: gold serial number + the principle statement in display type. */}
        <motion.ol
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 grid gap-x-12 gap-y-6 border-t border-gold/15 pt-10 sm:mt-20 sm:grid-cols-2 sm:pt-14"
        >
          {principles.map((principle, i) => (
            <li
              key={principle}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-4"
            >
              <span className="font-display text-sm font-black uppercase tracking-wider text-gold">
                0{i + 1}
              </span>
              <span className="font-display text-lg font-bold leading-snug text-cream sm:text-xl">
                {principle}
              </span>
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
