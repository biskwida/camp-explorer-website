import type { Metadata, Viewport } from "next";
import { Inter, Tajawal } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, isRtl } from "@/lib/i18n/routing";
import { BASE_URL } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "../globals.css";

// Single Inter load covering all weights used across body + display roles
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-arabic",
  display: "swap",
});

// Display uses the same Inter variable — no second font fetch needed
const display = Inter({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#06090e",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "siteMetadata" });

  return {
    title: {
      default: t("title"),
      template: "%s · Camp Explorer",
    },
    description: t("description"),
    metadataBase: new URL(BASE_URL),
    // No `alternates` here: metadata merges shallowly, so a layout-level
    // canonical would mark every subpage as a duplicate of the homepage.
    // Each page declares its own via pageAlternates().
    openGraph: {
      type: "website",
      siteName: "Camp Explorer",
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_SA",
      images: [
        {
          url: "/og/home.jpg",
          width: 1200,
          height: 630,
          alt: t("ogTitle"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/og/home.jpg"],
      site: "@campexplorer_sa",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "siteMetadata" });

  return (
    <html
      lang={locale}
      dir={isRtl(locale) ? "rtl" : "ltr"}
      className={`${inter.variable} ${tajawal.variable} ${display.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Camp Explorer",
              url: BASE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${BASE_URL}/logo.png`,
                width: 200,
                height: 48,
              },
              description: t("jsonLdDescription"),
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+966544142610",
                contactType: "customer service",
                availableLanguage: ["English", "Arabic"],
              },
              sameAs: ["https://www.instagram.com/campexplorer.sa/"],
            }),
          }}
        />
        <NextIntlClientProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-navy-deep"
          >
            {locale === "ar" ? "تخطّ إلى المحتوى" : "Skip to content"}
          </a>
          <Header />
          <div id="main-content">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
