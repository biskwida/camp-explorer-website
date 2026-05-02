// components/sections/ExperienceWhoFor.tsx
"use client";

import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import type { ExperienceSlug } from "@/lib/content/experiences";

type Props = { slug: ExperienceSlug };
type Card = { label: string; subtitle: string };

export function ExperienceWhoFor({ slug }: Props) {
  const t = useTranslations(`experiences.${slug}.whoFor`);
  const cards = t.raw("cards") as Card[];
  const cardIcons = [UserCheck, GraduationCap];

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

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">
            {cards.map((card, i) => {
              const Icon = cardIcons[i] ?? UserCheck;
              return (
                <li
                  key={i}
                  className="flex items-center gap-4 rounded-sm border border-gold/15 bg-navy/40 px-6 py-5 text-start"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-gold/5 text-gold">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-base font-bold text-cream sm:text-lg">
                      {card.label}
                    </p>
                    <p className="text-sm text-cream/70">{card.subtitle}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-8 text-sm text-cream/70 sm:text-base">{t("note")}</p>

          <Link
            href={{ pathname: "/register", query: { program: slug } }}
            className="group mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gold px-10 text-sm font-semibold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
