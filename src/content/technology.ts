import type { Device } from "@/types/content";
import { images, techImg } from "./images";

/**
 * Devices listed on https://svjetlost.ba/tehnologije/10 (Sarajevo website, 2025 gallery).
 * Names are taken from the official image captions. Where the manufacturer is not part of
 * the official caption, `manufacturerVerified` is false and the UI marks it for confirmation.
 * Purpose texts are plain-language descriptions of the device category and must be reviewed
 * by the clinic's medical team before production use.
 */
export const devices: Device[] = [
  {
    slug: "schwind-amaris-1050rs",
    name: "Schwind Amaris 1050RS",
    manufacturer: "SCHWIND eye-tech-solutions",
    manufacturerVerified: true,
    category: { bs: "Excimer laser", en: "Excimer laser" },
    purpose: { bs: "Lasersko remodeliranje rožnice", en: "Laser reshaping of the cornea" },
    explanation: {
      bs: "Excimer laser oblikuje površinu rožnice kako bi se uklonila ili smanjila dioptrija. Sistem praćenja oka prati sitne pokrete tokom zahvata, a podaci o rožnici mogu se koristiti za personalizirane tretmane.",
      en: "An excimer laser reshapes the corneal surface to remove or reduce a prescription. Eye tracking follows small movements during treatment, and corneal data can be used for personalised treatments.",
    },
    services: ["lasersko-skidanje-dioptrije", "transplantacija-roznice"],
    image: images.schwindSuite,
    productImage: techImg("schwind-amaris-1050rs", 724, 420, "Schwind Amaris 1050RS"),
  },
  {
    slug: "zeiss-iolmaster-700",
    name: "IOLMaster 700",
    manufacturer: "ZEISS",
    manufacturerVerified: true,
    category: { bs: "Optička biometrija", en: "Optical biometry" },
    purpose: { bs: "Izračun jačine intraokularne leće", en: "Calculating intra-ocular lens power" },
    explanation: {
      bs: "Prije operacije mrene ili zamjene leće uređaj beskontaktno mjeri dužinu oka i zakrivljenost rožnice. Iz tih podataka izračunava se jačina umjetne leće. Pretraga je bezbolna i traje oko pola minute.",
      en: "Before cataract or lens-replacement surgery, this device measures the eye’s length and corneal curvature without touching the eye. The artificial lens power is calculated from these data. The scan is painless and takes about half a minute.",
    },
    services: ["ocna-mrena", "starosna-dioptrija"],
    image: images.iolMasterInSitu,
    productImage: techImg("zeiss-iolmaster-700", 275, 183, "ZEISS IOLMaster 700"),
  },
  {
    slug: "stellaris-elite",
    name: "Stellaris Elite",
    manufacturer: "Bausch + Lomb",
    manufacturerVerified: true,
    category: { bs: "Hirurška platforma", en: "Surgical platform" },
    purpose: { bs: "Operacija mrene i vitrektomija", en: "Cataract surgery and vitrectomy" },
    explanation: {
      bs: "Kombinovana platforma za ultrazvučnu operaciju mrene (fakoemulzifikaciju) i operacije na stražnjem dijelu oka. Omogućava zahvate kroz vrlo male rezove.",
      en: "A combined platform for ultrasound cataract surgery (phacoemulsification) and procedures at the back of the eye. It enables surgery through very small incisions.",
    },
    services: ["ocna-mrena", "dijabetes-i-retina", "starosna-dioptrija"],
    image: images.phacoPlatform,
    productImage: techImg("stellaris-elite", 202, 218, "Stellaris Elite"),
  },
  {
    slug: "optopol-revo-60",
    name: "REVO 60",
    manufacturer: "Optopol",
    manufacturerVerified: true,
    category: { bs: "Optička koherentna tomografija (OCT)", en: "Optical coherence tomography (OCT)" },
    purpose: { bs: "Snimanje mrežnice, makule i vidnog živca", en: "Imaging the retina, macula and optic nerve" },
    explanation: {
      bs: "OCT svjetlošću snima slojeve mrežnice i vidnog živca u presjeku. Pretraga je bezbolna, bez zračenja i traje nekoliko sekundi, a ključna je u praćenju bolesti žute pjege, dijabetičke retinopatije i glaukoma.",
      en: "OCT uses light to capture cross-sections of the retina and optic nerve. The scan is painless, radiation-free and takes seconds, and is key to monitoring macular disease, diabetic retinopathy and glaucoma.",
    },
    services: ["dijabetes-i-retina", "lijecenje-glaukoma", "pregledi-pacijenata"],
    image: images.octDiagnostics,
    productImage: techImg("optopol-revo-60", 225, 225, "Optopol REVO 60"),
  },
  {
    slug: "pascal-synthesis",
    name: "PASCAL Synthesis",
    manufacturer: null,
    manufacturerVerified: false,
    category: { bs: "Laser za fotokoagulaciju", en: "Photocoagulation laser" },
    purpose: { bs: "Laserski tretman mrežnice", en: "Laser treatment of the retina" },
    explanation: {
      bs: "Laser koji isporučuje niz preciznih tačaka na mrežnicu. Koristi se, među ostalim, u liječenju dijabetičke retinopatije; klinika navodi da je brži i ugodniji za pacijenta od klasičnih metoda.",
      en: "A laser that delivers a pattern of precise spots to the retina. It is used, among other things, to treat diabetic retinopathy; the clinic describes it as faster and more comfortable than conventional methods.",
    },
    services: ["dijabetes-i-retina"],
    image: images.pascalLaser,
    productImage: techImg("pascal-synthesis", 231, 218, "PASCAL Synthesis"),
  },
  {
    slug: "canon-cx1",
    name: "CX-1",
    manufacturer: "Canon",
    manufacturerVerified: true,
    category: { bs: "Fundus kamera", en: "Fundus camera" },
    purpose: { bs: "Fotografija očne pozadine i angiografija", en: "Retinal photography and angiography" },
    explanation: {
      bs: "Digitalna kamera visoke rezolucije za snimanje očne pozadine. Koristi se i za fluoresceinsku angiografiju — pretragu cirkulacije u oku kod degeneracije makule i dijabetičke retinopatije.",
      en: "A high-resolution digital camera for photographing the back of the eye. It is also used for fluorescein angiography — a test of the eye’s circulation in macular degeneration and diabetic retinopathy.",
    },
    services: ["dijabetes-i-retina", "pregledi-pacijenata"],
    image: images.retinaCamera,
    productImage: techImg("canon-cx1", 275, 183, "Canon CX-1"),
  },
  {
    slug: "tomey-em-4000",
    name: "EM-4000",
    manufacturer: "Tomey",
    manufacturerVerified: true,
    category: { bs: "Endotelni mikroskop", en: "Specular (endothelial) microscope" },
    purpose: { bs: "Brojanje endotelnih ćelija rožnice", en: "Counting corneal endothelial cells" },
    explanation: {
      bs: "Beskontaktno snima unutrašnji sloj rožnice i broji ćelije koje održavaju njenu prozirnost. Važno je prije operacije mrene, ugradnje leća i kod bolesti rožnice.",
      en: "Photographs the inner layer of the cornea without contact and counts the cells that keep it clear. Important before cataract surgery, lens implantation and in corneal disease.",
    },
    services: ["starosna-dioptrija", "ocna-mrena", "transplantacija-roznice"],
    image: techImg("tomey-em-4000", 203, 249, "Tomey EM-4000"),
  },
  {
    slug: "icare-tonometer",
    name: "iCare",
    manufacturer: "Icare",
    manufacturerVerified: true,
    category: { bs: "Ručni tonometar", en: "Handheld tonometer" },
    purpose: { bs: "Mjerenje očnog pritiska", en: "Measuring eye pressure" },
    explanation: {
      bs: "Prijenosni uređaj za brzo mjerenje očnog pritiska, bez kapi za anesteziju. Pogodan i za pacijente kojima je teško sjediti za klasičnim aparatom.",
      en: "A portable device for quick eye-pressure measurement without anaesthetic drops. Useful for patients who find it hard to sit at a conventional instrument.",
    },
    services: ["lijecenje-glaukoma", "pregledi-pacijenata"],
    image: images.tonometry,
    productImage: techImg("icare-tonometer", 245, 206, "iCare"),
  },
  {
    slug: "plusoptix",
    name: "Plusoptix",
    manufacturer: "Plusoptix",
    manufacturerVerified: true,
    category: { bs: "Dječiji autorefraktometar", en: "Paediatric autorefractor" },
    purpose: { bs: "Objektivno mjerenje dioptrije kod djece", en: "Objective prescription measurement in children" },
    explanation: {
      bs: "Mjeri dioptriju oba oka istovremeno s udaljenosti od jednog metra. Svjetla i zvukovi privlače pažnju djeteta, a mjerenje traje manje od sekunde. Pogodan je od šestog mjeseca života.",
      en: "Measures the prescription of both eyes at once from one metre away. Lights and sounds catch the child’s attention and the reading takes less than a second. Suitable from six months of age.",
    },
    services: ["djecija-oftalmologija"],
    image: images.paediatricExam,
    productImage: techImg("plusoptix", 197, 256, "Plusoptix"),
  },
  {
    slug: "vitra-2",
    name: "Vitra 2",
    manufacturer: null,
    manufacturerVerified: false,
    category: { bs: "Laser za mrežnicu", en: "Retinal laser" },
    purpose: { bs: "Laserska fotokoagulacija", en: "Laser photocoagulation" },
    explanation: {
      bs: "Laser za tretman mrežnice. Tačne indikacije za ovaj uređaj potrebno je potvrditi s medicinskim timom klinike.",
      en: "A laser for treating the retina. Exact indications for this device must be confirmed with the clinic’s medical team.",
    },
    services: ["dijabetes-i-retina"],
    image: techImg("vitra-2", 254, 198, "Vitra 2"),
  },
  {
    slug: "yag-syl-900",
    name: "YAG laser SYL-900",
    manufacturer: null,
    manufacturerVerified: false,
    category: { bs: "Pulsni YAG laser", en: "Pulsed YAG laser" },
    purpose: { bs: "Ambulantni laserski zahvati", en: "Outpatient laser procedures" },
    explanation: {
      bs: "YAG laser koristi se za bezbolne ambulantne zahvate, poput YAG laser iridotomije kod glaukoma zatvorenog ugla.",
      en: "A YAG laser is used for painless outpatient procedures, such as YAG laser iridotomy for angle-closure glaucoma.",
    },
    services: ["lijecenje-glaukoma"],
    image: techImg("yag-syl-900", 225, 225, "YAG SYL-900"),
  },
  {
    slug: "visual-field-925w",
    name: "925w",
    manufacturer: null,
    manufacturerVerified: false,
    category: { bs: "Perimetar (vidno polje)", en: "Perimeter (visual field)" },
    purpose: { bs: "Ispitivanje vidnog polja", en: "Visual field testing" },
    explanation: {
      bs: "Kompjuterizirano ispitivanje vidnog polja otkriva ispade u perifernom vidu — ključno za dijagnostiku i praćenje glaukoma. Pretraga je bezbolna, ali zahtijeva koncentraciju.",
      en: "Computerised visual field testing detects gaps in peripheral vision — essential for diagnosing and monitoring glaucoma. It is painless but requires concentration.",
    },
    services: ["lijecenje-glaukoma"],
    image: techImg("visual-field-925w", 284, 177, "925w"),
  },
  {
    slug: "frey-ap-300",
    name: "AP-300",
    manufacturer: "Frey",
    manufacturerVerified: true,
    category: { bs: "Perimetar (vidno polje)", en: "Perimeter (visual field)" },
    purpose: { bs: "Ispitivanje vidnog polja", en: "Visual field testing" },
    explanation: {
      bs: "Automatski perimetar za mapiranje vidnog polja, koristi se u dijagnostici i praćenju glaukoma i neuroloških promjena vida.",
      en: "An automated perimeter that maps the visual field, used to diagnose and monitor glaucoma and neurological changes in vision.",
    },
    services: ["lijecenje-glaukoma"],
    image: techImg("frey-ap-300", 246, 205, "Frey AP-300"),
  },
  {
    slug: "zeiss-s88",
    name: "Operacijski mikroskop (S88)",
    manufacturer: "ZEISS",
    manufacturerVerified: true,
    category: { bs: "Operacijski mikroskop", en: "Surgical microscope" },
    purpose: { bs: "Uvećanje i osvjetljenje tokom operacije", en: "Magnification and illumination during surgery" },
    explanation: {
      bs: "Operacijski mikroskop daje hirurgu uvećan, jasno osvijetljen prikaz oka tokom zahvata. Tačan model mikroskopa potrebno je potvrditi s klinikom.",
      en: "A surgical microscope gives the surgeon a magnified, clearly lit view of the eye during surgery. The exact microscope model must be confirmed with the clinic.",
    },
    services: ["ocna-mrena", "plasticni-zahvati", "starosna-dioptrija"],
    image: images.operatingMicroscope,
    productImage: techImg("zeiss-s88", 1000, 1435, "ZEISS S88"),
  },
];

/** Devices given the cinematic scroll-story treatment on the homepage and technology page. */
export const featuredDevices = ["schwind-amaris-1050rs", "zeiss-iolmaster-700", "stellaris-elite", "optopol-revo-60"];

export const getDevice = (slug: string) => devices.find((d) => d.slug === slug);
