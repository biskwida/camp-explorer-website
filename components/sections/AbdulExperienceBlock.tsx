// components/sections/AbdulExperienceBlock.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function AbdulExperienceBlock({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.abdul`);
  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl border-s-2 border-gold/60 ps-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold leading-snug text-cream sm:text-3xl">
            {t("title")}
          </h2>
          <ul className="mt-6 space-y-3">
            {items.map((it, i) => (
              <li
                key={i}
                className="flex gap-3 text-base leading-relaxed text-cream/85 sm:text-lg"
              >
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
