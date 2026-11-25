import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/content/services";
import { doctors } from "@/content/doctors";
import { articles } from "@/content/articles";
import { localizedUrl } from "@/lib/seo";

type Href = Parameters<typeof localizedUrl>[1];

export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs: Href[] = [
    "/", "/usluge", "/doktori", "/tehnologija", "/o-klinici", "/iskustva-pacijenata", "/lokacije", "/kontakt", "/cesta-pitanja", "/novosti", "/privatnost",
    ...services.map((s) => ({ pathname: "/usluge/[slug]" as const, params: { slug: s.slug } })),
    ...doctors.map((d) => ({ pathname: "/doktori/[slug]" as const, params: { slug: d.slug } })),
    ...articles.map((a) => ({ pathname: "/novosti/[slug]" as const, params: { slug: a.slug } })),
  ];
  return hrefs.map((href) => ({
    url: localizedUrl(routing.defaultLocale, href),
    alternates: { languages: Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, href)])) },
  }));
}
