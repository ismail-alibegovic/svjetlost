import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SITE_URL } from "@/content/clinic";

type Href = Parameters<typeof getPathname>[0]["href"];

export function localizedUrl(locale: Locale, href: Href) {
  return SITE_URL + getPathname({ locale, href });
}

export function buildMetadata({
  locale,
  href,
  title,
  description,
  image = "/images/og/og-default.jpg",
  absoluteTitle = false,
}: {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  image?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = localizedUrl(locale, href);
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l === "bs" ? "bs-BA" : "en"] = localizedUrl(l, href);
  languages["x-default"] = localizedUrl(routing.defaultLocale, href);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Svjetlost Sarajevo",
      locale: locale === "bs" ? "bs_BA" : "en_GB",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    // Unofficial demo — never index until the clinic authorises production.
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}
