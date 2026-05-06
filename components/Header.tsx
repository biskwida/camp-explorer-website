"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { mainNav } from "@/lib/content/nav";
import { experiences } from "@/lib/content/experiences";
import type { Locale } from "@/lib/i18n/routing";

export function Header() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileExpExpanded, setMobileExpExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileExpExpanded(false);
  }, [pathname]);

  // Close dropdown on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // bfcache: Framer Motion animations don't replay after restore — force reload.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  // Small delay prevents the menu vanishing when the mouse moves from
  // trigger to panel (gap between the two elements).
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? "border-b border-gold/20 bg-navy-deep"
          : "border-b border-transparent bg-navy-deep/30 backdrop-blur-sm"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo priority />

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const isExperiences = item.labelKey === "experiences";

            if (isExperiences) {
              return (
                /* Wrapper covers both trigger + panel — no gap = no flicker */
                <div
                  key={item.href}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={scheduleClose}
                  onFocusCapture={openDropdown}
                  onBlurCapture={scheduleClose}
                >
                  {/* Trigger — still a real link so it works without JS */}
                  <Link
                    href={item.href}
                    aria-haspopup="menu"
                    aria-expanded={dropdownOpen}
                    className={`relative inline-flex min-h-11 items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-gold"
                        : "text-cream/75 hover:text-cream"
                    }`}
                  >
                    {t(`nav.${item.labelKey}`)}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                    {isActive(item.href) && (
                      <span className="absolute inset-x-4 -bottom-px h-px bg-gold/70" />
                    )}
                  </Link>

                  {/* Dropdown panel */}
                  <div
                    role="menu"
                    className={`absolute start-0 top-full w-52 origin-top-start rounded-sm border border-gold/20 bg-navy-deep/75 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-150 ${
                      dropdownOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                  >
                    {experiences.map((exp) => (
                      <Link
                        key={exp.slug}
                        href={exp.href as "/experiences/sri-lanka" | "/experiences/cambodia" | "/experiences/weekend-camp"}
                        role="menuitem"
                        className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-gold/10 hover:text-gold ${
                          pathname === exp.href
                            ? "bg-gold/10 text-gold"
                            : "text-cream/80"
                        }`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        {t(`nav.exp_${exp.slug}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex min-h-11 items-center px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-gold"
                    : "text-cream/75 hover:text-cream"
                }`}
              >
                {t(`nav.${item.labelKey}`)}
                {isActive(item.href) && (
                  <span className="absolute inset-x-4 -bottom-px h-px bg-gold/70" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Link
            href="/register"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-navy-deep transition-all hover:bg-gold-light hover:shadow-[0_0_24px_rgba(184,149,77,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy lg:inline-flex"
          >
            {t("nav.register")}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/20 text-cream lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-gold/10 bg-navy-deep lg:hidden ${
          mobileOpen ? "max-h-[80vh]" : "max-h-0"
        } transition-[max-height] duration-300 ease-out`}
      >
        <nav aria-label={t("nav.mobileMenuLabel")} className="container-page flex flex-col gap-1 py-6">
          {mainNav.map((item) => {
            const isExperiences = item.labelKey === "experiences";

            if (isExperiences) {
              return (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() => setMobileExpExpanded((v) => !v)}
                    aria-expanded={mobileExpExpanded}
                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? "bg-gold/10 text-gold"
                        : "text-cream/85 hover:bg-white/5"
                    }`}
                  >
                    {t(`nav.${item.labelKey}`)}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        mobileExpExpanded ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Sub-items */}
                  <div
                    className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
                      mobileExpExpanded ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="ms-4 mt-1 flex flex-col gap-0.5 border-s border-gold/15 ps-4">
                      {experiences.map((exp) => (
                        <Link
                          key={exp.slug}
                          href={exp.href as "/experiences/sri-lanka" | "/experiences/cambodia" | "/experiences/weekend-camp"}
                          className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gold/10 hover:text-gold ${
                            pathname === exp.href ? "bg-gold/10 text-gold" : "text-cream/80"
                          }`}
                        >
                          {t(`nav.exp_${exp.slug}`)}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-gold/10 text-gold"
                    : "text-cream/85 hover:bg-white/5"
                }`}
              >
                {t(`nav.${item.labelKey}`)}
              </Link>
            );
          })}

          <div className="mt-4 flex flex-col gap-3 border-t border-gold/10 pt-4">
            <Link
              href="/register"
              className="rounded-full bg-gold px-5 py-3 text-center text-sm font-semibold uppercase tracking-wider text-navy-deep"
            >
              {t("nav.register")}
            </Link>
            <LanguageToggle className="self-start" />
          </div>
        </nav>
      </div>
    </header>
  );
}
