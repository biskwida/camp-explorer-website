// components/sections/ExperienceSafety.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceSafety({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.safety`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.safety) return null;

  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-navy py-20 sm:py-24">
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

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {exp.safety.map((s, i) => {
            const Icon = iconMap[s.iconKey];
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="flex items-center gap-3 rounded-sm border border-gold/15 bg-navy-deep/60 px-4 py-4"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm leading-snug text-cream/85 sm:text-base">{items[i]}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
