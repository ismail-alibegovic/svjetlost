"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { stories } from "@/content/stories";
import { cn, pick } from "@/lib/utils";

export function StoriesCarousel({ limit }: { limit?: number }) {
  const locale = useLocale();
  const t = useTranslations("storiesSection");
  const tc = useTranslations("common");
  const reduce = useReducedMotion();
  const list = (limit ? stories.slice(0, limit) : stories).filter((s) => s.image);
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const s = list[i];
  const go = (d: number) => {
    setDir(d);
    setI((v) => (v + d + list.length) % list.length);
  };
  const showTranslation = locale !== "bs" && s.translated;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("title")}
      className="grid gap-10 lg:grid-cols-12 lg:gap-16"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="lg:col-span-4">
        <div className="relative aspect-square max-w-[16rem] overflow-hidden rounded-[var(--radius-card)] bg-ice">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={s.slug}
              className="absolute inset-0"
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {s.image && (
                <Image src={s.image.src} alt={pick(s.image.alt, locale)} fill sizes="16rem" className="object-cover object-top" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col justify-between lg:col-span-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.figure
            key={s.slug}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} ${t("of")} ${list.length}`}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span aria-hidden className="block font-serif text-[6rem] leading-[0.6] text-brand/30">“</span>
            <blockquote className="mt-2 font-serif text-[clamp(1.6rem,1.1rem+1.8vw,2.75rem)] font-light leading-[1.2] tracking-[-0.01em] text-ink">
              <p lang={showTranslation ? "en" : "bs"}>{pick(s.quote, locale)}</p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-display text-lg font-semibold text-ink">{s.name}</span>
              <span className="text-muted">{pick(s.role, locale)}</span>
              {showTranslation && <span className="w-full text-xs text-muted">{tc("translated")}</span>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between gap-6 border-t border-line pt-6">
          <p className="font-display text-sm tabular-nums text-muted" aria-live="polite">
            {String(i + 1).padStart(2, "0")} <span className="mx-1 text-line">/</span> {String(list.length).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            {[
              { d: -1, label: t("prev"), Icon: ArrowLeft },
              { d: 1, label: t("next"), Icon: ArrowRight },
            ].map(({ d, label, Icon }) => (
              <button
                key={d}
                type="button"
                onClick={() => go(d)}
                aria-label={label}
                className={cn("grid size-12 place-items-center rounded-full ring-1 ring-inset ring-line transition hover:bg-ink hover:text-white hover:ring-ink")}
              >
                <Icon className="size-5" aria-hidden />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
