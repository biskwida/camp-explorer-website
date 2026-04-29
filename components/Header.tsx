"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { mainNav } from "@/lib/content/nav";

export function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 lg:flex"
        >
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
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
          ))}
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
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-cream lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
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
        <nav
          aria-label="Mobile"
          className="container-page flex flex-col gap-1 py-6"
        >
          {mainNav.map((item) => (
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
          ))}
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
