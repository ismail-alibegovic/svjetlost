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
 * OpenStreetMap embed (frameable, no API key). Google's `output=embed` URL now redirects to
 * /maps/embed with `X-Frame-Options: SAMEORIGIN`, so it can no longer be iframed without an API key.
 */
export function osmEmbedUrl({ lat, lon, exact }: { lat: number; lon: number; exact: boolean }) {
  const dLon = 0.004;
  const dLat = 0.0024;
  const bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].map((n) => n.toFixed(5)).join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${exact ? `&marker=${lat},${lon}` : ""}`;
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
