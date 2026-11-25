import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceExplorer } from "@/components/interactive/ServiceExplorer";
import { FaqSection, FinalCta } from "@/components/sections/HomeSections";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/usluge">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/usluge", title: t("servicesTitle"), description: t("servicesMeta") });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/usluge">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const te = await getTranslations({ locale, namespace: "explorer" });
  return (
    <>
      <PageHero locale={locale as Locale} eyebrow={te("eyebrow")} title={te("title")} intro={t("servicesIntro")} crumbs={[{ label: t("servicesTitle") }]} />
      <section className="section-y bg-paper" aria-label={t("servicesTitle")}>
        <div className="container-x">
          <ServiceExplorer showAllLink={false} />
        </div>
      </section>
      <FaqSection locale={locale} limit={4} />
      <FinalCta locale={locale} />
    </>
  );
}
