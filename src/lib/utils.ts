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

/** Keyless Google Maps embed (verified to be frameable in Chromium). */
export function googleEmbedUrl({ lat, lon }: { lat: number; lon: number }, hl = "en") {
  return `https://maps.google.com/maps?q=${lat},${lon}&z=16&hl=${hl}&output=embed`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function monthLabel(date: string, locale: string) {
  const [y, m] = date.split("-").map(Number);
  const bs = ["januar","februar","mart","april","maj","juni","juli","august","septembar","oktobar","novembar","decembar"];
  const en = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  return `${(locale === "bs" ? bs : en)[m - 1]} ${y}`;
}
