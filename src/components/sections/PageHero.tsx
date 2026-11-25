import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import type { Locale } from "@/i18n/routing";
import type { Img } from "@/types/content";
import { pick, cn } from "@/lib/utils";

export async function PageHero({
  locale,
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  children,
  imageCaption,
}: {
  locale: Locale;
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs: Crumb[];
  image?: Img;
  imageCaption?: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden className="pointer-events-none absolute -right-48 -top-48 -z-10 size-[44rem] rounded-full border border-white/[0.07]" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[30rem] rounded-full border border-white/[0.07]" />
      <div className={cn("container-x grid gap-12 pb-16 pt-36 lg:pb-24 lg:pt-48", image && "lg:grid-cols-12 lg:items-end")}>
        <div className={cn(image ? "lg:col-span-7" : "max-w-4xl")}>
          <div className="anim-reveal">
            <Breadcrumbs items={crumbs} locale={locale} />
          </div>
          {eyebrow && (
            <p className="anim-reveal eyebrow mt-10 flex items-center gap-3 text-brand-soft [animation-delay:0.1s]">
              <span aria-hidden className="h-px w-8 bg-current" />
              {eyebrow}
            </p>
          )}
          <h1 className={cn("anim-reveal text-h1 font-semibold tracking-[-0.035em] [animation-delay:0.15s]", eyebrow ? "mt-5" : "mt-10")}>{title}</h1>
          {intro && <p className="anim-reveal on-dark-muted mt-6 max-w-2xl text-lead text-white/72 [animation-delay:0.25s]">{intro}</p>}
          {children && <div className="anim-reveal mt-9 [animation-delay:0.35s]">{children}</div>}
        </div>
        {image && (
          <figure className="anim-fade lg:col-span-5 [animation-delay:0.2s]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink-2">
              <Image src={image.src} alt={pick(image.alt, locale)} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            {imageCaption && <figcaption className="mt-3 text-xs text-white/50">{imageCaption}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
