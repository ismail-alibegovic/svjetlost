"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { formatNumber } from "@/lib/utils";

export function CountUp({ value, locale, grouped = false, prefix = "", suffix = "" }: { value: number; locale: string; grouped?: boolean; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const fmt = (n: number) => (grouped ? formatNumber(n, locale) : String(n));
  // Years count from a nearby value so they don't spin through 0..2000.
  const isYear = value > 1900 && value < 2100 && !grouped;
  const start = isYear ? value - 25 : 0;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(start + (value - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, start, value]);

  return (
    <span ref={ref}>
      <span aria-hidden>
        {prefix}
        {fmt(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {fmt(value)}
        {suffix}
      </span>
    </span>
  );
}
