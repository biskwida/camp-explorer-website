"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";

export function HomeHero() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative isolate flex min-h-[100dvh] items-end overflow-hidden">
      {/* Background image — drop a new file at /public/images/home/hero.jpg to swap */}
      <Image
        src="/images/home/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Single directional overlay — anchors text to bottom-left, leaves photo legible above */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-navy via-navy/85 via-40% to-transparent"
      />

      <div className="container-page relative z-10 flex w-full flex-col items-start pt-32 pb-20 sm:pb-24 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            Camp Explorer
          </p>

          <h1 className="font-display text-5xl font-black leading-[1.02] text-cream text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            {t("headline")}{" "}
            <span className="text-gold">{t("headlineAccent")}.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
            {t("subheadline")}
          </p>

          <div className="mt-10 flex flex-col items-start gap-x-6 gap-y-4 sm:flex-row sm:items-center">
            <Link
              href="/experiences"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gold px-8 text-sm font-semibold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/register"
              className="group inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold uppercase tracking-wider text-cream/85 transition-colors hover:text-gold"
            >
              {t("ctaSecondary")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
