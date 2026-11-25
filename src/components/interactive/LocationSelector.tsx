"use client";
import type React from "react";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { locations } from "@/content/clinic";
import { BookButton } from "@/components/booking/BookButton";
import { cn, mapsUrl, osmEmbedUrl, pick, telHref } from "@/lib/utils";
import { parseStored, useStored } from "@/lib/use-stored";

export function LocationSelector() {
  const locale = useLocale();
  const t = useTranslations("locationsSection");
  const tc = useTranslations("common");
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [mapClicked, setMapOn] = useState(false);
  const consent = parseStored<{ maps: boolean }>(useStored("svjetlost-cookie-choice"));
  const mapOn = mapClicked || Boolean(consent?.maps);
  const l = locations[idx];


  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <div role="tablist" aria-label={t("selectorLabel")} className="grid grid-cols-2 gap-1.5 rounded-full bg-mist p-1.5">
          {locations.map((loc, i) => (
            <button
              key={loc.slug}
              id={`loc-tab-${loc.slug}`}
              role="tab"
              type="button"
              aria-selected={idx === i}
              aria-controls={`loc-panel-${loc.slug}`}
              tabIndex={idx === i ? 0 : -1}
              onClick={() => setIdx(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const n = (i + 1) % locations.length;
                  setIdx(n);
                  document.getElementById(`loc-tab-${locations[n].slug}`)?.focus();
                }
              }}
              className={cn("min-h-12 rounded-full text-sm font-semibold transition", idx === i ? "bg-ink text-white" : "text-ink hover:bg-white")}
            >
              {pick(loc.shortName, locale)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={l.slug}
            id={`loc-panel-${l.slug}`}
            role="tabpanel"
            aria-labelledby={`loc-tab-${l.slug}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-h3 font-semibold text-ink">{pick(l.name, locale)}</h3>
            <p className="mt-2 text-sm text-muted">{locale === "en" ? (l.legalNameEn ?? l.legalName) : l.legalName}</p>
            <dl className="mt-8 grid gap-5">
              <Row icon={<MapPin className="size-5" />} label={tc("address")}>
                {l.street}, {l.postal} {l.city}
              </Row>
              <Row icon={<Phone className="size-5" />} label={tc("phone")}>
                <a href={telHref(l.phone)} className="link-underline font-semibold text-ink">{l.phone}</a>
                {l.fax && <span className="block text-sm text-muted">{tc("fax")}: {l.fax}</span>}
              </Row>
              <Row icon={<Mail className="size-5" />} label={tc("email")}>
                <a href={`mailto:${l.email}`} className="link-underline break-all text-ink">{l.email}</a>
              </Row>
              <Row icon={<Clock className="size-5" />} label={tc("hours")}>
                <ul>
                  {l.hours.map((h) => (
                    <li key={h.time} className="flex justify-between gap-6">
                      <span>{pick(h.days, locale)}</span>
                      <span className="tabular-nums text-ink">{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-1 text-xs text-muted">{tc("workingHoursNote")}</p>
              </Row>
            </dl>
            <p className="mt-6 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-muted">{pick(l.services, locale)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookButton preset={{ location: l.slug as "ilidza" | "centar" }}>{tc("book")}</BookButton>
              <a href={mapsUrl(l.mapQuery)} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold text-ink ring-1 ring-inset ring-ink/20 transition hover:bg-mist">
                <Navigation className="size-4" aria-hidden /> {tc("directions")}
                <span className="sr-only"> (Google Maps)</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="lg:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink text-white lg:aspect-auto lg:h-full lg:min-h-[32rem]">
          {mapOn ? (
            <iframe
              key={l.slug}
              title={`${t("mapTitle")}: ${pick(l.name, locale)}`}
              src={osmEmbedUrl(l.coords)}
              className="absolute inset-0 size-full border-0 grayscale-[30%]"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="grain absolute inset-0 flex flex-col justify-between bg-[radial-gradient(circle_at_70%_30%,#16304a,#0a1929_70%)] p-8">
              {/* Stylised, privacy-friendly map placeholder */}
              <svg aria-hidden viewBox="0 0 600 400" className="absolute inset-0 size-full opacity-40" preserveAspectRatio="xMidYMid slice">
                <path d="M-20 260 C120 230 200 280 320 240 S520 190 640 210" stroke="#5cb4ec" strokeWidth="2.5" fill="none" />
                {Array.from({ length: 12 }).map((_, k) => (
                  <path key={k} d={`M${k * 55 - 20} -10 L${k * 55 + 40} 410`} stroke="white" strokeOpacity=".06" />
                ))}
                {Array.from({ length: 9 }).map((_, k) => (
                  <path key={`h${k}`} d={`M-10 ${k * 50} L610 ${k * 50 + 30}`} stroke="white" strokeOpacity=".06" />
                ))}
              </svg>
              <div className="relative flex items-center gap-3">
                <span className="relative grid size-12 place-items-center rounded-full bg-brand">
                  {!reduce && <span className="absolute inset-0 animate-ping rounded-full bg-brand/50" />}
                  <MapPin className="relative size-5" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">{pick(l.name, locale)}</p>
                  <p className="text-sm text-white/65">{l.street}</p>
                </div>
              </div>
              <div className="relative max-w-md">
                <p className="text-sm leading-relaxed text-white/65">{t("mapNote")}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button type="button" onClick={() => setMapOn(true)} className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-ink transition hover:bg-ice">
                    {t("loadMap")}
                  </button>
                  <a href={mapsUrl(l.mapQuery)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 ring-inset ring-white/30 transition hover:bg-white/10">
                    {tc("openInMaps")} <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </div>
                <p className="mt-3 text-xs text-white/45">{t("mapConsent")}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="relative border-t border-line pl-14 pt-5">
      <span aria-hidden className="absolute left-0 top-5 grid size-11 place-items-center rounded-full bg-ice text-brand-strong">{icon}</span>
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{label}</dt>
      <dd className="mt-1 leading-relaxed text-text">{children}</dd>
    </div>
  );
}
