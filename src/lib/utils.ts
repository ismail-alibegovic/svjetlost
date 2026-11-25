import type { Locale } from "@/i18n/routing";
import type { L, LList } from "@/types/content";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Pick the localized value of a content string. */
export function pick(value: L, locale: string): string {
  return value[(locale as Locale)] ?? value.bs;
}

export function pickList(value: LList, locale: string): string[] {
  return value[(locale as Locale)] ?? value.bs;
}

/** Deterministic thousands grouping (Intl locale data differs between Node and browsers). */
export function formatNumber(value: number, locale: string) {
  const sep = locale === "bs" ? "." : ",";
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
