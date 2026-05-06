// components/sections/ExperienceHighlights.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
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
        <h2 className="sr-only">{t("kicker")}</h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm"
          aria-hidden="true"
        >
          {t("kicker")}
        </motion.p>

        <ol className="mt-10 grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-baseline gap-5 border-b border-gold/10 pb-5"
            >
              <span
                aria-hidden="true"
                className="font-display text-sm font-semibold tabular-nums text-gold/70"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-display text-base font-bold leading-snug text-cream sm:text-lg">
                {item}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
