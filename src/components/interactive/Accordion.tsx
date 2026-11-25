"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Accordion({ items, tone = "light", defaultOpen = 0 }: { items: { id: string; q: string; a: string }[]; tone?: "light" | "dark"; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduce = useReducedMotion();
  const uid = useId();
  const dark = tone === "dark";
  return (
    <div className={cn("border-t", dark ? "border-white/15" : "border-line")}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.id} id={it.id} className={cn("border-b", dark ? "border-white/15" : "border-line")}>
            <h3>
              <button
                type="button"
                id={`${uid}-b-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${uid}-p-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn("group flex w-full items-start justify-between gap-6 py-6 text-left font-display text-lg font-semibold leading-snug sm:text-xl", dark ? "text-white" : "text-ink")}
              >
                {it.q}
                <span
                  aria-hidden
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-inset transition duration-500",
                    dark ? "ring-white/25" : "ring-line group-hover:ring-ink/40",
                    isOpen && (dark ? "bg-white text-ink" : "bg-ink text-white ring-ink"),
                  )}
                >
                  <Plus className={cn("size-4 transition-transform duration-500", isOpen && "rotate-45")} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-p-${i}`}
                  role="region"
                  aria-labelledby={`${uid}-b-${i}`}
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn("max-w-3xl pb-7 pr-12 leading-relaxed", dark ? "on-dark-muted text-white/70" : "text-muted")}>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
