// components/sections/ExperienceProgramDelivery.tsx
"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { experiences } from "@/lib/content/experiences";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };

export function ExperienceProgramDelivery({ slug }: Props) {
  const exp = experiences.find((e) => e.slug === slug);
  if (!exp?.programDelivery) return null;

  const t = useTranslations(`experiences.${slug}.programDelivery`);

  return (
    <section className="relative bg-navy-deep py-16 sm:py-20">
      <div className="container-page max-w-3xl">
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

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-base leading-relaxed text-cream/80 sm:text-lg"
        >
          {t("body")}
        </motion.p>
      </div>
    </section>
  );
}
