"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/lib/i18n/navigation";
import type { Locale } from "@/lib/i18n/routing";
import { otherLocale } from "@/lib/content/nav";
import { useTransition } from "react";

export function LanguageToggle({ className = "" }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("nav");
  const next = otherLocale(locale);

  const onClick = () => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isPending}
      aria-label={t("languageToggleAria")}
      className={`inline-flex items-center justify-center rounded-full border border-gold/30 bg-transparent px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-cream/80 transition-colors hover:border-gold hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold disabled:opacity-60 ${className}`}
    >
      {t("languageToggle")}
    </button>
  );
}
