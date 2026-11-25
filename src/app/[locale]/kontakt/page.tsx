import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import { Mail, Phone, Globe } from "lucide-react";
import { BookButton } from "@/components/booking/BookButton";
import { LocationSelector } from "@/components/interactive/LocationSelector";
import { FaqSection } from "@/components/sections/HomeSections";
import { clinic } from "@/content/clinic";

export async function generateMetadata({ params }: PageProps<"/[locale]/kontakt">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/kontakt", title: t("contactTitle"), description: t("contactMeta") });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/kontakt">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const cards = [
    { Icon: Phone, k: "Ilidža", v: clinic.primaryPhone, href: clinic.primaryPhoneHref },
    { Icon: Phone, k: locale === "bs" ? "Centar" : "Centre", v: clinic.secondaryPhone, href: clinic.secondaryPhoneHref },
    { Icon: Mail, k: t("callCentre"), v: clinic.callCentreEmail, href: `mailto:${clinic.callCentreEmail}` },
    { Icon: Globe, k: tc("foreignPatients"), v: clinic.internationalPhone, href: clinic.internationalPhoneHref },
  ];
  return (
    <>
      <PageHero locale={locale as Locale} title={t("contactTitle")} intro={t("contactIntro")} crumbs={[{ label: t("contactTitle") }]} />
      <section className="bg-paper pt-[var(--section-space)]" aria-label={t("contactTitle")}>
        <div className="container-x grid gap-6 lg:grid-cols-12">
          <div className="rounded-[var(--radius-card)] bg-brand p-8 text-white lg:col-span-4">
            <h2 className="font-display text-2xl font-semibold">{t("contactBook")}</h2>
            <p className="mt-3 text-white/85">{t("contactBookText")}</p>
            <BookButton variant="light" className="mt-8">{tc("book")}</BookButton>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-line ring-1 ring-line sm:grid-cols-2 lg:col-span-8">
            {cards.map((c) => (
              <li key={c.v} className="bg-paper p-7">
                <c.Icon className="size-5 text-brand" aria-hidden />
                <p className="mt-4 text-sm text-muted">{c.k}</p>
                <a href={c.href} className="link-underline mt-1 inline-block break-all font-display text-xl font-semibold text-ink">{c.v}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-x py-[var(--section-space)]"><LocationSelector /></div>
      </section>
      <FaqSection locale={locale} limit={4} />
    </>
  );
}
