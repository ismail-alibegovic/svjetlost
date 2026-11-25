import type { Locale } from "@/i18n/routing";

/** A string available in every supported locale. */
export type L = Record<Locale, string>;
export type LList = Record<Locale, string[]>;

/** Where a fact comes from and whether it applies to Sarajevo or the whole group. */
export type Scope = "sarajevo" | "group";

export interface Source {
  label: string;
  url: string;
}

export interface Img {
  src: string;
  alt: L;
  width: number;
  height: number;
  /** "clinic" = official Svjetlost photography, "concept" = licensed conceptual image */
  kind: "clinic" | "concept";
  credit?: string;
}

export type ServiceCategory = "vision-correction" | "surgery" | "medical" | "diagnostics";

export interface ServiceSection {
  id: string;
  title: L;
  body: L;
  bullets?: LList;
}

export interface Service {
  slug: string;
  number: string;
  title: L;
  short: L;
  intro: L;
  category: ServiceCategory;
  featured?: boolean;
  image: Img;
  /** Conditions / sub-topics listed on the official site */
  conditions: LList;
  what: ServiceSection;
  symptoms?: ServiceSection;
  diagnostics: ServiceSection;
  treatment: ServiceSection;
  recovery?: ServiceSection;
  /** Where the procedures are performed, per the official site */
  where: L;
  highlights?: { value: string; label: L; scope: Scope }[];
  technology: string[];
  doctors: string[];
  faq: { q: L; a: L }[];
  related: string[];
  source: Source[];
}

export type DoctorFocus =
  | "refractive"
  | "retina"
  | "cornea"
  | "glaucoma"
  | "cataract"
  | "general"
  | "team";

export interface Doctor {
  slug: string;
  name: string;
  honorific: string;
  title: L;
  focus: DoctorFocus[];
  image: Img;
  summary: L;
  education: L;
  expertise: L;
  memberships?: string[];
  highlights?: L[];
  leadership?: boolean;
  source: string;
}

export interface Device {
  slug: string;
  name: string;
  manufacturer: string | null;
  manufacturerVerified: boolean;
  category: L;
  purpose: L;
  explanation: L;
  services: string[];
  image: Img;
  productImage?: Img;
}

export interface Location {
  slug: string;
  name: L;
  shortName: L;
  legalName: string;
  /** English rendering of the legal name, shown on /en pages (legalName stays the official Bosnian one). */
  legalNameEn?: string;
  street: string;
  postal: string;
  city: string;
  phone: string;
  fax?: string;
  email: string;
  hours: { days: L; time: string }[];
  mapQuery: string;
  /** WGS84 position for the embedded map. `exact: false` = street-level only (no pin is drawn). */
  coords: { lat: number; lon: number; exact: boolean };
  services: L;
  note?: L;
}

export interface Story {
  slug: string;
  name: string;
  role: L;
  quote: L;
  /** true when the English text is our translation of the Bosnian original */
  translated: boolean;
  image?: Img;
  source: string;
  scope: Scope;
}

export interface Faq {
  id: string;
  q: L;
  a: L;
  source: string;
}

export interface Article {
  slug: string;
  date: string;
  title: L;
  excerpt: L;
  body: L[];
  image: Img;
  tag: L;
  source: string;
  scope: Scope;
}
