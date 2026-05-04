import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Camp Explorer privacy policy and data protection information.",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-navy-deep min-h-screen">
      <div className="container-page py-32 sm:py-40">
        <div className="max-w-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            Legal
          </p>
          <h1 className="font-display text-4xl font-black text-cream sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-8 text-base leading-relaxed text-cream/70">
            This page is being updated. Please contact us at{" "}
            <a
              href="mailto:info@campexplorersa.com"
              className="text-gold underline-offset-4 hover:underline"
            >
              info@campexplorersa.com
            </a>{" "}
            for any questions about how we handle your data.
          </p>
          <p className="mt-4 text-sm text-cream/50">
            Camp Explorer collects and stores personal data in accordance with
            the Saudi Personal Data Protection Law (PDPL). Data is used solely
            to plan and manage your experience and is not shared with third
            parties.
          </p>
        </div>
      </div>
    </main>
  );
}
