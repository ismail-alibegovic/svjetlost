import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BookButton } from "@/components/booking/BookButton";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { doctors, getDoctor, doctorDisplayName, doctorFocusLabels } from "@/content/doctors";
import { services } from "@/content/services";
import { buildMetadata, localizedUrl } from "@/lib/seo";
import { pick } from "@/lib/utils";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/doktori/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const d = getDoctor(slug);
  if (!d) return {};
  return buildMetadata({
    locale: locale as Locale,
    href: { pathname: "/doktori/[slug]", params: { slug } },
    title: doctorDisplayName(d),
    description: `${pick(d.title, locale)}. ${pick(d.summary, locale)}`,
    image: d.image.src,
  });
}

export default async function DoctorPage({ params }: PageProps<"/[locale]/doktori/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const d = getDoctor(slug);
  if (!d) notFound();
  const t = await getTranslations({ locale, namespace: "doctorsSection" });
  const tp = await getTranslations({ locale, namespace: "pages" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const related = services.filter((s) => s.doctors.includes(d.slug));
  const colleagues = doctors.filter((x) => x.slug !== d.slug && x.focus.some((f) => d.focus.includes(f) && f !== "team")).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctorDisplayName(d),
    description: pick(d.summary, locale),
    image: d.image.src,
    url: localizedUrl(locale as Locale, { pathname: "/doktori/[slug]", params: { slug } }),
    worksFor: { "@type": "MedicalClinic", name: "Specijalna bolnica za oftalmologiju Svjetlost Sarajevo" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-paper pt-28 lg:pt-36">
        <div className="container-x">
          <div className="rounded-full bg-ink px-5 py-3 sm:inline-block">
            <Breadcrumbs locale={locale as Locale} items={[{ label: tp("doctorsTitle"), href: "/doktori" }, { label: d.name }]} />
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-[#e9ecef] lg:sticky lg:top-28">
                <Image src={d.image.src} alt={pick(d.image.alt, locale)} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" />
              </div>
            </div>
            <div className="lg:col-span-7 lg:pt-6">
              <p className="text-lg text-muted">{d.honorific}</p>
              <h1 className="mt-1 text-h1 font-semibold tracking-[-0.035em] text-ink">{d.name}</h1>
              <p className="mt-4 text-lead text-ink">{pick(d.title, locale)}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {d.focus.map((f) => (
                  <li key={f} className="rounded-full bg-mist px-3 py-1.5 text-sm text-ink ring-1 ring-inset ring-line">{pick(doctorFocusLabels[f], locale)}</li>
                ))}
              </ul>
              <p className="mt-8 max-w-2xl font-serif text-[clamp(1.4rem,1.1rem+1vw,1.9rem)] font-light leading-snug text-ink">{pick(d.summary, locale)}</p>
              <div className="mt-8">
                <BookButton preset={{ doctor: d.focus.includes("team") ? undefined : d.slug }}>{t("bookWith")}</BookButton>
              </div>

              <dl className="mt-14 grid gap-10 border-t border-line pt-10">
                <div>
                  <dt className="eyebrow text-brand">{t("expertise")}</dt>
                  <dd className="mt-3 max-w-2xl leading-relaxed text-text">{pick(d.expertise, locale)}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-brand">{t("education")}</dt>
                  <dd className="mt-3 max-w-2xl leading-relaxed text-text">{pick(d.education, locale)}</dd>
                </div>
                {d.memberships && (
                  <div>
                    <dt className="eyebrow text-brand">{t("memberships")}</dt>
                    <dd className="mt-3">
                      <ul className="flex flex-wrap gap-2">
                        {d.memberships.map((m) => (
                          <li key={m} className="rounded-full px-3 py-1.5 text-sm text-ink ring-1 ring-inset ring-line">{m}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {related.length > 0 && (
                  <div>
                    <dt className="eyebrow text-brand">{t("relatedServices")}</dt>
                    <dd className="mt-3 grid gap-2 sm:grid-cols-2">
                      {related.map((s) => (
                        <Link key={s.slug} href={{ pathname: "/usluge/[slug]", params: { slug: s.slug } }} className="group flex items-center justify-between rounded-2xl px-5 py-4 ring-1 ring-inset ring-line transition hover:bg-mist">
                          <span className="font-semibold text-ink">{pick(s.title, locale)}</span>
                          <ArrowUpRight className="size-4 text-muted group-hover:text-brand" aria-hidden />
                        </Link>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
              <p className="mt-10 text-sm text-muted">
                {t("profileSource")}:{" "}
                <a href={d.source} className="break-all text-brand underline underline-offset-2" rel="noopener">{d.source.replace("https://", "")}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
      {colleagues.length > 0 && (
        <section aria-labelledby="colleagues" className="mt-24 border-t border-line bg-mist py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <h2 id="colleagues" className="text-h3 font-semibold text-ink">{t("eyebrow")}</h2>
              <Link href="/doktori" className="inline-flex items-center gap-2 text-sm font-semibold text-brand">{tc("viewAll")} <ArrowUpRight className="size-4" aria-hidden /></Link>
            </div>
            <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {colleagues.map((c) => (
                <li key={c.slug}><DoctorCard doctor={c} /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
