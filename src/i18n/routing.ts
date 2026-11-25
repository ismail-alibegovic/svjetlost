import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["bs", "en"],
  defaultLocale: "bs",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/usluge": { bs: "/usluge", en: "/services" },
    "/usluge/[slug]": { bs: "/usluge/[slug]", en: "/services/[slug]" },
    "/doktori": { bs: "/doktori", en: "/doctors" },
    "/doktori/[slug]": { bs: "/doktori/[slug]", en: "/doctors/[slug]" },
    "/tehnologija": { bs: "/tehnologija", en: "/technology" },
    "/o-klinici": { bs: "/o-klinici", en: "/about" },
    "/iskustva-pacijenata": { bs: "/iskustva-pacijenata", en: "/patient-stories" },
    "/lokacije": { bs: "/lokacije", en: "/locations" },
    "/kontakt": { bs: "/kontakt", en: "/contact" },
    "/cesta-pitanja": { bs: "/cesta-pitanja", en: "/faq" },
    "/novosti": { bs: "/novosti", en: "/news" },
    "/novosti/[slug]": { bs: "/novosti/[slug]", en: "/news/[slug]" },
    "/privatnost": { bs: "/privatnost", en: "/privacy" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
