import type { Faq } from "@/types/content";

/** Answers paraphrase information published on svjetlost.ba. Medical content requires clinical review. */
export const faqs: Faq[] = [
  {
    id: "zakazivanje",
    q: { bs: "Kako zakazati oftalmološki pregled?", en: "How do I book an eye examination?" },
    a: {
      bs: "Pregled možete zakazati telefonom na +387 33 762 772 (Ilidža) ili +387 33 821 919 (Centar), e-mailom na info@svjetlost-sarajevo.ba ili slanjem zahtjeva putem obrasca na ovoj stranici. Zahtjev nije potvrđen termin — tim klinike kontaktira vas radi potvrde. Pacijenti iz inostranstva mogu nazvati +385 1 777 5656.",
      en: "You can book by phone on +387 33 762 772 (Ilidža) or +387 33 821 919 (Centre), by email at info@svjetlost-sarajevo.ba, or by sending a request through the form on this website. A request is not a confirmed appointment — the clinic team will contact you to confirm. Patients from abroad can call +385 1 777 5656.",
    },
    source: "https://svjetlost.ba/kontakt/14",
  },
  {
    id: "prvi-pregled",
    q: { bs: "Kako izgleda prvi pregled?", en: "What happens at the first examination?" },
    a: {
      bs: "Opći pregled obuhvata određivanje vidne oštrine i dioptrije na daljinu i blizinu, mjerenje očnog pritiska, pregled prednjeg dijela oka na biomikroskopu te širenje zjenica i pregled očne pozadine. U prosjeku traje oko sat vremena. Zbog širenja zjenica vid može nekoliko sati biti blago zamućen, pa se vožnja nakon pregleda ne preporučuje.",
      en: "A general exam includes visual acuity and prescription for distance and near, eye pressure, a slit-lamp examination of the front of the eye, and dilating the pupils to examine the back of the eye. It takes about an hour on average. Because of dilation, vision may be slightly blurred for a few hours, so driving afterwards is not recommended.",
    },
    source: "https://svjetlost.ba/usluge/pregledi-pacijenata/opci-oftalmoloski-pregled/203",
  },
  {
    id: "kandidat-laser",
    q: { bs: "Ko može biti kandidat za lasersko skidanje dioptrije?", en: "Who is a candidate for laser vision correction?" },
    a: {
      bs: "Prema službenim informacijama, današnjim laserima mogu se korigirati dioptrije od približno −10 do +5 i astigmatizam do ±5 cilindara. Oko mora biti zdravo, a eventualne bolesti liječene ili dobro kontrolirane. Kod tankih rožnica ili vrlo visokih dioptrija u obzir dolaze PRK ili fakične leće. Da li ste kandidat, može se utvrditi isključivo detaljnim pregledom.",
      en: "According to the clinic, today’s lasers can correct prescriptions of roughly −10 to +5 and astigmatism up to ±5 cylinders. The eye must be healthy, and any condition treated or well controlled. With thin corneas or very high prescriptions, PRK or phakic lenses may be considered. Whether you are a candidate can only be determined by a detailed examination.",
    },
    source: "https://svjetlost.ba/usluge/lasersko-skidanje-dioptrije/metode-laserskog-uklanjanja-dioptrije/109",
  },
  {
    id: "oporavak",
    q: { bs: "Koliko traje oporavak nakon zahvata?", en: "How long is recovery after a procedure?" },
    a: {
      bs: "Ovisi o zahvatu. Nakon LASIK-a većina pacijenata se uobičajenim aktivnostima vraća za dan ili dva, nakon PRK-a za pet do sedam dana. Nakon operacije mrene pacijent ide kući petnaestak minuta nakon zahvata, a svakodnevnim aktivnostima se vraća za nekoliko dana. Tačne upute daje vaš ljekar.",
      en: "It depends on the procedure. After LASIK most patients return to normal activities within a day or two; after PRK within five to seven days. After cataract surgery patients go home about fifteen minutes later and resume daily activities within a few days. Your doctor will give exact instructions.",
    },
    source: "https://svjetlost.ba/usluge/lasersko-skidanje-dioptrije/vise-informacija-45/zahvat-i-oporavak-47/47",
  },
  {
    id: "pripreme",
    q: { bs: "Da li su potrebne prethodne pripreme?", en: "Do I need to prepare beforehand?" },
    a: {
      bs: "Ponesite ranije očne nalaze te stare naočale ili kontaktne leće. Ako nosite meke kontaktne leće, za pregled za kontaktne leće skinite ih tri dana ranije, a polutvrde onoliko dana koliko godina ih nosite. Ne planirajte vožnju nakon pregleda sa širenjem zjenica. Za specifične zahvate klinika daje posebne upute pri naručivanju.",
      en: "Bring earlier eye reports and your old glasses or contact lenses. If you wear soft lenses, remove them three days before a contact lens exam; rigid lenses for as many days as the years you have worn them. Don’t plan to drive after an exam with dilated pupils. For specific procedures the clinic gives separate instructions when booking.",
    },
    source: "https://svjetlost.ba/usluge/pregledi-pacijenata/pregledi-za-kontaktne-lece/178",
  },
  {
    id: "lokacije",
    q: { bs: "Gdje se nalaze klinike?", en: "Where are the clinics?" },
    a: {
      bs: "U Sarajevu postoje dvije lokacije: Dr. Mustafe Pintola 23, Ilidža i Bolnička 8A, Centar. Obje rade od ponedjeljka do četvrtka 8–20 h i petkom 8–18 h.",
      en: "There are two locations in Sarajevo: Dr. Mustafe Pintola 23, Ilidža and Bolnička 8A, Centre. Both are open Monday to Thursday 8:00–20:00 and Friday 8:00–18:00.",
    },
    source: "https://svjetlost.ba/kontakt/14",
  },
  {
    id: "placanje",
    q: { bs: "Kako se plaćaju zahvati?", en: "How can I pay for procedures?" },
    a: {
      bs: "Prema službenom cjenovniku, ukupan iznos operacije može se platiti karticom, gotovinom ili kombinacijom. Cijene zahvata izražene su po oku. Aktuelni cjenovnik dostupan je na službenoj stranici klinike.",
      en: "According to the official price list, the total cost of surgery can be paid by card, cash or a combination. Procedure prices are quoted per eye. The current price list is available on the clinic’s official website.",
    },
    source: "https://svjetlost.ba/cjenovnik/11",
  },
  {
    id: "mrena-bol",
    q: { bs: "Da li je operacija mrene bolna?", en: "Is cataract surgery painful?" },
    a: {
      bs: "Prema službenim informacijama, operacija se izvodi u lokalnoj anesteziji kapima, bezbolna je i traje 10–15 minuta.",
      en: "According to the clinic, the operation is done under local anaesthetic drops, is painless and takes 10–15 minutes.",
    },
    source: "https://svjetlost.ba/usluge/ocna-mrena/vise-informacija-55/operacija-mrene/57",
  },
];
