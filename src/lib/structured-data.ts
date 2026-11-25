import type { Locale } from "@/i18n/routing";
import { clinic, locations, SITE_URL } from "@/content/clinic";
import { services } from "@/content/services";
import { localizedUrl } from "./seo";

/** MedicalClinic / LocalBusiness data built only from verified facts (svjetlost.ba). */
export function clinicJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": locations.map((l) => ({
      "@type": ["MedicalClinic", "LocalBusiness"],
      "@id": `${SITE_URL}/#${l.slug}`,
      name: l.legalName,
      url: localizedUrl(locale, "/"),
      logo: `${SITE_URL}/images/svjetlost-logo.svg`,
      image: `${SITE_URL}/images/og/og-default.jpg`,
      telephone: l.phone,
      faxNumber: l.fax,
      email: l.email,
      availableService: services.map((s) => ({ "@type": "MedicalProcedure", name: s.title[locale] })),
      address: {
        "@type": "PostalAddress",
        streetAddress: l.street,
        postalCode: l.postal,
        addressLocality: l.city,
        addressCountry: "BA",
      },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "08:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "18:00" },
      ],
      parentOrganization: { "@type": "MedicalOrganization", name: "Klinika Svjetlost", foundingDate: String(clinic.founded.group) },
      sameAs: clinic.social.map((s) => s.url),
    })),
  };
}
