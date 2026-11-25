import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { localizedUrl } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type Href = Parameters<typeof localizedUrl>[1];
export type Crumb = { label: string; href?: Href };

export async function Breadcrumbs({ items, locale, tone = "dark" }: { items: Crumb[]; locale: Locale; tone?: "light" | "dark" }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const all: Crumb[] = [{ label: t("breadcrumbHome"), href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: localizedUrl(locale, c.href) } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm", tone === "dark" ? "text-white/65" : "text-muted")}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {all.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight aria-hidden className="size-3.5 opacity-60" />}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className={cn("link-underline", tone === "dark" ? "hover:text-white" : "hover:text-ink")}>
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={tone === "dark" ? "text-white" : "text-ink"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
