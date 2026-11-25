import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { FinalCta } from "@/components/sections/HomeSections";
import { ScopeTag } from "@/components/ui/ScopeTag";
import { stories, storiesSource } from "@/content/stories";
import { pick } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/iskustva-pacijenata">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/iskustva-pacijenata", title: t("storiesTitle"), description: t("storiesMeta") });
}

export default async function StoriesPage({ params }: PageProps<"/[locale]/iskustva-pacijenata">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "storiesSection" });
  const tp = await getTranslations({ locale, namespace: "pages" });
  const tc = await getTranslations({ locale, namespace: "common" });
  return (
    <>
      <PageHero locale={locale as Locale} eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} crumbs={[{ label: tp("storiesTitle") }]} />
      <section className="section-y bg-paper" aria-label={tp("storiesTitle")}>
        <div className="container-x">
          <p className="max-w-3xl rounded-2xl bg-mist p-5 text-sm text-muted">{t("disclaimer")} {t("consent")}</p>
          <ul className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3">
            {stories.map((s) => (
              <li key={s.slug} className="mb-6 break-inside-avoid">
                <figure className="rounded-[var(--radius-card)] p-7 ring-1 ring-inset ring-line">
                  <ScopeTag scope={s.scope} />
                  <blockquote className="mt-5 font-serif text-[1.45rem] font-light leading-snug text-ink">
                    <p lang={locale === "en" && s.translated ? "en" : "bs"}>„{pick(s.quote, locale)}“</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-4">
                    {s.image && (
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-mist">
                        <Image src={s.image.src} alt="" fill sizes="56px" className="object-cover object-top" />
                      </span>
                    )}
                    <span>
                      <span className="block font-semibold text-ink">{s.name}</span>
                      <span className="block text-sm text-muted">{pick(s.role, locale)}</span>
                      {locale === "en" && s.translated && <span className="block text-xs text-muted">{tc("translated")}</span>}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">{tc("source")}: <a href={storiesSource} className="text-brand underline" rel="noopener">svjetlost.ba</a></p>
        </div>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
