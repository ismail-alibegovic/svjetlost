import type { Doctor, DoctorFocus, Img, L } from "@/types/content";

const base = "https://svjetlost.ba/nasi-doktori";

function portrait(slug: string, name: string, size = 1080): Img {
  return {
    src: `/images/doctors/${slug}.webp`,
    width: size,
    height: slug === "nikica-gabric" ? 700 : size,
    kind: "clinic",
    alt: { bs: `Portret: ${name}`, en: `Portrait of ${name}` },
  };
}

export const doctorFocusLabels: Record<DoctorFocus | "all", L> = {
  all: { bs: "Svi ljekari", en: "All doctors" },
  refractive: { bs: "Refraktivna hirurgija", en: "Refractive surgery" },
  cataract: { bs: "Mrena i leće", en: "Cataract and lenses" },
  retina: { bs: "Retina i žuta pjega", en: "Retina and macula" },
  cornea: { bs: "Rožnica i keratokonus", en: "Cornea and keratoconus" },
  glaucoma: { bs: "Glaukom", en: "Glaucoma" },
  general: { bs: "Opća oftalmologija", en: "General ophthalmology" },
  team: { bs: "Ostali članovi tima", en: "Other team members" },
};

const memberships3: string[] = [
  "Ljekarska/Liječnička komora Kantona Sarajevo",
  "Udruženje ljekara za kataraktu i refraktivnu hirurgiju u BiH",
  "Hrvatsko društvo za kirurgiju katarakte i refraktivnu kirurgiju (CSCRS)",
];

export const doctors: Doctor[] = [
  {
    slug: "nikica-gabric",
    name: "Nikica Gabrić",
    honorific: "prof. dr. sc.",
    title: { bs: "Specijalist oftalmolog, osnivač Klinike Svjetlost", en: "Consultant ophthalmologist, founder of Svjetlost" },
    focus: ["refractive", "cataract", "cornea"],
    leadership: true,
    image: portrait("nikica-gabric", "prof. dr. sc. Nikica Gabrić", 750),
    summary: {
      bs: "Osnivač Poliklinike Svjetlost (1998.) i prvi ljekar koji je u Hrvatskoj izveo lasersku korekciju dioptrije. Bavi se hirurgijom prednjeg segmenta oka.",
      en: "Founder of Svjetlost (1998) and the first doctor to perform laser vision correction in Croatia. Specialises in anterior segment surgery.",
    },
    education: {
      bs: "Završio Medicinski fakultet Sveučilišta u Zagrebu, specijalizaciju u KBC Rebro pod mentorstvom prof. Krešimira Čupaka. Magistrirao 1988., doktorirao 1997. Od 2009. redovni profesor na Medicinskom fakultetu Sveučilišta u Rijeci. Usavršavao se u Japanu, Njemačkoj, Velikoj Britaniji, SAD-u, Rusiji i Švicarskoj.",
      en: "Graduated from the University of Zagreb School of Medicine and trained at KBC Rebro under Prof. Krešimir Čupak. Master’s degree 1988, doctorate 1997. Full professor at the University of Rijeka Faculty of Medicine since 2009. Further training in Japan, Germany, the UK, the USA, Russia and Switzerland.",
    },
    expertise: {
      bs: "Hirurgija prednjeg segmenta oka — katarakta, glaukom, refraktivna hirurgija, transplantacija rožnice i strabizam — s više od 2.500 operacija godišnje. Operisao je u više od 17 država. Bio je osnivač i predsjednik Lions hrvatske očne banke.",
      en: "Anterior segment surgery — cataract, glaucoma, refractive surgery, corneal transplantation and strabismus — with more than 2,500 operations a year. Has operated in more than 17 countries. Founder and president of the Lions Croatian Eye Bank.",
    },
    source: `${base}/prof-dr-sc-nikica-gabric/1838`,
  },
  {
    slug: "melisa-ahmedbegovic-pjano",
    name: "Melisa Ahmedbegović Pjano",
    honorific: "prim. doc. dr. med. sc.",
    title: { bs: "Specijalista oftalmologije, refraktivni hirurg", en: "Consultant ophthalmologist, refractive surgeon" },
    focus: ["refractive"],
    leadership: true,
    image: portrait("melisa-ahmedbegovic-pjano", "prim. doc. dr. med. sc. Melisa Ahmedbegović Pjano"),
    summary: {
      bs: "U Klinici Svjetlost Sarajevo od 2011. Usko specijalizirana za lasersko skidanje dioptrije — više od 15.000 zahvata.",
      en: "At Svjetlost Sarajevo since 2011. Narrowly specialised in laser vision correction — more than 15,000 procedures.",
    },
    education: {
      bs: "Medicinski fakultet u Sarajevu (2001.), specijalizacija iz oftalmologije (2005.). Doktorska disertacija 2016. o implantaciji dvije vrste fakičnih intraokularnih leća za korekciju miopije. Zvanje primarijus 2019., docentica na Univerzitetu u Sarajevu od 2023.",
      en: "University of Sarajevo School of Medicine (2001), ophthalmology specialisation (2005). Doctoral thesis in 2016 comparing two types of phakic intra-ocular lenses for myopia. Awarded the title of Primarius in 2019; Assistant Professor at the University of Sarajevo since 2023.",
    },
    expertise: {
      bs: "Prednji segment oka i refraktivna hirurgija. Usavršavanje u Zagrebu pod mentorstvom prof. Nikice Gabrića i dr. Maje Bohač.",
      en: "Anterior segment and refractive surgery. Trained in Zagreb under Prof. Nikica Gabrić and Dr Maja Bohač.",
    },
    memberships: ["ESCRS", "CSCRS"],
    source: `${base}/prim-doc-dr-med-sc-melisa-ahmedbegovic-pjano/135`,
  },
  {
    slug: "alma-biscevic",
    name: "Alma Biščević",
    honorific: "doc. dr. med. sc.",
    title: { bs: "Specijalist oftalmolog, refraktivni hirurg", en: "Consultant ophthalmologist, refractive surgeon" },
    focus: ["refractive", "cornea"],
    leadership: true,
    image: portrait("alma-biscevic", "doc. dr. med. sc. Alma Biščević"),
    summary: {
      bs: "U Klinici Svjetlost Sarajevo od 2015. Više od 15.000 zahvata laserskog uklanjanja dioptrije u pet zemalja regiona.",
      en: "At Svjetlost Sarajevo since 2015. More than 15,000 laser vision correction procedures in five countries of the region.",
    },
    education: {
      bs: "Medicinski fakultet Univerziteta u Sarajevu (2008.), specijalizacija u Klinici Svjetlost Zagreb pod mentorstvom prof. Nikice Gabrića i prof. Ive Dekaris. Doktorat 2019. o laserskim platformama u liječenju visokog astigmatizma. Docentica od 2023.",
      en: "University of Sarajevo School of Medicine (2008), specialisation at Svjetlost Zagreb under Prof. Nikica Gabrić and Prof. Iva Dekaris. Doctorate in 2019 on laser platforms for high astigmatism. Assistant Professor since 2023.",
    },
    expertise: {
      bs: "Prednji segment oka, refraktivna hirurgija i bolesti rožnice. Usavršavanje i u inostranim centrima (Schwind, Njemačka).",
      en: "Anterior segment, refractive surgery and corneal disease. Further training abroad, including at Schwind in Germany.",
    },
    memberships: ["CSCRS", "ESCRS", "SEEOS", "EEBA"],
    source: `${base}/doc-dr-med-sc-alma-biscevic/121`,
  },
  {
    slug: "ratimir-lazic",
    name: "Ratimir Lazić",
    honorific: "prof. dr. sc.",
    title: { bs: "Specijalist oftalmolog, vitreoretinalni hirurg", en: "Consultant ophthalmologist, vitreoretinal surgeon" },
    focus: ["retina", "cataract"],
    image: portrait("ratimir-lazic", "prof. dr. sc. Ratimir Lazić"),
    summary: {
      bs: "Vitreoretinalna hirurgija — minimalno invazivne vitrektomije, ablacije retine, dijabetička retinopatija i bolesti makule.",
      en: "Vitreoretinal surgery — minimally invasive vitrectomy, retinal detachment, diabetic retinopathy and macular disease.",
    },
    education: {
      bs: "Medicinski fakultet Sveučilišta u Zagrebu; specijalizacija pod mentorstvom prof. Nikice Gabrića i subspecijalizacija iz bolesti stražnjeg segmenta oka u Klinici Svjetlost. Fellowship iz vitreoretinalne hirurgije uz dr. Zorana Tomića, daljnje usavršavanje uz dr. Lyndona da Cruza i dr. Carla Claesa.",
      en: "University of Zagreb School of Medicine; specialisation under Prof. Nikica Gabrić and sub-specialisation in posterior segment disease at Svjetlost. Vitreoretinal fellowship with Dr Zoran Tomić and further training with Dr Lyndon da Cruz and Dr Carl Claes.",
    },
    expertise: {
      bs: "Vitrektomija na 23 i 25 gauge otvore, hitne i kompleksne ablacije retine, makularne rupture i celofanske makulopatije, ozljede oka i strana tijela, te ultrazvučne operacije mrene s ugradnjom standardnih, multifokalnih i toričnih leća.",
      en: "23 and 25 gauge vitrectomy, urgent and complex retinal detachment, macular holes and epiretinal membranes, eye injuries and foreign bodies, and ultrasound cataract surgery with standard, multifocal and toric lenses.",
    },
    source: `${base}/prof-dr-sc-ratimir-lazic/2346`,
  },
  {
    slug: "senad-grisevic",
    name: "Senad Grišević",
    honorific: "doc. dr. sc.",
    title: { bs: "Specijalista oftalmolog", en: "Consultant ophthalmologist" },
    focus: ["cornea", "general"],
    image: portrait("senad-grisevic", "doc. dr. sc. Senad Grišević"),
    summary: {
      bs: "U Klinici Svjetlost Sarajevo od 2012. Keratokonus, crosslinking (više od 300 zahvata) i sve vrste kontaktnih leća.",
      en: "At Svjetlost Sarajevo since 2012. Keratoconus, crosslinking (300+ procedures) and all types of contact lenses.",
    },
    education: {
      bs: "Medicinski fakultet u Sarajevu, specijalizacija na Očnoj klinici KCUS. Doktorska disertacija 2020. o topografskim promjenama rožnice kod keratokonusa nakon crosslinkinga. Docent od 2021., zvanje primarijus 2022.",
      en: "University of Sarajevo School of Medicine, specialisation at the KCUS Eye Clinic. Doctoral thesis in 2020 on corneal topography changes in keratoconus after crosslinking. Assistant Professor since 2021; Primarius since 2022.",
    },
    expertise: {
      bs: "Opća oftalmologija, prednji segment oka, keratokonus i crosslinking, te određivanje svih vrsta kontaktnih leća, uključujući Rose K i skleralne leće.",
      en: "General ophthalmology, anterior segment, keratoconus and crosslinking, and fitting all types of contact lenses, including Rose K and scleral lenses.",
    },
    source: `${base}/doc-dr-sc-senad-grisevic/119`,
  },
  {
    slug: "bojana-pandurevic",
    name: "Bojana Pandurević",
    honorific: "dr.",
    title: { bs: "Specijalista oftalmologije i optometrije", en: "Specialist in ophthalmology and optometry" },
    focus: ["cornea", "refractive", "glaucoma"],
    image: portrait("bojana-pandurevic", "dr. Bojana Pandurević"),
    summary: {
      bs: "U timu od 2016. Prednji segment oka: bolesti rožnice, refraktivna hirurgija i liječenje glaukoma.",
      en: "In the team since 2016. Anterior segment: corneal disease, refractive surgery and glaucoma treatment.",
    },
    education: {
      bs: "Medicinski fakultet u Sarajevu. Specijalistički ispit iz oftalmologije 2021. Od 2023. na doktorskom studiju Medicinskog fakulteta Univerziteta u Sarajevu.",
      en: "University of Sarajevo School of Medicine. Specialist exam in ophthalmology in 2021. Doctoral student at the University of Sarajevo since 2023.",
    },
    expertise: {
      bs: "Bolesti rožnice, refraktivna hirurgija i glaukom. Edukaciju za rad na mikropulsnom laseru u liječenju glaukoma završila je u Zagrebu.",
      en: "Corneal disease, refractive surgery and glaucoma. Trained in Zagreb on the micropulse laser for glaucoma treatment.",
    },
    source: `${base}/dr-bojana-pandurevic/133`,
  },
  {
    slug: "azra-mehmedovic",
    name: "Azra Mehmedović",
    honorific: "dr.",
    title: { bs: "Specijalista oftalmolog", en: "Consultant ophthalmologist" },
    focus: ["retina"],
    image: portrait("azra-mehmedovic", "dr. Azra Mehmedović"),
    summary: {
      bs: "Dijagnostika i liječenje bolesti stražnjeg segmenta oka — degeneracija makule, dijabetička retinopatija i vaskularne bolesti retine.",
      en: "Diagnosis and treatment of posterior segment disease — macular degeneration, diabetic retinopathy and retinal vascular disease.",
    },
    education: {
      bs: "Medicinski fakultet u Sarajevu (2013.). Specijalizacija na Klinici za očne bolesti KCUS, u Klinici Svjetlost Sarajevo od 2019. Specijalistički ispit 2020.",
      en: "University of Sarajevo School of Medicine (2013). Specialisation at the KCUS Eye Clinic; at Svjetlost Sarajevo since 2019. Specialist exam in 2020.",
    },
    expertise: {
      bs: "OCT, OCT angiografija i fluoresceinska angiografija; intravitrealna anti-VEGF terapija i laserfotokoagulacija retine.",
      en: "OCT, OCT angiography and fluorescein angiography; intravitreal anti-VEGF therapy and retinal laser photocoagulation.",
    },
    source: `${base}/dr-azra-mehmedovic/2142`,
  },
  {
    slug: "danijela-stojanovic",
    name: "Danijela Stojanović",
    honorific: "dr.",
    title: { bs: "Specijalist oftalmolog — Odjel za medical retinu", en: "Consultant ophthalmologist — Medical Retina" },
    focus: ["retina"],
    image: portrait("danijela-stojanovic", "dr. Danijela Stojanović"),
    summary: {
      bs: "U Klinici Svjetlost Sarajevo od 2019. Bolesti stražnjeg segmenta oka s posebnim osvrtom na anti-VEGF terapiju.",
      en: "At Svjetlost Sarajevo since 2019. Posterior segment disease with a particular focus on anti-VEGF therapy.",
    },
    education: {
      bs: "Medicinski fakultet u Beogradu (2001.). Specijalistički ispit 2010.; specijalista oftalmologije u Bolnici Kasindo do 2019.",
      en: "University of Belgrade School of Medicine (2001). Specialist exam in 2010; consultant at Kasindo Hospital until 2019.",
    },
    expertise: {
      bs: "Senilna degeneracija makule, dijabetička retinopatija i vaskularne bolesti retine; anti-VEGF terapija i laserfotokoagulacija.",
      en: "Age-related macular degeneration, diabetic retinopathy and retinal vascular disease; anti-VEGF therapy and laser photocoagulation.",
    },
    source: `${base}/dr-danijela-stojanovic/2205`,
  },
  {
    slug: "vernesa-sofic-drino",
    name: "Vernesa Sofić-Drino",
    honorific: "dr.",
    title: { bs: "Specijalista oftalmologije i optometrije", en: "Specialist in ophthalmology and optometry" },
    focus: ["retina"],
    image: portrait("vernesa-sofic-drino", "dr. Vernesa Sofić-Drino"),
    summary: {
      bs: "U timu od 2016. Stražnji segment oka s fokusom na dijabetičku retinopatiju i promjene na makuli.",
      en: "In the team since 2016. Posterior segment, focusing on diabetic retinopathy and macular changes.",
    },
    education: {
      bs: "Medicinski fakultet u Sarajevu (2014.), dio studija na Medicinskom univerzitetu u Grazu. Specijalizacija iz oftalmologije i optometrije završena 2021.; od 2023. doktorski studij.",
      en: "University of Sarajevo School of Medicine (2014), with part of her studies at the Medical University of Graz. Completed ophthalmology and optometry specialisation in 2021; doctoral studies since 2023.",
    },
    expertise: {
      bs: "Dijabetička retinopatija i senilne promjene makule. Dobitnica nagrade Zaklade prof. Ljiljana Zergollern Čupak i Krešimir Čupak za najbolji rad mladih oftalmologa (2016.).",
      en: "Diabetic retinopathy and age-related macular change. Recipient of the Zergollern Čupak Foundation award for the best paper by young ophthalmologists (2016).",
    },
    source: `${base}/dr-vernesa-sofic-drino/130`,
  },
  {
    slug: "bojana-skipina",
    name: "Bojana Škipina",
    honorific: "dr.",
    title: { bs: "Specijalist oftalmolog", en: "Consultant ophthalmologist" },
    focus: ["general"],
    image: portrait("bojana-skipina", "dr. Bojana Škipina"),
    summary: {
      bs: "Specijalistica oftalmologije, u timu Klinike Svjetlost Sarajevo od 2019.",
      en: "Consultant ophthalmologist, part of the Svjetlost Sarajevo team since 2019.",
    },
    education: {
      bs: "Medicinski fakultet u Foči (2009.). Specijalizacija u Univerzitetskoj bolnici Foča, Bolnici Kasindo i Klinici za očne bolesti UKC Srbije; specijalistički ispit 2016.",
      en: "Foča School of Medicine (2009). Specialisation at Foča University Hospital, Kasindo Hospital and the Clinic for Eye Diseases, University Clinical Centre of Serbia; specialist exam in 2016.",
    },
    expertise: {
      bs: "Uže područje rada nije navedeno na službenoj stranici.",
      en: "A specific area of focus is not listed on the official website.",
    },
    source: `${base}/dr-bojana-skipina/2201`,
  },
  {
    slug: "ajla-skopljak-salkica",
    name: "Ajla Skopljak-Salkica",
    honorific: "dr.",
    title: { bs: "Specijalista oftalmolog", en: "Consultant ophthalmologist" },
    focus: ["general"],
    image: portrait("ajla-skopljak-salkica", "dr. Ajla Skopljak-Salkica", 1200),
    summary: {
      bs: "U ljekarskom timu Klinike Svjetlost Sarajevo od 2018.; asistentica na Katedri za oftalmologiju.",
      en: "Part of the Svjetlost Sarajevo medical team since 2018; teaching assistant in the Department of Ophthalmology.",
    },
    education: {
      bs: "Medicinski fakultet Univerziteta u Sarajevu (2014.). Specijalizacija iz oftalmologije i optometrije završena 2023.; od 2023. doktorski studij, od 2025. asistentica na Katedri za oftalmologiju Stomatološkog fakulteta UNSA.",
      en: "University of Sarajevo School of Medicine (2014). Completed ophthalmology and optometry specialisation in 2023; doctoral studies since 2023 and teaching assistant at the University of Sarajevo since 2025.",
    },
    expertise: { bs: "Uže područje rada nije navedeno na službenoj stranici.", en: "A specific area of focus is not listed on the official website." },
    source: `${base}/dr-ajla-skopljak-salkica/2183`,
  },
  {
    slug: "mirnesa-odobasic",
    name: "Mirnesa Odobašić",
    honorific: "dr.",
    title: { bs: "Specijalista oftalmolog", en: "Consultant ophthalmologist" },
    focus: ["general"],
    image: portrait("mirnesa-odobasic", "dr. Mirnesa Odobašić"),
    summary: {
      bs: "U timu od 2018.; specijalizaciju obavila u Klinici Svjetlost Sarajevo pod mentorstvom prof. dr. sc. Nikice Gabrića.",
      en: "In the team since 2018; specialised at Svjetlost Sarajevo under Prof. Nikica Gabrić.",
    },
    education: {
      bs: "Medicinski fakultet Univerziteta u Sarajevu (2018.). Specijalizacija iz oftalmologije i optometrije završena u januaru 2024.",
      en: "University of Sarajevo School of Medicine (2018). Completed ophthalmology and optometry specialisation in January 2024.",
    },
    expertise: { bs: "Uže područje rada nije navedeno na službenoj stranici.", en: "A specific area of focus is not listed on the official website." },
    source: `${base}/dr-mirnesa-odobasic/2128`,
  },
  {
    slug: "jasmin-hadzimurtovic",
    name: "Jasmin Hadžimurtović",
    honorific: "dr.",
    title: { bs: "Specijalista oftalmologije i optometrije", en: "Specialist in ophthalmology and optometry" },
    focus: ["general"],
    image: portrait("jasmin-hadzimurtovic", "dr. Jasmin Hadžimurtović"),
    summary: {
      bs: "U ljekarskom timu Klinike Svjetlost Sarajevo od 2021.",
      en: "Part of the Svjetlost Sarajevo medical team since 2021.",
    },
    education: {
      bs: "Medicinski fakultet Univerziteta u Sarajevu (2020.). Specijalistički ispit položio 17. novembra 2026.",
      en: "University of Sarajevo School of Medicine (2020). Passed the specialist exam on 17 November 2026.",
    },
    expertise: { bs: "Uže područje rada nije navedeno na službenoj stranici.", en: "A specific area of focus is not listed on the official website." },
    source: `${base}/dr-jasmin-hadzimurtovic/2253`,
  },
  {
    slug: "melika-isakovic",
    name: "Melika Isaković",
    honorific: "dr.",
    title: { bs: "Doktorica medicine", en: "Medical doctor" },
    focus: ["team"],
    image: portrait("melika-isakovic", "dr. Melika Isaković"),
    summary: {
      bs: "U ljekarskom timu Klinike Svjetlost Sarajevo od 2022., gdje nastavlja stručno usavršavanje.",
      en: "Part of the Svjetlost Sarajevo medical team since 2022, continuing her professional training.",
    },
    education: { bs: "Medicinski fakultet Univerziteta u Sarajevu (2022.).", en: "University of Sarajevo School of Medicine (2022)." },
    expertise: { bs: "Stručno usavršavanje u oftalmologiji.", en: "Professional training in ophthalmology." },
    memberships: memberships3,
    source: `${base}/dr-melika-isakovic/2363`,
  },
  {
    slug: "renan-muhovic",
    name: "Renan Muhović",
    honorific: "dr.",
    title: { bs: "Doktor medicine", en: "Medical doctor" },
    focus: ["team"],
    image: portrait("renan-muhovic", "dr. Renan Muhović", 1200),
    summary: {
      bs: "U ljekarskom timu Klinike Svjetlost Sarajevo od 2025., gdje nastavlja stručno usavršavanje.",
      en: "Part of the Svjetlost Sarajevo medical team since 2025, continuing his professional training.",
    },
    education: { bs: "Medicinski fakultet Univerziteta u Tuzli (2023.).", en: "University of Tuzla School of Medicine (2023)." },
    expertise: { bs: "Stručno usavršavanje u oftalmologiji.", en: "Professional training in ophthalmology." },
    memberships: memberships3,
    source: `${base}/dr-renan-muhovic/2446`,
  },
  {
    slug: "irma-spahic",
    name: "Irma Spahić",
    honorific: "dr.",
    title: { bs: "Doktorica medicine", en: "Medical doctor" },
    focus: ["team"],
    image: portrait("irma-spahic", "dr. Irma Spahić", 1200),
    summary: {
      bs: "Dio ljekarskog tima Klinike Svjetlost od 2026., gdje nastavlja stručno usavršavanje.",
      en: "Joined the Svjetlost medical team in 2026, continuing her professional training.",
    },
    education: {
      bs: "SSST Medicinski fakultet u Sarajevu (2023.). Radila u JU Dom zdravlja Kantona Sarajevo, Služba porodične medicine.",
      en: "SSST School of Medicine, Sarajevo (2023). Previously worked in family medicine at the Sarajevo Canton Health Centre.",
    },
    expertise: { bs: "Stručno usavršavanje u oftalmologiji.", en: "Professional training in ophthalmology." },
    memberships: memberships3,
    source: `${base}/dr-irma-spahic/2451`,
  },
];

export const getDoctor = (slug: string) => doctors.find((d) => d.slug === slug);
export const doctorDisplayName = (d: Doctor) => `${d.honorific} ${d.name}`;
