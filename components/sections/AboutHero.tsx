"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";

export function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative isolate flex min-h-[80dvh] items-end overflow-hidden">
      {/* Drop a new file at /public/images/about/abdul-community.jpg to swap.
          The transform mirrors the image in LTR so Abdul's face sits opposite the
          bottom-left headline. In Arabic (RTL) the headline is on the right, so
          the unmirrored image already keeps his face clear of the text. */}
      <Image
        src="/images/about/abdul-community.jpg"
        alt={t("imageAlt")}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[60%_center] [transform:scaleX(-1)] rtl:[transform:none] md:object-center"
      />
      {/* Directional overlay — anchors text to bottom-LEFT in LTR (under English headline)
          and to bottom-RIGHT in RTL (under Arabic headline). Without rtl:bg-gradient-to-tl
          the Arabic text sits over the bright side of the photo and becomes unreadable. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-tr from-navy via-navy/65 via-40% to-transparent rtl:bg-gradient-to-tl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-navy-deep"
      />

      <div className="container-page relative z-10 flex w-full flex-col items-start pt-32 pb-20 sm:pb-24 lg:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </p>

          <h1 className="font-display text-5xl font-black leading-[1.02] text-cream text-balance sm:text-6xl md:text-7xl lg:text-8xl">
            {t("headline")}
            <span className="block text-gold">{t("headlineAccent")}</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-cream/80 sm:text-xl">
            {t("subhead")}
          </p>

          <div className="mt-10">
            <Link
              href="/register"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gold px-8 text-sm font-semibold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
