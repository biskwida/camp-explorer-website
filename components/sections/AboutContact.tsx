"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { InstagramIcon } from "@/components/SocialIcons";

const EMAIL = "info@campexplorersa.com";
const WHATSAPP_DISPLAY = "+966 54 414 2610";
const WHATSAPP_DIGITS = "966544142610";
const INSTAGRAM_HANDLE = "@campexplorer.sa";
const INSTAGRAM_URL = "https://www.instagram.com/campexplorer.sa/";

type Channel = {
  key: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  label: string;
  value: string;
  href: string;
  external: boolean;
};

export function AboutContact() {
  const t = useTranslations("about.contact");

  const channels: Channel[] = [
    {
      key: "email",
      icon: Mail,
      label: t("emailLabel"),
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      external: false,
    },
    {
      key: "whatsapp",
      icon: MessageCircle,
      label: t("whatsappLabel"),
      value: WHATSAPP_DISPLAY,
      href: `https://wa.me/${WHATSAPP_DIGITS}`,
      external: true,
    },
    {
      key: "instagram",
      icon: InstagramIcon,
      label: t("instagramLabel"),
      value: INSTAGRAM_HANDLE,
      href: INSTAGRAM_URL,
      external: true,
    },
  ];

  return (
    <section className="container-page py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative border-t border-gold bg-card px-5 py-14 sm:px-12 sm:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
              {t("kicker")}
            </p>
            <h2 className="font-display text-3xl font-black leading-tight text-balance text-cream sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-md text-base text-cream/75 sm:text-lg">
              {t("description")}
            </p>

          </div>

          <div className="lg:col-span-7">
            <ul className="grid gap-3 sm:grid-cols-1">
              {channels.map(({ key, icon: Icon, label, value, href, external }) => (
                <li key={key}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center justify-between gap-3 rounded-sm border border-gold/15 bg-navy/40 px-4 py-5 transition-all hover:border-gold/45 hover:bg-navy/60 sm:gap-6 sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/5 text-gold">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cream/55">
                          {label}
                        </span>
                        <span className="truncate font-display text-base font-bold text-cream sm:text-lg">
                          {value}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className="h-4 w-4 text-gold/60 transition-all group-hover:translate-x-1 group-hover:text-gold rtl:rotate-180 rtl:group-hover:-translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                href="/register"
                className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-gold px-10 text-sm font-semibold uppercase tracking-wider text-navy-deep transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              >
                {t("registerCta")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
