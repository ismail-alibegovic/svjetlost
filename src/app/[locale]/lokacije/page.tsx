import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import { LocationSelector } from "@/components/interactive/LocationSelector";
import { FinalCta } from "@/components/sections/HomeSections";

export async function generateMetadata({ params }: PageProps<"/[locale]/lokacije">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/lokacije", title: t("locationsTitle"), description: t("locationsMeta") });
}

export default async function LocationsPage({ params }: PageProps<"/[locale]/lokacije">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "locationsSection" });
  const tp = await getTranslations({ locale, namespace: "pages" });
  return (
    <>
      <PageHero locale={locale as Locale} eyebrow={t("eyebrow")} title={t("title")} intro={tp("locationsIntro")} crumbs={[{ label: tp("locationsTitle") }]} />
      <section className="section-y bg-paper" aria-label={tp("locationsTitle")}>
        <div className="container-x"><LocationSelector /></div>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
