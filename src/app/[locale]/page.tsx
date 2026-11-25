import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import {
  AnatomySection,
  DoctorsSection,
  FaqSection,
  FinalCta,
  JourneySection,
  LocationsSection,
  ServicesSection,
  SimulatorSection,
  StoriesSection,
  TechnologySection,
} from "@/components/sections/HomeSections";
import { buildMetadata } from "@/lib/seo";
import { clinicJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata({ locale: locale as Locale, href: "/", title: t("homeTitle"), description: t("homeDescription"), absoluteTitle: true });
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicJsonLd(locale as Locale)) }} />
      <Hero locale={locale} />
      <TrustBar locale={locale} />
      <ServicesSection locale={locale} />
      <SimulatorSection locale={locale} />
      <TechnologySection locale={locale} />
      <DoctorsSection locale={locale} />
      <AnatomySection locale={locale} />
      <JourneySection locale={locale} />
      <StoriesSection locale={locale} />
      <LocationsSection locale={locale} />
      <FaqSection locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
