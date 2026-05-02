// components/sections/ExperienceActivities.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };
type ActivityCopy = { title: string; subtitle: string; items: string[] };

export function ExperienceActivities({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.activities`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.activities) return null;

  const items = t.raw("items") as ActivityCopy[];

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

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {exp.activities.map((a, i) => {
            const Icon = iconMap[a.iconKey];
            const copy = items[i];
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="overflow-hidden rounded-sm border border-gold/15 bg-navy-deep/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-gold/20">
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute bottom-3 left-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-navy-deep/80 text-gold backdrop-blur-[2px]"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-cream">{copy.title}</h3>
                  {copy.subtitle ? (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                      {copy.subtitle}
                    </p>
                  ) : null}
                  <ul className="mt-4 space-y-2">
                    {copy.items.map((it, j) => (
                      <li
                        key={j}
                        className="flex gap-2 text-sm leading-relaxed text-cream/80 sm:text-base"
                      >
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
