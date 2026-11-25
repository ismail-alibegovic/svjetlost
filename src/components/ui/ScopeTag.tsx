import { useTranslations } from "next-intl";
import type { Scope } from "@/types/content";
import { cn } from "@/lib/utils";

export function ScopeTag({ scope, tone = "light", className }: { scope: Scope; tone?: "light" | "dark"; className?: string }) {
  const t = useTranslations("common");
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]",
        scope === "sarajevo"
          ? tone === "dark" ? "bg-brand/25 text-brand-soft" : "bg-ice text-brand-strong"
          : tone === "dark" ? "bg-white/10 text-white/75" : "bg-mist text-muted ring-1 ring-inset ring-line",
        className,
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", scope === "sarajevo" ? "bg-current" : "border border-current")} />
      {scope === "sarajevo" ? t("sarajevo") : t("group")}
      <span className="sr-only"> — {scope === "sarajevo" ? t("scopeSarajevo") : t("scopeGroup")}</span>
    </span>
  );
}
