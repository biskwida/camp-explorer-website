import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Camp Explorer terms and conditions.",
};

export default async function TermsPage({
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
            Terms &amp; Conditions
          </h1>
          <p className="mt-8 text-base leading-relaxed text-cream/70">
            This page is being updated. Please contact us at{" "}
            <a
              href="mailto:info@campexplorersa.com"
              className="text-gold underline-offset-4 hover:underline"
            >
              info@campexplorersa.com
            </a>{" "}
            for any questions about our terms of service.
          </p>
        </div>
      </div>
    </main>
  );
}
