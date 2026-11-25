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

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "latin-ext"], variable: "--font-manrope", display: "swap", weight: ["400", "500", "600", "700"] });
const newsreader = Newsreader({ subsets: ["latin", "latin-ext"], variable: "--font-newsreader", display: "swap", style: ["normal", "italic"], weight: ["300", "400"] });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0a1929",
  width: "device-width",
  initialScale: 1,
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
