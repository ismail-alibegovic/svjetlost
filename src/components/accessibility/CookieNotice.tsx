"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { buttonClass } from "@/components/ui/Button";
import { parseStored, useStored, writeStored } from "@/lib/use-stored";

const KEY = "svjetlost-cookie-choice";
export const COOKIE_EVENT = "svjetlost:cookie-settings";

export type CookieChoice = { maps: boolean };

export function readCookieChoice(): CookieChoice | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CookieChoice) : null;
  } catch {
    return null;
  }
}

export function CookieNotice() {
  const t = useTranslations("cookies");
  const stored = useStored(KEY);
  const choice = parseStored<CookieChoice>(stored);
  const [manualOpen, setManualOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [mapsDraft, setMaps] = useState<boolean | null>(null);
  const maps = mapsDraft ?? choice?.maps ?? false;
  const open = manualOpen || stored === null;

  useEffect(() => {
    const onOpen = () => {
      setDetails(true);
      setManualOpen(true);
    };
    window.addEventListener(COOKIE_EVENT, onOpen);
    return () => window.removeEventListener(COOKIE_EVENT, onOpen);
  }, []);

  function save(next: CookieChoice) {
    writeStored(KEY, next);
    window.dispatchEvent(new CustomEvent("svjetlost:cookie-changed", { detail: next }));
    setManualOpen(false);
  }

  if (!open) return null;
  return (
    <div role="region" aria-label={t("title")} className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-[45] mx-auto max-w-xl rounded-3xl bg-paper p-5 text-ink shadow-[0_30px_60px_-20px_rgba(10,25,41,0.45)] ring-1 ring-line md:bottom-6 md:left-6 md:right-auto md:mx-0">
      <p className="font-display font-semibold">{t("title")}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t("text")}</p>
      {details && (
        <div className="mt-4 grid gap-3 rounded-2xl bg-mist p-4 text-sm">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked disabled className="size-4 accent-brand" /> {t("necessary")}
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={maps} onChange={(e) => setMaps(e.target.checked)} className="size-4 accent-brand" /> {t("maps")}
          </label>
        </div>
      )}
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        {details ? (
          <button type="button" className={buttonClass("primary", "min-h-11 text-sm")} onClick={() => save({ maps })}>
            {t("save")}
          </button>
        ) : (
          <>
            <button type="button" className={buttonClass("outline", "min-h-11 text-sm")} onClick={() => setDetails(true)}>
              {t("settings")}
            </button>
            <button type="button" className={buttonClass("primary", "min-h-11 text-sm")} onClick={() => save({ maps: false })}>
              {t("accept")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button type="button" className="link-underline hover:text-white" onClick={() => window.dispatchEvent(new Event(COOKIE_EVENT))}>
      {label}
    </button>
  );
}
