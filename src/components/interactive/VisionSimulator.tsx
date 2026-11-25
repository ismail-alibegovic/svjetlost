"use client";
import type React from "react";

import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronsLeftRight, Info } from "lucide-react";
import { images } from "@/content/images";
import { cn, pick } from "@/lib/utils";

type Mode = "clear" | "myopia" | "hyperopia" | "astigmatism" | "cataract";
const MODES: Mode[] = ["clear", "myopia", "hyperopia", "astigmatism", "cataract"];

const img = images.sarajevoMiljacka;

/**
 * Each condition is approximated with a different technique:
 *  - myopia: blur grows with distance (top of the frame = far away)
 *  - hyperopia: soft overall, with the near foreground (bottom) blurrier
 *  - astigmatism: directional (anisotropic) SVG blur plus a faint ghost image
 *  - cataract: diffuse blur, yellowing, contrast loss and glare bloom
 */
function SimLayers({ mode, filterId }: { mode: Mode; filterId: string }) {
  const base = (style: CSSProperties, extra?: string) => (
    <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 80vw, 100vw" aria-hidden className={cn("object-cover", extra)} style={style} />
  );
  switch (mode) {
    case "myopia":
      return (
        <>
          {base({ filter: "blur(1.5px)" })}
          <div className="absolute inset-0 [mask-image:linear-gradient(180deg,black_0%,black_42%,transparent_82%)]">
            {base({ filter: "blur(9px)", transform: "scale(1.03)" })}
          </div>
        </>
      );
    case "hyperopia":
      return (
        <>
          {base({ filter: "blur(2.5px) contrast(0.96)" })}
          <div className="absolute inset-0 [mask-image:linear-gradient(0deg,black_0%,black_30%,transparent_75%)]">
            {base({ filter: "blur(7px)", transform: "scale(1.03)" })}
          </div>
        </>
      );
    case "astigmatism":
      return (
        <>
          {base({ filter: `url(#${filterId})` })}
        </>
      );
    case "cataract":
      return (
        <>
          {base({ filter: "blur(3.5px) contrast(0.62) saturate(0.7) sepia(0.5) brightness(1.12)", transform: "scale(1.02)" })}
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_18%,rgba(255,250,235,0.75),rgba(255,244,214,0.25)_35%,transparent_65%)] mix-blend-screen" />
          <div aria-hidden className="absolute inset-0 bg-[#f3e2b8]/20" />
        </>
      );
    default:
      return base({});
  }
}

export function VisionSimulator() {
  const t = useTranslations("simulator");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const filterId = useId().replace(/:/g, "");
  const [mode, setMode] = useState<Mode>("myopia");
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((x: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && setFromClientX(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [setFromClientX]);

  // Gentle intro sweep so the comparison is discoverable (skipped with reduced motion).
  const swept = useRef(false);
  const touched = useRef(false); // stop the intro sweep as soon as the visitor interacts
  useEffect(() => {
    if (reduce || swept.current || !frame.current) return;
    const el = frame.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || swept.current) return;
        swept.current = true;
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1600);
          if (touched.current) return;
          setPos(50 + Math.sin(p * Math.PI * 2) * 18 * (1 - p));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const onKey = (e: React.KeyboardEvent) => {
    touched.current = true;
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  const modeLabel = t(mode);

  return (
    <div>
      {/* SVG filter for anisotropic (astigmatic) blur with a faint ghost image */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7 1.2" result="dir" />
          <feOffset in="dir" dx="9" dy="-3" result="ghost" />
          <feComponentTransfer in="ghost" result="ghostFaint">
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
          <feBlend in="dir" in2="ghostFaint" mode="lighten" />
        </filter>
      </svg>

      <div role="radiogroup" aria-label={t("modesLabel")} className="no-scrollbar -mx-[var(--page-gutter)] flex gap-2 overflow-x-auto overscroll-x-contain px-[var(--page-gutter)] pb-2">
        {MODES.map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            onClick={() => setMode(m)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition",
              mode === m ? "bg-white text-ink" : "text-white ring-1 ring-inset ring-white/25 hover:ring-white/60",
            )}
          >
            {t(m)}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-9">
          <div
            ref={frame}
            className="relative aspect-[4/5] touch-pan-y select-none overflow-hidden rounded-[var(--radius-card)] bg-ink-2 sm:aspect-[16/10]"
            onPointerDown={(e) => {
              touched.current = true;
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
          >
            <Image
              src={img.src}
              alt={pick(img.alt, locale)}
              fill
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }} aria-hidden>
              <SimLayers mode={mode} filterId={filterId} />
            </div>

            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-semibold text-white">{t("before")}</span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink">
              {t("after")}: {modeLabel}
            </span>

            {/* Divider + handle */}
            <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_20px_rgba(0,0,0,0.35)]" />
            </div>
            <div
              role="slider"
              tabIndex={0}
              aria-label={t("sliderLabel")}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              aria-valuetext={`${Math.round(pos)}% — ${t("before")} / ${modeLabel}`}
              onKeyDown={onKey}
              onPointerDown={(e) => {
                e.stopPropagation();
                dragging.current = true;
              }}
              className="absolute top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_rgba(0,0,0,0.35)] outline-none ring-brand-soft transition-shadow focus-visible:ring-4"
              style={{ left: `${pos}%` }}
            >
              <ChevronsLeftRight className="size-6" aria-hidden />
            </div>
          </div>
          <p className="mt-3 text-xs text-white/50">{t("photoCredit")}</p>
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              aria-live="polite"
            >
              <p className="font-display text-2xl font-semibold text-white">{modeLabel}</p>
              <p className="on-dark-muted mt-3 leading-relaxed text-white/70">{t(`${mode}Desc`)}</p>
            </motion.div>
          </AnimatePresence>
          <p className="mt-8 flex gap-3 rounded-2xl border border-white/12 p-4 text-sm leading-relaxed text-white/65">
            <Info className="mt-0.5 size-4 shrink-0 text-brand-soft" aria-hidden />
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
}
