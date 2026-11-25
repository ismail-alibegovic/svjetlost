import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { PageHero } from "@/components/sections/PageHero";
import { buildMetadata } from "@/lib/seo";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ScopeTag } from "@/components/ui/ScopeTag";
import { FinalCta } from "@/components/sections/HomeSections";
import { awards, timeline, groupCentres } from "@/content/clinic";
import { images } from "@/content/images";
import { pick } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/o-klinici">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages" });
  return buildMetadata({ locale: locale as Locale, href: "/o-klinici", title: t("aboutTitle"), description: t("aboutMeta") });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/o-klinici">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const pillars = [
    { title: t("university"), text: t("universityText") },
    { title: t("dayHospital"), text: t("dayHospitalText") },
    { title: t("education"), text: t("educationText") },
  ];
  return (
    <>
      <PageHero locale={locale as Locale} title={t("aboutTitle")} intro={t("aboutIntro")} crumbs={[{ label: t("aboutTitle") }]} image={images.teamEscrs} imageCaption={pick(images.teamEscrs.alt, locale)} />
      <section className="section-y bg-paper" aria-labelledby="mv">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <h2 id="mv" className="sr-only">{t("mission")} / {t("vision")}</h2>
          {[{ k: t("mission"), v: t("missionText") }, { k: t("vision"), v: t("visionText") }].map((x, i) => (
            <Reveal key={x.k} delay={i * 0.08} className="lg:col-span-6">
              <p className="eyebrow text-brand">{x.k}</p>
              <p className="mt-5 font-serif text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] font-light leading-[1.2] text-ink">{x.v}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-mist py-[var(--section-space)]" aria-labelledby="facilities">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            {[images.operatingTheatre, images.examRoom, images.recoveryRoom, images.laserSuite].map((im, i) => (
              <div key={im.src} className={"relative overflow-hidden rounded-[var(--radius-card)] " + (i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square")}>
                <Image src={im.src} alt={pick(im.alt, locale)} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <ScopeTag scope="sarajevo" />
            <h2 id="facilities" className="mt-5 text-h2 font-semibold text-ink">{t("facilities")}</h2>
            <p className="mt-6 text-lead text-muted">{t("facilitiesText")}</p>
            <ul className="mt-10 grid gap-6">
              {pillars.map((p) => (
                <li key={p.title} className="border-t border-line pt-5">
                  <h3 className="font-display text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section-y grain bg-ink text-white" aria-labelledby="tl">
        <div className="container-x">
          <h2 id="tl" className="text-h2 font-semibold">{t("timeline")}</h2>
          <ol className="mt-14 grid gap-0 border-t border-white/10">
            {timeline.map((e) => (
              <Reveal as="li" key={e.year} className="grid gap-4 border-b border-white/10 py-8 md:grid-cols-12 md:items-baseline">
                <span className="font-display text-4xl font-semibold tracking-[-0.03em] md:col-span-2">{e.year === "Danas" ? tc("today") : e.year}</span>
                <span className="md:col-span-2"><ScopeTag scope={e.scope} tone="dark" /></span>
                <p className="on-dark-muted max-w-2xl text-lead text-white/75 md:col-span-8">{pick(e.text, locale)}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-y bg-paper" aria-labelledby="aw">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="aw" className="text-h2 font-semibold text-ink">{t("awards")}</h2>
            <p className="mt-4 text-muted">{t("awardsNote")}</p>
            <h3 className="mt-12 font-display text-xl font-semibold text-ink">{t("network")}</h3>
            <p className="mt-3 leading-relaxed text-muted">{t("networkText")}</p>
            <p className="mt-4 text-sm text-ink">{groupCentres.join(" · ")}</p>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-[var(--radius-card)] bg-line ring-1 ring-line sm:grid-cols-2 lg:col-span-8">
            {awards.map((a) => (
              <li key={a.name} className="bg-paper p-6">
                <p className="font-display text-3xl font-semibold tracking-[-0.03em] text-brand">{a.year}</p>
                <p className="mt-3 font-semibold text-ink">{a.name}</p>
                {a.place && <p className="text-sm text-muted">{a.place}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
