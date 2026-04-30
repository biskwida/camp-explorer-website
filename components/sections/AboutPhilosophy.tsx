"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function AboutPhilosophy() {
  const t = useTranslations("about.philosophy");

  const principles = [
    t("principles.challenge"),
    t("principles.build"),
    t("principles.develop"),
    t("principles.encourage"),
    t("principles.create"),
  ];

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      {/* Camel-at-sunset silhouette as full-bleed background.
          Drop a new file at /public/images/about/camel-sunset.jpg to swap. */}
      <Image
        src="/images/about/camel-sunset.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Two-layer overlay so the camel silhouette reads as atmosphere without
          fighting the text. Layer 1: a lighter navy wash that lets the burnt-
          orange sunset bleed through. Layer 2: a bottom-anchored dark fade so
          the dense principles list at the lower half stays legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-navy-deep/65"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-navy-deep/40 to-navy-deep/85"
      />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl"
        >
          <h2 className="text-xs font-semibold uppercase tracking-[0.4em] text-gold sm:text-sm">
            {t("kicker")}
          </h2>

          <p className="mt-6 text-base text-cream/65 sm:text-lg">
            {t("lead")}
          </p>

          <h3 className="mt-3 font-display text-4xl font-black leading-[1.05] text-cream text-balance sm:text-5xl md:text-6xl">
            {t("headline")}
          </h3>

          <p className="mt-8 text-lg leading-relaxed text-cream/85 sm:text-xl">
            {t("transformation")}
          </p>

          <div className="mt-16">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
              {t("designedTo")}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-10">
              {principles.map((principle) => (
                <li
                  key={principle}
                  className="flex items-start gap-3 text-base text-cream/90 sm:text-lg"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                  />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
