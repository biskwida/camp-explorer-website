"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";

export function HomeClosingCta() {
  const t = useTranslations("home.closingCta");

  return (
    <section className="container-page py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative border-t border-gold bg-card px-8 py-16 text-start sm:px-12 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <h2 className="font-display text-3xl font-black leading-tight text-balance text-cream sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-2xl text-base text-cream/75 sm:text-lg">
              {t("description")}
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Link
              href="/register"
              className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gold px-10 text-sm font-semibold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              {t("button")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
