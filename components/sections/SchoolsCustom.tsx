"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

const WHATSAPP = "https://wa.me/966544142610";
const EMAIL = "mailto:info@campexplorersa.com";

export function SchoolsCustom() {
  const t = useTranslations("schools.custom");

  return (
    <section className="bg-navy-deep py-24 sm:py-32">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-sm border border-gold/20 bg-navy p-10 sm:p-16"
        >
          {/* Decorative corner accent */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute end-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl"
          />

          <div className="relative max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold">
              {t("kicker")}
            </p>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight text-cream sm:text-4xl md:text-5xl">
              {t("headline")}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-cream/70 sm:text-lg">
              {t("body")}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2.5 rounded-sm bg-gold px-6 text-sm font-bold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {t("cta")}
              </a>
              <a
                href={EMAIL}
                className="inline-flex h-12 items-center gap-2.5 rounded-sm border border-gold/40 px-6 text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:border-gold hover:text-gold-light"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
