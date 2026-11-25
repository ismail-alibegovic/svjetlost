import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "light" | "ghost" | "ghost-light" | "outline";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.95rem] font-semibold tracking-[-0.005em] transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-strong shadow-[0_8px_30px_-12px_rgba(0,107,181,0.8)]",
  light: "bg-white text-ink hover:bg-ice",
  ghost: "text-ink hover:bg-mist",
  "ghost-light": "text-white ring-1 ring-inset ring-white/35 hover:bg-white/10 hover:ring-white/60",
  outline: "text-ink ring-1 ring-inset ring-ink/20 hover:ring-ink/50 hover:bg-mist",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

function Arrow() {
  return (
    <span
      aria-hidden
      className="-mr-2 grid size-7 place-items-center rounded-full bg-current/10 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <ArrowUpRight className="size-4" strokeWidth={2} />
    </span>
  );
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  arrow = false,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  return (
    <Link className={buttonClass(variant, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function ExternalButton({
  variant = "primary",
  className,
  children,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return (
    <a className={buttonClass(variant, className)} {...props}>
      {children}
    </a>
  );
}
