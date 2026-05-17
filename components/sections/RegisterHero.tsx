"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

export function RegisterHero() {
  const t = useTranslations("register");
  const steps = t.raw("next.steps") as { n: string; title: string; desc: string }[];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="bg-navy-deep py-20 sm:py-28">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
              {t("hero.kicker")}
            </p>
            <h1 className="font-display text-4xl font-black leading-[1.05] text-cream sm:text-5xl md:text-6xl">
              {t("hero.headline")}
              <br />
              <span className="text-gold">{t("hero.headlineAccent")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-semibold leading-relaxed text-cream sm:text-lg">
              {t("hero.subhead")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="https://forms.visme.co/fv/6vz3wd66-jx87nq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-2.5 rounded-sm bg-gold px-8 text-sm font-bold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light"
              >
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4 rtl:[transform:scaleX(-1)]" aria-hidden="true" />
              </a>
              <p className="text-xs text-cream/40">{t("hero.note")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What happens next ─────────────────────────── */}
      <section className="bg-navy-deep py-16 sm:py-20">
        <div className="container-page">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mb-14 text-xs font-semibold uppercase tracking-[0.4em] text-gold"
          >
            {t("next.kicker")}
          </motion.p>

          <div className="grid gap-12 sm:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <p className="font-display text-5xl font-black text-gold/40">{step.n}</p>
                <p className="mt-4 font-display text-lg font-bold text-cream">{step.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/60">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 border-t border-gold/10 pt-14"
          >
            <p className="text-base text-cream/60">
              {t("next.closingNote")}
              <br />
              <a
                href="mailto:info@campexplorersa.com"
                className="text-gold underline-offset-2 hover:underline"
              >
                info@campexplorersa.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
