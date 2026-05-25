import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { SectionHead } from "@/components/ui/SectionHead";
import { PageHero } from "@/components/layout/PageHero";
import { CTAStrip } from "@/components/sections/CTAStrip";

export const metadata: Metadata = {
  title: "Conceptul și Metodologia Noastră",
  description:
    "Descoperă conceptul și metodologia Clubului Micii Campioni - educație acvatică bazată pe încredere, siguranță și bucurie. Partener FAAEL internațional.",
  alternates: { canonical: "/concept" },
  openGraph: {
    title: "Conceptul și Metodologia Noastră | Micii Campioni",
    description:
      "Descoperă conceptul și metodologia Clubului Micii Campioni - educație acvatică bazată pe încredere, siguranță și bucurie. Partener FAAEL internațional.",
  },
};

const PRINCIPLES = [
  {
    n: "01",
    title: "Apa, prelungire firească",
    body: "Bebelușul provine dintr-un mediu acvatic. Primele ședințe nu sunt o introducere în apă, ci o reîntâlnire. Tot ce facem se construiește pe această premisă — apa este un loc cunoscut, niciodată un obstacol.",
    detail:
      "Ședințele încep cu contact direct părinte–copil în apă, la temperatura corpului (32°C). Imersiunile inițiale sunt scurte (3–5 secunde), succesive, precedate de un semnal verbal pe care copilul îl recunoaște în câteva ședințe.",
  },
  {
    n: "02",
    title: "Stimulare psihomotorie",
    body: "Mișcările libere în apă activează sistemul vestibular și proprioceptiv mult mai precoce și mai eficient decât mediul terestru. Construim un tonus corporal echilibrat și o coordonare ne-forțată.",
    detail:
      "Protocolul include masaj subacvatic, plutire dorsală asistată, schimbări de planuri, lucru cu obiecte plutitoare. Fiecare exercițiu țintește un grup neuromotor specific: echilibru, încredere, control respirator.",
  },
  {
    n: "03",
    title: "Ritmul propriu",
    body: 'Nu există calendare forțate. Un bebeluș de 4 luni nu trebuie să "facă plutire" pentru că așa scrie undeva. Metoda Sultana se adaptează după observarea fiecărui copil — nu invers.',
    detail:
      "Instructorul ține fișa de observație pentru fiecare ședință: niveluri de adaptare, reacții la imersiune, durată de concentrare, calitatea legăturii cu părintele. Decizia de a avansa la următorul protocol este consensuală.",
  },
  {
    n: "04",
    title: "Părintele, partener",
    body: "Pentru bebeluși sub 12 luni, părintele este în apă, alături de copil. Învață manevra. Simte semnalele. Construiește, prin contactul direct, prima referință a copilului în mediul acvatic.",
    detail:
      "Sesiunile pentru părinți (Școala Părinților) includ teoria metodei, tehnici de susținere în apă, gestiunea reflexelor de imersiune, comunicarea ne-verbală cu bebelușul.",
  },
  {
    n: "05",
    title: "Măsură și replicabilitate",
    body: "Tot ce facem este documentat. Tot ce funcționează a fost replicat de 50+ instructori. Metoda Sultana este singura metodologie românească de educație acvatică acreditată — cod COR 342215.",
    detail:
      "Programul de certificare a instructorilor durează 18 luni: 6 luni teorie și 12 luni mentorat practic. Evaluările sunt continue; recertificarea se face anual.",
  },
];

const COMPARISON = [
  { aspect: "Vârsta minimă", sultana: "2 zile", general: "6+ luni", note: "Bebelușul de câteva zile păstrează încă reflexele acvatice nativ." },
  { aspect: "Format", sultana: "1 instructor / 1 copil", general: "Grup 4–8 copii", note: "Niciodată în grup la sub 4 ani — ritmul fiecărui copil este unic." },
  { aspect: "Părinte în apă", sultana: "Da, până la 12 luni", general: "Rar", note: "Părintele este referința de siguranță; nu poate lipsi." },
  { aspect: "Protocoale", sultana: "5 distincte, pe vârstă", general: "1–2", note: "Fiecare protocol țintește etapa neuromotoare reală." },
  { aspect: "Acreditare", sultana: "COR 342215", general: "—", note: "Singura recunoaștere ocupațională din România." },
];

const SCIENCE = [
  { source: "AAP — American Academy of Pediatrics", y: "2010", body: "Recunoaște educația acvatică sub 1 an ca beneficiu de dezvoltare psihomotorie, sub supraveghere certificată." },
  { source: "NIH — National Institutes of Health", y: "2014", body: "Studii longitudinale arată progres mai rapid la coordonare, echilibru și socializare la copiii cu educație acvatică timpurie." },
  { source: "Asociația Pediatrilor Români", y: "2019", body: "Educația acvatică timpurie, alături de Lamaze și puericultura, e inclusă în recomandările pentru dezvoltarea armonioasă 0–3 ani." },
];

export default function ConceptPage() {
  return (
    <>
      <PageHero
        variant="dark"
        eyebrow="METODA SULTANA"
        no="II"
        title={
          <>
            Apa nu se cucerește. <em>Se înțelege.</em>
          </>
        }
        sub="Metoda dezvoltată de Georgeta Sultana din 2001, brevetată în 2008 și acreditată COR 342215 în 2016. Cinci principii care transformă înotul într-un instrument de stimulare psihomotorie."
        meta={
          <>
            <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">COR · 342215</Badge>
            <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">Brevet OSIM · 2008</Badge>
            <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">5 protocoale</Badge>
          </>
        }
        height={700}
      />

      {/* Founder quote intro */}
      <section className="bg-cream py-20 md:py-24 dark:bg-night-800">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div>
              <Eyebrow color="coral">CUVÂNTUL FONDATOAREI</Eyebrow>
              <p
                className="display mt-6 text-balance text-sand-900 dark:text-white"
                style={{ fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1.25 }}
              >
                „Am început cu o întrebare: <em>de ce</em> bebelușul nostru plânge când îl punem în
                apă? Nu pentru că e speriat — pentru că noi suntem. Metoda Sultana începe acolo: cu
                părintele care își recapătă liniștea.”
              </p>
              <p className="mono-eyebrow mt-5 text-sand-500 dark:text-sand-400">
                Georgeta Sultana · Fondatoare, 2001
              </p>
            </div>
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-[28px] shadow-cinematic"
              style={{ filter: "saturate(1.05) contrast(1.05)" }}
            >
              <Image
                src="/images/carousel/hero-baby.jpg"
                alt="Bebeluș în apă alături de părinte"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Principles in detail */}
      <section className="bg-white py-24 md:py-28 dark:bg-night-900">
        <Container>
          <SectionHead
            no="01"
            eyebrow="CELE CINCI PRINCIPII"
            title={
              <>
                Fundamentele metodei, <em>în detaliu</em>.
              </>
            }
            sub="Cinci principii care nu se schimbă — orice instructor certificat le aplică în aceeași ordine, indiferent de pregătire personală."
          />
          <div>
            {PRINCIPLES.map((p, i) => (
              <article
                key={p.n}
                className={`grid items-start gap-8 border-t border-lagoon-foundation/[0.16] lg:grid-cols-[120px_1.2fr_1fr] lg:gap-12 dark:border-white/15 ${
                  i === PRINCIPLES.length - 1 ? "border-b" : ""
                }`}
                style={{ paddingTop: 52, paddingBottom: 52 }}
              >
                <div className="display text-[88px] italic leading-none text-coral-refined dark:text-coral-400">
                  {p.n}
                </div>
                <div>
                  <h3
                    className="display text-sand-900 dark:text-white"
                    style={{ fontSize: "clamp(26px, 2.4vw, 34px)", lineHeight: 1.15 }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[17px] leading-relaxed text-sand-700 dark:text-sand-300">
                    {p.body}
                  </p>
                </div>
                <div className="rounded-2xl border-l-[3px] border-amber-credential bg-cream px-6 py-[22px] text-[14.5px] leading-relaxed text-sand-700 dark:bg-night-800 dark:text-sand-300">
                  <p className="mono-eyebrow mb-3 text-amber-credential">ÎN PRACTICĂ</p>
                  {p.detail}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison table */}
      <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
        <Container>
          <SectionHead
            no="02"
            eyebrow="COMPARAȚIE"
            title={
              <>
                Ce diferențiază metoda <em>de tot restul</em>.
              </>
            }
            sub="O comparație onestă între Metoda Sultana și cursurile de înot generale pentru copii."
          />
          <div className="overflow-hidden rounded-2xl bg-white shadow-soft dark:bg-night-900">
            <div className="grid grid-cols-[1.2fr_1.2fr_1.2fr_1.8fr] bg-lagoon-foundation px-7 py-5 font-mono text-[11px] font-medium uppercase tracking-[var(--tracking-mono)] text-white max-md:hidden">
              <div className="text-lagoon-accent">Aspect</div>
              <div>Metoda Sultana</div>
              <div className="opacity-60">Cursuri generale</div>
              <div className="text-amber-credential">De ce contează</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.aspect}
                className={`grid grid-cols-1 gap-2 px-7 py-5 text-[15px] md:grid-cols-[1.2fr_1.2fr_1.2fr_1.8fr] md:items-center md:gap-0 ${
                  i === 0 ? "" : "border-t border-lagoon-foundation/[0.08] dark:border-white/10"
                }`}
              >
                <div className="font-semibold text-sand-800 dark:text-sand-100 md:font-medium md:text-sand-700 md:dark:text-sand-200">
                  {row.aspect}
                </div>
                <div className="display text-[18px] italic text-lagoon-foundation dark:text-lagoon-accent">
                  <span className="mono-eyebrow mb-1 block not-italic text-lagoon-foundation/60 md:hidden dark:text-lagoon-accent/60">
                    Metoda Sultana
                  </span>
                  {row.sultana}
                </div>
                <div className="text-sand-500 dark:text-sand-400">
                  <span className="mono-eyebrow mb-1 block text-sand-400 md:hidden">Cursuri generale</span>
                  {row.general}
                </div>
                <div className="text-sm leading-relaxed text-sand-600 dark:text-sand-400">{row.note}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Science */}
      <section className="bg-white py-24 md:py-28 dark:bg-night-900">
        <Container>
          <SectionHead
            no="03"
            eyebrow="BAZELE ȘTIINȚIFICE"
            title={
              <>
                Recomandat de <em>autorități medicale</em>.
              </>
            }
            sub="Educația acvatică timpurie are sprijinul comunității pediatrice internaționale și românești."
          />
          <div className="grid gap-7 md:grid-cols-3">
            {SCIENCE.map((s, i) => (
              <article
                key={s.source}
                className="rounded-2xl border-t-4 border-lagoon-foundation bg-cream p-8 dark:bg-night-800"
              >
                <p className="mono-eyebrow text-lagoon-foundation dark:text-lagoon-accent">
                  {String(i + 1).padStart(2, "0")} · REFERINȚĂ
                </p>
                <div className="display mb-1 mt-4 text-[40px] italic leading-none text-coral-refined dark:text-coral-400">
                  {s.y}
                </div>
                <h3 className="display mb-3.5 mt-1 text-[19px] leading-snug text-sand-900 dark:text-white">
                  {s.source}
                </h3>
                <p className="m-0 text-sm leading-relaxed text-sand-700 dark:text-sand-300">{s.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTAStrip
        title={
          <>
            Vrei să vezi <em>metoda în acțiune</em>?
          </>
        }
        sub="Programează o vizită gratuită la bazin. Observi o ședință completă și înțelegi metoda din interior, nu din pagină."
      />
    </>
  );
}
