import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { DoctorDirectory } from "@/components/doctors/DoctorDirectory";
import { FinalCta } from "@/components/sections/HomeSections";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/doktori">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/doktori", title: t("doctorsTitle"), description: t("doctorsMeta") });
}

export default async function DoctorsPage({ params }: PageProps<"/[locale]/doktori">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const td = await getTranslations({ locale, namespace: "doctorsSection" });
  return (
    <>
      <PageHero locale={locale as Locale} eyebrow={td("eyebrow")} title={td("title")} intro={t("doctorsIntro")} crumbs={[{ label: t("doctorsTitle") }]} />
      <section aria-label={td("directory")} className="section-y bg-paper">
        <div className="container-x">
          <h2 className="sr-only">{td("directory")}</h2>
          <DoctorDirectory />
        </div>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
