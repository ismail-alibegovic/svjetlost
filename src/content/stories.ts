import type { Img, Story } from "@/types/content";

const src = "https://svjetlost.ba/iskustva-nasih-korisnika/38";

function photo(slug: string, name: string, w: number, h: number): Img {
  return {
    src: `/images/stories/${slug}.webp`,
    width: w,
    height: h,
    kind: "clinic",
    alt: { bs: `${name} u Klinici Svjetlost`, en: `${name} at Svjetlost clinic` },
  };
}

/**
 * Quotes are reproduced verbatim (Bosnian) from the testimonials published on svjetlost.ba.
 * English versions are our translations and are marked as such in the UI.
 * Publication of names and photographs in a new website requires renewed consent.
 */
export const stories: Story[] = [
  {
    slug: "elmedin-behlic",
    name: "Elmedin Behlić",
    role: { bs: "Student", en: "Student" },
    quote: {
      bs: "Dan poslije operacije osvanulo je kristalno jutro, jutro koje je neopisivo, jutro koje nikad neću zaboraviti.",
      en: "The day after the operation I woke to a crystal-clear morning — an indescribable morning I will never forget.",
    },
    translated: true,
    image: photo("elmedin-behlic", "Elmedin Behlić", 262, 262),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/elmedin-behlic-student/2113",
    scope: "sarajevo",
  },
  {
    slug: "abdulah-sidran",
    name: "Abdulah Sidran",
    role: { bs: "Bosanskohercegovački pisac", en: "Bosnian writer" },
    quote: {
      bs: "Svoje oči sam povjerio timu ljekara Klinike Svjetlost u Sarajevu i jako sam zadovoljan.",
      en: "I entrusted my eyes to the team of doctors at Svjetlost in Sarajevo and I am very satisfied.",
    },
    translated: true,
    image: photo("abdulah-sidran", "Abdulah Sidran", 262, 262),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/abdulah-sidran-bh-pisac/41",
    scope: "sarajevo",
  },
  {
    slug: "nikolina-veljovic",
    name: "Nikolina Veljović",
    role: { bs: "Televizijska voditeljica", en: "Television presenter" },
    quote: {
      bs: "Divan je osjećaj probuditi se ujutro i vidjeti. Bez leća ili naočala.",
      en: "It’s a wonderful feeling to wake up in the morning and see. Without lenses or glasses.",
    },
    translated: true,
    image: photo("nikolina-veljovic", "Nikolina Veljović", 262, 262),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/nikolina-veljovic-bh-televizijska-voditeljica/39",
    scope: "sarajevo",
  },
  {
    slug: "amila-terzimehic",
    name: "Amila Terzimehić",
    role: { bs: "Glumica", en: "Actress" },
    quote: {
      bs: "U Kliniku Svjetlost sam došla po preporuci doktorice koja me je i operisala. U vrlo kratkom vremenu veoma ljubazni i stručni doktori su riješili moje probleme sa vidom.",
      en: "I came to Svjetlost on the recommendation of the doctor who later operated on me. In a very short time, very kind and expert doctors solved my vision problems.",
    },
    translated: true,
    image: photo("amila-terzimehic", "Amila Terzimehić", 720, 960),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/amila-terzimehic-bh-glumica/2156",
    scope: "sarajevo",
  },
  {
    slug: "sandy-husic",
    name: "Sandy Husić",
    role: { bs: "Fudbaler", en: "Footballer" },
    quote: {
      bs: "Naočale sam nosio od djetinjstva, potom sam prešao na leće, a sad sam shvatio da mogu živjeti bez jednog i drugog.",
      en: "I wore glasses from childhood, then switched to lenses, and now I’ve realised I can live without either.",
    },
    translated: true,
    image: photo("sandy-husic", "Sandy Husić", 262, 262),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/sandy-husic-fudbaler/246",
    scope: "sarajevo",
  },
  {
    slug: "adna-stambolic",
    name: "Adna Stambolić",
    role: { bs: "Svjetska juniorska prvakinja u kickboxu", en: "World junior kickboxing champion" },
    quote: {
      bs: "Operacija je trajala samo nekoliko minuta, a omogućila mi je da se odmah drugi dan vratim svojim svakodnevnim aktivnostima.",
      en: "The operation lasted only a few minutes and let me return to my everyday activities the very next day.",
    },
    translated: true,
    image: photo("adna-stambolic", "Adna Stambolić", 262, 262),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/adna-stambolic-svjetska-juniorska-prvakinja-u-kick-boxu/247",
    scope: "sarajevo",
  },
  {
    slug: "davor-sucic",
    name: "Davor Sučić",
    role: { bs: "Gitarista i osnivač „Zabranjenog pušenja“", en: "Guitarist and co-founder of Zabranjeno pušenje" },
    quote: {
      bs: "Iako imam iskustva u privatnim klinikama, Vas moram da podignem na viši nivo!",
      en: "Although I have experience with private clinics, I have to put you on a higher level!",
    },
    translated: true,
    image: photo("davor-sucic", "Davor Sučić", 247, 247),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/davor-sucic-gitarist-i-osnivac-zabranjenog-pusenja/2122",
    scope: "sarajevo",
  },
  {
    slug: "alma-mehinovic",
    name: "Alma Mehinović",
    role: { bs: "Pacijentica", en: "Patient" },
    quote: {
      bs: "Operacija je potpuno bezbolna, jako sam sretna i zadovoljna kako je sve prošlo.",
      en: "The operation was completely painless; I’m very happy and satisfied with how everything went.",
    },
    translated: true,
    image: photo("alma-mehinovic", "Alma Mehinović", 262, 262),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/mehinovic-alma-pacijentica/241",
    scope: "sarajevo",
  },
  {
    slug: "nijaz-skenderagic",
    name: "Nijaz Skenderagić",
    role: { bs: "Poduzetnik", en: "Entrepreneur" },
    quote: {
      bs: "Dan nakon zahvata uistinu bolje vidim svijet oko sebe.",
      en: "The day after the procedure I truly see the world around me better.",
    },
    translated: true,
    image: photo("nijaz-skenderagic", "Nijaz Skenderagić", 262, 262),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/nijaz-skenderagic-bh-poduzetnik/40",
    scope: "sarajevo",
  },
  {
    slug: "rade-serbedzija",
    name: "Rade Šerbedžija",
    role: { bs: "Glumac", en: "Actor" },
    quote: {
      bs: "Godinama mi je padao mrak na oči i odlučio sam to riješiti u Klinici Svjetlost kod profesora Nikice Gabrića.",
      en: "For years darkness had been falling over my eyes, and I decided to have it treated at Svjetlost with Professor Nikica Gabrić.",
    },
    translated: true,
    image: photo("rade-serbedzija", "Rade Šerbedžija", 960, 720),
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/rade-serbedzija-glumac/2160",
    scope: "group",
  },
  {
    slug: "doris-dragovic",
    name: "Doris Dragović",
    role: { bs: "Pjevačica", en: "Singer" },
    quote: {
      bs: "Ja sam dugogodišnji pacijent ove moje kuće. Svjetlost — kad uđeš jednom, tu si doma.",
      en: "I have been a patient of this house of mine for many years. Svjetlost — once you walk in, you’re home.",
    },
    translated: true,
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/doris-dragovic-pjevacica/2429",
    scope: "group",
  },
  {
    slug: "tim-roth",
    name: "Tim Roth",
    role: { bs: "Glumac", en: "Actor" },
    quote: {
      bs: "Ovo je nevjerovatno iskustvo. Bilo je bezbolno, fascinantno i funkcionira.",
      en: "This is an incredible experience. It was painless, fascinating and it works.",
    },
    translated: true,
    source: "https://svjetlost.ba/ostalo/iskustva-nasih-korisnika/tim-roth-glumac/2430",
    scope: "group",
  },
];

export const storiesSource = src;
