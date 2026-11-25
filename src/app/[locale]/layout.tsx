import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Newsreader } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBookBar } from "@/components/layout/MobileBookBar";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { A11yPanel } from "@/components/accessibility/A11yPanel";
import { CookieNotice } from "@/components/accessibility/CookieNotice";
import { SITE_URL } from "@/content/clinic";

// `optional`: on slow first visits keep the size-adjusted fallback rather than re-painting late (protects LCP/CLS).
const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "optional" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "optional", weight: ["600", "700"] });
const newsreader = Newsreader({ subsets: ["latin", "latin-ext"], variable: "--font-newsreader", display: "optional", style: ["normal", "italic"], weight: ["300"], preload: false });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  // The top of every page is the dark header/hero in both OS schemes, so the bar matches it in both.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1929" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1929" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // paint under notch/home indicator; content is padded back with env(safe-area-inset-*)
  interactiveWidget: "resizes-content", // Android keyboard shrinks the layout viewport like iOS (booking form)
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("homeTitle"), template: t("titleTemplate") },
    description: t("homeDescription"),
    applicationName: "Svjetlost Sarajevo",
    robots: { index: false, follow: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale === "bs" ? "bs" : "en"} className={`${inter.variable} ${manrope.variable} ${newsreader.variable}`}>
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <BookingProvider>
            <a
              href="#main"
              className="fixed left-3 top-3 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 font-semibold text-white transition focus:translate-y-0"
            >
              {t("skip")}
            </a>
            <Header />
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
            <MobileBookBar />
            <A11yPanel />
            <CookieNotice />
          </BookingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
