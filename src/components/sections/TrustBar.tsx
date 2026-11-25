import { getTranslations } from "next-intl/server";
import { stats } from "@/content/clinic";
import { CountUp } from "@/components/interactive/CountUp";
import { ScopeTag } from "@/components/ui/ScopeTag";
import { Reveal } from "@/components/ui/Reveal";
import { pick } from "@/lib/utils";

export async function TrustBar({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "trust" });
  const groups = [
    { scope: "sarajevo" as const, items: stats.filter((s) => s.scope === "sarajevo") },
    { scope: "group" as const, items: stats.filter((s) => s.scope === "group") },
  ];
  return (
    <section aria-labelledby="trust-title" className="relative bg-paper">
      <div className="container-x py-20 lg:py-24">
        <h2 id="trust-title" className="sr-only">{t("title")}</h2>
        <div className="grid gap-14">
          {groups.map((g, gi) => (
            <div key={g.scope} className={gi === 1 ? "grid gap-6 border-t border-line pt-14 lg:grid-cols-12" : "grid gap-6 lg:grid-cols-12"}>
              <div className="lg:col-span-3"><ScopeTag scope={g.scope} /></div>
              <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-0 lg:col-span-9">
                {g.items.map((s, i) => (
                  <Reveal key={i} delay={i * 0.08} className="flex flex-col-reverse gap-3 border-line sm:border-l sm:px-5 first:sm:border-l-0 first:sm:pl-0">
                    <dt className="max-w-[14rem] text-sm leading-snug text-muted">{pick(s.label, locale)}</dt>
                    <dd className="font-display text-[clamp(2.4rem,1.5rem+2.6vw,4.25rem)] font-semibold leading-none tracking-[-0.04em] text-ink tabular-nums">
                      <CountUp value={s.value} locale={locale} grouped={s.format === "grouped"} prefix={s.prefix} suffix={s.suffix} />
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-3xl text-xs leading-relaxed text-muted">{t("note")}</p>
      </div>
    </section>
  );
}
