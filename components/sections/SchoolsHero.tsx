"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import { placeholderImages } from "@/lib/content/experiences";

export function SchoolsHero() {
  const t = useTranslations("schools.hero");
  const common = useTranslations("common");

  return (
    <section className="relative isolate min-h-[70vh] overflow-hidden">
      {/* Background image */}
      <Image
        src={placeholderImages["/images/schools/hero.jpg"]}
        alt=""
        fill
        priority
        sizes="100vw"
        // Mobile: bias right + slightly lower so the girl and horse (right side
        // of the source) stay in focus when the wide 16:9 image is cropped to a
        // narrow portrait viewport.
        // Desktop (md+): the full width fits, so center positioning is fine.
        className="-z-20 object-cover object-[70%_40%] md:object-[center_18%]"
      />
      {/* Gradient overlay — heavier at bottom so text stays legible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-navy-deep/20"
      />

      <div className="container-page flex min-h-[70vh] flex-col justify-end pb-20 pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-gold">
            {t("kicker")}
          </p>
          <h1 className="font-display text-4xl font-black leading-[1.05] text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            {t("headline")}
            <br />
            <span className="text-gold">{t("headlineAccent")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {t("subhead")}
          </p>
          <div className="mt-10">
            <Link
              href="/register"
              className="inline-flex h-14 items-center gap-2 rounded-sm bg-gold px-8 text-sm font-bold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light"
            >
              {common("registerInterest")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
