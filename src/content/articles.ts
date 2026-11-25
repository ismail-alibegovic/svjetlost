import type { Article, Img } from "@/types/content";
import { images } from "./images";

const award: Img = {
  src: "/images/news/samsara-award.webp",
  width: 1476,
  height: 964,
  kind: "clinic",
  alt: {
    bs: "Prof. dr. sc. Nikica Gabrić i tim Klinike Svjetlost primaju nagradu na 16. CSCRS kongresu",
    en: "Prof. Nikica Gabrić and the Svjetlost team receiving an award at the 16th CSCRS congress",
  },
};

/** News items from svjetlost.ba/novosti (November 2026). Body text is condensed from the originals. */
export const articles: Article[] = [
  {
    slug: "16-cscrs-kongres-zagreb",
    date: "2026-11",
    scope: "group",
    tag: { bs: "Kongres", en: "Congress" },
    title: {
      bs: "16. CSCRS kongres: dva dana na kojima je Zagreb bio središte svjetske oftalmologije",
      en: "16th CSCRS congress: two days when Zagreb was the centre of world ophthalmology",
    },
    excerpt: {
      bs: "Rožnica uzgojena u laboratoriju, teleskop koji se ugrađuje u oko i robotska hirurgija retine obilježili su kongres „Novi trendovi u oftalmologiji“.",
      en: "A lab-grown cornea, a telescope implanted in the eye and robotic retinal surgery marked the “New Trends in Ophthalmology” congress.",
    },
    body: [
      {
        bs: "Klinika Svjetlost i Hrvatsko društvo za kirurgiju katarakte i refraktivnu kirurgiju (CSCRS) 20. i 21. novembra okupili su u Zagrebu 72 stručnjaka iz 15 zemalja. Sudjelovanje je i ove godine bilo besplatno za ljekare.",
        en: "On 20 and 21 November, Svjetlost and the Croatian Society of Cataract and Refractive Surgery (CSCRS) brought together 72 experts from 15 countries in Zagreb. Once again, participation was free of charge for doctors.",
      },
      {
        bs: "„Kad u Zagreb dođu svjetski stručnjaci, naši mladi ljekari mogu ih slušati, pitati i s njima razgovarati te upijati znanje i rasti. Na kraju, sve to radimo za dobrobit pacijenata“, rekao je dr. Ivan Gabrić.",
        en: "“When world experts come to Zagreb, our young doctors can listen to them, ask questions, talk with them and grow. In the end, we do all of this for the benefit of patients,” said Dr Ivan Gabrić.",
      },
      {
        bs: "Kompanija Samsara Vision dodijelila je prof. dr. sc. Nikici Gabriću nagradu Excellence in IMT Implantation Award, a Klinika Svjetlost dobila je certifikat prvog svjetskog SING IMT centra izvrsnosti i edukacijskog centra. SING IMT je minijaturni teleskop koji se ugrađuje u oko pacijentima u kasnom stadiju makularne degeneracije.",
        en: "Samsara Vision presented Prof. Nikica Gabrić with the Excellence in IMT Implantation Award, and Svjetlost was certified as the world’s first SING IMT centre of excellence and training centre. SING IMT is a miniature telescope implanted in the eye of patients with late-stage macular degeneration.",
      },
    ],
    image: award,
    source: "https://svjetlost.ba/novosti/16-cscrs-kongres-dva-dana-na-kojima-je-zagreb-bio-srediste-svjetske-oftalmologije/2455",
  },
  {
    slug: "16-cscrs-medjunarodni-kongres",
    date: "2026-11",
    scope: "group",
    tag: { bs: "Priznanja", en: "Recognition" },
    title: { bs: "16. CSCRS međunarodni kongres", en: "16th CSCRS international congress" },
    excerpt: {
      bs: "Prvi dan kongresa donio je međunarodna priznanja, predstavljanje hrvatskog udžbenika refrakcijske hirurgije i predavanja o 3D rožnici.",
      en: "Day one brought international awards, the launch of a Croatian refractive surgery textbook and lectures on the 3D cornea.",
    },
    body: [
      {
        bs: "Dvodnevni skup u hotelu Hilton Garden Inn okupio je 72 predavača iz 15 zemalja. Uz predavanja, ljekari su sudjelovali u praktičnim radionicama i raspravama o zahtjevnim slučajevima.",
        en: "The two-day meeting at the Hilton Garden Inn brought together 72 speakers from 15 countries. Alongside lectures, doctors took part in hands-on workshops and case discussions.",
      },
      {
        bs: "„To je priznanje timu, ne meni osobno. Ujedno je i obaveza: svaki pacijent mora dobiti jednako visok standard skrbi“, rekao je prof. dr. sc. Nikica Gabrić o certifikatu SING IMT centra izvrsnosti.",
        en: "“This recognition belongs to the team, not to me personally. It is also an obligation: every patient must receive the same high standard of care,” said Prof. Nikica Gabrić of the SING IMT centre of excellence certificate.",
      },
    ],
    image: award,
    source: "https://svjetlost.ba/novosti/16-cscrs-medjunarodni-kongres/2453",
  },
  {
    slug: "najveca-imena-svjetske-oftalmologije",
    date: "2026-11",
    scope: "group",
    tag: { bs: "Edukacija", en: "Education" },
    title: { bs: "Najveća imena svjetske oftalmologije dva dana u Zagrebu", en: "The biggest names in world ophthalmology in Zagreb for two days" },
    excerpt: {
      bs: "Kongres koji je prof. dr. sc. Nikica Gabrić osnovao 2003. godine i dalje ima istu nit vodilju: vrhunska i besplatna edukacija za mlade ljekare.",
      en: "The congress founded by Prof. Nikica Gabrić in 2003 still follows the same principle: excellent, free education for young doctors.",
    },
    body: [
      {
        bs: "Među predavačima su bili prof. dr. sc. Michael Mimouni, prof. dr. sc. Lejla Vajzović, prof. dr. sc. Lyndon da Cruz, prof. dr. sc. Rafael Ignacio Barraquer, prof. dr. sc. Mayank A. Nanavaty i dr. Barbara Parolini.",
        en: "Speakers included Prof. Michael Mimouni, Prof. Lejla Vajzović, Prof. Lyndon da Cruz, Prof. Rafael Ignacio Barraquer, Prof. Mayank A. Nanavaty and Dr Barbara Parolini.",
      },
      {
        bs: "Kongres je osnovan 2003. godine s idejom da Hrvatska postane jedna od vodećih zemalja u refraktivnoj hirurgiji. Mladi ljekari ovako slušaju najbolje predavače svijeta bez troškova kotizacije, puta i smještaja.",
        en: "The congress was founded in 2003 with the aim of making Croatia a leading country in refractive surgery. This way, young doctors hear the world’s best speakers without paying for registration, travel or accommodation.",
      },
    ],
    image: images.irisGreen,
    source: "https://svjetlost.ba/novosti/najveca-imena-svjetske-oftalmologije-dva-dana-u-zagrebu/2452",
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
