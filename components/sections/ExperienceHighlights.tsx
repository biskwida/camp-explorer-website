// components/sections/ExperienceHighlights.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceHighlights({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.highlights`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.highlights) return null;

  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-navy py-24 sm:py-32">
      <div className="container-page">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm"
        >
          {t("kicker")}
        </motion.h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {exp.highlights.map((h, i) => {
            const Icon = iconMap[h.iconKey];
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-sm border border-gold/15 bg-navy-deep/60 p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-5 font-display text-base font-bold leading-snug text-cream sm:text-lg">
                  {items[i]}
                </p>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
