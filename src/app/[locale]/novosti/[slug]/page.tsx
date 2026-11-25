import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/HomeSections";
import { ScopeTag } from "@/components/ui/ScopeTag";
import { articles, getArticle } from "@/content/articles";
import { buildMetadata, localizedUrl } from "@/lib/seo";
import { monthLabel, pick } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/novosti/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({ locale: locale as Locale, href: { pathname: "/novosti/[slug]", params: { slug } }, title: pick(a.title, locale), description: pick(a.excerpt, locale), image: a.image.src });
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/novosti/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const a = getArticle(slug);
  if (!a) notFound();
  const t = await getTranslations({ locale, namespace: "pages" });
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: pick(a.title, locale),
    datePublished: `${a.date}-01`,
    image: a.image.src,
    mainEntityOfPage: localizedUrl(locale as Locale, { pathname: "/novosti/[slug]", params: { slug } }),
    publisher: { "@type": "MedicalOrganization", name: "Klinika Svjetlost" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero locale={locale as Locale} eyebrow={`${pick(a.tag, locale)} · ${monthLabel(a.date, locale)}`} title={pick(a.title, locale)} intro={pick(a.excerpt, locale)} crumbs={[{ label: t("newsTitle"), href: "/novosti" }, { label: pick(a.tag, locale) }]} />
      <article className="bg-paper py-[calc(var(--section-space)*0.7)]">
        <div className="container-x max-w-3xl">
          <figure>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)]">
              <Image src={a.image.src} alt={pick(a.image.alt, locale)} fill sizes="(min-width:768px) 48rem, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-xs text-muted">{pick(a.image.alt, locale)}</figcaption>
          </figure>
          <div className="mt-10"><ScopeTag scope={a.scope} /></div>
          <div className="prose-clinic mt-6 text-lg">
            {a.body.map((p, i) => <p key={i}>{pick(p, locale)}</p>)}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm">
            <Link href="/novosti" className="inline-flex items-center gap-2 font-semibold text-brand"><ArrowLeft className="size-4" aria-hidden /> {t("newsBack")}</Link>
            <a href={a.source} className="text-muted underline underline-offset-2" rel="noopener">{t("newsSource")}: svjetlost.ba</a>
          </div>
        </div>
      </article>
      <FinalCta locale={locale} />
    </>
  );
}
