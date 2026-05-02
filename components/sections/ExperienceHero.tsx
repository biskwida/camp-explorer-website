// components/sections/ExperienceHero.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { experiences } from "@/lib/content/experiences";
import { iconMap } from "@/lib/content/iconMap";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceHero({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.hero`);
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp || !exp.meta) return null;

  const meta = t.raw("meta") as string[];

  return (
    <section className="relative isolate flex min-h-[80dvh] items-end overflow-hidden">
      <Image
        src={exp.heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-navy-deep via-navy-deep/70 via-40% to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-navy-deep"
      />

      <div className="container-page relative z-10 flex w-full flex-col items-start pt-32 pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>
          <h1 className="mt-4 font-display text-4xl font-black leading-[1.05] text-cream text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {exp.meta.map((m, i) => {
              const Icon = iconMap[m.iconKey];
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-navy-deep/60 text-gold backdrop-blur-[2px]">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-cream/85 sm:text-sm">
                    {meta[i]}
                  </span>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
