import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { setRequestLocale } from "next-intl/server";
import React from "react";

/* ─── Metadata ────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr ? "سياسة الخصوصية" : "Privacy Policy",
    description: isAr
      ? "سياسة الخصوصية وحماية البيانات الشخصية لكامب إكسبلورر وفق نظام حماية البيانات الشخصية السعودي."
      : "Camp Explorer's privacy policy and personal data protection information under Saudi PDPL.",
    alternates: pageAlternates(locale, "/privacy"),
  };
}

/* ─── Content ─────────────────────────────────────────────────────────────── */

const CONTACT_EMAIL = "info@campexplorersa.com";
const LAST_UPDATED = "5 May 2026";

type Lang = "en" | "ar";

interface Section {
  id: string;
  heading: string;
  body: string;
}

interface PolicyContent {
  dir: "ltr" | "rtl";
  kicker: string;
  title: string;
  lastUpdated: string;
  intro: string;
  tocLabel: string;
  sections: Section[];
  footerNote: string;
}

const policy: Record<Lang, PolicyContent> = {
  en: {
    dir: "ltr",
    kicker: "Legal",
    title: "Privacy Policy",
    lastUpdated: `Last updated: ${LAST_UPDATED}`,
    tocLabel: "In this policy",
    footerNote: `Questions about your data? Email us at ${CONTACT_EMAIL} — we will respond within 30 days.`,
    intro: `Camp Explorer ("we", "us") is committed to protecting your personal data in accordance with the Saudi Personal Data Protection Law (PDPL) and its implementing regulations. This policy explains what data we collect, why we collect it, how it is stored and protected, and your rights regarding that data.`,
    sections: [
      {
        id: "who-we-are",
        heading: "1. Who We Are",
        body: `Camp Explorer is an adventure and outdoor education provider based in the Kingdom of Saudi Arabia. We offer weekend camps and international expedition programmes for young people aged 13–18 and their families.\n\nFor all privacy-related enquiries, please contact us at: ${CONTACT_EMAIL}`,
      },
      {
        id: "data-we-collect",
        heading: "2. Data We Collect",
        body: `When you register your interest or apply for a programme we collect the following:\n\n• **Contact information** – name, email address, phone number\n• **Participant details** – date of birth, nationality, gender\n• **Guardian information** – name, contact details, and relationship (required for participants under 18)\n• **Health and medical information** – relevant medical conditions, dietary requirements, emergency contacts (collected only where necessary for your safety)\n• **Correspondence** – any messages you send us by email or through our registration forms\n\nWe do not collect financial payment data directly; any fees are handled through secure arrangements communicated to you separately.`,
      },
      {
        id: "how-we-use",
        heading: "3. How We Use Your Data",
        body: `We use your personal data solely for the purposes for which it was collected:\n\n• To assess your application and manage your registration\n• To communicate programme logistics, schedules, and requirements\n• To keep you safe during activities — sharing relevant health information only with our qualified trip leaders and first-aid personnel\n• To comply with our legal and regulatory obligations under Saudi law\n• To respond to your enquiries\n\nWe do not use your data for marketing purposes without your explicit consent, and we do not build profiles or engage in automated decision-making.`,
      },
      {
        id: "legal-basis",
        heading: "4. Legal Basis for Processing",
        body: `Under the PDPL, we process your personal data on the following lawful bases:\n\n• **Contract performance** – processing your registration and delivering our programmes\n• **Vital interests** – sharing health information with trip leaders to ensure participant safety\n• **Legal obligation** – complying with applicable Saudi regulations\n• **Consent** – where you have given explicit consent (e.g. photography or newsletter communications)`,
      },
      {
        id: "storage-retention",
        heading: "5. Storage & Retention",
        body: `Your data is collected through Visme (forms.visme.co), a secure online forms platform. Submitted data is stored in our secure records and is accessible only to authorised staff.\n\nWe retain personal data for the duration of your programme and for up to 3 years thereafter to address follow-up queries, legal claims, or compliance requirements. Health and medical information is retained only as long as needed for participant safety and is deleted once all obligations for a given programme are met.`,
      },
      {
        id: "third-parties",
        heading: "6. Sharing with Third Parties",
        body: `We share your personal data only in limited circumstances:\n\n• **Trip leaders and programme partners** – vetted personnel and local partners receive relevant health and contact information solely to deliver the programme safely\n• **Visme (forms.visme.co)** – our form platform, acting as a data processor under its own privacy policy\n• **Legal authorities** – only where required by law or to protect participant safety\n\nWe do not sell, rent, or transfer your personal data to any third party for commercial purposes.`,
      },
      {
        id: "children",
        heading: "7. Children's Data",
        body: `Our programmes are designed for participants aged 13–18. Registration of anyone under 18 requires the consent of a parent or legal guardian. We treat all participant data with heightened care and ensure that health and personal information for minors is accessible only to authorised trip staff.\n\nIf you believe we have inadvertently collected data about a child without appropriate parental consent, please contact us immediately at ${CONTACT_EMAIL} and we will take prompt corrective action.`,
      },
      {
        id: "your-rights",
        heading: "8. Your Rights",
        body: `Under the PDPL you have the following rights regarding your personal data:\n\n• **Right of access** – to request a copy of the data we hold about you\n• **Right of correction** – to request correction of inaccurate or incomplete data\n• **Right of erasure** – to request deletion of your data (subject to legal retention requirements)\n• **Right to object** – to object to processing in certain circumstances\n• **Right to withdraw consent** – where processing is based on consent, you may withdraw it at any time\n\nTo exercise any of these rights, contact us at ${CONTACT_EMAIL}. We will respond within 30 days.`,
      },
      {
        id: "cookies",
        heading: "9. Cookies",
        body: `Our website uses only essential functional cookies necessary for navigation and language preferences. We do not use advertising or third-party tracking cookies. You can manage cookie settings through your browser preferences.`,
      },
      {
        id: "changes",
        heading: "10. Changes to This Policy",
        body: `We may update this Privacy Policy from time to time. Any material changes will be communicated via our website or by email if we hold your contact details. The "last updated" date at the top of this page reflects the most recent revision.`,
      },
    ],
  },

  ar: {
    dir: "rtl",
    kicker: "قانوني",
    title: "سياسة الخصوصية",
    lastUpdated: `آخر تحديث: ${LAST_UPDATED}`,
    tocLabel: "محتوى السياسة",
    footerNote: `لديك استفسار حول بياناتك؟ راسلنا على ${CONTACT_EMAIL} — سنرد خلال 30 يومًا.`,
    intro: `تلتزم كامب إكسبلورر ("نحن") بحماية بياناتك الشخصية وفقًا لنظام حماية البيانات الشخصية (PDPL) في المملكة العربية السعودية ولوائحه التنفيذية. توضح هذه السياسة البيانات التي نجمعها، وأسباب جمعها، وكيفية تخزينها وحمايتها، وحقوقك فيما يتعلق بتلك البيانات.`,
    sections: [
      {
        id: "who-we-are",
        heading: "١. من نحن",
        body: `كامب إكسبلورر شركة متخصصة في تجارب المغامرة والتعليم في الهواء الطلق، مقرّها المملكة العربية السعودية. نُقدّم مخيمات نهاية الأسبوع ورحلات استكشافية دولية للشباب (13–18 عامًا) وعائلاتهم.\n\nللاستفسارات المتعلقة بالخصوصية: ${CONTACT_EMAIL}`,
      },
      {
        id: "data-we-collect",
        heading: "٢. البيانات التي نجمعها",
        body: `عند تسجيل اهتمامك أو تقديم طلب الالتحاق ببرنامج نجمع ما يلي:\n\n• **معلومات التواصل** – الاسم، البريد الإلكتروني، رقم الهاتف\n• **بيانات المشترك** – تاريخ الميلاد، الجنسية، الجنس\n• **بيانات ولي الأمر** – الاسم وبيانات التواصل والصلة (مطلوبة للمشتركين دون 18 عامًا)\n• **المعلومات الصحية والطبية** – الحالات الطبية، المتطلبات الغذائية، جهة الاتصال في الطوارئ (لأغراض السلامة فحسب)\n• **المراسلات** – الرسائل المُرسَلة عبر البريد الإلكتروني أو نماذج التسجيل\n\nلا نجمع بيانات الدفع المالي مباشرةً؛ إذ تُعالَج الرسوم عبر ترتيبات آمنة منفصلة.`,
      },
      {
        id: "how-we-use",
        heading: "٣. كيف نستخدم بياناتك",
        body: `نستخدم بياناتك الشخصية حصرًا للأغراض التي جُمعت من أجلها:\n\n• معالجة طلبك وإدارة تسجيلك\n• التواصل بشأن تفاصيل البرنامج وجداوله ومتطلباته\n• ضمان سلامتك خلال الأنشطة — بمشاركة المعلومات الصحية الضرورية مع قادة الرحلات المؤهلين وفريق الإسعاف فقط\n• الامتثال لالتزاماتنا القانونية والتنظيمية\n• الرد على استفساراتك\n\nلا نستخدم بياناتك للتسويق دون موافقتك الصريحة.`,
      },
      {
        id: "legal-basis",
        heading: "٤. الأساس القانوني للمعالجة",
        body: `نعالج بياناتك الشخصية استنادًا إلى:\n\n• **تنفيذ العقد** – معالجة تسجيلك وتقديم البرامج\n• **المصالح الحيوية** – مشاركة المعلومات الصحية لضمان سلامة المشتركين\n• **الالتزام القانوني** – الامتثال للأنظمة السعودية المعمول بها\n• **الموافقة** – حيثما أعطيت موافقتك الصريحة (مثل التصوير أو النشرات البريدية)`,
      },
      {
        id: "storage-retention",
        heading: "٥. التخزين والاحتفاظ",
        body: `تُجمَع بياناتك عبر Visme (forms.visme.co)، وهي منصة نماذج إلكترونية آمنة. تُخزَّن البيانات في سجلاتنا الآمنة ولا يطّلع عليها سوى الموظفين المخوَّلين.\n\nنحتفظ بالبيانات الشخصية طوال مدة البرنامج وحتى 3 سنوات بعده للتعامل مع الاستفسارات أو المطالبات القانونية. تُحذف المعلومات الصحية فور انتهاء البرنامج والوفاء بجميع التزامات السلامة.`,
      },
      {
        id: "third-parties",
        heading: "٦. المشاركة مع أطراف ثالثة",
        body: `نشارك بياناتك في الحالات المحدودة التالية فحسب:\n\n• **قادة الرحلات وشركاء البرنامج** – يحصل الأفراد المعتمدون والشركاء المحليون على المعلومات الصحية وبيانات التواصل حصرًا لتقديم البرنامج بأمان\n• **Visme (forms.visme.co)** – معالج نماذج الطلبات، يعمل وفق سياسة الخصوصية الخاصة به\n• **الجهات القانونية** – عند الاقتضاء وفق القانون أو لحماية سلامة المشتركين\n\nلا نبيع بياناتك الشخصية أو نؤجرها أو ننقلها لأي طرف ثالث لأغراض تجارية.`,
      },
      {
        id: "children",
        heading: "٧. بيانات الأطفال",
        body: `صُمِّمت برامجنا للمشتركين بين 13 و18 عامًا. يستلزم تسجيل من هم دون 18 موافقة أحد الوالدين أو الولي القانوني. نتعامل مع بيانات القاصرين بعناية فائقة ونضمن ألّا يطّلع عليها سوى طاقم الرحلات المخوَّل.\n\nإذا اعتقدت أننا جمعنا بيانات طفل دون موافقة مناسبة، يُرجى التواصل فورًا على ${CONTACT_EMAIL}.`,
      },
      {
        id: "your-rights",
        heading: "٨. حقوقك",
        body: `بموجب نظام حماية البيانات الشخصية، تتمتع بالحقوق التالية:\n\n• **حق الوصول** – طلب نسخة من البيانات التي نحتفظ بها عنك\n• **حق التصحيح** – طلب تصحيح بيانات غير دقيقة أو غير مكتملة\n• **حق الحذف** – طلب حذف بياناتك (مع مراعاة متطلبات الاحتفاظ القانونية)\n• **حق الاعتراض** – الاعتراض على المعالجة في حالات معينة\n• **سحب الموافقة** – في أي وقت حيثما كانت المعالجة مبنية على موافقتك\n\nلممارسة هذه الحقوق، تواصل معنا على ${CONTACT_EMAIL}. سنرد خلال 30 يومًا.`,
      },
      {
        id: "cookies",
        heading: "٩. ملفات تعريف الارتباط",
        body: `يستخدم موقعنا ملفات تعريف ارتباط وظيفية أساسية فقط، اللازمة للتصفح وإعدادات اللغة. لا نستخدم ملفات تعريف ارتباط إعلانية أو خاصة بأطراف ثالثة.`,
      },
      {
        id: "changes",
        heading: "١٠. التغييرات على هذه السياسة",
        body: `قد نُحدِّث هذه السياسة من حين لآخر. سيُبلَّغ بأي تغييرات جوهرية عبر الموقع أو البريد الإلكتروني. يعكس تاريخ "آخر تحديث" أعلى هذه الصفحة تاريخ آخر مراجعة.`,
      },
    ],
  },
};

/* ─── Helpers ─────────────────────────────────────────────────────────────── */

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-cream">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

function renderBody(body: string): React.ReactNode {
  const paragraphs = body.split("\n\n");
  return (
    <>
      {paragraphs.map((para, i) => {
        const lines = para.split("\n").filter(Boolean);
        const isList = lines.some((l) => l.startsWith("•"));

        if (isList) {
          return (
            <ul key={i} className="mt-4 space-y-2.5">
              {lines.map((line, j) => {
                const clean = line.startsWith("•")
                  ? line.slice(1).trim()
                  : line;
                return (
                  <li key={j} className="flex items-start gap-3">
                    <span
                      className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-gold"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-cream/70">
                      {renderInline(clean)}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={i} className="mt-4 text-sm leading-relaxed text-cream/70">
            {lines.map((line, j) => (
              <React.Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lang = locale === "ar" ? "ar" : "en";
  const c = policy[lang];

  return (
    <main className="bg-navy-deep min-h-screen" dir={c.dir}>
      {/* ── Hero ── */}
      <div className="bg-navy py-20 sm:py-28">
        <div className="container-page">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
            {c.kicker}
          </p>
          <h1 className="font-display text-4xl font-black text-cream sm:text-5xl">
            {c.title}
          </h1>
          <p className="mt-3 text-sm text-cream/40">{c.lastUpdated}</p>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-cream/70">
            {c.intro}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container-page py-16 sm:py-24">
        <div className="max-w-prose">
          {/* Table of contents */}
          <nav
            aria-label={c.tocLabel}
            className="mb-14 rounded-sm border border-gold/10 px-6 py-5"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
              {c.tocLabel}
            </p>
            <ol className="space-y-1.5">
              {c.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm text-cream/50 transition-colors hover:text-cream"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Sections */}
          {c.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="border-t border-gold/10 py-10 first:border-t-0 first:pt-0"
            >
              <h2 className="font-display text-lg font-bold text-cream">
                {section.heading}
              </h2>
              {renderBody(section.body)}
            </section>
          ))}

          {/* Footer note */}
          <div className="mt-10 border-t border-gold/10 pt-10">
            <p className="text-sm text-cream/50">
              {c.footerNote.split(CONTACT_EMAIL).map((part, i) =>
                i === 0 ? (
                  part
                ) : (
                  <React.Fragment key={i}>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="text-gold underline-offset-4 hover:underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    {part}
                  </React.Fragment>
                )
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
