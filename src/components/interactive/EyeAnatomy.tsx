"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/content/services";
import { cn, pick } from "@/lib/utils";

type Part = "cornea" | "iris" | "lens" | "retina" | "nerve";

const HOTSPOTS: { id: Part; x: number; y: number; related: string[] }[] = [
  { id: "cornea", x: 23.5, y: 50, related: ["lasersko-skidanje-dioptrije", "transplantacija-roznice"] },
  { id: "iris", x: 32.5, y: 30, related: ["lijecenje-glaukoma", "pregledi-pacijenata"] },
  { id: "lens", x: 36.5, y: 50, related: ["ocna-mrena", "starosna-dioptrija"] },
  { id: "retina", x: 72, y: 22, related: ["dijabetes-i-retina"] },
  { id: "nerve", x: 89, y: 63, related: ["lijecenje-glaukoma"] },
];

export function EyeAnatomy() {
  const t = useTranslations("anatomy");
  const locale = useLocale();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Part>("cornea");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const stage = useRef<HTMLDivElement>(null);
  const current = HOTSPOTS.find((h) => h.id === active)!;
  const on = (p: Part) => active === p;

  const stroke = (p: Part) => (on(p) ? "#5cb4ec" : "rgba(255,255,255,0.55)");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
      <div className="lg:col-span-7">
        <div
          ref={stage}
          className="relative [perspective:1200px]"
          onPointerMove={(e) => {
            if (reduce || e.pointerType !== "mouse") return;
            const r = stage.current!.getBoundingClientRect();
            setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -8, y: ((e.clientX - r.left) / r.width - 0.5) * 12 });
          }}
          onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div
            className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d]"
            style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
          >
            <svg viewBox="0 0 800 500" className="h-auto w-full" role="img" aria-labelledby="eye-svg-title">
              <title id="eye-svg-title">{t("note")}</title>
              <defs>
                <radialGradient id="vitreous" cx="55%" cy="50%" r="55%">
                  <stop offset="0%" stopColor="#16304a" />
                  <stop offset="100%" stopColor="#0f2236" />
                </radialGradient>
                <linearGradient id="nerveGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#24405c" />
                  <stop offset="1" stopColor="#0f2236" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Optic nerve */}
              <path
                d="M590 268 C640 280 700 300 790 318 L790 372 C700 352 640 338 588 318 Z"
                fill={on("nerve") ? "rgba(92,180,236,0.22)" : "url(#nerveGrad)"}
                stroke={stroke("nerve")}
                strokeWidth={on("nerve") ? 2 : 1.2}
                className="transition-all duration-500"
              />
              {/* Sclera / globe */}
              <circle cx="420" cy="250" r="200" fill="url(#vitreous)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4" />
              {/* Retina lining (back of the eye) */}
              <path
                d="M455 64 A188 188 0 0 1 455 436"
                fill="none"
                stroke={stroke("retina")}
                strokeWidth={on("retina") ? 5 : 3}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
              {/* Macula */}
              <circle cx="607" cy="252" r={on("retina") ? 7 : 5} fill={on("retina") ? "#5cb4ec" : "rgba(255,255,255,0.5)"} className="transition-all duration-500" />
              {/* Cornea */}
              <path
                d="M240 158 C178 190 178 310 240 342"
                fill={on("cornea") ? "rgba(92,180,236,0.14)" : "rgba(219,236,245,0.05)"}
                stroke={stroke("cornea")}
                strokeWidth={on("cornea") ? 4 : 2.4}
                className="transition-all duration-500"
              />
              {/* Iris (upper and lower) */}
              {[
                "M262 166 L262 222",
                "M262 278 L262 334",
              ].map((d) => (
                <path key={d} d={d} stroke={on("iris") ? "#5cb4ec" : "rgba(255,255,255,0.7)"} strokeWidth={on("iris") ? 10 : 8} strokeLinecap="round" className="transition-all duration-500" />
              ))}
              {/* Lens */}
              <ellipse
                cx="292"
                cy="250"
                rx="26"
                ry="62"
                fill={on("lens") ? "rgba(92,180,236,0.3)" : "rgba(219,236,245,0.12)"}
                stroke={stroke("lens")}
                strokeWidth={on("lens") ? 3 : 1.6}
                className="transition-all duration-500"
              />
              {/* Light path converging on the macula */}
              <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" fill="none" strokeDasharray="4 7" className={reduce ? "" : "[animation:dash_3s_linear_infinite]"}>
                <path d="M20 200 L210 205 L292 228 L607 252" />
                <path d="M20 300 L210 295 L292 272 L607 252" />
                <path d="M20 250 L607 252" />
              </g>
            </svg>

            {/* Hotspots */}
            <div role="radiogroup" aria-label={t("hotspotsLabel")}>
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  role="radio"
                  aria-checked={on(h.id)}
                  onClick={() => setActive(h.id)}
                  onFocus={() => setActive(h.id)}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                >
                  <span className="relative grid size-9 place-items-center sm:size-10">
                    {!reduce && on(h.id) && <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand-soft/40" />}
                    <span
                      aria-hidden
                      className={cn(
                        "relative grid size-full place-items-center rounded-full ring-2 transition",
                        on(h.id) ? "bg-white ring-white" : "bg-ink/70 ring-white/60 group-hover:ring-white",
                      )}
                    >
                      <span className={cn("size-2 rounded-full", on(h.id) ? "bg-brand" : "bg-white")} />
                    </span>
                  </span>
                  <span
                    className={cn(
                      "absolute left-1/2 top-full mt-0.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold transition",
                      on(h.id) ? "z-10 bg-white text-ink" : "bg-ink/80 text-white max-sm:sr-only",
                    )}
                  >
                    {t(h.id)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-sm font-semibold tabular-nums text-brand-soft">
              {String(HOTSPOTS.findIndex((h) => h.id === active) + 1).padStart(2, "0")} / 05
            </p>
            <h3 className="mt-3 text-h2 font-semibold text-white">{t(active)}</h3>
            <p className="on-dark-muted mt-5 text-lead text-white/75">{t(`${active}Text`)}</p>
            <p className="eyebrow mt-8 text-white/50">{t("relatedCare")}</p>
            <ul className="mt-3 grid gap-2">
              {current.related.map((slug) => {
                const s = services.find((x) => x.slug === slug)!;
                return (
                  <li key={slug}>
                    <Link
                      href={{ pathname: "/usluge/[slug]", params: { slug } }}
                      className="group flex items-center justify-between rounded-2xl px-5 py-4 text-white ring-1 ring-inset ring-white/15 transition hover:bg-white/5 hover:ring-white/40"
                    >
                      <span className="font-semibold">{pick(s.title, locale)}</span>
                      <ArrowUpRight className="size-5 text-white/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </AnimatePresence>
        <p className="mt-8 text-xs leading-relaxed text-white/45">{t("note")}</p>
      </div>
    </div>
  );
}
