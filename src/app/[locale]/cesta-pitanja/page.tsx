import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import { Accordion } from "@/components/interactive/Accordion";
import { FinalCta } from "@/components/sections/HomeSections";
import { faqs } from "@/content/faq";
import { pick } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/cesta-pitanja">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/cesta-pitanja", title: t("faqTitle"), description: t("faqMeta") });
}

export default async function FaqPage({ params }: PageProps<"/[locale]/cesta-pitanja">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: pick(f.q, locale), acceptedAnswer: { "@type": "Answer", text: pick(f.a, locale) } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero locale={locale as Locale} title={t("faqTitle")} intro={t("faqIntro")} crumbs={[{ label: t("faqTitle") }]} />
      <section className="section-y bg-paper" aria-label={t("faqTitle")}>
        <div className="container-x max-w-5xl">
          <Accordion items={faqs.map((f) => ({ id: f.id, q: pick(f.q, locale), a: pick(f.a, locale) }))} />
          <p className="mt-10 text-sm text-muted">{tc("reviewNote")}</p>
        </div>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
