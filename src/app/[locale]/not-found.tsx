import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { pick } from "@/lib/utils";

export default async function NotFound() {
  const t = await getTranslations("pages");
  const tn = await getTranslations("nav");
  const locale = await getLocale();
  return (
    <section className="grain relative overflow-hidden bg-ink pb-24 pt-40 text-white">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 size-[38rem] rounded-full border border-white/10" />
      <div aria-hidden className="pointer-events-none absolute -right-16 top-34 size-[22rem] rounded-full border border-white/10 [filter:blur(6px)]" />
      <div className="container-x relative">
        <p className="eyebrow text-brand-soft">404</p>
        <h1 className="mt-5 max-w-3xl text-h1 font-semibold [filter:blur(0.6px)]">{t("notFoundTitle")}</h1>
        <p className="on-dark-muted mt-6 max-w-xl text-lead text-white/70">{t("notFoundText")}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="light" arrow>{t("notFoundHome")}</ButtonLink>
          <ButtonLink href="/usluge" variant="ghost-light">{tn("services")}</ButtonLink>
        </div>
        <ul className="mt-16 flex flex-wrap gap-x-6 gap-y-2 text-white/60">
          {services.slice(0, 5).map((s) => (
            <li key={s.slug}>
              <Link href={{ pathname: "/usluge/[slug]", params: { slug: s.slug } }} className="link-underline hover:text-white">
                {pick(s.title, locale)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
