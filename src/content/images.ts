import type { Img, L } from "@/types/content";

const UNSPLASH = "Unsplash License";

function clinicImg(src: string, width: number, height: number, alt: L): Img {
  return { src: `/images/${src}.webp`, width, height, alt, kind: "clinic" };
}

function conceptImg(src: string, width: number, height: number, alt: L, credit: string): Img {
  return { src: `/images/${src}.webp`, width, height, alt, kind: "concept", credit };
}

export const images = {
  eyeHero: conceptImg("concept/eye-hero", 2400, 1600, {
    bs: "Makro fotografija ljudskog oka s plavom šarenicom",
    en: "Macro photograph of a human eye with a blue iris",
  }, `Jack B / ${UNSPLASH}`),
  irisGreen: conceptImg("concept/iris-green", 2000, 1333, {
    bs: "Detalj zelene šarenice i zjenice u makro fotografiji",
    en: "Macro detail of a green iris and pupil",
  }, `Ian Talmacs / ${UNSPLASH}`),
  sarajevoMiljacka: conceptImg("concept/sarajevo-miljacka", 2000, 1333, {
    bs: "Šetalište uz rijeku Miljacku u Sarajevu, s minaretom i kućama u pozadini",
    en: "Riverside promenade along the Miljacka in Sarajevo, with a minaret and houses in the background",
  }, `Sporisevic Photography / ${UNSPLASH}`),
  sarajevoPanorama: conceptImg("concept/sarajevo-panorama", 2200, 1467, {
    bs: "Panorama Sarajeva sa snijegom na planinama",
    en: "Panorama of Sarajevo with snow-capped mountains",
  }, `Sporisevic Photography / ${UNSPLASH}`),

  examRoom: clinicImg("clinic/biomicroscope", 800, 533, { bs: "Biomikroskop za oftalmološki pregled u ambulanti Klinike Svjetlost", en: "Slit lamp for eye examinations in a Svjetlost consulting room" }),
  laserSuite: clinicImg("clinic/laser-suite", 800, 533, { bs: "Ljekar u laserskoj sali s excimer laserom", en: "Doctor in the laser suite with an excimer laser" }),
  femtoLaser: clinicImg("clinic/femtosecond-laser", 800, 533, { bs: "Laserska sala s ležajem za pacijenta i femtosekundnim laserom", en: "Laser suite with patient bed and femtosecond laser" }),
  cataractSurgery: clinicImg("clinic/cataract-surgery", 800, 533, { bs: "Operativni tim tokom zahvata pod operacijskim mikroskopom", en: "Surgical team operating under a surgical microscope" }),
  operatingMicroscope: clinicImg("clinic/operating-microscope", 800, 533, { bs: "Operacijski mikroskop u operacijskoj sali", en: "Surgical microscope in the operating theatre" }),
  octDiagnostics: clinicImg("clinic/oct-diagnostics", 800, 533, { bs: "Uređaj za optičku koherentnu tomografiju (OCT) u dijagnostičkoj sobi", en: "Optical coherence tomography (OCT) device in a diagnostic room" }),
  retinaCamera: clinicImg("clinic/retina-camera", 800, 533, { bs: "Kamera za snimanje očne pozadine sa snimkom retine na ekranu", en: "Fundus camera with a retinal image on screen" }),
  operatingTheatre: clinicImg("clinic/operating-theatre", 800, 533, { bs: "Opremljena operacijska sala", en: "Equipped operating theatre" }),
  pentacam: clinicImg("clinic/pentacam", 800, 533, { bs: "Rožnični topograf Pentacam s mapom rožnice na ekranu", en: "Pentacam corneal topographer with a corneal map on screen" }),
  tonometry: clinicImg("clinic/tonometry", 800, 533, { bs: "Uređaj za mjerenje očnog pritiska", en: "Device for measuring intra-ocular pressure" }),
  biomicroscope: clinicImg("clinic/biomicroscope", 800, 533, { bs: "Biomikroskop za pregled prednjeg segmenta oka", en: "Slit-lamp biomicroscope for examining the front of the eye" }),
  paediatricExam: clinicImg("clinic/paediatric-exam", 800, 533, { bs: "Dječak tokom pregleda s ručnim dječijim refraktometrom", en: "A boy during an examination with a handheld paediatric refractometer" }),
  paediatricTools: clinicImg("clinic/paediatric-tools", 800, 533, { bs: "Okluderi, probni okviri i igračke za dječiji pregled vida", en: "Occluders, trial frames and toys used for children’s eye exams" }),
  trialLenses: clinicImg("clinic/trial-lenses", 800, 533, { bs: "Set probnih stakala i okvir za određivanje dioptrije", en: "Trial lens set and frame for determining prescription" }),
  recoveryRoom: clinicImg("clinic/recovery-room", 800, 533, { bs: "Prostorija za pripremu i oporavak pacijenata", en: "Patient preparation and recovery room" }),
  nearVision: clinicImg("clinic/near-vision-test", 800, 533, { bs: "Tablica za ispitivanje vida na blizinu", en: "Near-vision reading chart" }),
  iols: clinicImg("clinic/intraocular-lenses", 800, 533, { bs: "Intraokularne leće u originalnom pakovanju", en: "Intra-ocular lenses in their original case" }),
  iolMasterInSitu: clinicImg("clinic/iolmaster-in-situ", 800, 533, { bs: "IOLMaster uređaj za izračun jačine intraokularne leće", en: "IOLMaster device for calculating intra-ocular lens power" }),
  phacoPlatform: clinicImg("clinic/phaco-platform", 800, 533, { bs: "Platforma za ultrazvučnu operaciju očne mrene", en: "Platform for ultrasound cataract surgery" }),
  vitrectomyPlatform: clinicImg("clinic/vitrectomy-platform", 800, 533, { bs: "Konzola platforme za vitrektomiju", en: "Vitrectomy platform console" }),
  pascalLaser: clinicImg("clinic/pascal-laser", 800, 533, { bs: "Pascal laser fotokoagulator", en: "Pascal photocoagulation laser" }),
  wavefront: clinicImg("clinic/wavefront-analyzer", 800, 533, { bs: "Analizator rožnice i aberacija", en: "Corneal and wavefront analyser" }),
  schwindSuite: clinicImg("clinic/schwind-suite", 1024, 682, { bs: "Ljekar ispred Schwind excimer lasera", en: "Doctor in front of a Schwind excimer laser" }),
  teamEscrs: clinicImg("clinic/team-esrcs-2024", 1080, 1080, { bs: "Tim Klinike Svjetlost na kongresu ESCRS u Barceloni 2024.", en: "Svjetlost team at the ESCRS congress in Barcelona, 2024" }),
  gabricSons: clinicImg("clinic/prof-gabric-sons", 676, 948, { bs: "Prof. dr. sc. Nikica Gabrić s članovima tima", en: "Prof. Nikica Gabrić with members of the team" }),
  teamPortrait1: clinicImg("clinic/team-portrait-1", 1600, 1600, { bs: "Portret članice tima Klinike Svjetlost", en: "Portrait of a Svjetlost team member" }),
  teamPortrait2: clinicImg("clinic/team-portrait-2", 1600, 1600, { bs: "Portret članice tima Klinike Svjetlost", en: "Portrait of a Svjetlost team member" }),
  eyeBank: clinicImg("clinic/eye-bank", 1600, 1071, { bs: "Laboratorij očne banke", en: "Eye bank laboratory" }),
} satisfies Record<string, Img>;

export function techImg(slug: string, width: number, height: number, name: string): Img {
  return {
    src: `/images/technology/${slug}.webp`,
    width,
    height,
    kind: "clinic",
    alt: { bs: `Uređaj ${name}`, en: `${name} device` },
  };
}
