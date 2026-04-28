import type { Locale } from "@/lib/i18n/routing";

export type NavItem = {
  href: string;
  labelKey: keyof typeof navLabelKeys;
};

const navLabelKeys = {
  home: "nav.home",
  experiences: "nav.experiences",
  schools: "nav.schools",
  about: "nav.about",
} as const;

export const mainNav: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/experiences", labelKey: "experiences" },
  { href: "/schools", labelKey: "schools" },
  { href: "/about", labelKey: "about" },
];

export const otherLocale = (locale: Locale): Locale =>
  locale === "en" ? "ar" : "en";
