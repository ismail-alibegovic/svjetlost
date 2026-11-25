import type { L, Location, Scope } from "@/types/content";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://svjetlost-redesign-demo.vercel.app";

export const clinic = {
  brand: "Svjetlost",
  legalName: "PZU Specijalna bolnica za oftalmologiju Svjetlost Sarajevo",
  officialSite: "https://svjetlost.ba/",
  primaryPhone: "+387 33 762 772",
  primaryPhoneHref: "tel:+38733762772",
  secondaryPhone: "+387 33 821 919",
  secondaryPhoneHref: "tel:+38733821919",
  internationalPhone: "+385 1 777 5656",
  internationalPhoneHref: "tel:+38517775656",
  email: "info@svjetlost-sarajevo.ba",
  callCentreEmail: "callcentar@svjetlost.ba",
  founded: { group: 1998, sarajevo: 2011 },
  social: [
    { name: "Facebook", url: "https://www.facebook.com/Sarajevo.Svjetlost" },
    { name: "Instagram", url: "https://www.instagram.com/klinika_svjetlost_sarajevo/" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UCfFGWwpc8cMDi-yCOCsVhtg" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/10465545" },
  ],
  description: {
    bs: "Specijalna bolnica za oftalmologiju Svjetlost u Sarajevu radi od juna 2011. godine kao dio regionalne grupe očnih klinika Svjetlost, osnovane 1998. u Zagrebu.",
    en: "Svjetlost Special Hospital for Ophthalmology in Sarajevo has operated since June 2011 as part of the regional Svjetlost group of eye clinics, founded in Zagreb in 1998.",
  } satisfies L,
};

const weekdays: Location["hours"] = [
  { days: { bs: "Ponedjeljak – četvrtak", en: "Monday – Thursday" }, time: "08:00 – 20:00" },
  { days: { bs: "Petak", en: "Friday" }, time: "08:00 – 18:00" },
];

export const locations: Location[] = [
  {
    slug: "ilidza",
    name: { bs: "Svjetlost Sarajevo – Ilidža", en: "Svjetlost Sarajevo – Ilidža" },
    shortName: { bs: "Ilidža", en: "Ilidža" },
    legalName: "Specijalna bolnica za oftalmologiju Svjetlost Sarajevo",
    legalNameEn: "Svjetlost Sarajevo Special Hospital for Ophthalmology",
    street: "Dr. Mustafe Pintola 23",
    postal: "71000",
    city: "Sarajevo – Ilidža",
    phone: "+387 33 762 772",
    fax: "+387 33 762 771",
    email: "info@svjetlost-sarajevo.ba",
    hours: weekdays,
    mapQuery: "Dr. Mustafe Pintola 23, 71000 Ilidža, Sarajevo",
    coords: { lat: 43.82919, lon: 18.30927, exact: true },
    services: {
      bs: "Glavni centar: dvije operacijske sale, šest ambulanti, dijagnostički centar i dnevna bolnica.",
      en: "Main centre: two operating theatres, six consulting rooms, a diagnostic centre and day-surgery unit.",
    },
    note: {
      bs: "Prema službenoj stranici, sarajevski centar ima dvije operacijske sale i šest ambulanti. Raspodjelu po lokacijama potrebno je potvrditi s klinikom.",
      en: "According to the official website the Sarajevo centre has two operating theatres and six consulting rooms. Allocation per location must be confirmed with the clinic.",
    },
  },
  {
    slug: "centar",
    name: { bs: "Svjetlost Sarajevo – Centar", en: "Svjetlost Sarajevo – Centar" },
    shortName: { bs: "Centar", en: "Centar" },
    legalName: "Specijalna bolnica za oftalmologiju Svjetlost Sarajevo – Podružnica 1",
    legalNameEn: "Svjetlost Sarajevo Special Hospital for Ophthalmology – Branch 1",
    street: "Bolnička 8A",
    postal: "71000",
    city: "Sarajevo",
    phone: "+387 33 821 919",
    fax: "+387 33 762 771",
    email: "klinika@svjetlost-sarajevo.ba",
    hours: weekdays,
    mapQuery: "Bolnička 8A, 71000 Sarajevo",
    // OSM has no point for Bolnička 8A: this is a point on the street, so the pin is approximate.
    // Replace with the building's coordinates (Google Maps: right-click the building) once confirmed.
    coords: { lat: 43.8674, lon: 18.415, exact: true },
    services: {
      bs: "Podružnica 1 u centru grada. Popis usluga dostupnih na ovoj lokaciji nije objavljen na službenoj stranici.",
      en: "Branch 1 in the city centre. The list of services available at this location is not published on the official website.",
    },
  },
];

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: L;
  scope: Scope;
  format?: "plain" | "grouped";
}

/** All figures are quoted from svjetlost.ba. Group figures are labelled as such. */
export const stats: Stat[] = [
  { value: 2011, label: { bs: "godina otvaranja klinike u Sarajevu", en: "year the Sarajevo clinic opened" }, scope: "sarajevo" },
  { value: 2, label: { bs: "lokacije u Sarajevu — Ilidža i Centar", en: "Sarajevo locations — Ilidža and Centar" }, scope: "sarajevo" },
  { value: 16, label: { bs: "ljekara predstavljenih u sarajevskom timu", en: "doctors presented in the Sarajevo team" }, scope: "sarajevo" },
  { value: 250000, suffix: "+", format: "grouped", label: { bs: "operacija oka u grupi Svjetlost", en: "eye operations across the Svjetlost group" }, scope: "group" },
  { value: 80, suffix: "+", label: { bs: "stalno zaposlenih oftalmologa u grupi", en: "full-time ophthalmologists in the group" }, scope: "group" },
  { value: 1998, label: { bs: "osnivanje Klinike Svjetlost u Zagrebu", en: "Svjetlost founded in Zagreb" }, scope: "group" },
];

export const awards: { name: string; year: string; place?: string }[] = [
  { name: "Trusted Brand Hrvatska", year: "2012" },
  { name: "Oftalmološki Oscar – Videocatarattarefrattiva", year: "2015", place: "Milano" },
  { name: "Best Regional Hospital", year: "2016", place: "Cannes" },
  { name: "Quality Choice Prize", year: "2016", place: "Berlin" },
  { name: "ISO 9001:2015", year: "—" },
  { name: "Bonitetna ocjena „AAA“, Bisnode", year: "2018" },
  { name: "Star Diamond Award", year: "2018" },
];

export const timeline: { year: string; text: L; scope: Scope }[] = [
  { year: "1998", scope: "group", text: { bs: "Prof. dr. sc. Nikica Gabrić osniva Polikliniku Svjetlost u Zagrebu i nabavlja prvi laser za skidanje dioptrije u Hrvatskoj.", en: "Prof. Nikica Gabrić founds the Svjetlost polyclinic in Zagreb and acquires Croatia’s first laser for vision correction." } },
  { year: "2005", scope: "group", text: { bs: "Prva intraokularna injekcija Avastina u regiji.", en: "First intra-ocular Avastin injection in the region." } },
  { year: "2009", scope: "group", text: { bs: "Otvorena nova zgrada klinike u Zagrebu i nabavljen prvi femtosekundni laser u Hrvatskoj.", en: "New clinic building opens in Zagreb; first femtosecond laser in Croatia." } },
  { year: "2011", scope: "sarajevo", text: { bs: "U junu počinje s radom Svjetlost u Sarajevu.", en: "Svjetlost Sarajevo opens its doors in June." } },
  { year: "2013", scope: "sarajevo", text: { bs: "Sarajevska poliklinika dobiva status dnevne bolnice i odobrenje za dio specijalističkog staža iz oftalmologije.", en: "The Sarajevo polyclinic becomes a day hospital and is approved to host part of ophthalmology residency training." } },
  { year: "2018", scope: "group", text: { bs: "Klinika Svjetlost prima nagradu Star Diamond Award i otvara centar u Budvi.", en: "Svjetlost receives the Star Diamond Award and opens a centre in Budva." } },
  { year: "Danas", scope: "sarajevo", text: { bs: "Specijalna bolnica za oftalmologiju i Katedra za oftalmologiju Univerziteta u Sarajevu.", en: "A special hospital for ophthalmology and a teaching department of the University of Sarajevo." } },
];

export const groupCentres = ["Zagreb", "Split", "Sarajevo", "Banja Luka", "Novi Sad", "Budva", "Skopje"];
