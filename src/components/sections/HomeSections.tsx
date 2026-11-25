import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, CalendarCheck2, ClipboardList, ScanEye, HeartHandshake, Phone } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { BookButton } from "@/components/booking/BookButton";
import { ServiceExplorer } from "@/components/interactive/ServiceExplorer";
import { VisionSimulator } from "@/components/interactive/VisionSimulator";
import { TechStory } from "@/components/interactive/TechStory";
import { EyeAnatomy } from "@/components/interactive/EyeAnatomy";
import { StoriesCarousel } from "@/components/interactive/StoriesCarousel";
import { LocationSelector } from "@/components/interactive/LocationSelector";
import { Accordion } from "@/components/interactive/Accordion";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { Link } from "@/i18n/navigation";
import { doctors } from "@/content/doctors";
import { faqs } from "@/content/faq";
import { clinic } from "@/content/clinic";
import { images } from "@/content/images";
import { pick } from "@/lib/utils";

type P = { locale: string };

export async function ServicesSection({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "explorer" });
  return (
    <section aria-labelledby="services-title" className="section-y bg-paper">
      <div className="container-x">
        <SectionHeader id="services-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        <div className="mt-14">
          <ServiceExplorer />
        </div>
      </div>
    </section>
  );
}

export async function SimulatorSection({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "simulator" });
  return (
    <section aria-labelledby="sim-title" className="section-y grain bg-ink text-white">
      <div className="container-x">
        <SectionHeader id="sim-title" tone="dark" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        <div className="mt-14">
          <VisionSimulator />
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <Link
            href={{ pathname: "/usluge/[slug]", params: { slug: "lasersko-skidanje-dioptrije" } }}
            className="group inline-flex items-center gap-3 font-display text-xl font-semibold text-white"
          >
            <span className="link-underline">{t("cta")}</span>
            <span className="grid size-10 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-x-1">
              <ArrowUpRight className="size-5" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export async function TechnologySection({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "technology" });
  return (
    <section aria-labelledby="tech-title" className="bg-[#050d17] pb-[var(--section-space)] text-white">
      <div className="container-x border-t border-white/10 pt-[var(--section-space)]">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-brand-soft">
            <span aria-hidden className="h-px w-8 bg-current" />
            {t("eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="tech-title" className="mt-6 max-w-5xl text-[clamp(2.5rem,1.2rem+4.6vw,6rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
            {t("title")}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="on-dark-muted mt-8 max-w-2xl text-lead text-white/65">{t("intro")}</p>
        </Reveal>
        <div className="mt-16 lg:mt-24">
          <TechStory />
        </div>
        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-white/50">{t("disclaimer")}</p>
          <ButtonLink href="/tehnologija" variant="ghost-light" arrow>
            {t("explore")}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export async function DoctorsSection({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "doctorsSection" });
  const lead = doctors.filter((d) => d.leadership);
  const more = ["ratimir-lazic", "senad-grisevic", "azra-mehmedovic", "bojana-pandurevic"].map((s) => doctors.find((d) => d.slug === s)!);
  return (
    <section aria-labelledby="doctors-title" className="section-y bg-paper">
      <div className="container-x">
        <SectionHeader id="doctors-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")}>
          <ButtonLink href="/doktori" variant="outline" className="mt-6" arrow>
            {t("directory")}
          </ButtonLink>
        </SectionHeader>
        <ul className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-3">
          {lead.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={i * 0.08} className={i === 1 ? "md:mt-20" : i === 2 ? "md:mt-10" : ""}>
              <DoctorCard doctor={d} size="lg" />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{pick(d.summary, locale)}</p>
            </Reveal>
          ))}
        </ul>
        <ul className="mt-20 grid grid-cols-2 gap-x-5 gap-y-10 border-t border-line pt-12 lg:grid-cols-4">
          {more.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={i * 0.06}>
              <DoctorCard doctor={d} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export async function AnatomySection({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "anatomy" });
  return (
    <section aria-labelledby="anatomy-title" className="section-y grain overflow-hidden bg-ink text-white">
      <div className="container-x">
        <SectionHeader id="anatomy-title" tone="dark" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        <div className="mt-14">
          <EyeAnatomy />
        </div>
      </div>
    </section>
  );
}

export async function JourneySection({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "journey" });
  const steps = [
    { n: "01", title: t("s1"), text: t("s1t"), Icon: CalendarCheck2 },
    { n: "02", title: t("s2"), text: t("s2t"), Icon: ScanEye },
    { n: "03", title: t("s3"), text: t("s3t"), Icon: ClipboardList },
    { n: "04", title: t("s4"), text: t("s4t"), Icon: HeartHandshake },
  ];
  return (
    <section aria-labelledby="journey-title" className="section-y bg-mist">
      <div className="container-x">
        <SectionHeader id="journey-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-[1.375rem] top-2 h-[calc(100%-1rem)] w-px bg-line md:left-0 md:top-[1.375rem] md:h-px md:w-full" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.1} className="relative grid grid-cols-[2.75rem_1fr] gap-5 md:block">
              <span className="relative z-10 grid size-11 place-items-center rounded-full bg-paper text-brand ring-1 ring-line">
                <s.Icon className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div className="md:mt-8 md:pr-6">
                <p className="font-display text-sm font-semibold tabular-nums text-brand">{s.n}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <p className="mt-12 text-sm text-muted">{t("note")}</p>
      </div>
    </section>
  );
}

export async function StoriesSection({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "storiesSection" });
  const tc = await getTranslations({ locale, namespace: "common" });
  return (
    <section aria-labelledby="stories-title" className="section-y bg-ice/60">
      <div className="container-x">
        <SectionHeader id="stories-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        <div className="mt-16">
          <StoriesCarousel />
        </div>
        <div className="mt-10 flex flex-col gap-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{t("disclaimer")}</p>
          <Link href="/iskustva-pacijenata" className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-strong">
            {tc("viewAll")} <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

export async function LocationsSection({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "locationsSection" });
  return (
    <section aria-labelledby="locations-title" className="section-y bg-paper">
      <div className="container-x">
        <SectionHeader id="locations-title" eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
        <div className="mt-14">
          <LocationSelector />
        </div>
      </div>
    </section>
  );
}

export async function FaqSection({ locale, limit = 6 }: P & { limit?: number }) {
  const t = await getTranslations({ locale, namespace: "faqSection" });
  const items = faqs.slice(0, limit).map((f) => ({ id: f.id, q: pick(f.q, locale), a: pick(f.a, locale) }));
  return (
    <section aria-labelledby="faq-title" className="section-y bg-mist">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-brand">
              <span aria-hidden className="h-px w-8 bg-current" />
              {t("eyebrow")}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="faq-title" className="mt-5 text-h2 font-semibold text-ink">{t("title")}</h2>
          </Reveal>
          <div className="mt-10 rounded-[var(--radius-card)] bg-paper p-7 ring-1 ring-line">
            <p className="font-display text-lg font-semibold text-ink">{t("stillQuestions")}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t("stillText")}</p>
            <a href={clinic.primaryPhoneHref} className="mt-5 flex items-center gap-3 font-semibold text-ink">
              <Phone className="size-4 text-brand" aria-hidden /> {clinic.primaryPhone}
            </a>
            <Link href="/cesta-pitanja" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-strong">
              {t("more")} <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}

export async function FinalCta({ locale }: P) {
  const t = await getTranslations({ locale, namespace: "finalCta" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const img = images.sarajevoPanorama;
  return (
    <section aria-labelledby="cta-title" className="grain relative isolate overflow-hidden bg-ink text-white">
      <Image src={img.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-45" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#0a1929_0%,rgba(10,25,41,0.55)_45%,rgba(10,25,41,0.85)_100%)]" />
      <div className="container-x py-[calc(var(--section-space)*1.15)]">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <span aria-hidden className="mx-auto mb-10 block size-16 rounded-full border border-white/40 p-3">
              <span className="block size-full rounded-full border border-white/60 p-2">
                <span className="block size-full rounded-full bg-white" />
              </span>
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="cta-title" className="text-h1 font-semibold tracking-[-0.035em]">{t("title")}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="on-dark-muted mx-auto mt-6 max-w-2xl text-lead text-white/75">{t("text")}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 flex flex-wrap justify-center gap-3">
            <BookButton variant="light">{tc("book")}</BookButton>
            <ButtonLink href="/kontakt" variant="ghost-light">
              {tc("contact")}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
      <p className="absolute bottom-4 right-[var(--page-gutter)] text-[0.6875rem] text-white/40">{img.credit}</p>
    </section>
  );
}
