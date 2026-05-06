// components/sections/ExperienceTimeline.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import type { ExperienceSlug } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";

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
          <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
            {exp.timeline.map((entry, i) => {
              const copy = items[i];
              const Icon = entry.iconKey ? iconMap[entry.iconKey as keyof typeof iconMap] : null;
              return (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border-t border-gold/25 pt-5 md:text-center"
                >
                  {Icon && (
                    <Icon
                      className="mb-3 h-6 w-6 text-gold md:mx-auto"
                      aria-hidden="true"
                    />
                  )}
                  <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                    {copy.range}
                  </p>
                  <p className="mt-3 font-display text-base font-bold leading-snug text-cream sm:text-lg">
                    {copy.label}
                  </p>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
