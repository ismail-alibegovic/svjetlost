import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ScopeTag } from "@/components/ui/ScopeTag";
import { articles } from "@/content/articles";
import { monthLabel, pick } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/novosti">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/novosti", title: t("newsTitle"), description: t("newsMeta") });
}

export default async function NewsPage({ params }: PageProps<"/[locale]/novosti">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const [first, ...rest] = articles;
  return (
    <>
      <PageHero locale={locale as Locale} title={t("newsTitle")} intro={t("newsIntro")} crumbs={[{ label: t("newsTitle") }]} />
      <section className="section-y bg-paper" aria-label={t("newsTitle")}>
        <div className="container-x">
          <article className="group relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] lg:col-span-7">
              <Image src={first.image.src} alt={pick(first.image.alt, locale)} fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="lg:col-span-5">
              <p className="flex items-center gap-3 text-sm text-muted"><ScopeTag scope={first.scope} /> {pick(first.tag, locale)} · {monthLabel(first.date, locale)}</p>
              <h2 className="mt-5 text-h3 font-semibold text-ink"><Link href={{ pathname: "/novosti/[slug]", params: { slug: first.slug } }} className="after:absolute after:inset-0 after:content-['']">{pick(first.title, locale)}</Link></h2>
              <p className="mt-4 text-lead text-muted">{pick(first.excerpt, locale)}</p>
            </div>
          </article>
          <ul className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-2">
            {rest.map((a) => (
              <li key={a.slug} className="group relative">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[var(--radius-card)]">
                  <Image src={a.image.src} alt="" fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <p className="mt-5 text-sm text-muted">{pick(a.tag, locale)} · {monthLabel(a.date, locale)}</p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink"><Link href={{ pathname: "/novosti/[slug]", params: { slug: a.slug } }} className="after:absolute after:inset-0 after:content-['']">{pick(a.title, locale)}</Link></h2>
                <p className="mt-2 text-muted">{pick(a.excerpt, locale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
