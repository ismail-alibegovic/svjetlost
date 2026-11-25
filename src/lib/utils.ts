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

/**
 * Google Maps Embed API URL (free, but requires NEXT_PUBLIC_GOOGLE_MAPS_KEY).
 * Google's keyless `output=embed` URL sends `X-Frame-Options: SAMEORIGIN`, so it cannot be iframed.
 * Returns null when no key is configured.
 */
export function googleEmbedUrl({ lat, lon }: { lat: number; lon: number }) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!key) return null;
  return `https://www.google.com/maps/embed/v1/place?key=${encodeURIComponent(key)}&q=${lat},${lon}&zoom=16`;
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
