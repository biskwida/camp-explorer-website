"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Tent, Leaf, ChefHat, Dumbbell, Brain,
  PawPrint, CalendarDays, Moon, CalendarRange, Puzzle,
} from "lucide-react";
import { Link } from "@/lib/i18n/navigation";

const highlightIcons = [Tent, PawPrint, Leaf, ChefHat, Dumbbell, Brain];

const formatIcons = [CalendarDays, Moon, CalendarRange, Puzzle];

export function SchoolsLocal() {
  const t = useTranslations("schools.local");
  const highlights = t.raw("highlights") as string[];
  const formats = t.raw("formats") as { label: string; desc: string }[];
  const whoItems = t.raw("whoItems") as string[];

  return (
    <section className="bg-navy-deep py-24 sm:py-32">
      <div className="container-page">

        {/* Section header */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">
              {t("kicker")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-cream sm:text-4xl">
              {t("headline")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
              {t("body")}
            </p>
          </motion.div>

          {/* Who it's for — right column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:pt-10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">
              {t("whoKicker")}
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {whoItems.map((item, i) => (
                <li
                  key={i}
                  className="rounded-sm border border-gold/25 px-4 py-2 text-sm font-medium text-cream/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Highlights grid */}
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item, i) => {
            const Icon = highlightIcons[i] ?? Tent;
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

        {/* Program formats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            Program Formats
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((f, i) => {
              const Icon = formatIcons[i] ?? CalendarDays;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-sm border border-gold/15 bg-navy-deep p-6"
                >
                  <Icon className="mb-4 h-6 w-6 text-gold" aria-hidden="true" />
                  <p className="font-display text-base font-bold text-cream">{f.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12"
        >
          <Link
            href="/register"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-gold px-7 text-sm font-bold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light"
          >
            {t("cta")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
