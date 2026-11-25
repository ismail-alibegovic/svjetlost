"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Accessibility, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Prefs = { scale: "md" | "lg" | "xl"; contrast: boolean; motion: boolean };
const KEY = "svjetlost-a11y";
const DEFAULTS: Prefs = { scale: "md", contrast: false, motion: false };

function apply(p: Prefs) {
  const h = document.documentElement;
  if (p.scale === "md") h.removeAttribute("data-text-scale");
  else h.setAttribute("data-text-scale", p.scale);
  if (p.contrast) h.setAttribute("data-contrast", "high");
  else h.removeAttribute("data-contrast");
  if (p.motion) h.setAttribute("data-motion", "reduce");
  else h.removeAttribute("data-motion");
}

/** Optional comfort settings. The site itself is built to be accessible without them. */
export function A11yPanel() {
  const t = useTranslations("a11y");
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const p = { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Prefs>) };
        setPrefs(p);
        apply(p);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  function update(next: Prefs) {
    setPrefs(next);
    apply(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("button, input")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="fixed bottom-24 right-3 z-40 flex flex-col items-end md:bottom-6 md:right-6">
      {open && (
        <div
          ref={panelRef}
          id="a11y-panel"
          role="region"
          aria-label={t("title")}
          className="mb-3 w-[min(20rem,calc(100vw-1.5rem))] rounded-3xl bg-paper p-5 text-ink shadow-[0_30px_60px_-20px_rgba(10,25,41,0.45)] ring-1 ring-line"
        >
          <div className="flex items-center justify-between">
            <p className="font-display text-lg font-semibold">{t("title")}</p>
            <button type="button" onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full hover:bg-mist" aria-label={t("title") + " — X"}>
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <fieldset className="mt-4">
            <legend className="text-sm font-semibold">{t("textSize")}</legend>
            <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-full bg-mist p-1">
              {(["md", "lg", "xl"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={prefs.scale === s}
                  onClick={() => update({ ...prefs, scale: s })}
                  className={cn("rounded-full py-2 text-sm font-medium transition", prefs.scale === s ? "bg-ink text-white" : "hover:bg-white")}
                >
                  {t(s === "md" ? "normal" : s === "lg" ? "large" : "xlarge")}
                </button>
              ))}
            </div>
          </fieldset>
          {([
            ["contrast", t("contrast")],
            ["motion", t("motion")],
          ] as const).map(([k, label]) => (
            <label key={k} className="mt-4 flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold">
              {label}
              <input
                type="checkbox"
                role="switch"
                checked={prefs[k]}
                onChange={(e) => update({ ...prefs, [k]: e.target.checked })}
                className="peer sr-only"
              />
              <span aria-hidden className="relative h-6 w-11 shrink-0 rounded-full bg-line transition peer-checked:bg-brand peer-focus-visible:ring-4 peer-focus-visible:ring-brand/30 after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
            </label>
          ))}
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <p className="text-xs text-muted">{t("note")}</p>
            <button type="button" onClick={() => update(DEFAULTS)} className="text-sm font-semibold text-brand hover:underline">
              {t("reset")}
            </button>
          </div>
        </div>
      )}
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((o) => !o)}
        className="grid size-12 place-items-center rounded-full bg-paper text-ink shadow-[0_10px_30px_-10px_rgba(10,25,41,0.5)] ring-1 ring-line transition hover:bg-ice"
        aria-label={t("open")}
      >
        <Accessibility className="size-5" aria-hidden />
      </button>
    </div>
  );
}
