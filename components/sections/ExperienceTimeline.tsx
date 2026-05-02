// components/sections/ExperienceTimeline.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };
type Entry = { range: string; label: string };

export function ExperienceTimeline({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.timeline`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.timeline) return null;

  const items = t.raw("items") as Entry[];

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
        </motion.div>

        <div className="relative mt-14">
          {/* Dotted connector — desktop only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px border-t border-dashed border-gold/30 md:block"
          />
          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
            {exp.timeline.map((entry, i) => {
              const Icon = iconMap[entry.iconKey];
              const copy = items[i];
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 md:flex-col md:items-center md:text-center"
                >
                  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-navy text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="md:mt-3">
                    <p className="font-display text-base font-bold text-cream sm:text-lg">
                      {copy.range}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/75">
                      {copy.label}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
