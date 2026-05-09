// components/sections/ExperienceLocalHighlights.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Tent, PawPrint, Leaf, ChefHat, Dumbbell, Brain } from "lucide-react";
import { experiences } from "@/lib/content/experiences";
import type { ExperienceSlug } from "@/lib/content/experiences";

const icons = [Tent, PawPrint, Leaf, ChefHat, Dumbbell, Brain];

type Props = { slug: ExperienceSlug };

export function ExperienceLocalHighlights({ slug }: Props) {
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp?.localHighlights) return null;

  const t = useTranslations(`experiences.${slug}.localHighlights`);
  const items = t.raw("items") as string[];

  return (
    <section className="relative bg-navy-deep py-20 sm:py-28">
      <div className="container-page">
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

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Tent;
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex items-start gap-4 rounded-sm border border-gold/10 bg-navy/60 p-5"
              >
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold leading-snug text-cream sm:text-base">
                  {item}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
