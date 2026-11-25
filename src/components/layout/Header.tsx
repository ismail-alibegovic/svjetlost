"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { BookButton } from "@/components/booking/BookButton";
import { services, serviceCategories } from "@/content/services";
import { clinic } from "@/content/clinic";
import { images } from "@/content/images";
import { cn, pick } from "@/lib/utils";

type NavKey = "home" | "doctors" | "technology" | "about" | "stories" | "contact";
const NAV: { key: NavKey; href: "/" | "/doktori" | "/tehnologija" | "/o-klinici" | "/iskustva-pacijenata" | "/kontakt" }[] = [
  { key: "doctors", href: "/doktori" },
  { key: "technology", href: "/tehnologija" },
  { key: "about", href: "/o-klinici" },
  { key: "stories", href: "/iskustva-pacijenata" },
  { key: "contact", href: "/kontakt" },
];

/** usePathname() returns the resolved internal path (e.g. /usluge/ocna-mrena); turn it back into its route template. */
function toTemplate(pathname: string, params: ReturnType<typeof useParams>) {
  const slug = typeof params.slug === "string" ? params.slug : null;
  return slug && pathname.endsWith(`/${slug}`) ? pathname.slice(0, -slug.length) + "[slug]" : pathname;
}

export function LanguageSwitcher({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("common");
  return (
    <nav aria-label={t("language")} className={cn("flex items-center gap-1 text-xs font-semibold tracking-[0.12em]", className)}>
      {(["bs", "en"] as const).map((l) => (
        <Link
          key={l}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          href={{ pathname: toTemplate(pathname, params), params } as any}
          locale={l}
          lang={l}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1.5 uppercase transition",
            l === locale
              ? tone === "dark" ? "bg-white/15 text-white" : "bg-ink text-white"
              : tone === "dark" ? "text-white/70 hover:text-white" : "text-muted hover:text-ink",
          )}
        >
          <span aria-hidden>{l}</span>
          <span className="sr-only">{l === "bs" ? "Bosanski" : "English"}</span>
        </Link>
      ))}
    </nav>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const tm = useTranslations("meta");
  const locale = useLocale();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaBtn = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedAt = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on navigation (adjusting state during render, per React docs)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMega(false);
    setMobile(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (mega) {
          setMega(false);
          megaBtn.current?.focus();
        }
        setMobile(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (mega && megaRef.current && !megaRef.current.contains(e.target as Node) && !megaBtn.current?.contains(e.target as Node)) setMega(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [mega]);

  useEffect(() => {
    document.documentElement.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const solid = scrolled || mega;
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (!mega) hoverOpenedAt.current = Date.now();
    setMega(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setMega(false), 160);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Top information bar */}
        <div
          className={cn(
            "hidden overflow-hidden bg-ink text-white/80 transition-[height,opacity] duration-500 ease-[var(--ease-out-expo)] lg:block",
            scrolled ? "h-0 opacity-0" : "h-10 opacity-100",
          )}
        >
          <div className="container-x flex h-10 items-center justify-between text-[0.8125rem]">
            <ul className="flex items-center gap-6">
              <li className="flex items-center gap-2">
                <MapPin className="size-3.5 text-brand-soft" aria-hidden />
                <Link href="/lokacije" className="link-underline hover:text-white">
                  Sarajevo — {t("topbarLocations")}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-3.5 text-brand-soft" aria-hidden />
                <a href={clinic.primaryPhoneHref} className="link-underline hover:text-white">
                  {clinic.primaryPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-3.5 text-brand-soft" aria-hidden />
                <span>{t("topbarHours")}</span>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[0.6875rem] text-white/70">{tm("demoNotice")}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div
          className={cn(
            "transition-[background-color,box-shadow,color] duration-500",
            solid ? "bg-paper text-ink shadow-[0_1px_0_var(--color-line)]" : "bg-transparent text-white",
          )}
        >
          <div className="container-x flex h-[4.5rem] items-center justify-between gap-6">
            <Link href="/" className="shrink-0" aria-label={`Svjetlost Sarajevo — ${t("home")}`}>
              <Logo tone={solid ? "brand" : "white"} className="h-8 lg:h-9" />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1 text-[0.9375rem] font-medium">
                <li onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                  <button
                    ref={megaBtn}
                    type="button"
                    aria-expanded={mega}
                    aria-controls="mega-services"
                    // A click right after hover-open must not immediately close the panel.
                    onClick={() => setMega((m) => (m && Date.now() - hoverOpenedAt.current < 600 ? true : !m))}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2.5 transition",
                      solid ? "hover:bg-mist" : "hover:bg-white/10",
                      isActive("/usluge") && "font-semibold",
                    )}
                  >
                    {t("services")}
                    <ChevronDown className={cn("size-4 transition-transform duration-300", mega && "rotate-180")} aria-hidden />
                  </button>
                </li>
                {NAV.map((n) => (
                  <li key={n.key}>
                    <Link
                      href={n.href}
                      aria-current={isActive(n.href) ? "page" : undefined}
                      className={cn(
                        "relative block rounded-full px-4 py-2.5 transition",
                        solid ? "hover:bg-mist" : "hover:bg-white/10",
                        isActive(n.href) && "font-semibold",
                      )}
                    >
                      {t(n.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={clinic.primaryPhoneHref}
                className={cn("hidden size-11 place-items-center rounded-full transition sm:grid lg:hidden", solid ? "hover:bg-mist" : "hover:bg-white/10")}
                aria-label={`${tc("call")} ${clinic.primaryPhone}`}
              >
                <Phone className="size-5" aria-hidden />
              </a>
              <span className="hidden md:block">
                <BookButton variant={solid ? "primary" : "light"} className="min-h-11 px-5 text-sm">
                  {tc("book")}
                </BookButton>
              </span>
              <button
                type="button"
                onClick={() => setMobile(true)}
                aria-expanded={mobile}
                aria-controls="mobile-menu"
                className={cn("flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 ring-inset transition lg:hidden", solid ? "ring-line hover:bg-mist" : "ring-white/30 hover:bg-white/10")}
              >
                <Menu className="size-5" aria-hidden />
                {tc("menu")}
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              id="mega-services"
              ref={megaRef}
              role="region"
              aria-label={t("megaTitle")}
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
              initial={reduce ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 hidden border-t border-line bg-paper text-ink shadow-[0_30px_60px_-30px_rgba(10,25,41,0.35)] lg:block"
            >
              <div className="container-x grid grid-cols-12 gap-10 py-10">
                <div className="col-span-8">
                  <div className="mb-6 flex items-end justify-between gap-6 border-b border-line pb-5">
                    <p className="max-w-md text-muted">{t("megaIntro")}</p>
                    <Link href="/usluge" className="flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-strong">
                      {t("allServices")} <ArrowRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-10">
                    {serviceCategories
                      .filter((c) => c.id !== "all")
                      .map((cat) => {
                        const items = services.filter((s) => s.category === cat.id);
                        return (
                          <div key={cat.id} className="mb-6">
                            <p className="eyebrow mb-2 text-muted">{pick(cat.label, locale)}</p>
                            <ul>
                              {items.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={{ pathname: "/usluge/[slug]", params: { slug: s.slug } }}
                                    className="group/item -mx-3 flex items-baseline gap-3 rounded-xl px-3 py-2.5 transition hover:bg-mist"
                                  >
                                    <span className="font-display text-xs font-semibold text-brand tabular-nums">{s.number}</span>
                                    <span>
                                      <span className="block font-semibold text-ink">{pick(s.title, locale)}</span>
                                      <span className="line-clamp-1 text-sm text-muted">{pick(s.short, locale)}</span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <Link
                  href={{ pathname: "/usluge/[slug]", params: { slug: "lasersko-skidanje-dioptrije" } }}
                  className="group/feat relative col-span-4 flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-ink p-7 text-white"
                >
                  <Image
                    src={images.schwindSuite.src}
                    alt=""
                    fill
                    sizes="30vw"
                    className="object-cover opacity-70 transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover/feat:scale-105"
                  />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <span className="relative">
                    <span className="eyebrow text-brand-soft">{t("featured")}</span>
                    <span className="mt-3 block font-display text-2xl font-semibold">{t("featuredTitle")}</span>
                    <span className="mt-2 block text-sm text-white/75">{t("featuredText")}</span>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                      {tc("learnMore")} <ArrowRight className="size-4 transition-transform group-hover/feat:translate-x-1" aria-hidden />
                    </span>
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={tc("menu")}
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "circle(0% at 92% 4%)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "circle(150% at 92% 4%)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink text-white lg:hidden"
          >
            <div className="container-x flex h-[4.5rem] shrink-0 items-center justify-between">
              <Logo tone="white" className="h-8" />
              <button
                type="button"
                autoFocus
                onClick={() => setMobile(false)}
                className="flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold ring-1 ring-inset ring-white/30"
              >
                <X className="size-5" aria-hidden />
                {tc("close")}
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex-1 pb-8 pt-6">
              <ul className="divide-y divide-white/10 border-y border-white/10">
                <li>
                  <button
                    type="button"
                    aria-expanded={mobileServices}
                    onClick={() => setMobileServices((v) => !v)}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-[1.75rem] font-semibold"
                  >
                    {t("services")}
                    <ChevronDown className={cn("size-6 transition-transform", mobileServices && "rotate-180")} aria-hidden />
                  </button>
                  {mobileServices && (
                    <ul className="grid gap-1 pb-4">
                      <li>
                        <Link href="/usluge" className="block py-2 text-brand-soft">
                          {t("allServices")}
                        </Link>
                      </li>
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link href={{ pathname: "/usluge/[slug]", params: { slug: s.slug } }} className="flex gap-3 py-2 text-white/85">
                            <span className="w-6 text-xs text-white/45 tabular-nums">{s.number}</span>
                            {pick(s.title, locale)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                {NAV.map((n) => (
                  <li key={n.key}>
                    <Link href={n.href} className="block py-4 font-display text-[1.75rem] font-semibold">
                      {t(n.key)}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 grid grid-cols-2 gap-3 text-white/75">
                <li><Link href="/lokacije">{t("locations")}</Link></li>
                <li><Link href="/cesta-pitanja">{t("faq")}</Link></li>
                <li><Link href="/novosti">{t("news")}</Link></li>
                <li><Link href="/privatnost">{t("privacy")}</Link></li>
                <li className="col-span-2">
                  <button
                    type="button"
                    className="underline underline-offset-4"
                    onClick={() => {
                      setMobile(false);
                      window.dispatchEvent(new Event("svjetlost:a11y-open"));
                    }}
                  >
                    {tc("accessibility")}
                  </button>
                </li>
              </ul>
            </nav>
            <div className="container-x sticky bottom-0 grid gap-3 bg-ink pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4">
              <BookButton variant="light" className="w-full">
                {tc("book")}
              </BookButton>
              <div className="flex items-center justify-between">
                <a href={clinic.primaryPhoneHref} className="flex items-center gap-2 text-sm font-semibold">
                  <Phone className="size-4 text-brand-soft" aria-hidden /> {clinic.primaryPhone}
                </a>
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
