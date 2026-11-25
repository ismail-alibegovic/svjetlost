import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { clinic, locations } from "@/content/clinic";
import { services } from "@/content/services";
import { pick } from "@/lib/utils";
import { CookieSettingsButton } from "@/components/accessibility/CookieNotice";

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");
  const year = new Date().getFullYear();

  const nav = [
    { href: "/" as const, label: tn("home") },
    { href: "/usluge" as const, label: tn("services") },
    { href: "/doktori" as const, label: tn("doctors") },
    { href: "/tehnologija" as const, label: tn("technology") },
    { href: "/o-klinici" as const, label: tn("about") },
    { href: "/iskustva-pacijenata" as const, label: tn("stories") },
    { href: "/lokacije" as const, label: tn("locations") },
    { href: "/novosti" as const, label: tn("news") },
    { href: "/cesta-pitanja" as const, label: tn("faq") },
    { href: "/kontakt" as const, label: tn("contact") },
  ];

  return (
    <footer className="bg-ink text-white" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Footer</h2>
      <div className="container-x grid gap-14 py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="white" className="h-10" />
          <p className="on-dark-muted mt-6 max-w-sm leading-relaxed text-white/65">{t("about")}</p>
          <p className="mt-8 eyebrow text-white/50">{t("follow")}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {clinic.social.map((s) => (
              <li key={s.name}>
                <a href={s.url} rel="noopener noreferrer" target="_blank" className="inline-flex min-h-10 items-center rounded-full px-4 text-sm ring-1 ring-inset ring-white/20 transition hover:bg-white/10">
                  {s.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label={t("navigation")} className="lg:col-span-2">
          <p className="eyebrow text-white/50">{t("navigation")}</p>
          <ul className="mt-5 grid gap-2.5 text-white/80">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="link-underline hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t("services")} className="lg:col-span-3">
          <p className="eyebrow text-white/50">{t("services")}</p>
          <ul className="mt-5 grid gap-2.5 text-white/80">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={{ pathname: "/usluge/[slug]", params: { slug: s.slug } }} className="link-underline hover:text-white">
                  {pick(s.title, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow text-white/50">{t("locations")}</p>
          <ul className="mt-5 grid gap-6">
            {locations.map((l) => (
              <li key={l.slug}>
                <address className="not-italic leading-relaxed text-white/80">
                  <span className="block font-semibold text-white">{pick(l.name, locale)}</span>
                  {l.street}, {l.postal} {l.city}
                  <br />
                  <a href={`tel:${l.phone.replace(/\s/g, "")}`} className="link-underline hover:text-white">{l.phone}</a>
                  <br />
                  <a href={`mailto:${l.email}`} className="link-underline break-all hover:text-white">{l.email}</a>
                </address>
              </li>
            ))}
            <li className="text-sm text-white/65">
              {tc("foreignPatients")}:{" "}
              <a href={clinic.internationalPhoneHref} className="link-underline text-white/85 hover:text-white">{clinic.internationalPhone}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-6 py-8 text-sm text-white/55 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-2">
            <p className="font-medium text-white/80">{t("demo")}</p>
            <p>
              © {year} {clinic.legalName}. {t("rights")} {t("photoCredits")}
            </p>
          </div>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li><Link href="/privatnost" className="link-underline hover:text-white">{tn("privacy")}</Link></li>
            <li><CookieSettingsButton label={t("cookies")} /></li>
            <li><a href={clinic.officialSite} className="link-underline hover:text-white" rel="noopener">{t("official")}</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
