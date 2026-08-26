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
    title: isAr ? "الشروط والأحكام" : "Terms & Conditions",
    description: isAr
      ? "الشروط والأحكام الخاصة ببرامج كامب إكسبلورر والتسجيل والمشاركة."
      : "Camp Explorer's terms and conditions covering programme registration, participation, and conduct.",
    alternates: pageAlternates(locale, "/terms"),
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

interface TermsContent {
  dir: "ltr" | "rtl";
  kicker: string;
  title: string;
  lastUpdated: string;
  intro: string;
  tocLabel: string;
  sections: Section[];
  footerNote: string;
}

const terms: Record<Lang, TermsContent> = {
  en: {
    dir: "ltr",
    kicker: "Legal",
    title: "Terms & Conditions",
    lastUpdated: `Last updated: ${LAST_UPDATED}`,
    tocLabel: "In this document",
    footerNote: `Questions about these terms? Contact us at ${CONTACT_EMAIL} before booking.`,
    intro: `These Terms & Conditions govern your participation in Camp Explorer programmes. By registering for or attending any programme, you (and, where applicable, the parent or guardian of a minor participant) agree to these terms. Please read them carefully before submitting a registration.`,
    sections: [
      {
        id: "about",
        heading: "1. About Camp Explorer",
        body: `Camp Explorer is an adventure and outdoor education provider based in the Kingdom of Saudi Arabia. We offer local weekend camps and international expedition programmes designed to build leadership, resilience, and environmental awareness in young people aged 13–18.\n\nOur programmes include guided wilderness expeditions, wildlife conservation experiences, and community engagement projects led by qualified instructors and trip leaders.`,
      },
      {
        id: "eligibility",
        heading: "2. Eligibility",
        body: `To participate in a Camp Explorer programme:\n\n• Participants must be between **13 and 18 years of age** at the time of the programme (some programmes may specify a narrower age range)\n• Participants must be in good general health and physically able to engage in outdoor activities\n• Participants under 18 must have written consent from a parent or legal guardian\n• School groups must have a nominated responsible adult from the school present throughout the programme\n\nCamp Explorer reserves the right to decline or remove any participant whose conduct or health condition is deemed unsuitable for the safety and enjoyment of the group.`,
      },
      {
        id: "registration",
        heading: "3. Registration and Application",
        body: `Registration is completed via our online form. Submitting a registration form constitutes an expression of interest and does not guarantee a place on a programme.\n\nA place is confirmed only upon:\n\n• Receipt of a completed registration form with all required information\n• Payment of any applicable deposit or programme fee (communicated separately)\n• Written confirmation from Camp Explorer\n\nCamp Explorer reserves the right to accept or decline any application at its discretion.`,
      },
      {
        id: "health",
        heading: "4. Health and Fitness",
        body: `Participants or their guardians must disclose all relevant medical conditions, allergies, dietary requirements, and medications on the registration form. Failure to disclose material health information may result in exclusion from the programme without refund.\n\nCamp Explorer strongly recommends that all participants undergo a general health check before joining an international expedition. Participants should ensure they:\n\n• Are physically fit for the activities described in the programme itinerary\n• Have any required vaccinations for the destination country\n• Carry an adequate supply of any prescription medication\n\nCamp Explorer staff are trained in first aid and will carry appropriate emergency equipment on all programmes.`,
      },
      {
        id: "parental-consent",
        heading: "5. Parental Consent",
        body: `For participants under 18, a parent or legal guardian must:\n\n• Complete and sign the parental consent section of the registration form\n• Acknowledge the nature of the activities, including any associated risks\n• Provide emergency contact information and medical authorisation for first aid treatment\n• Confirm that the participant meets the health and fitness requirements\n\nRegistrations for minors will not be processed without completed parental consent.`,
      },
      {
        id: "conduct",
        heading: "6. Participant Responsibilities",
        body: `All participants are expected to:\n\n• Follow the instructions of Camp Explorer trip leaders and staff at all times\n• Treat fellow participants, staff, local communities, and wildlife with respect\n• Behave in a manner consistent with the principles of responsible adventure travel\n• Refrain from behaviour that endangers themselves or others\n• Comply with local laws and customs at all times\n\nCamp Explorer reserves the right to remove any participant from a programme for misconduct without refund. In such cases, the participant (or their guardian) is responsible for any additional costs incurred, including return travel arrangements.`,
      },
      {
        id: "photography",
        heading: "7. Photography and Media",
        body: `Camp Explorer and its partners may photograph or film programme activities for use in marketing materials, social media, and educational content. By registering, participants (and guardians, for minors) consent to the use of photographs and footage in which they may appear, unless they notify us in writing prior to the programme start.\n\nParticipants may photograph and film programme activities for personal use. Distribution of images or footage that identifies other participants without their consent is not permitted.`,
      },
      {
        id: "liability",
        heading: "8. Liability",
        body: `Outdoor adventure activities involve inherent risks. Camp Explorer takes all reasonable precautions to minimise risk through qualified leadership, appropriate equipment, and thorough planning. However, participants and guardians acknowledge that certain risks cannot be eliminated.\n\nCamp Explorer accepts liability for loss or injury caused directly by our negligence. We do not accept liability for:\n\n• Loss or damage to personal property\n• Injuries resulting from a participant's failure to follow instructions\n• Circumstances beyond our reasonable control, including severe weather, natural disasters, or government travel restrictions\n• Medical conditions not disclosed at the time of registration\n\nParticipants or guardians are advised to arrange appropriate personal travel insurance before joining any programme, particularly international expeditions.`,
      },
      {
        id: "cancellation",
        heading: "9. Cancellation and Changes",
        body: `**Cancellation by participant:**\n\n• More than 60 days before programme start: full refund less a non-refundable processing fee\n• 30–60 days before programme start: 50% refund\n• Fewer than 30 days before programme start: no refund\n\nCancellations must be made in writing to ${CONTACT_EMAIL}.\n\n**Cancellation or changes by Camp Explorer:**\n\nCamp Explorer reserves the right to cancel or modify a programme due to insufficient enrolment, safety concerns, weather conditions, or circumstances beyond our control. In the event of cancellation by us, participants will receive a full refund of fees paid. We are not liable for any additional costs incurred by participants (e.g. flights booked independently).`,
      },
      {
        id: "governing-law",
        heading: "10. Governing Law",
        body: `These Terms & Conditions are governed by the laws of the Kingdom of Saudi Arabia. Any disputes arising from participation in our programmes shall be subject to the exclusive jurisdiction of the courts of the Kingdom of Saudi Arabia.\n\nThese terms are provided in both English and Arabic. In the event of any inconsistency between the two versions, the English version shall prevail.`,
      },
      {
        id: "changes",
        heading: "11. Changes to These Terms",
        body: `Camp Explorer reserves the right to update these Terms & Conditions at any time. Updated terms will be published on our website. Continued participation in our programmes following a material update constitutes acceptance of the revised terms.`,
      },
    ],
  },

  ar: {
    dir: "rtl",
    kicker: "قانوني",
    title: "الشروط والأحكام",
    lastUpdated: `آخر تحديث: ${LAST_UPDATED}`,
    tocLabel: "محتوى الوثيقة",
    footerNote: `أسئلة حول هذه الشروط؟ تواصل معنا على ${CONTACT_EMAIL} قبل الحجز.`,
    intro: `تنظّم هذه الشروط والأحكام مشاركتك في برامج كامب إكسبلورر. بتسجيلك في أي برنامج أو حضوره، توافق أنت (وولي الأمر إذا كان المشترك قاصرًا) على هذه الشروط. يُرجى قراءتها بعناية قبل إرسال طلب التسجيل.`,
    sections: [
      {
        id: "about",
        heading: "١. عن كامب إكسبلورر",
        body: `كامب إكسبلورر شركة متخصصة في تجارب المغامرة والتعليم في الهواء الطلق، مقرّها المملكة العربية السعودية. نُقدّم مخيمات نهاية الأسبوع المحلية ورحلات استكشافية دولية مُصمَّمة لتنمية القيادة والمرونة والوعي البيئي لدى الشباب (13–18 عامًا).\n\nتشمل برامجنا رحلات استكشافية في البرية مع مرشدين متخصصين، وتجارب حماية الحياة البرية، ومشاريع انخراط مجتمعي.`,
      },
      {
        id: "eligibility",
        heading: "٢. شروط المشاركة",
        body: `للمشاركة في برامج كامب إكسبلورر:\n\n• يجب أن يكون عمر المشترك بين **13 و18 عامًا** وقت انعقاد البرنامج (قد تُحدّد بعض البرامج نطاقًا عمريًا أضيق)\n• يجب أن يتمتع المشترك بصحة جيدة وأن يكون قادرًا جسديًا على ممارسة الأنشطة الخارجية\n• يستلزم تسجيل القاصرين الحصول على موافقة خطية من أحد الوالدين أو الولي القانوني\n• يُشترط أن تُرافق المجموعات المدرسية بالغٌ مسؤول من المدرسة طوال البرنامج\n\nتحتفظ كامب إكسبلورر بحق رفض أي مشترك أو إزالته إذا رُئي أن سلوكه أو حالته الصحية تشكّل خطرًا على المجموعة.`,
      },
      {
        id: "registration",
        heading: "٣. التسجيل والطلب",
        body: `يُتمّ التسجيل عبر النموذج الإلكتروني المتاح على موقعنا. يُعبّر تقديم نموذج التسجيل عن الاهتمام بالمشاركة وليس ضمانًا للحصول على مقعد.\n\nلا يُؤكَّد المقعد إلا بعد:\n\n• استلام نموذج التسجيل المكتمل بجميع المعلومات المطلوبة\n• سداد أي مبلغ مقدّم أو رسوم برنامج (يُبلَّغ بها بشكل منفصل)\n• إرسال تأكيد خطي من كامب إكسبلورر\n\nتحتفظ كامب إكسبلورر بحق قبول أي طلب أو رفضه وفق تقديرها.`,
      },
      {
        id: "health",
        heading: "٤. الصحة واللياقة البدنية",
        body: `يجب على المشتركين أو أولياء أمورهم الإفصاح عن جميع الحالات الطبية والحساسية والمتطلبات الغذائية والأدوية في نموذج التسجيل. قد يؤدي الإخفال بالإفصاح عن معلومات صحية جوهرية إلى الاستبعاد من البرنامج دون استرداد الرسوم.\n\nتُوصي كامب إكسبلورر بإجراء فحص صحي عام قبل الانضمام إلى أي رحلة دولية. ينبغي للمشتركين:\n\n• الإفصاح عن لياقتهم البدنية وفق ما تصفه الأنشطة في برنامج الرحلة\n• استيفاء أي تطعيمات مطلوبة لدولة الوجهة\n• اصطحاب جرعات كافية من أي دواء موصوف\n\nيتلقّى طاقم كامب إكسبلورر تدريبًا على الإسعافات الأولية ويحمل معدات طوارئ مناسبة في جميع البرامج.`,
      },
      {
        id: "parental-consent",
        heading: "٥. موافقة ولي الأمر",
        body: `للمشتركين دون 18 عامًا، يجب على أحد الوالدين أو الولي القانوني:\n\n• استكمال قسم الموافقة وتوقيعه في نموذج التسجيل\n• الإقرار بطبيعة الأنشطة بما تتضمنه من مخاطر\n• توفير بيانات الاتصال في الطوارئ والتفويض الطبي لتقديم الإسعافات الأولية\n• تأكيد امتثال المشترك لمتطلبات الصحة واللياقة\n\nلن تُعالَج تسجيلات القاصرين دون استكمال موافقة ولي الأمر.`,
      },
      {
        id: "conduct",
        heading: "٦. مسؤوليات المشترك",
        body: `يُتوقّع من جميع المشتركين:\n\n• الالتزام بتعليمات قادة وطاقم كامب إكسبلورر في جميع الأوقات\n• معاملة المشتركين الآخرين والطاقم والمجتمعات المحلية والحياة البرية باحترام\n• التصرف وفق مبادئ سياحة المغامرة المسؤولة\n• الامتناع عن أي سلوك يُعرّض أنفسهم أو الآخرين للخطر\n• الامتثال للقوانين والأعراف المحلية في جميع الأوقات\n\nتحتفظ كامب إكسبلورر بحق إبعاد أي مشترك بسبب سوء السلوك دون استرداد الرسوم، ويكون المشترك أو وليه مسؤولًا عن أي تكاليف إضافية تترتب على ذلك.`,
      },
      {
        id: "photography",
        heading: "٧. التصوير والإعلام",
        body: `قد تُصوَّر أنشطة البرامج أو تُفلَّم من قبل كامب إكسبلورر وشركائها لاستخدامها في المواد التسويقية ووسائل التواصل الاجتماعي والمحتوى التعليمي. بالتسجيل، يوافق المشتركون (وأولياؤهم للقاصرين) على استخدام الصور والمقاطع المصورة التي قد يظهرون فيها، ما لم يُبلّغونا كتابيًا قبل بدء البرنامج.\n\nيحق للمشتركين التصوير لأغراض شخصية. لا يُسمح بنشر صور أو مقاطع تُعرّف بمشتركين آخرين دون موافقتهم.`,
      },
      {
        id: "liability",
        heading: "٨. المسؤولية القانونية",
        body: `تنطوي أنشطة المغامرة في الهواء الطلق على مخاطر طبيعية. تتخذ كامب إكسبلورر جميع الاحتياطات المعقولة لتقليل المخاطر من خلال قيادة مؤهلة ومعدات ملائمة وتخطيط دقيق. غير أن المشتركين وأولياء الأمور يُقرّون بأن بعض المخاطر لا يمكن استبعادها كليًا.\n\nتتحمل كامب إكسبلورر المسؤولية عن الخسائر أو الإصابات الناجمة مباشرةً عن إهمالنا. ولا نتحمل المسؤولية عن:\n\n• فقدان الممتلكات الشخصية أو تلفها\n• الإصابات الناجمة عن عدم اتباع التعليمات\n• الظروف خارجة عن إرادتنا كالطقس الشديد أو الكوارث الطبيعية أو قيود السفر الحكومية\n• الحالات الطبية غير المُفصَح عنها وقت التسجيل\n\nيُنصح المشتركون وأولياؤهم بتأمين تأمين سفر شخصي مناسب قبل الانضمام إلى أي برنامج، لا سيما الرحلات الدولية.`,
      },
      {
        id: "cancellation",
        heading: "٩. الإلغاء والتغييرات",
        body: `**الإلغاء من قِبَل المشترك:**\n\n• أكثر من 60 يومًا قبل بدء البرنامج: استرداد كامل مع خصم رسوم معالجة غير قابلة للاسترداد\n• 30–60 يومًا قبل البدء: استرداد 50%\n• أقل من 30 يومًا قبل البدء: لا يُسترد أي مبلغ\n\nيجب إخطارنا بالإلغاء كتابيًا على ${CONTACT_EMAIL}.\n\n**الإلغاء أو التغيير من قِبَل كامب إكسبلورر:**\n\nتحتفظ كامب إكسبلورر بحق إلغاء البرنامج أو تعديله بسبب عدم اكتمال العدد أو اعتبارات السلامة أو الأحوال الجوية أو ظروف خارجة عن إرادتنا. في حالة الإلغاء من جانبنا، يُسترد للمشتركين كامل الرسوم المدفوعة، ولا نتحمل مسؤولية أي تكاليف إضافية تكبّدوها (كتذاكر الطيران المحجوزة بصورة مستقلة).`,
      },
      {
        id: "governing-law",
        heading: "١٠. القانون المعمول به",
        body: `تخضع هذه الشروط والأحكام لأنظمة المملكة العربية السعودية. تُحسم أي نزاعات ناشئة عن المشاركة في برامجنا أمام محاكم المملكة العربية السعودية المختصة حصريًا.\n\nتُقدَّم هذه الشروط باللغتين الإنجليزية والعربية. في حال وجود أي تعارض بين النسختين، تسود النسخة الإنجليزية.`,
      },
      {
        id: "changes",
        heading: "١١. التغييرات على هذه الشروط",
        body: `تحتفظ كامب إكسبلورر بحق تحديث هذه الشروط والأحكام في أي وقت. تُنشر الشروط المحدَّثة على موقعنا. يُعدّ الاستمرار في المشاركة في برامجنا بعد أي تحديث جوهري موافقةً على الشروط المُعدَّلة.`,
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

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lang = locale === "ar" ? "ar" : "en";
  const c = terms[lang];

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
