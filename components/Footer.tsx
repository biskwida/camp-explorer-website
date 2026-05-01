import { useTranslations } from "next-intl";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { Logo } from "./Logo";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";
import { mainNav } from "@/lib/content/nav";

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();
  const crNumber = t("footer.crNumber").trim();

  return (
    <footer className="relative mt-32 border-t border-gold/15 bg-navy-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />

      <div className="container-page grid gap-12 py-16 lg:grid-cols-12 lg:gap-8">
        {/* Brand column */}
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-sm text-sm text-cream/65">
            {t("footer.tagline")}
          </p>

          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream/55">
              {t("footer.follow")}
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: InstagramIcon, href: "https://www.instagram.com/campexplorer.sa", label: "Instagram" },
                { icon: FacebookIcon, href: "https://facebook.com/campexplorer", label: "Facebook" },
                { icon: YoutubeIcon, href: "https://youtube.com/@campexplorer", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-cream/70 transition-all hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-3">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/55">
            {t("footer.quickLinks")}
          </p>
          <ul className="space-y-3 text-sm">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/75 transition-colors hover:text-gold"
                >
                  {t(`nav.${item.labelKey}`)}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/register"
                className="text-cream/75 transition-colors hover:text-gold"
              >
                {t("nav.register")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-5">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/55">
            {t("footer.contact")}
          </p>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:info@campexplorersa.com"
                className="inline-flex items-center gap-3 text-cream/75 transition-colors hover:text-gold"
              >
                <Mail className="h-4 w-4 text-gold/70" />
                info@campexplorersa.com
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/966544142610"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-cream/75 transition-colors hover:text-gold"
              >
                <MessageCircle className="h-4 w-4 text-gold/70" />
                WhatsApp +966 54 414 2610
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/campexplorer.sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-cream/75 transition-colors hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4 text-gold/70" />
                @campexplorer.sa
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-3 text-cream/75">
                <MapPin className="h-4 w-4 text-gold/70" />
                Riyadh, Saudi Arabia
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>{t("footer.copyright", { year })}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-gold">
              {t("footer.privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold">
              {t("footer.terms")}
            </Link>
            {crNumber && <span className="text-cream/35">{crNumber}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
