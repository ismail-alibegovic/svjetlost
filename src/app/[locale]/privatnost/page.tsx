import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/privatnost">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/privatnost", title: t("privacyTitle"), description: t("privacyMeta") });
}

const CONTENT = {
  bs: [
    ["Status ove stranice", "Ovo je nezvanični koncept redizajna stranice Specijalne bolnice za oftalmologiju Svjetlost Sarajevo, izrađen kao prijedlog. Stranica nije povezana sa sistemima klinike."],
    ["Obrazac za zahtjev za pregled", "Obrazac je demonstracijski. Uneseni podaci provjeravaju se, ali se ne šalju klinici, ne pohranjuju se i ne evidentiraju u logovima. Obrazac traži samo osnovne kontakt podatke i ne prikuplja zdravstvene podatke."],
    ["Lokalna pohrana", "Vaše postavke pristupačnosti i izbor kolačića čuvaju se samo u lokalnoj pohrani vašeg preglednika. Ne koristimo analitiku, reklamne kolačiće niti alate za praćenje."],
    ["Vanjski sadržaj", "Google Maps učitava se tek kada to izričito zatražite. Linkovi prema Google Maps i društvenim mrežama otvaraju vanjske servise s vlastitim pravilima privatnosti."],
    ["Prije produkcije", "Prije stvarne upotrebe potrebna je službena politika privatnosti klinike usklađena s važećim propisima o zaštiti ličnih podataka u BiH, odobren backend za zahtjeve, ugovori o obradi podataka i zaštitne mjere za zdravstvene informacije."],
  ],
  en: [
    ["Status of this website", "This is an unofficial redesign concept for the Svjetlost Special Hospital for Ophthalmology, Sarajevo, prepared as a proposal. It is not connected to the clinic’s systems."],
    ["Appointment request form", "The form is a demonstration. Entered data is validated but is not sent to the clinic, stored or written to logs. It asks only for basic contact details and collects no health data."],
    ["Local storage", "Your accessibility settings and cookie choice are kept only in your browser’s local storage. We use no analytics, advertising cookies or tracking tools."],
    ["External content", "Google Maps loads only when you explicitly request it. Links to Google Maps and social networks open external services with their own privacy policies."],
    ["Before production", "Live use requires the clinic’s official privacy policy compliant with applicable data-protection law in Bosnia and Herzegovina, an approved backend for requests, data-processing agreements and safeguards for health information."],
  ],
};

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privatnost">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  return (
    <>
      <PageHero locale={locale as Locale} title={t("privacyTitle")} crumbs={[{ label: t("privacyTitle") }]} />
      <section className="section-y bg-paper">
        <div className="container-x max-w-3xl">
          {CONTENT[locale === "en" ? "en" : "bs"].map(([h, p]) => (
            <div key={h} className="border-t border-line py-8">
              <h2 className="font-display text-2xl font-semibold text-ink">{h}</h2>
              <p className="mt-3 text-lg leading-relaxed text-muted">{p}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
