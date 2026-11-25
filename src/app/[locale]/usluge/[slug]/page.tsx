import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FinalCta } from "@/components/sections/HomeSections";
import { BookButton } from "@/components/booking/BookButton";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Accordion } from "@/components/interactive/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { ScopeTag } from "@/components/ui/ScopeTag";
import { services, getService } from "@/content/services";
import { doctors } from "@/content/doctors";
import { devices } from "@/content/technology";
import { clinic } from "@/content/clinic";
import { buildMetadata, localizedUrl } from "@/lib/seo";
import { cn, pick, pickList } from "@/lib/utils";
import type { ServiceSection } from "@/types/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/usluge/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({
    locale: locale as Locale,
    href: { pathname: "/usluge/[slug]", params: { slug } },
    title: pick(s.title, locale),
    description: pick(s.short, locale),
    image: s.image.src,
  });
}

function Block({ section, locale, index, image }: { section: ServiceSection; locale: string; index: number; image?: { src: string; alt: string } }) {
  const bullets = section.bullets ? pickList(section.bullets, locale) : [];
  return (
    <Reveal as="section" className="scroll-mt-32 border-t border-line pt-12">
      <div id={section.id} className={cn("grid gap-8", image && "xl:grid-cols-2 xl:items-start")}>
        <div className={cn(image && index % 2 === 1 && "xl:order-2")}>
          <p className="font-display text-sm font-semibold tabular-nums text-brand">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="mt-3 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold leading-tight text-ink">{pick(section.title, locale)}</h2>
          <div className="prose-clinic mt-6 max-w-2xl">
            <p>{pick(section.body, locale)}</p>
            {bullets.length > 0 && (
              <ul>
                {bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-mist">
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1280px) 30vw, 90vw" className="object-cover" />
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default async function ServicePage({ params }: PageProps<"/[locale]/usluge/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const s = getService(slug);
  if (!s) notFound();
  const t = await getTranslations({ locale, namespace: "pages" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const tt = await getTranslations({ locale, namespace: "technology" });

  const blocks = [s.what, s.symptoms, s.diagnostics, s.treatment, s.recovery].filter(Boolean) as ServiceSection[];
  const blockImages = [devices.find((d) => d.slug === s.technology[0])?.image, s.image].filter(Boolean);
  const techList = s.technology.map((x) => devices.find((d) => d.slug === x)).filter(Boolean) as typeof devices;
  const docList = s.doctors.map((x) => doctors.find((d) => d.slug === x)).filter(Boolean) as typeof doctors;
  const related = s.related.map((x) => getService(x)).filter(Boolean) as typeof services;

  const nav = [
    ...blocks.map((b) => ({ id: b.id, label: pick(b.title, locale) })),
    { id: "tehnologija", label: t("serviceTech") },
    { id: "ljekari", label: t("serviceDoctors") },
    { id: "pitanja", label: t("serviceFaq") },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: pick(s.title, locale),
    description: pick(s.short, locale),
    url: localizedUrl(locale as Locale, { pathname: "/usluge/[slug]", params: { slug } }),
    inLanguage: locale,
    about: { "@type": "MedicalProcedure", name: pick(s.title, locale) },
    publisher: { "@type": "MedicalOrganization", name: clinic.legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        locale={locale as Locale}
        eyebrow={`${t("servicesTitle")} · ${s.number}`}
        title={pick(s.title, locale)}
        intro={pick(s.intro, locale)}
        crumbs={[{ label: t("servicesTitle"), href: "/usluge" }, { label: pick(s.title, locale) }]}
        image={s.image}
        imageCaption={s.image.kind === "concept" ? `${tc("photoConcept")} · ${s.image.credit}` : tc("photoClinic")}
      >
        <div className="flex flex-wrap gap-3">
          <BookButton variant="light" preset={{ service: s.slug }}>{tc("book")}</BookButton>
          <a href={clinic.primaryPhoneHref} className="inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold text-white ring-1 ring-inset ring-white/35 transition hover:bg-white/10">
            <Phone className="size-4" aria-hidden /> {clinic.primaryPhone}
          </a>
        </div>
      </PageHero>

      {/* Topics strip */}
      <div className="border-b border-line bg-paper">
        <div className="container-x flex flex-wrap items-center gap-x-6 gap-y-3 py-6">
          <span className="eyebrow text-muted">{t("serviceTopics")}</span>
          <ul className="flex flex-wrap gap-2">
            {pickList(s.conditions, locale).map((c) => (
              <li key={c} className="rounded-full bg-mist px-3.5 py-1.5 text-sm text-ink ring-1 ring-inset ring-line">{c}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-paper">
        <div className="container-x grid gap-12 py-[calc(var(--section-space)*0.7)] lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <nav aria-label={tc("onThisPage")} className="lg:sticky lg:top-28">
              <p className="eyebrow text-muted">{tc("onThisPage")}</p>
              <ol className="mt-4 grid gap-1 border-l border-line">
                {nav.map((n, i) => (
                  <li key={n.id}>
                    <a href={`#${n.id}`} className="-ml-px flex gap-3 border-l border-transparent py-2 pl-4 text-[0.9375rem] text-muted transition hover:border-brand hover:text-ink">
                      <span className="w-5 text-xs tabular-nums text-brand/70">{String(i + 1).padStart(2, "0")}</span>
                      {n.label}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-8 rounded-2xl bg-mist p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  <MapPin className="size-3.5 text-brand" aria-hidden /> {t("serviceWhere")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink">{pick(s.where, locale)}</p>
              </div>
            </nav>
          </aside>

          <div className="grid gap-16 lg:col-span-9">
            {s.highlights && (
              <div className="grid gap-6 sm:grid-cols-2">
                {s.highlights.map((h) => (
                  <div key={h.value} className="rounded-[var(--radius-card)] bg-ink p-7 text-white">
                    <ScopeTag scope={h.scope} tone="dark" />
                    <p className="mt-6 font-display text-[clamp(2.4rem,1.8rem+2vw,3.5rem)] font-semibold leading-none tracking-[-0.04em]">{h.value}</p>
                    <p className="on-dark-muted mt-3 text-white/70">{pick(h.label, locale)}</p>
                  </div>
                ))}
              </div>
            )}

            {blocks.map((b, i) => {
              const img = i === 2 ? blockImages[0] : i === 4 ? blockImages[1] : undefined;
              return <Block key={b.id} section={b} index={i} locale={locale} image={img ? { src: img.src, alt: pick(img.alt, locale) } : undefined} />;
            })}

            {/* Technology */}
            <section id="tehnologija" className="scroll-mt-32 border-t border-line pt-12">
              <h2 className="text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold text-ink">{t("serviceTech")}</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {techList.map((d) => (
                  <li key={d.slug} className="group relative flex gap-5 rounded-[var(--radius-card)] p-5 ring-1 ring-inset ring-line transition hover:bg-mist">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-line">
                      <Image src={(d.productImage ?? d.image).src} alt="" fill sizes="80px" className="object-contain p-1.5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{pick(d.category, locale)}</p>
                      <p className="mt-1 font-display text-lg font-semibold text-ink">
                        <Link href="/tehnologija" className="after:absolute after:inset-0 after:content-['']">{d.name}</Link>
                      </p>
                      <p className="mt-1 text-sm text-muted">{d.manufacturer ?? `${tt("manufacturer")}: ${tt("toConfirm")}`}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Doctors */}
            <section id="ljekari" className="scroll-mt-32 border-t border-line pt-12">
              <h2 className="text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold text-ink">{t("serviceDoctors")}</h2>
              {docList.length ? (
                <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
                  {docList.map((d) => (
                    <li key={d.slug}><DoctorCard doctor={d} /></li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 max-w-2xl text-muted">{t("serviceNoDoctors")}</p>
              )}
            </section>

            {/* FAQ */}
            <section id="pitanja" className="scroll-mt-32 border-t border-line pt-12">
              <h2 className="mb-6 text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-semibold text-ink">{t("serviceFaq")}</h2>
              <Accordion items={s.faq.map((f, i) => ({ id: `faq-${i}`, q: pick(f.q, locale), a: pick(f.a, locale) }))} defaultOpen={null} />
            </section>

            <div className="rounded-2xl bg-mist p-6 text-sm text-muted">
              <p>{tc("reviewNote")}</p>
              <p className="mt-3 font-semibold text-ink">{tc("sources")}:</p>
              <ul className="mt-1 grid gap-1">
                {s.source.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} className="break-all text-brand underline underline-offset-2" rel="noopener">{src.url.replace("https://", "")}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section aria-labelledby="related-title" className="border-t border-line bg-mist py-20">
        <div className="container-x">
          <h2 id="related-title" className="text-h3 font-semibold text-ink">{tc("related")}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="group relative overflow-hidden rounded-[var(--radius-card)] bg-paper ring-1 ring-line">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={r.image.src} alt="" fill sizes="(min-width: 768px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <p className="font-display text-xs font-semibold text-brand">{r.number}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold text-ink">
                      <Link href={{ pathname: "/usluge/[slug]", params: { slug: r.slug } }} className="after:absolute after:inset-0 after:content-['']">
                        {pick(r.title, locale)}
                      </Link>
                    </h3>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-muted transition group-hover:text-brand" aria-hidden />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <FinalCta locale={locale} />
    </>
  );
}
