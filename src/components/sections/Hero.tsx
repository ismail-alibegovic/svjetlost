import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { BookButton } from "@/components/booking/BookButton";
import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/content/images";
import { HeroParallax } from "@/components/interactive/HeroParallax";

export async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const img = images.eyeHero;

  return (
    <section aria-labelledby="hero-title" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      {/* Cinematic eye — opens like an iris on first paint */}
      <HeroParallax className="absolute inset-0 -z-10">
        <div className="anim-iris absolute inset-x-0 top-0 h-[60%] lg:inset-x-auto lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[72%] lg:[mask-image:linear-gradient(90deg,transparent_0%,black_38%)]">
          <Image
            src={img.src}
            alt={img.alt[locale as "bs" | "en"]}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 68vw, 100vw"
            className="object-cover object-[42%_50%] lg:object-[38%_50%]"
          />
        </div>
      </HeroParallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,25,41,0.55)_0%,rgba(10,25,41,0)_16%,rgba(10,25,41,0.1)_34%,rgba(10,25,41,0.9)_52%,#0a1929_60%)] lg:bg-[linear-gradient(90deg,#0a1929_0%,#0a1929_30%,rgba(10,25,41,0.55)_52%,rgba(10,25,41,0.05)_75%,rgba(10,25,41,0.35)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />
      {/* Precision rings — a quiet nod to diagnostic optics */}
      <svg aria-hidden className="anim-fade pointer-events-none absolute right-[8%] top-1/2 -z-10 hidden h-[78vh] -translate-y-1/2 opacity-40 [animation-delay:0.8s] lg:block" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="198" stroke="white" strokeOpacity=".18" />
        <circle cx="200" cy="200" r="150" stroke="white" strokeOpacity=".12" strokeDasharray="2 6" />
        <path d="M200 0v18M200 382v18M0 200h18M382 200h18" stroke="white" strokeOpacity=".35" />
      </svg>

      <div className="container-x flex flex-1 flex-col justify-end pb-14 pt-36 lg:justify-center lg:pb-24 lg:pt-44">
        <div className="max-w-[44rem]">
          <p className="anim-reveal eyebrow flex items-center gap-3 text-brand-soft [animation-delay:0.15s]">
            <span aria-hidden className="h-px w-10 bg-current" />
            {t("eyebrow")}
          </p>
          <h1 id="hero-title" className="mt-7 text-display font-semibold tracking-[-0.035em]">
            <span className="block">{t("line1")}</span>
            <span className="block font-serif font-light italic tracking-[-0.02em] text-white/90">
              {t("line2")}
            </span>
          </h1>
          <p className="on-dark-muted mt-8 max-w-[34rem] text-lead text-white/75">
            {t("description")}
          </p>
          <div className="anim-reveal mt-10 flex flex-wrap gap-3 [animation-delay:0.7s]">
            <BookButton variant="light">{tc("book")}</BookButton>
            <ButtonLink href="/usluge" variant="ghost-light">
              {t("secondary")}
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="container-x anim-fade relative flex items-end justify-between gap-6 pb-8 text-xs text-white/55 [animation-delay:1s]">
        <p className="flex items-center gap-3">
          <span className="font-display text-sm font-semibold text-white">Sarajevo</span>
          <span aria-hidden className="h-3 w-px bg-white/30" />
          {t("since")}
        </p>
        <p aria-hidden className="hidden items-center gap-3 md:flex">
          {t("scroll")}
          <span className="relative block h-10 w-px overflow-hidden bg-white/20">
            <span className="anim-scroll-cue absolute inset-x-0 top-0 h-1/2 bg-white" />
          </span>
        </p>
        <p className="hidden sm:block">{t("credit")} · {img.credit}</p>
      </div>
    </section>
  );
}
