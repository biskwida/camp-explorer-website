// components/sections/ExperienceWhatToExpect.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceWhatToExpect({ slug }: Props) {
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp?.whatToExpect) return null;

  const t = useTranslations(`experiences.${slug}.whatToExpect`);
  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-cream/40">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* 2×2 item grid */}
        <ul className="grid gap-0 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="flex items-start gap-6 border-t border-gold/15 py-8 pe-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-black leading-none text-gold/10 sm:text-5xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-lg font-bold leading-snug text-cream sm:text-xl">
                {item}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
