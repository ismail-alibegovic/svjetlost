"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { devices, featuredDevices } from "@/content/technology";
import { services } from "@/content/services";
import { cn, pick } from "@/lib/utils";

/** Scroll-driven storytelling: the sticky photograph changes as each device's text scrolls into focus. */
export function TechStory() {
  const locale = useLocale();
  const t = useTranslations("technology");
  const reduce = useReducedMotion();
  const items = featuredDevices.map((s) => devices.find((d) => d.slug === s)!);
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      {/* Sticky media (desktop) */}
      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-[calc(var(--header-h)+2rem)]">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink-2">
            <AnimatePresence initial={false}>
              <motion.div
                key={items[active].slug}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={items[active].image.src}
                  alt={pick(items[active].image.alt, locale)}
                  fill
                  sizes="55vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <p className="font-display text-sm font-semibold text-white/80">
                {items[active].name}
              </p>
              <p aria-hidden className="font-display text-sm tabular-nums text-white/60">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-1.5" aria-hidden>
            {items.map((d, i) => (
              <span key={d.slug} className={cn("h-0.5 flex-1 rounded-full transition-colors duration-500", i === active ? "bg-white" : "bg-white/15")} />
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol className="lg:col-span-5">
        {items.map((d, i) => (
          <li
            key={d.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={cn(
              "border-t border-white/10 py-10 transition-opacity duration-700 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:py-0",
              i === active ? "lg:opacity-100" : "lg:opacity-35",
            )}
          >
            <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-2xl lg:hidden">
              <Image src={d.image.src} alt={pick(d.image.alt, locale)} fill sizes="100vw" className="object-cover" />
            </div>
            <p className="eyebrow text-brand-soft">{pick(d.category, locale)}</p>
            <h3 className="mt-4 font-display text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
              {d.name}
            </h3>
            <p className="on-dark-muted mt-5 text-lead text-white/70">{pick(d.explanation, locale)}</p>
            <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-white/10 pt-6 text-sm">
              <div>
                <dt className="text-white/45">{t("manufacturer")}</dt>
                <dd className="mt-1 font-semibold text-white">
                  {d.manufacturer ?? <span className="font-normal italic text-white/60">{t("toConfirm")}</span>}
                </dd>
              </div>
              <div>
                <dt className="text-white/45">{t("purpose")}</dt>
                <dd className="mt-1 font-semibold text-white">{pick(d.purpose, locale)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-white/45">{t("usedIn")}</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {d.services.map((slug) => {
                    const s = services.find((x) => x.slug === slug);
                    return s ? (
                      <Link
                        key={slug}
                        href={{ pathname: "/usluge/[slug]", params: { slug } }}
                        className="rounded-full px-3 py-1.5 text-white/85 ring-1 ring-inset ring-white/20 transition hover:bg-white/10"
                      >
                        {pick(s.title, locale)}
                      </Link>
                    ) : null;
                  })}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </div>
  );
}
