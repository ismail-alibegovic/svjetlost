import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { TechStory } from "@/components/interactive/TechStory";
import { FinalCta } from "@/components/sections/HomeSections";
import { devices } from "@/content/technology";
import { services } from "@/content/services";
import { pick } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/tehnologija">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/tehnologija", title: t("techTitle"), description: t("techMeta") });
}

export default async function TechnologyPage({ params }: PageProps<"/[locale]/tehnologija">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "technology" });
  const tp = await getTranslations({ locale, namespace: "pages" });
  return (
    <>
      <PageHero locale={locale as Locale} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} crumbs={[{ label: tp("techTitle") }]} />
      <section aria-label={t("eyebrow")} className="bg-[#050d17] py-[var(--section-space)] text-white">
        <div className="container-x"><TechStory /></div>
      </section>
      <section aria-labelledby="all-devices" className="section-y bg-paper">
        <div className="container-x">
          <h2 id="all-devices" className="text-h2 font-semibold text-ink">{t("allDevices")}</h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">{t("allDevicesIntro")}</p>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((d) => (
              <li key={d.slug} className="flex flex-col bg-paper p-7">
                <div className="relative h-36 overflow-hidden rounded-xl bg-white">
                  <Image src={(d.productImage ?? d.image).src} alt={pick((d.productImage ?? d.image).alt, locale)} fill sizes="(min-width:1024px) 25vw, 80vw" className={d.productImage || d.image.src.includes("/technology/") ? "object-contain p-3" : "object-cover"} />
                </div>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-brand">{pick(d.category, locale)}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{d.name}</h3>
                <p className="mt-1 text-sm text-muted">{t("manufacturer")}: {d.manufacturer ?? <em>{t("toConfirm")}</em>}</p>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-text">{pick(d.explanation, locale)}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                  {d.services.map((s) => { const sv = services.find((x) => x.slug === s); return sv ? (
                    <li key={s}><Link href={{ pathname: "/usluge/[slug]", params: { slug: s } }} className="inline-block rounded-full bg-mist px-3 py-1.5 text-xs font-medium text-ink ring-1 ring-inset ring-line hover:ring-ink/40">{pick(sv.title, locale)}</Link></li>
                  ) : null; })}
                </ul>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm text-muted">{t("disclaimer")}</p>
        </div>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
