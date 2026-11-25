"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { doctors, doctorFocusLabels } from "@/content/doctors";
import type { DoctorFocus } from "@/types/content";
import { cn, pick } from "@/lib/utils";
import { DoctorCard } from "./DoctorCard";

const FILTERS: (DoctorFocus | "all")[] = ["all", "refractive", "cataract", "retina", "cornea", "glaucoma", "general", "team"];

export function DoctorDirectory() {
  const locale = useLocale();
  const t = useTranslations("doctorsSection");
  const reduce = useReducedMotion();
  const [f, setF] = useState<DoctorFocus | "all">("all");
  const list = doctors.filter((d) => f === "all" || d.focus.includes(f));
  return (
    <div>
      <div role="group" aria-label={t("filterLabel")} className="no-scrollbar -mx-[var(--page-gutter)] flex gap-2 overflow-x-auto px-[var(--page-gutter)] pb-2">
        {FILTERS.map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={f === k}
            onClick={() => setF(k)}
            className={cn(
              "min-h-11 shrink-0 rounded-full px-5 text-sm font-semibold transition",
              f === k ? "bg-ink text-white" : "text-ink ring-1 ring-inset ring-line hover:ring-ink/40",
            )}
          >
            {pick(doctorFocusLabels[k], locale)}
            <span className="ml-2 text-xs opacity-60 tabular-nums">{k === "all" ? doctors.length : doctors.filter((d) => d.focus.includes(k)).length}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {list.length}
      </p>
      {list.length === 0 ? (
        <p className="mt-10 text-muted">{t("noResults")}</p>
      ) : (
        <ul className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((d) => (
              <motion.li
                key={d.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <DoctorCard doctor={d} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
