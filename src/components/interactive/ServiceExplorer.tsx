"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services, serviceCategories } from "@/content/services";
import type { ServiceCategory } from "@/types/content";
import { cn, pick } from "@/lib/utils";

export function ServiceExplorer({ showAllLink = true }: { showAllLink?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("explorer");
  const tc = useTranslations("common");
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<ServiceCategory | "all">("all");
  const list = services.filter((s) => cat === "all" || s.category === cat);
  const featured = list.filter((s) => s.featured).slice(0, cat === "all" ? 4 : 2);
  const rest = list.filter((s) => !featured.includes(s));
  // For narrow categories, promote the first service to keep the composition editorial.
  const feat = featured.length ? featured : list.slice(0, 1);
  const secondary = featured.length ? rest : list.slice(1);

  return (
    <div>
      <div role="group" aria-label={t("filterLabel")} className="no-scrollbar -mx-[var(--page-gutter)] flex gap-2 overflow-x-auto overscroll-x-contain px-[var(--page-gutter)] pb-2">
        {serviceCategories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition",
              cat === c.id ? "bg-ink text-white" : "text-ink ring-1 ring-inset ring-line hover:ring-ink/40",
            )}
          >
            {pick(c.label, locale)}
          </button>
        ))}
        <p className="ml-auto hidden shrink-0 self-center pl-6 text-sm text-muted md:block" aria-live="polite">
          {t("count", { count: list.length })}
        </p>
      </div>

      <LayoutGroup>
        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {feat.map((s, i) => (
              <motion.article
                key={s.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-[var(--radius-card)] bg-ink text-white",
                  feat.length === 1 ? "lg:col-span-12 min-h-[24rem]" :
                  i === 0 ? "lg:col-span-7 lg:row-span-2 min-h-[26rem] lg:min-h-[36rem]" :
                  i === 3 ? "lg:col-span-12 min-h-[20rem] lg:min-h-[22rem]" :
                  "lg:col-span-5 min-h-[20rem]",
                )}
              >
                <Image
                  src={s.image.src}
                  alt={pick(s.image.alt, locale)}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  className="object-cover opacity-80 transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
                <div className="relative flex h-full flex-col justify-between p-7 lg:p-9">
                  <span className="font-display text-sm font-semibold text-white/60 tabular-nums">{s.number}</span>
                  <div className="max-w-xl">
                    <h3 className="text-h3 font-semibold">
                      <Link href={{ pathname: "/usluge/[slug]", params: { slug: s.slug } }} className="after:absolute after:inset-0 after:content-['']">
                        {pick(s.title, locale)}
                      </Link>
                    </h3>
                    <p className="on-dark-muted mt-3 text-white/75">{pick(s.short, locale)}</p>
                    <span aria-hidden className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      {tc("learnMore")}
                      <span className="grid size-8 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {secondary.length > 0 && (
          <motion.ul layout={!reduce} className="mt-5 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {secondary.map((s) => (
                <motion.li
                  key={s.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  className="group relative border-b border-line sm:odd:border-r lg:border-r lg:odd:border-r lg:[&:nth-child(3n)]:border-r-0"
                >
                  <div className="flex h-full gap-5 p-6 transition-colors duration-300 group-hover:bg-mist lg:p-8">
                    <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-mist">
                      <Image src={s.image.src} alt="" fill sizes="80px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-xs font-semibold text-brand tabular-nums">{s.number}</p>
                      <h3 className="mt-1 text-lg font-semibold leading-snug text-ink">
                        <Link href={{ pathname: "/usluge/[slug]", params: { slug: s.slug } }} className="after:absolute after:inset-0 after:content-['']">
                          {pick(s.title, locale)}
                        </Link>
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">{pick(s.short, locale)}</p>
                    </div>
                    <ArrowUpRight aria-hidden className="ml-auto size-5 shrink-0 text-muted transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </LayoutGroup>

      {showAllLink && (
        <div className="mt-10">
          <Link href="/usluge" className="inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-strong">
            {tc("viewAll")} <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      )}
    </div>
  );
}
