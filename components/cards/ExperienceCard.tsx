"use client";

import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/lib/i18n/navigation";
import type { Experience } from "@/lib/content/experiences";
import { placeholderImages } from "@/lib/content/experiences";
import type { Locale } from "@/lib/i18n/routing";

type Props = { experience: Experience };

export function ExperienceCard({ experience }: Props) {
  const t = useTranslations("experiencesOverview.card");
  const locale = useLocale() as Locale;

  const kicker = `${experience.subtitle[locale]} · ${experience.kicker[locale]}`;
  const altText =
    experience.cardImageAlt?.[locale] ?? experience.title[locale];
  const description = experience.cardDescription?.[locale] ?? "";
  const imageSrc =
    placeholderImages[experience.cardImage] ?? experience.cardImage;

  return (
    <article className="group h-full">
      <Link
        href={experience.href}
        className="block h-full overflow-hidden rounded-sm border border-gold/15 bg-navy-deep/40 transition-colors duration-300 hover:border-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
      >
        {/* Photo — 4:5 portrait */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-navy-deep via-navy to-gold/20">
          <Image
            src={imageSrc}
            alt={altText}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-[1.03]"
          />
          {/* Subtle bottom gradient so the photo edge meets the card body cleanly */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-navy-deep/60"
          />
          {experience.duration ? (
            <span className="absolute start-4 top-4 inline-flex items-center rounded-full border border-cream/20 bg-navy-deep/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream/90 backdrop-blur-[2px]">
              {experience.duration[locale]}
            </span>
          ) : null}
        </div>

        {/* Card body */}
        <div className="p-6 sm:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
            {kicker}
          </p>
          <h3 className="mt-3 font-display text-xl font-bold leading-snug text-cream sm:text-2xl">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom rtl:bg-right-bottom bg-no-repeat transition-[background-size] duration-500 motion-safe:group-hover:bg-[length:100%_1px]">
              {experience.title[locale]}
            </span>
          </h3>
          {description ? (
            <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-cream/75 sm:text-base">
              {description}
            </p>
          ) : null}
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold transition-colors group-hover:text-gold-light">
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1 rtl:rotate-180 rtl:motion-safe:group-hover:-translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
