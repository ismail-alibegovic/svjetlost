import type { Service, ServiceCategory, L } from "@/types/content";
import { images } from "./images";

const S = (path: string, label = "svjetlost.ba") => ({ label, url: `https://svjetlost.ba${path}` });

export const serviceCategories: { id: ServiceCategory | "all"; label: L }[] = [
  { id: "all", label: { bs: "Sve usluge", en: "All services" } },
  { id: "vision-correction", label: { bs: "Korekcija vida", en: "Vision correction" } },
  { id: "surgery", label: { bs: "Hirurgija oka", en: "Eye surgery" } },
  { id: "medical", label: { bs: "Bolesti oka", en: "Eye conditions" } },
  { id: "diagnostics", label: { bs: "Pregledi", en: "Examinations" } },
];

export const services: Service[] = [
  {
    slug: "lasersko-skidanje-dioptrije",
    number: "01",
    category: "vision-correction",
    featured: true,
    title: { bs: "Lasersko skidanje dioptrije", en: "Laser vision correction" },
    short: {
      bs: "LASIK, Femto-LASIK, PRK i personalizirani tretmani za kratkovidnost, dalekovidnost i astigmatizam.",
      en: "LASIK, Femto-LASIK, PRK and personalised treatments for short-sightedness, long-sightedness and astigmatism.",
    },
    intro: {
      bs: "Laserskim remodeliranjem rožnice moguće je ukloniti ili smanjiti dioptriju i ovisnost o naočalama ili kontaktnim lećama. Izbor metode ovisi isključivo o karakteristikama oka, visini dioptrije i načinu života — zato sve počinje detaljnim pregledom.",
      en: "By reshaping the cornea with a laser, a prescription can be removed or reduced, along with dependence on glasses or contact lenses. The right method depends entirely on the eye, the prescription and lifestyle — which is why everything starts with a detailed examination.",
    },
    image: images.laserSuite,
    conditions: {
      bs: ["Refrakcijske greške oka (dioptrija)", "Metoda LASIK", "Metoda PRK (fotorefraktivna keratektomija)", "Personalizirani (custom) tretmani", "Ugradnja fakičnih leća", "Specijalizirane terapeutske metode"],
      en: ["Refractive errors (prescription)", "LASIK", "PRK (photorefractive keratectomy)", "Personalised (custom) treatments", "Phakic lens implantation", "Specialised therapeutic methods"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Šta je dioptrija?", en: "What is a refractive error?" },
      body: {
        bs: "Dioptrija predstavlja optičku nesavršenost oka, odnosno nemogućnost oka da izoštri sliku. Kratkovidni jasno vide predmete u blizini, dok im je daljina zamućena. Dalekovidni ne vide dobro ni na daljinu ni na blizinu, a oči im se naprežu pri radu na blizinu. Astigmatizam — nepravilna zakrivljenost rožnice — čini da su predmeti zamućeni i imaju sjenu na svim udaljenostima.",
        en: "A refractive error is an optical imperfection: the eye cannot bring an image into sharp focus. Short-sighted people see near objects clearly while distance is blurred. Long-sighted people may struggle at both distance and near, with eye strain during close work. Astigmatism — an irregular curvature of the cornea — makes objects blurred and shadowed at every distance.",
      },
    },
    symptoms: {
      id: "simptomi",
      title: { bs: "Kada potražiti savjet", en: "When to seek advice" },
      body: { bs: "Česti znakovi koje pacijenti opisuju:", en: "Common signs patients describe:" },
      bullets: {
        bs: ["Ne prepoznajete osobu koja vam dolazi u susret", "Vožnja ili gledanje televizije bez naočala nije moguće", "Glavobolje ili naprezanje očiju pri radu na blizinu", "Predmeti su zamućeni i imaju sjenu na daljinu i blizinu"],
        en: ["You can’t recognise someone walking towards you", "Driving or watching TV without glasses isn’t possible", "Headaches or eye strain during close work", "Objects look blurred and shadowed at all distances"],
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Pregled za lasersko skidanje dioptrije", en: "Assessment for laser vision correction" },
      body: {
        bs: "Pregled je vrlo detaljan jer oko mora biti zdravo prije zahvata. Započinje snimanjem rožnice kako bi se dobio uvid u reljef prednje i stražnje plohe te njenu debljinu. Slijedi provjera vidne oštrine i tačne dioptrije, širenje zjenica radi objektivne procjene dioptrije, mjerenje očnog pritiska i količine suza te pregled mrežnice — uključujući periferiju, koja je kod visokih dioptrija često stanjena.",
        en: "The assessment is thorough because the eye must be healthy before treatment. It begins with corneal imaging to map the front and back surfaces and thickness. Visual acuity and exact prescription are then checked, the pupils are dilated for an objective measurement, eye pressure and tear volume are measured and the retina is examined — including the periphery, which is often thinner in high prescriptions.",
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Metode korekcije", en: "Correction methods" },
      body: {
        bs: "Osnovna podjela metoda temelji se na dubini rožnice na kojoj se zahvat izvodi. Današnjim laserima prema službenim podacima klinike moguće je korigirati dioptrije od približno −10 do +5 te astigmatizam do ±5 cilindara — konačnu preporuku daje ljekar nakon pregleda.",
        en: "Methods differ mainly by the depth in the cornea at which treatment takes place. According to the clinic, today’s lasers can correct prescriptions of roughly −10 to +5 and astigmatism up to ±5 cylinders — the final recommendation is always made by the doctor after the assessment.",
      },
      bullets: {
        bs: [
          "LASIK — u dva koraka: formiranje poklopca na rožnici (mikrokeratomom ili femtosekundnim laserom), zatim remodeliranje excimer laserom.",
          "PRK i transepitelni PRK — remodeliranje na površini rožnice; pogodno i kod tanjih rožnica.",
          "Personalizirani (custom) tretmani — uzimaju u obzir jedinstvene optičke nepravilnosti svakog oka.",
          "Fakične leće (ICL, Verisyse, Veriflex) — za vrlo visoke dioptrije ili rožnice nepogodne za laser.",
        ],
        en: [
          "LASIK — in two steps: creating a corneal flap (microkeratome or femtosecond laser), then reshaping with an excimer laser.",
          "PRK and transepithelial PRK — reshaping on the corneal surface; also suitable for thinner corneas.",
          "Personalised (custom) treatments — account for each eye’s unique optical irregularities.",
          "Phakic lenses (ICL, Verisyse, Veriflex) — for very high prescriptions or corneas unsuitable for laser.",
        ],
      },
    },
    recovery: {
      id: "oporavak",
      title: { bs: "Zahvat i oporavak", en: "Procedure and recovery" },
      body: {
        bs: "Zahvat se izvodi ambulantno u kapljičnoj anesteziji i traje 5–10 minuta po oku, ovisno o metodi. Pacijent je budan i gleda u fiksacijsko svjetlo, a sistemi praćenja oka kompenziraju sitne pokrete. Nakon LASIK-a većina se pacijenata uobičajenim aktivnostima vraća za dan ili dva, a nakon PRK-a potrebno je pet do sedam dana.",
        en: "The procedure is performed as an outpatient under anaesthetic drops and takes 5–10 minutes per eye, depending on the method. The patient stays awake looking at a fixation light while eye-tracking systems compensate for small movements. After LASIK most patients return to normal activities within a day or two; after PRK it takes five to seven days.",
      },
    },
    where: {
      bs: "Pregledi i laserski zahvati izvode se u sarajevskom centru Svjetlost.",
      en: "Assessments and laser procedures are performed at the Svjetlost Sarajevo centre.",
    },
    highlights: [
      { value: "5–10 min", label: { bs: "trajanje zahvata po oku", en: "procedure time per eye" }, scope: "group" },
      { value: "261.584+", label: { bs: "očiju tretirano laserom u grupi Svjetlost (28 godina)", en: "eyes treated by laser across the Svjetlost group (28 years)" }, scope: "group" },
    ],
    technology: ["schwind-amaris-1050rs", "zeiss-iolmaster-700"],
    doctors: ["alma-biscevic", "melisa-ahmedbegovic-pjano", "bojana-pandurevic", "nikica-gabric"],
    faq: [
      {
        q: { bs: "Da li je lasersko skidanje dioptrije bolno?", en: "Is laser vision correction painful?" },
        a: { bs: "Prema službenim informacijama klinike, zahvat se izvodi u anesteziji kapljicama i bezbolan je. Nakon PRK metode oporavak može biti nelagodan dok epitel ne zaraste.", en: "According to the clinic, the procedure is done under anaesthetic drops and is painless. After PRK, recovery may be uncomfortable until the surface layer heals." },
      },
      {
        q: { bs: "Šta ako imam previsoku dioptriju ili tanku rožnicu?", en: "What if my prescription is very high or my cornea is thin?" },
        a: { bs: "Kod dioptrija iznad otprilike −10 ili +6, ili kada je rožnica pretanka za laser, moguća je ugradnja fakičnih leća. Odluku donosi ljekar nakon pregleda.", en: "For prescriptions beyond roughly −10 or +6, or when the cornea is too thin for laser treatment, phakic lens implantation may be an option. The doctor decides after the assessment." },
      },
    ],
    related: ["starosna-dioptrija", "transplantacija-roznice", "pregledi-pacijenata"],
    source: [S("/usluge/lasersko-skidanje-dioptrije/19"), S("/usluge/lasersko-skidanje-dioptrije/vise-informacija-45/zahvat-i-oporavak-47/47")],
  },
  {
    slug: "starosna-dioptrija",
    number: "02",
    category: "vision-correction",
    featured: true,
    title: { bs: "Starosna dioptrija", en: "Presbyopia correction" },
    short: {
      bs: "Multifokalne leće i leće s proširenim rasponom vida za život nakon četrdesete — s manje naočala.",
      en: "Multifocal and extended-range lenses for life after forty — with less reliance on reading glasses.",
    },
    intro: {
      bs: "Nakon četrdesete godine vid na blizinu prirodno slabi i „ruke postaju prekratke“. Zamjenom prirodne leće umjetnom intraokularnom lećom moguće je smanjiti potrebu za naočalama na različitim udaljenostima.",
      en: "After forty, near vision naturally declines and “arms become too short”. Replacing the eye’s natural lens with an artificial intra-ocular lens can reduce the need for glasses at different distances.",
    },
    image: images.nearVision,
    conditions: {
      bs: ["Starosna dalekovidnost (presbiopija)", "Multifokalne intraokularne leće", "Eyhance i Eyhance Toric"],
      en: ["Age-related long-sightedness (presbyopia)", "Multifocal intra-ocular lenses", "Eyhance and Eyhance Toric"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Šta je presbiopija?", en: "What is presbyopia?" },
      body: {
        bs: "Presbiopija je dio prirodnog procesa starenja oka i počinje u ranim četrdesetim. Uzrokovana je slabljenjem mišića koji mijenjaju oblik prirodne leće i gubitkom elastičnosti same leće. Proces završava otprilike u šezdesetoj godini, kada osobama koje dobro vide na daljinu za čitanje treba oko +3,00 dioptrije.",
        en: "Presbyopia is part of the eye’s natural ageing and begins in the early forties. It is caused by weakening of the muscles that change the shape of the natural lens and by the lens itself losing elasticity. The process ends around sixty, when people with good distance vision typically need about +3.00 for reading.",
      },
    },
    symptoms: {
      id: "simptomi",
      title: { bs: "Kako se manifestuje", en: "How it shows" },
      body: { bs: "Vid na blizinu naglo slabi, a s vremenom pomalo slabi i vid na daljinu.", en: "Near vision declines quickly, and over time distance vision may weaken too." },
      bullets: {
        bs: ["Tekst morate odmicati da biste ga pročitali", "Potrebne su odvojene naočale za čitanje, računar i vožnju", "Posebni izazovi pri sportu, na plaži ili skijanju"],
        en: ["You hold text further away to read it", "Separate glasses for reading, computer and driving", "Extra challenges with sport, at the beach or skiing"],
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Pregled za starosnu dioptriju", en: "Presbyopia assessment" },
      body: {
        bs: "Određuje se vidna oštrina, mjeri očni pritisak i oko se pregleda biomikroskopom, nakon čega se šire zjenice. Rade se izračun jačine leće (IOL Master), rožnična topografija, OCT žute pjege, ultrazvuk i mjerenje broja endotelnih ćelija.",
        en: "Visual acuity is measured, eye pressure checked and the eye examined with a slit lamp before the pupils are dilated. Lens power calculation (IOL Master), corneal topography, macular OCT, ultrasound and endothelial cell count are then performed.",
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Vrste intraokularnih leća", en: "Types of intra-ocular lens" },
      body: {
        bs: "Leće se biraju individualno, prema potrebama i načinu života — rad na računaru, čitanje, vožnja.",
        en: "Lenses are chosen individually, according to needs and lifestyle — computer work, reading, driving.",
      },
      bullets: {
        bs: ["Multifokalne leće s dva ili tri fokusa za vid na različitim udaljenostima", "Leće s kontinuiranim rasponom vida za daljinu, srednju udaljenost i blizinu", "Eyhance i Eyhance Toric — monofokalne leće s produženim rasponom vida, dostupne i u toričnoj verziji za astigmatizam"],
        en: ["Multifocal lenses with two or three focal points for different distances", "Continuous-range lenses for distance, intermediate and near", "Eyhance and Eyhance Toric — monofocal lenses with an extended range, also available in a toric version for astigmatism"],
      },
    },
    recovery: {
      id: "oporavak",
      title: { bs: "Zahvat i oporavak", en: "Procedure and recovery" },
      body: {
        bs: "Zahvat se izvodi ambulantno u kapljičnoj anesteziji i traje desetak minuta. Prirodna leća uklanja se kroz otvor od oko 2 mm koji ne zahtijeva šav. Pacijent ide kući petnaestak minuta nakon zahvata, a svakodnevnim aktivnostima vraća se za nekoliko dana. Kontrole su prvi dan, nakon sedam dana i nakon tri sedmice.",
        en: "The procedure is done as an outpatient under anaesthetic drops and takes about ten minutes. The natural lens is removed through an opening of about 2 mm that needs no stitch. Patients go home about fifteen minutes later and return to daily activities within a few days. Check-ups follow on day one, after seven days and after three weeks.",
      },
    },
    where: { bs: "Pregledi i zahvati izvode se u sarajevskom centru Svjetlost.", en: "Assessments and procedures are performed at the Svjetlost Sarajevo centre." },
    highlights: [
      { value: "~10 min", label: { bs: "trajanje zahvata", en: "procedure time" }, scope: "group" },
      { value: "3–5", label: { bs: "dana do povratka svakodnevnim aktivnostima (okvirno)", en: "days to resume daily activities (typical)" }, scope: "group" },
    ],
    technology: ["zeiss-iolmaster-700", "stellaris-elite", "tomey-em-4000"],
    doctors: ["nikica-gabric", "ratimir-lazic", "melisa-ahmedbegovic-pjano"],
    faq: [
      {
        q: { bs: "Mogu li nakon zahvata dobiti mrenu?", en: "Can I develop a cataract after the procedure?" },
        a: { bs: "Prema službenim informacijama, intraokularna leća je trajna i nakon zahvata zamjene leće mrena se ne može ponovo razviti na istoj leći.", en: "According to the clinic, the intra-ocular lens is permanent, and a cataract cannot form again in the replaced lens." },
      },
      {
        q: { bs: "Operišu li se oba oka istovremeno?", en: "Are both eyes treated at the same time?" },
        a: { bs: "Klinika navodi da je radi brže rehabilitacije najbolje istovremeno zamijeniti leće na oba oka. Plan se uvijek dogovara individualno.", en: "The clinic notes that treating both eyes together speeds rehabilitation. The plan is always agreed individually." },
      },
    ],
    related: ["ocna-mrena", "lasersko-skidanje-dioptrije", "pregledi-pacijenata"],
    source: [S("/usluge/starosna-dioptrija/20"), S("/usluge/starosna-dioptrija/vise-informacija-50/zahvat-i-oporavak-52/52")],
  },
  {
    slug: "ocna-mrena",
    number: "03",
    category: "surgery",
    featured: true,
    title: { bs: "Očna mrena", en: "Cataract surgery" },
    short: {
      bs: "Ultrazvučna operacija sive mrene s ugradnjom monofokalnih, toričnih ili multifokalnih leća.",
      en: "Ultrasound cataract surgery with monofocal, toric or multifocal lens implants.",
    },
    intro: {
      bs: "Siva mrena (katarakta) je zamućenje prirodne očne leće i jedna je od najčešćih bolesti starije životne dobi. Kada naočale više ne pomažu, operacija je jedini način liječenja — i jedan od najčešće izvođenih zahvata u svijetu.",
      en: "A cataract is a clouding of the eye’s natural lens and one of the most common conditions of later life. When glasses no longer help, surgery is the only treatment — and one of the most frequently performed operations in the world.",
    },
    image: images.cataractSurgery,
    conditions: {
      bs: ["O mreni", "Simptomi očne mrene (katarakte)", "Monofokalne i torične intraokularne leće", "Multifokalne intraokularne leće"],
      en: ["About cataract", "Cataract symptoms", "Monofocal and toric intra-ocular lenses", "Multifocal intra-ocular lenses"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Šta je siva mrena?", en: "What is a cataract?" },
      body: {
        bs: "Mrena je najčešće posljedica prirodnog starenja koje dovodi do zamućenja leće. Može nastati i nakon povrede, kod metaboličkih bolesti poput dijabetesa, uz primjenu nekih lijekova (kortikosteroidi) ili kao komplikacija drugih očnih bolesti.",
        en: "A cataract is most often the result of natural ageing, which clouds the lens. It can also follow an injury, occur with metabolic diseases such as diabetes, with some medicines (corticosteroids) or as a complication of other eye diseases.",
      },
    },
    symptoms: {
      id: "simptomi",
      title: { bs: "Simptomi", en: "Symptoms" },
      body: { bs: "Simptomi se razvijaju postepeno:", en: "Symptoms develop gradually:" },
      bullets: {
        bs: ["Zamućen vid i gubitak kontrasta", "Zablještenje pri jakom svjetlu", "Duple slike", "Poteškoće pri čitanju, gledanju televizije i vožnji"],
        en: ["Blurred vision and loss of contrast", "Glare in bright light", "Double vision", "Difficulty reading, watching TV and driving"],
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Pregled prije operacije", en: "Pre-operative assessment" },
      body: {
        bs: "Određuju se vidna oštrina i očni pritisak, oko se pregleda biomikroskopom, a zatim se šire zjenice radi uvida u leću, vidni živac, žutu pjegu i mrežnicu. Jačina intraokularne leće izračunava se uređajem IOL Master, a kod gustih mrena i ultrazvučnim A-scanom. Topografija rožnice određuje astigmatizam, a OCT žute pjege i vidnog živca otkriva eventualne bolesti prije operacije.",
        en: "Visual acuity and eye pressure are measured, the eye is examined with a slit lamp and the pupils are dilated to assess the lens, optic nerve, macula and retina. The intra-ocular lens power is calculated with an IOL Master, and with ultrasound A-scan for dense cataracts. Corneal topography measures astigmatism, and OCT of the macula and optic nerve detects any disease before surgery.",
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Operacija mrene", en: "Cataract surgery" },
      body: {
        bs: "Fakoemulzifikacija s ugradnjom intraokularne leće zlatni je standard: kroz rez od 1,8 do 2,75 mm ultrazvučnom sondom uklanja se zamućena leća i ugrađuje bistra umjetna leća. Zbog malog reza šivanje nije potrebno. Zahvat se izvodi u kapljičnoj anesteziji i traje 10–15 minuta.",
        en: "Phacoemulsification with intra-ocular lens implantation is the gold standard: through a 1.8–2.75 mm incision an ultrasound probe removes the clouded lens and a clear artificial lens is implanted. The small incision needs no stitches. Surgery is done under anaesthetic drops and takes 10–15 minutes.",
      },
      bullets: {
        bs: ["Monofokalne leće — jedan fokus, obično za daljinu", "Torične leće — dodatno korigiraju astigmatizam", "Multifokalne leće i leće s proširenim rasponom vida — za daljinu, srednju udaljenost i blizinu"],
        en: ["Monofocal lenses — one focus, usually for distance", "Toric lenses — additionally correct astigmatism", "Multifocal and extended-range lenses — for distance, intermediate and near"],
      },
    },
    recovery: {
      id: "oporavak",
      title: { bs: "Oporavak", en: "Recovery" },
      body: {
        bs: "Pacijent ide kući petnaestak minuta nakon operacije. Prvi pregled je sljedeći dan, zatim nakon sedam dana i nakon mjesec dana, kada se određuju naočale ako su potrebne. Prva tri dana ne preporučuje se umivanje vodovodnom vodom, a mjesec dana treba izbjegavati trljanje oka, saginjanje i dizanje teškog tereta.",
        en: "Patients go home about fifteen minutes after surgery. Check-ups follow the next day, after seven days and after one month, when glasses are prescribed if needed. For the first three days washing with tap water is not advised, and for a month rubbing the eye, bending over and heavy lifting should be avoided.",
      },
    },
    where: { bs: "Ultrazvučne operacije mrene izvode se u sarajevskom centru Svjetlost.", en: "Ultrasound cataract surgery is performed at the Svjetlost Sarajevo centre." },
    highlights: [
      { value: "10–15 min", label: { bs: "trajanje operacije", en: "surgery time" }, scope: "group" },
      { value: "1,8 mm", label: { bs: "najmanji rez, bez šivanja", en: "smallest incision, no stitches" }, scope: "group" },
    ],
    technology: ["stellaris-elite", "zeiss-iolmaster-700", "zeiss-s88", "tomey-em-4000"],
    doctors: ["nikica-gabric", "ratimir-lazic"],
    faq: [
      {
        q: { bs: "Koliko brzo mogu biti operisan/a nakon pregleda?", en: "How soon after the assessment can I have surgery?" },
        a: { bs: "Službena stranica navodi da se mrena u Klinici Svjetlost može operisati unutar sedmicu ili dvije od obavljenog pregleda. Termin se potvrđuje telefonom.", en: "The official website states that cataract surgery at Svjetlost can be scheduled within a week or two of the assessment. Dates are confirmed by phone." },
      },
      {
        q: { bs: "Mogu li se operisati oba oka isti dan?", en: "Can both eyes be operated on the same day?" },
        a: { bs: "Prema službenim informacijama, ako je mrena prisutna na oba oka, operacija se može izvesti na oba oka isti dan, ovisno o procjeni ljekara.", en: "According to the clinic, if both eyes have a cataract they can be operated on the same day, subject to the doctor’s assessment." },
      },
    ],
    related: ["starosna-dioptrija", "dijabetes-i-retina", "pregledi-pacijenata"],
    source: [S("/usluge/ocna-mrena/21"), S("/usluge/ocna-mrena/vise-informacija-55/operacija-mrene/57"), S("/usluge/ocna-mrena/vise-informacija-55/oporavak/58")],
  },
  {
    slug: "dijabetes-i-retina",
    number: "04",
    category: "medical",
    featured: true,
    title: { bs: "Dijabetes i retina", en: "Diabetes and retina" },
    short: {
      bs: "Dijagnostika i liječenje bolesti mrežnice i žute pjege — anti-VEGF terapija, laser i vitrektomija.",
      en: "Diagnosis and treatment of retinal and macular disease — anti-VEGF therapy, laser and vitrectomy.",
    },
    intro: {
      bs: "Mrežnica (retina) pretvara svjetlost u signal koji putuje do mozga. Bolesti poput dijabetičke retinopatije, degeneracije žute pjege ili ablacije retine mogu trajno ugroziti vid — zato su rana dijagnostika i pravovremeno liječenje ključni.",
      en: "The retina turns light into the signal that travels to the brain. Conditions such as diabetic retinopathy, macular degeneration or retinal detachment can threaten sight permanently — which is why early diagnosis and timely treatment matter.",
    },
    image: images.octDiagnostics,
    conditions: {
      bs: ["Ablacija retine", "Dijabetička retinopatija", "Degeneracija makule", "Celofan i puknuće makule", "Strano tijelo u dubini oka", "Anti-VEGF terapija"],
      en: ["Retinal detachment", "Diabetic retinopathy", "Macular degeneration", "Epiretinal membrane and macular hole", "Intra-ocular foreign body", "Anti-VEGF therapy"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Bolesti mrežnice", en: "Retinal conditions" },
      body: {
        bs: "Dijabetes je vodeći uzrok lošeg vida radno sposobne populacije u svijetu; njegova najvažnija komplikacija na oku je dijabetička retinopatija, oštećenje sitnih krvnih žila mrežnice. Degeneracija makule zahvata središnji dio mrežnice odgovoran za čitanje i prepoznavanje lica, obično nakon 50. godine. Ablacija retine je hitno stanje koje bi trebalo operisati što prije, najbolje unutar 24 sata.",
        en: "Diabetes is the leading cause of poor vision in the working-age population worldwide; its most important eye complication is diabetic retinopathy, damage to the retina’s tiny blood vessels. Macular degeneration affects the central retina used for reading and recognising faces, usually after 50. Retinal detachment is an emergency that should be operated on as soon as possible, ideally within 24 hours.",
      },
    },
    symptoms: {
      id: "simptomi",
      title: { bs: "Znakovi upozorenja", en: "Warning signs" },
      body: { bs: "Javite se oftalmologu bez odgađanja ako primijetite:", en: "See an ophthalmologist without delay if you notice:" },
      bullets: {
        bs: ["Slabljenje vida, posebno centralnog", "Tamnu „zavjesu“ koja se širi preko vidnog polja", "Iskrivljene linije ili mrlje u središtu vida", "Nagli pad vida nakon povrede oka"],
        en: ["Weakening vision, especially central vision", "A dark “curtain” spreading across your field of view", "Distorted lines or blotches in the centre of vision", "Sudden loss of vision after an eye injury"],
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Pregled dubine oka", en: "Examining the back of the eye" },
      body: {
        bs: "Pregled počinje vidnom oštrinom, mjerenjem očnog pritiska i pregledom na biomikroskopu. Zatim se šire zjenice — ostaju proširene oko dva sata, pa se nakon pregleda ne preporučuje vožnja. Pregled se po potrebi upotpunjuje optičkom koherentnom tomografijom (OCT), fluoresceinskom angiografijom ili ultrazvukom oka.",
        en: "The exam starts with visual acuity, eye pressure and a slit-lamp examination. The pupils are then dilated — they stay dilated for around two hours, so driving afterwards is not advised. Where needed, the exam is completed with optical coherence tomography (OCT), fluorescein angiography or ocular ultrasound.",
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Liječenje", en: "Treatment" },
      body: {
        bs: "Način liječenja ovisi o dijagnozi i određuje ga retinolog.",
        en: "Treatment depends on the diagnosis and is determined by a retina specialist.",
      },
      bullets: {
        bs: ["Anti-VEGF injekcije u oko — za vlažnu degeneraciju makule, dijabetičku retinopatiju i tromboze krvnih žila mrežnice", "Laserska fotokoagulacija mrežnice", "Minimalno invazivna vitrektomija kroz otvore manje od 1 mm (23, 25 i 27 gauge) u lokalnoj anesteziji"],
        en: ["Anti-VEGF injections into the eye — for wet macular degeneration, diabetic retinopathy and retinal vein occlusion", "Retinal laser photocoagulation", "Minimally invasive vitrectomy through openings under 1 mm (23, 25 and 27 gauge) under local anaesthesia"],
      },
    },
    recovery: {
      id: "oporavak",
      title: { bs: "Vitrektomija i oporavak", en: "Vitrectomy and recovery" },
      body: {
        bs: "Vitrektomija se izvodi u lokalnoj anesteziji uz prisustvo anesteziologa, traje u prosjeku oko sat vremena, a pacijent nakon zahvata ide kući. Zahvat je bez šavova i minimalno traumatičan, što ubrzava oporavak.",
        en: "Vitrectomy is performed under local anaesthesia with an anaesthetist present, takes around an hour on average, and the patient goes home afterwards. It is stitch-free and minimally traumatic, which speeds recovery.",
      },
    },
    where: {
      bs: "Dijagnostika, anti-VEGF terapija i vitrektomija dostupni su u Sarajevu. Prema službenoj stranici, dio operacija zbog bolesti žute pjege ili degenerativnih promjena mrežnice izvodi se u Klinici Svjetlost u Zagrebu.",
      en: "Diagnostics, anti-VEGF therapy and vitrectomy are available in Sarajevo. According to the official website, some operations for macular disease or degenerative retinal changes are performed at Svjetlost Zagreb.",
    },
    highlights: [
      { value: "<1 mm", label: { bs: "otvori kod vitrektomije", en: "vitrectomy port size" }, scope: "group" },
      { value: "2005.", label: { bs: "prva anti-VEGF terapija u regiji", en: "first anti-VEGF therapy in the region" }, scope: "group" },
    ],
    technology: ["optopol-revo-60", "canon-cx1", "pascal-synthesis", "vitra-2", "stellaris-elite"],
    doctors: ["ratimir-lazic", "azra-mehmedovic", "danijela-stojanovic", "vernesa-sofic-drino"],
    faq: [
      {
        q: { bs: "Koliko često dijabetičari trebaju pregled mrežnice?", en: "How often should people with diabetes have their retina checked?" },
        a: { bs: "Učestalost određuje vaš oftalmolog. Klinika nudi retinološke preventivne preglede radi rane detekcije dijabetičkih oštećenja.", en: "Your ophthalmologist decides the frequency. The clinic offers preventive retinal check-ups to detect diabetic damage early." },
      },
      {
        q: { bs: "Mogu li voziti nakon pregleda?", en: "Can I drive after the exam?" },
        a: { bs: "Zjenice ostaju proširene oko dva sata, pa se u tom periodu vožnja ne preporučuje. Planirajte dolazak u pratnji ili javnim prevozom.", en: "Pupils stay dilated for about two hours, so driving is not recommended during that time. Plan to come with a companion or by public transport." },
      },
    ],
    related: ["ocna-mrena", "lijecenje-glaukoma", "pregledi-pacijenata"],
    source: [S("/usluge/dijabetes-i-retina/15"), S("/usluge/dijabetes-i-retina/vise-informacija/pregled/28"), S("/usluge/dijabetes-i-retina/vise-informacija/zahvat-i-oporavak/29")],
  },
  {
    slug: "lijecenje-glaukoma",
    number: "05",
    category: "medical",
    title: { bs: "Liječenje glaukoma", en: "Glaucoma care" },
    short: {
      bs: "Kompletna dijagnostika glaukoma u jednom danu, kapi, laser i hirurško liječenje.",
      en: "Complete glaucoma diagnostics in one day, drops, laser and surgical treatment.",
    },
    intro: {
      bs: "Glaukom je progresivna bolest očnog živca koja dolazi bez simptoma — zato je zovu „tihim kradljivcem vida“. Oštećenja nastala prije liječenja nije moguće popraviti, ali je napredovanje bolesti moguće znatno usporiti.",
      en: "Glaucoma is a progressive disease of the optic nerve that arrives without symptoms — hence its name, “the silent thief of sight”. Damage done before treatment cannot be reversed, but progression can be slowed considerably.",
    },
    image: images.tonometry,
    conditions: {
      bs: ["Glaukom", "Rizični faktori", "Simptomi glaukoma", "Tipovi glaukoma", "Rano otkrivanje glaukoma"],
      en: ["Glaucoma", "Risk factors", "Symptoms", "Types of glaucoma", "Early detection"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Šta je glaukom?", en: "What is glaucoma?" },
      body: {
        bs: "Ako se ne liječi, glaukom dovodi do sužavanja vidnog polja, propadanja očnog živca i trajnog gubitka vida. Povišeni očni pritisak glavni je faktor rizika — normalne vrijednosti kreću se od 8 do 21 mmHg — ali oštećenja mogu nastati i pri normalnom pritisku. Razlikuju se glaukom otvorenog ugla, zatvorenog ugla, dječiji i sekundarni glaukom.",
        en: "Untreated, glaucoma narrows the field of vision, damages the optic nerve and leads to permanent sight loss. Raised eye pressure is the main risk factor — normal values range from 8 to 21 mmHg — but damage can also occur at normal pressure. Types include open-angle, angle-closure, childhood and secondary glaucoma.",
      },
    },
    symptoms: {
      id: "simptomi",
      title: { bs: "Simptomi i rizici", en: "Symptoms and risks" },
      body: {
        bs: "Glaukom otvorenog ugla najčešće nema simptoma. Glaukom zatvorenog ugla može biti buran: jak bol u oku, glavobolja, mučnina i nagli pad vida zahtijevaju hitan pregled.",
        en: "Open-angle glaucoma usually has no symptoms. Angle-closure glaucoma can be dramatic: severe eye pain, headache, nausea and sudden vision loss require urgent care.",
      },
      bullets: {
        bs: ["Glaukom u porodici", "Dob iznad 65 godina — kontrola pritiska svake dvije godine", "Povišen krvni pritisak, dijabetes, hipotireoza", "Dugotrajna terapija kortikosteroidima i povrede oka"],
        en: ["Glaucoma in the family", "Age over 65 — pressure check every two years", "High blood pressure, diabetes, hypothyroidism", "Long-term corticosteroid use and eye injuries"],
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Dijagnostika u jednom danu", en: "Diagnostics in one day" },
      body: {
        bs: "Cjelokupna dijagnostika glaukoma moguća je u jednom danu: beskontaktno i kontaktno mjerenje očnog pritiska, mjerenje debljine rožnice, pregled očnog ugla (gonioskopija), kompjuterizirano vidno polje i analiza očnog živca optičkom koherentnom tomografijom (OCT). Ispitivanje vidnog polja zahtijeva koncentraciju i može trajati do sat vremena.",
        en: "Complete glaucoma diagnostics can be done in a single day: contact and non-contact pressure measurement, corneal thickness, examination of the drainage angle (gonioscopy), computerised visual field and optic nerve analysis with optical coherence tomography (OCT). Visual field testing requires concentration and can take up to an hour.",
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Liječenje", en: "Treatment" },
      body: {
        bs: "Glaukom se liječi kapima, laserom ili hirurški, a metode se mogu kombinovati. Liječenje najčešće počinje kapima koje snižavaju očni pritisak.",
        en: "Glaucoma is treated with drops, laser or surgery, and methods can be combined. Treatment usually begins with pressure-lowering drops.",
      },
      bullets: {
        bs: ["Antiglaukomske kapi", "YAG laser iridotomija — bezbolni ambulantni zahvat kod glaukoma zatvorenog ugla", "Trabekulektomija i ugradnja drenažnog implantata (Express mini shunt) — u lokalnoj anesteziji, oko 15 minuta"],
        en: ["Glaucoma eye drops", "YAG laser iridotomy — painless outpatient procedure for angle-closure glaucoma", "Trabeculectomy and drainage implant (Express mini shunt) — under local anaesthesia, about 15 minutes"],
      },
    },
    where: { bs: "Dijagnostika i operativno liječenje glaukoma izvode se u sarajevskom centru Svjetlost.", en: "Glaucoma diagnostics and surgery are performed at the Svjetlost Sarajevo centre." },
    highlights: [
      { value: "1 dan", label: { bs: "za kompletnu dijagnostiku", en: "for complete diagnostics" }, scope: "sarajevo" },
      { value: "8–21", label: { bs: "mmHg — raspon normalnog očnog pritiska", en: "mmHg — normal eye pressure range" }, scope: "group" },
    ],
    technology: ["icare-tonometer", "optopol-revo-60", "visual-field-925w", "frey-ap-300", "yag-syl-900"],
    doctors: ["bojana-pandurevic", "senad-grisevic"],
    faq: [
      {
        q: { bs: "Može li se glaukom spriječiti?", en: "Can glaucoma be prevented?" },
        a: { bs: "Prevencija nije moguća, ali je moguće rano otkrivanje i znatno usporavanje bolesti. Ako u porodici ima glaukoma, povremeno obavite cjelokupni pregled.", en: "It cannot be prevented, but it can be detected early and slowed considerably. If glaucoma runs in your family, have a complete check periodically." },
      },
      {
        q: { bs: "Koliko traje pregled za glaukom?", en: "How long does a glaucoma assessment take?" },
        a: { bs: "Pregled obuhvata više pretraga; samo ispitivanje vidnog polja može trajati do sat vremena. Računajte na nekoliko sati u klinici.", en: "It includes several tests; the visual field test alone can take up to an hour. Allow a few hours at the clinic." },
      },
    ],
    related: ["pregledi-pacijenata", "dijabetes-i-retina", "ocna-mrena"],
    source: [S("/usluge/lijecenje-glaukoma/24"), S("/usluge/lijecenje-glaukoma/vise-informacija-65-70/lijecenje-i-prevencija-glaukoma/72")],
  },
  {
    slug: "transplantacija-roznice",
    number: "06",
    category: "surgery",
    title: { bs: "Transplantacija rožnice i keratokonus", en: "Corneal transplantation and keratoconus" },
    short: {
      bs: "Crosslinking kod keratokonusa u Sarajevu i transplantacija rožnice u Klinici Svjetlost Zagreb.",
      en: "Crosslinking for keratoconus in Sarajevo and corneal transplantation at Svjetlost Zagreb.",
    },
    intro: {
      bs: "Rožnica je prozirni prednji dio oka. Bolesti poput keratokonusa, Fuchsove distrofije ili herpetičnog keratitisa mogu ozbiljno narušiti vid. Grupa Svjetlost ima dugu tradiciju u liječenju bolesti rožnice i očnom bankarstvu.",
      en: "The cornea is the clear front window of the eye. Conditions such as keratoconus, Fuchs’ dystrophy or herpetic keratitis can seriously impair vision. The Svjetlost group has a long tradition in corneal care and eye banking.",
    },
    image: images.pentacam,
    conditions: {
      bs: ["Keratokonus", "Pseudofakna bulozna keratopatija", "Fuchsova endotelna distrofija", "Herpetični keratitis"],
      en: ["Keratoconus", "Pseudophakic bullous keratopathy", "Fuchs’ endothelial dystrophy", "Herpetic keratitis"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Šta je keratokonus?", en: "What is keratoconus?" },
      body: {
        bs: "Keratokonus je najčešća degenerativna promjena rožnice: neupalno, progresivno stanjivanje zbog kojeg rožnica poprima konusni oblik. Pogađa otprilike jednu osobu na dvije hiljade, obično napreduje u adolescenciji i najčešće zahvata oba oka, jedno izraženije.",
        en: "Keratoconus is the most common degenerative change of the cornea: a non-inflammatory, progressive thinning that gives the cornea a conical shape. It affects about one person in two thousand, usually progresses during adolescence and typically involves both eyes, one more than the other.",
      },
    },
    symptoms: {
      id: "simptomi",
      title: { bs: "Simptomi", en: "Symptoms" },
      body: { bs: "Najčešće dolazi do jednostranog pada vidne oštrine:", en: "Vision usually declines in one eye first:" },
      bullets: {
        bs: ["Zamućen ili iskrivljen vid", "Pojačana osjetljivost na svjetlo i odsjaj", "Problemi s noćnim vidom", "Česte promjene dioptrije i nepravilan astigmatizam"],
        en: ["Blurred or distorted vision", "Increased sensitivity to light and glare", "Night-vision problems", "Frequent prescription changes and irregular astigmatism"],
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Dijagnostika", en: "Diagnostics" },
      body: {
        bs: "Rožnični topograf (Pentacam) snima prednju i stražnju plohu rožnice i smatra se referentnim uređajem za topografiju. Pretraga je beskontaktna, bezbolna i traje svega nekoliko sekundi. Uz to se mjeri debljina rožnice i dubina prednje očne sobice.",
        en: "A corneal topographer (Pentacam) maps the front and back surfaces of the cornea and is considered the reference standard for topography. The scan is contact-free, painless and takes just seconds. Corneal thickness and anterior chamber depth are measured as well.",
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Liječenje", en: "Treatment" },
      body: {
        bs: "Liječenje ovisi o bolesti i stadiju.",
        en: "Treatment depends on the condition and its stage.",
      },
      bullets: {
        bs: ["Crosslinking — usporava napredovanje keratokonusa; u Sarajevu se izvodi od 2015. godine", "Specijalne kontaktne leće, uključujući Rose K i skleralne leće", "Lamelarna (DSAEK, UT-DSAEK) i perforativna transplantacija rožnice — izvode se u Klinici Svjetlost Zagreb"],
        en: ["Crosslinking — slows keratoconus progression; performed in Sarajevo since 2015", "Specialist contact lenses, including Rose K and scleral lenses", "Lamellar (DSAEK, UT-DSAEK) and penetrating corneal transplantation — performed at Svjetlost Zagreb"],
      },
    },
    where: {
      bs: "Crosslinking i prilagođavanje specijalnih kontaktnih leća dostupni su u Sarajevu. Transplantacije rožnice izvode se u Klinici Svjetlost u Zagrebu.",
      en: "Crosslinking and specialist contact lens fitting are available in Sarajevo. Corneal transplants are performed at Svjetlost Zagreb.",
    },
    highlights: [
      { value: "300+", label: { bs: "crosslinking zahvata — doc. dr. sc. Senad Grišević", en: "crosslinking procedures — Asst. Prof. Senad Grišević" }, scope: "sarajevo" },
      { value: "1995.", label: { bs: "osnovana prva hrvatska očna banka (osnivači iz tima Svjetlost)", en: "first Croatian eye bank founded (founders from the Svjetlost team)" }, scope: "group" },
    ],
    technology: ["tomey-em-4000", "schwind-amaris-1050rs"],
    doctors: ["senad-grisevic", "alma-biscevic", "bojana-pandurevic"],
    faq: [
      {
        q: { bs: "Gdje se izvodi transplantacija rožnice?", en: "Where is corneal transplantation performed?" },
        a: { bs: "Prema službenoj stranici, transplantacije rožnice obavljaju se u Klinici Svjetlost u Zagrebu. Pregled i praćenje mogu se dogovoriti u Sarajevu.", en: "According to the official website, corneal transplants are performed at Svjetlost Zagreb. Assessment and follow-up can be arranged in Sarajevo." },
      },
      {
        q: { bs: "Može li se keratokonus zaustaviti?", en: "Can keratoconus be stopped?" },
        a: { bs: "Crosslinking se primjenjuje kako bi se stabilizirala rožnica i spriječilo daljnje napredovanje. Da li je zahvat pogodan za vas, procjenjuje ljekar.", en: "Crosslinking is used to stabilise the cornea and prevent further progression. Whether it suits you is decided by the doctor." },
      },
    ],
    related: ["lasersko-skidanje-dioptrije", "pregledi-pacijenata", "djecija-oftalmologija"],
    source: [S("/usluge/transplantacija-roznice/22"), S("/usluge/transplantacija-roznice/keratokonus/201"), S("/nasi-doktori/doc-dr-sc-senad-grisevic/119")],
  },
  {
    slug: "djecija-oftalmologija",
    number: "07",
    category: "medical",
    title: { bs: "Dječija oftalmologija", en: "Paediatric ophthalmology" },
    short: {
      bs: "Pregledi prilagođeni dobi djeteta, strabizam, slabovidnost i određivanje dioptrije kod djece.",
      en: "Age-appropriate exams, squint, lazy eye and prescriptions for children.",
    },
    intro: {
      bs: "Vid se intenzivno razvija do kraja šeste godine života i dijete nikada nije premalo za pregled. Poremećaji otkriveni na vrijeme mogu se liječiti dok se vid još razvija — kasnije su rezultati znatno slabiji.",
      en: "Vision develops intensively until the end of the sixth year, and no child is too young for an eye exam. Problems found early can be treated while vision is still developing — later on, results are considerably poorer.",
    },
    image: images.paediatricExam,
    conditions: {
      bs: ["Obavezan pregled djeteta", "Strabizam", "Ambliopija (slabovidnost)", "Prirođena mrena", "Određivanje dioptrije kod djece", "Suženje suznih kanala"],
      en: ["Routine child eye exam", "Squint (strabismus)", "Amblyopia (lazy eye)", "Congenital cataract", "Prescriptions for children", "Blocked tear ducts"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Zašto je rani pregled važan", en: "Why early examination matters" },
      body: {
        bs: "Dječiji oftalmološki pregled jedan je od najvažnijih pregleda koje treba obaviti do četvrte godine života. Najčešće bolesti koje treba liječiti u dječijoj dobi su strabizam, slabovidnost (lijeno oko), dječija mrena i nistagmus. Ako je vid oslabljen samo na jednom oku, roditelji problem često ne primjećuju jer dijete koristi bolje oko.",
        en: "A children’s eye exam is one of the most important check-ups to complete before age four. The most common childhood conditions needing treatment are squint, amblyopia (lazy eye), childhood cataract and nystagmus. When only one eye is affected, parents often don’t notice because the child relies on the better eye.",
      },
    },
    symptoms: {
      id: "simptomi",
      title: { bs: "Na šta roditelji trebaju obratiti pažnju", en: "What parents should watch for" },
      body: { bs: "Kod pojave bilo kakvih simptoma dijete treba odmah dovesti na pregled, bez obzira na dob.", en: "If any symptoms appear, bring the child in straight away, whatever their age." },
      bullets: {
        bs: ["Približavanje knjiga i igračaka ili gledanje televizije izbliza", "Stiskanje očiju i učestalo žmirkanje", "Glavobolje nakon čitanja ili igranja igrica", "Oko koje skreće prema unutra ili van", "Oko koje stalno suzi kod dojenčadi"],
        en: ["Holding books and toys close or sitting close to the TV", "Squinting and frequent blinking", "Headaches after reading or gaming", "An eye that turns in or out", "A constantly watering eye in babies"],
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Dječiji pregled", en: "The children’s exam" },
      body: {
        bs: "Pregled je prilagođen dobi i nije bolan. Kod beba se koriste kartice s uzorcima, kod predškolske djece Lea simboli, a kod školske djece tablice slova. Ortoptički status provjerava položaj, pokretljivost i saradnju oba oka. Dječiji autorefraktometar Plusoptix mjeri dioptriju s udaljenosti od jednog metra — dovoljno je da dijete pogleda u aparat manje od sekunde.",
        en: "The exam is tailored to age and painless. Babies are tested with pattern cards, pre-schoolers with Lea symbols and school children with letter charts. An orthoptic assessment checks the position, movement and coordination of both eyes. The Plusoptix paediatric autorefractor measures prescription from one metre away — the child only needs to look at it for under a second.",
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Liječenje", en: "Treatment" },
      body: {
        bs: "Liječenje zavisi od nalaza i dobi djeteta.",
        en: "Treatment depends on the findings and the child’s age.",
      },
      bullets: {
        bs: ["Naočale ili kontaktne leće za korekciju dioptrije", "Okluzija (zatvaranje) zdravog oka kod slabovidnosti", "Operacija strabizma — izvodi se u općoj anesteziji u Klinici Svjetlost Zagreb", "Sondiranje suznog kanala — kod oko 90% djece kanal se spontano otvori u prvoj godini"],
        en: ["Glasses or contact lenses to correct prescription", "Patching (occlusion) of the stronger eye for lazy eye", "Squint surgery — performed under general anaesthesia at Svjetlost Zagreb", "Tear duct probing — in around 90% of children the duct opens on its own in the first year"],
      },
    },
    where: {
      bs: "Dječiji pregledi obavljaju se u Sarajevu. Prema službenoj stranici, operacije strabizma i sondiranje suznih kanala izvode se u Klinici Svjetlost u Zagrebu.",
      en: "Children’s exams take place in Sarajevo. According to the official website, squint surgery and tear duct probing are performed at Svjetlost Zagreb.",
    },
    highlights: [
      { value: "do 4.", label: { bs: "godine — preporučeni prvi pregled", en: "years of age — recommended first exam" }, scope: "group" },
      { value: "0,8 s", label: { bs: "mjerenje dioptrije uređajem Plusoptix", en: "prescription reading with Plusoptix" }, scope: "group" },
    ],
    technology: ["plusoptix"],
    doctors: ["alma-biscevic", "mirnesa-odobasic"],
    faq: [
      {
        q: { bs: "Kada dijete treba prvi put na pregled očiju?", en: "When should a child have their first eye exam?" },
        a: { bs: "Klinika preporučuje pregled do četvrte godine, čak i bez simptoma. Ako primijetite bilo kakav simptom, dijete dovedite odmah.", en: "The clinic recommends an exam by age four, even with no symptoms. If you notice any symptom, bring the child in straight away." },
      },
      {
        q: { bs: "Može li roditelj biti uz dijete tokom zahvata?", en: "Can a parent stay with the child during treatment?" },
        a: { bs: "Nakon operativnog zahvata roditelj može boraviti s djetetom u bolničkoj sobi; većina djece kliniku napušta nekoliko sati nakon zahvata.", en: "After surgery a parent can stay with the child in the room; most children leave the clinic a few hours later." },
      },
    ],
    related: ["pregledi-pacijenata", "transplantacija-roznice", "lijecenje-glaukoma"],
    source: [S("/usluge/djecija-oftalmologija/23"), S("/usluge/djecija-oftalmologija/obavezan-pregled-djeteta/136"), S("/usluge/djecija-oftalmologija/vise-informacija-65/djecji-pregled/66")],
  },
  {
    slug: "plasticni-zahvati",
    number: "08",
    category: "surgery",
    title: { bs: "Plastični zahvati", en: "Oculoplastic surgery" },
    short: {
      bs: "Blefaroplastika, korekcija ptoze i položaja kapaka, uklanjanje tumora i botox iz medicinskih i estetskih razloga.",
      en: "Blepharoplasty, ptosis and eyelid position correction, tumour removal and Botox for medical and aesthetic reasons.",
    },
    intro: {
      bs: "Degenerativne promjene na kapcima nisu samo estetski problem — mogu izazvati ozbiljne i trajne promjene na prednjem dijelu oka. Danas su na raspolaganju hirurške i nehirurške metode za vraćanje funkcije i svježeg izgleda.",
      en: "Age-related eyelid changes are not just cosmetic — they can cause serious and lasting problems at the front of the eye. Surgical and non-surgical methods are available today to restore function and a fresher appearance.",
    },
    image: images.irisGreen,
    conditions: {
      bs: ["Blefaroplastika", "Korekcija ptoze (spušteni kapak)", "Korekcija položaja kapka (ektropij, entropij)", "Hirurgija suznog kanalića", "Odstranjivanje tumora", "Distiroidna orbitopatija", "Botox (neuromodulatori)"],
      en: ["Blepharoplasty", "Ptosis correction (drooping lid)", "Eyelid position correction (ectropion, entropion)", "Tear duct surgery", "Tumour removal", "Thyroid eye disease", "Botox (neuromodulators)"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Promjene na kapcima", en: "Eyelid changes" },
      body: {
        bs: "S godinama koža kapaka postaje tanja i manje elastična, masno tkivo se spušta, a tetive slabe. Posljedica mogu biti višak kože koji visi preko oka, spušteni kapci (ptoza) te izvrtanje kapka prema oku ili prema van (entropij i ektropij).",
        en: "With age, eyelid skin becomes thinner and less elastic, fat descends and tendons weaken. The result can be excess skin hanging over the eye, drooping lids (ptosis), and lids turning inwards or outwards (entropion and ectropion).",
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Pregled", en: "Assessment" },
      body: {
        bs: "Uz cjelokupan oftalmološki pregled mjere se visina i razmak između kapaka, udaljenost kapaka od centralnog refleksa, funkcija mišića koji podiže kapak i elastičnost kapka. Provjerava se i pokretljivost očnih mišića te položaj očne jabučice. Pregled traje oko sat vremena.",
        en: "Alongside a full eye exam, the height and spacing of the lids, their distance from the central reflex, the lifting muscle’s function and the lid’s elasticity are measured. Eye-muscle movement and the position of the eyeball are also checked. The assessment takes about an hour.",
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Zahvati", en: "Procedures" },
      body: {
        bs: "Kod blefaroplastike rez se pravi u prirodnim naborima kapka, tako da je ožiljak kasnije gotovo nevidljiv; šavovi se vade nakon sedam dana.",
        en: "In blepharoplasty the incision follows the eyelid’s natural crease, so the scar is almost invisible later; stitches come out after seven days.",
      },
      bullets: {
        bs: ["Estetska i funkcionalna blefaroplastika", "Korekcija ptoze i položaja kapka", "Odstranjivanje tumora i rekonstrukcija kapaka", "Liječenje dvoslika i izbuljenih očiju kod bolesti štitnjače", "Botox kod blefarospazma i iz estetskih razloga; dermalni fileri"],
        en: ["Aesthetic and functional blepharoplasty", "Ptosis and eyelid position correction", "Tumour removal and eyelid reconstruction", "Treating double vision and bulging eyes in thyroid disease", "Botox for blepharospasm and for aesthetic reasons; dermal fillers"],
      },
    },
    recovery: {
      id: "oporavak",
      title: { bs: "Oporavak", en: "Recovery" },
      body: {
        bs: "Zahvati se izvode ambulantno u lokalnoj anesteziji i traju od nekoliko minuta do pola sata; pacijent odmah ide kući. Prva kontrola je sljedeći dan. Prolazni podljevi povlače se tokom desetak dana.",
        en: "Procedures are done as an outpatient under local anaesthesia and take from a few minutes to half an hour; patients go home straight away. The first check-up is the next day. Any bruising fades within about ten days.",
      },
    },
    where: { bs: "Plastični i rekonstruktivni zahvati na kapcima izvode se u sarajevskom centru Svjetlost.", en: "Plastic and reconstructive eyelid procedures are performed at the Svjetlost Sarajevo centre." },
    technology: ["zeiss-s88"],
    doctors: [],
    faq: [
      {
        q: { bs: "Koliko traje učinak botoxa?", en: "How long does Botox last?" },
        a: { bs: "Prema službenim informacijama, djelovanje traje 4–6 mjeseci, pa je tretman potrebno ponavljati.", en: "According to the clinic, the effect lasts 4–6 months, so treatment needs repeating." },
      },
      {
        q: { bs: "Da li se ožiljak vidi nakon blefaroplastike?", en: "Is the blepharoplasty scar visible?" },
        a: { bs: "Rez se pravi u prirodnim naborima kapka ili ispod trepavica, pa je ožiljak kasnije gotovo nevidljiv.", en: "The incision follows the natural crease or sits just below the lashes, so the scar becomes almost invisible." },
      },
    ],
    related: ["pregledi-pacijenata", "djecija-oftalmologija", "ocna-mrena"],
    source: [S("/usluge/plasticni-zahvati/25"), S("/usluge/plasticni-zahvati/blefaroplastika/157"), S("/usluge/plasticni-zahvati/vise-informacija-75/zahvat-i-oporavak-77/77")],
  },
  {
    slug: "pregledi-pacijenata",
    number: "09",
    category: "diagnostics",
    title: { bs: "Oftalmološki pregledi", en: "Eye examinations" },
    short: {
      bs: "Opći pregledi, pregledi za naočale i kontaktne leće, preventivni pregledi i drugo mišljenje.",
      en: "General exams, glasses and contact lens fittings, preventive check-ups and second opinions.",
    },
    intro: {
      bs: "Opći oftalmološki pregledi obavljaju se svaki dan. Pregled je i prilika za rano otkrivanje bolesti koje dugo nemaju simptome — poput glaukoma ili dijabetičkih promjena na mrežnici.",
      en: "General eye examinations take place every day. An exam is also a chance to detect conditions early that may have no symptoms for a long time — such as glaucoma or diabetic changes in the retina.",
    },
    image: images.examRoom,
    conditions: {
      bs: ["Pregledi za naočale", "Pregledi za kontaktne leće", "Pregled u sklopu obrade za sistemske bolesti", "Opći oftalmološki pregled"],
      en: ["Glasses prescriptions", "Contact lens fitting", "Eye exams for systemic disease", "General eye examination"],
    },
    what: {
      id: "sta-je",
      title: { bs: "Šta obuhvata pregled", en: "What an exam includes" },
      body: {
        bs: "Osnovni pregled sastoji se od određivanja vidne oštrine s dioptrijom na daljinu i blizinu, mjerenja očnog pritiska, pregleda prednjeg dijela oka na biomikroskopu i širenja zjenica s pregledom očne pozadine — staklovine, očnog živca, mrežnice i krvnih žila. Ako se otkrije bolest, pacijent se upućuje subspecijalisti.",
        en: "A basic exam measures visual acuity with prescription for distance and near, eye pressure, the front of the eye at the slit lamp and — after dilating the pupils — the back of the eye: vitreous, optic nerve, retina and blood vessels. If a condition is found, the patient is referred to a sub-specialist.",
      },
    },
    diagnostics: {
      id: "dijagnostika",
      title: { bs: "Vrste pregleda", en: "Types of examination" },
      body: { bs: "Pregledi koje klinika obavlja:", en: "Examinations offered by the clinic:" },
      bullets: {
        bs: ["Opći oftalmološki pregled — u prosjeku oko sat vremena", "Pregledi za naočale i progresivne naočale", "Pregledi za kontaktne leće — određivanje zakrivljenosti rožnice i kvaliteta suznog filma", "Pregledi i mišljenja prije operativnih zahvata, bez obaveze da se zahvat obavi", "Retinološki i glaukomski preventivni pregledi", "Pregledi u sklopu obrade za sistemske bolesti (dijabetes, hipertenzija)"],
        en: ["General eye exam — around an hour on average", "Glasses and progressive lens prescriptions", "Contact lens exams — corneal curvature and tear film quality", "Assessments and opinions before surgery, with no obligation to proceed", "Preventive retina and glaucoma check-ups", "Exams for systemic disease (diabetes, hypertension)"],
      },
    },
    treatment: {
      id: "lijecenje",
      title: { bs: "Kako se pripremiti", en: "How to prepare" },
      body: { bs: "Prema uputama klinike:", en: "According to the clinic’s guidance:" },
      bullets: {
        bs: ["Ponesite ranije očne nalaze te stare naočale ili leće", "Prilikom naručivanja napomenite ako dolazite zbog kontaktnih leća", "Meke kontaktne leće skinite tri dana prije pregleda za leće; polutvrde onoliko dana koliko ih godina nosite", "Nakon širenja zjenica vid nekoliko sati može biti blago zamućen — ne planirajte vožnju"],
        en: ["Bring earlier eye reports and your old glasses or lenses", "Mention when booking if your visit is about contact lenses", "Remove soft lenses three days before a lens exam; rigid lenses for as many days as years you have worn them", "After dilation, vision may be slightly blurred for a few hours — don’t plan to drive"],
      },
    },
    where: { bs: "Pregledi se obavljaju svaki radni dan u Sarajevu.", en: "Exams take place every working day in Sarajevo." },
    highlights: [
      { value: "~60 min", label: { bs: "prosječno trajanje općeg pregleda", en: "average general exam duration" }, scope: "sarajevo" },
      { value: "6", label: { bs: "ambulanti u sarajevskom centru", en: "consulting rooms in the Sarajevo centre" }, scope: "sarajevo" },
    ],
    technology: ["optopol-revo-60", "icare-tonometer", "canon-cx1"],
    doctors: ["senad-grisevic", "bojana-skipina", "ajla-skopljak-salkica", "jasmin-hadzimurtovic"],
    faq: [
      {
        q: { bs: "Koliko traje opći pregled?", en: "How long does a general exam take?" },
        a: { bs: "U prosjeku oko sat vremena, ako nisu potrebne dodatne pretrage.", en: "Around an hour on average, if no extra tests are needed." },
      },
      {
        q: { bs: "Mogu li doći samo po drugo mišljenje?", en: "Can I come just for a second opinion?" },
        a: { bs: "Da. Klinika nudi preglede i mišljenja za operativne zahvate bez obaveze da se zahvat obavi.", en: "Yes. The clinic offers assessments and opinions on surgery with no obligation to proceed." },
      },
    ],
    related: ["lijecenje-glaukoma", "dijabetes-i-retina", "lasersko-skidanje-dioptrije"],
    source: [S("/usluge/pregledi-pacijenata/26"), S("/usluge/pregledi-pacijenata/opci-oftalmoloski-pregled/203"), S("/usluge/pregledi-pacijenata/pregledi-za-kontaktne-lece/178")],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
