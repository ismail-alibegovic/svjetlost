import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "split",
  id,
  children,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "split" | "left" | "center";
  id?: string;
  children?: ReactNode;
  as?: "h1" | "h2";
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "grid gap-6",
        align === "split" && "lg:grid-cols-12 lg:items-end lg:gap-10",
        align === "center" && "mx-auto max-w-3xl text-center",
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-7")}>
        <Reveal>
          <p className={cn("eyebrow mb-5 flex items-center gap-3", dark ? "text-brand-soft" : "text-brand", align === "center" && "justify-center")}>
            <span aria-hidden className="h-px w-8 bg-current" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <Heading id={id} className={cn("text-h2 font-semibold", dark ? "text-white" : "text-ink")}>
            {title}
          </Heading>
        </Reveal>
      </div>
      {(intro || children) && (
        <Reveal delay={0.1} className={cn(align === "split" && "lg:col-span-5 lg:pb-2")}>
          {intro && (
            <p className={cn("text-lead", dark ? "on-dark-muted text-white/70" : "text-muted")}>{intro}</p>
          )}
          {children}
        </Reveal>
      )}
    </div>
  );
}
