"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

/** Controlled parallax: the image drifts and scales slightly as the hero scrolls away. */
export function HeroParallax({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 140]);
  const scale = useTransform(scrollY, [0, 900], [1, 1.08]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} style={{ y, scale }}>
      {children}
    </motion.div>
  );
}
