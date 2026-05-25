import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { SectionHead } from "@/components/ui/SectionHead";
import { PageHero } from "@/components/layout/PageHero";
import { CTAStrip } from "@/components/sections/CTAStrip";

export const metadata: Metadata = {
  title: "Despre Noi - Povestea și Echipa Noastră",
  description:
    "Descoperiți povestea Clubului Micii Campioni, primul club de educație acvatică din România, fondat în 2001 de Georgeta Sultana. Echipă dedicată, metodă unică.",
  alternates: { canonical: "/despre-noi" },
  openGraph: {
    title: "Despre Noi - Povestea și Echipa Noastră | Micii Campioni",
    description:
      "Descoperiți povestea Clubului Micii Campioni, primul club de educație acvatică din România, fondat în 2001 de Georgeta Sultana. Echipă dedicată, metodă unică.",
  },
};

const TEAM = [
  { name: "Georgeta Sultana", role: "Fondatoare · Autor al metodei", img: "/images/team/georgeta-sultana.jpg", tag: "COR 342215" },
  { name: "Andra Popescu", role: "Instructor principal · 0–12 luni", img: "/images/carousel/hero-4.jpg", tag: "12 ani · Sultana" },
  { name: "Mihai Ionescu", role: "Instructor · Joacă acvatică", img: "/images/carousel/hero-2.jpg", tag: "8 ani · Sultana" },
  { name: "Cristina Vasile", role: "Coordonator Școala Părinților", img: "/images/carousel/hero-6.jpg", tag: "Puericultură" },
  { name: "Radu Marinescu", role: "Instructor · Inițiere înot", img: "/images/carousel/hero-3.jpg", tag: "Performanță" },
  { name: "Elena Stoica", role: "Lamaze · Activitate gravide", img: "/images/carousel/hero-5.jpg", tag: "Lamaze cert." },
];

const VALUES = [
  { n: "01", title: "Respect", body: "Pentru ritmul copilului. Niciun protocol nu este forțat. Întotdeauna, copilul conduce ședința — instructorul îl însoțește." },
  { n: "02", title: "Acreditare", body: "Singura metodologie românească de educație acvatică acreditată cu cod COR 342215. Fiecare instructor parcurge programul certificat." },
  { n: "03", title: "Părintele", body: "Părintele nu este spectator. Învață, simte, participă. Este parte din legătura care se construiește între copil și apă." },
  { n: "04", title: "Măsură", body: "Rezultatele se urmăresc. Fiecare ședință are obiective; fiecare etapă, indicatori. Performanța se vede în timp." },
];

const NUMBERS = [
  { v: "50+", l: "APARIȚII MEDIA" },
  { v: "12", l: "PARTENERI ACTIVI" },
  { v: "3", l: "CURSURI ACREDITATE" },
  { v: "1", l: "METODOLOGIE COR" },
];

export default function DespreNoiPage() {
  return (
    <>
      <PageHero
        variant="photo"
        image="/images/carousel/hero-6.jpg"
        imageAlt="Echipa Micii Campioni la bazin"
        eyebrow="DESPRE NOI"
        no="I"
        title={
          <>
            Primul club. <em>Primul gest. </em>De 25 de ani.
          </>
        }
        sub="Clubul Micii Campioni este primul Club de Educație Acvatică din România. De peste două decenii, formăm copiii și pregătim părinții pentru întâlnirea cu apa."
        meta={
          <>
            <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">EST · 2001</Badge>
            <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">COR · 342215</Badge>
            <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">7.900+ mici campioni</Badge>
          </>
        }
        height={680}
      />

      {/* Intro — sticky left + longform */}
      <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            <div className="lg:sticky lg:top-[120px]">
              <Eyebrow>POVESTEA NOASTRĂ</Eyebrow>
              <h2
                className="display mt-3.5 text-balance text-sand-900 dark:text-white"
                style={{ fontSize: "clamp(36px, 4.6vw, 60px)", lineHeight: 1.05 }}
              >
                Am început dintr-o intuiție. <em>Am rămas dintr-o metodă.</em>
              </h2>
            </div>
            <div className="max-w-[620px] space-y-5 text-lg leading-relaxed text-sand-700 dark:text-sand-300">
              <p>
                În 2001, Georgeta Sultana — formată în puericultură și pasionată de dezvoltarea
                timpurie — a deschis în București primul club din România care își propunea ceva
                nemaivăzut: <em className="font-display italic">să învețe bebelușii nu să înoate, ci să se simtă acasă în apă</em>.
              </p>
              <p>
                În anii ce au urmat, intuiția a devenit metodă. Metoda Sultana s-a conturat din
                observarea atentă a sute de bebeluși: cum reacționează la imersiune, cum își
                construiesc echilibrul, cum își recunosc părintele în apă. Fiecare protocol s-a
                născut din practică, nu din teorie.
              </p>
              <p>
                În 2016, Ministerul Muncii a acordat metodologiei codul ocupațional{" "}
                <strong>COR 342215</strong> — singurul atestat românesc pentru „Instructor
                educație acvatică timpurie”. Astăzi, peste 7.900 de copii au absolvit cursurile
                clubului, iar 50+ instructori certificați continuă munca.
              </p>
              <p>
                Suntem un club mic, intenționat. Un singur bazin, un singur instructor pentru
                fiecare copil, un singur ritm — al lui.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white py-24 md:py-28 dark:bg-night-900">
        <Container>
          <SectionHead
            no="II"
            eyebrow="VALORI"
            title={
              <>
                Patru principii pe care nu le <em>negociem</em>.
              </>
            }
            sub="Tot ce facem se sprijină pe câteva alegeri pe care le-am făcut acum 25 de ani și pe care le păstrăm și astăzi."
          />
          <div className="grid border-t border-lagoon-foundation/20 sm:grid-cols-2 dark:border-white/15">
            {VALUES.map((v, i) => (
              <div
                key={v.n}
                className={cnValueCell(i)}
              >
                <div className="display text-[40px] italic leading-none text-coral-refined dark:text-coral-400">
                  {v.n}
                </div>
                <div>
                  <h3 className="display text-[26px] text-sand-900 dark:text-white">{v.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-sand-600 dark:text-sand-400">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
        <Container>
          <SectionHead
            no="III"
            eyebrow="ECHIPA"
            title={
              <>
                50+ instructori. <em>Toți, prin aceeași școală.</em>
              </>
            }
            sub="Echipa noastră urmează singurele cursuri de profil acreditate (COR 342215). Iată câteva dintre fețele care primesc copilul tău la bazin."
          />
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((m, i) => (
              <article
                key={m.name}
                className="group overflow-hidden rounded-2xl bg-white shadow-soft transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-cinematic dark:bg-night-900"
              >
                <div className="relative aspect-[4/5]" style={{ filter: "saturate(0.95) contrast(1.05)" }}>
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation">
                    {m.tag}
                  </span>
                  <div className="display absolute bottom-4 left-[18px] text-[36px] italic leading-none text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="px-[22px] pb-6 pt-5">
                  <h3 className="display text-[22px] text-sand-900 dark:text-white">{m.name}</h3>
                  <p className="mt-1.5 text-[13.5px] text-sand-600 dark:text-sand-400">{m.role}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Recognition numbers */}
      <section className="texture-grain relative overflow-hidden bg-lagoon-foundation py-20 text-white md:py-24">
        <Container className="relative">
          <div className="grid items-end gap-12 lg:grid-cols-[1.5fr_2fr] lg:gap-16">
            <div>
              <Eyebrow color="cream">RECUNOAȘTERE</Eyebrow>
              <h2
                className="display mt-3.5 text-white"
                style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05 }}
              >
                Apariții și <em className="text-lagoon-accent">parteneri.</em>
              </h2>
            </div>
            <p className="m-0 text-[17px] leading-relaxed text-[rgba(229,250,247,0.78)]">
              Am fost prezentați la Pro TV, Antena 1, Digi24, în Adevărul, Click! și Libertatea.
              Colaborăm cu Spitalul Marie Curie, Asociația Maternități Românești și cabinetele de
              specialitate care recomandă educația acvatică timpurie.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 lg:grid-cols-4">
            {NUMBERS.map((s) => (
              <div key={s.l}>
                <p
                  className="stat-num italic text-lagoon-accent"
                  style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                >
                  {s.v}
                </p>
                <p className="mono-eyebrow mt-3 text-[rgba(204,251,244,0.7)]">{s.l}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTAStrip
        title={
          <>
            Vino să ne <em>cunoști la bazin</em>.
          </>
        }
        sub="O vizită durează 45 minute. Vezi spațiul, întâlnești echipa, observi o ședință. Prima vizită este gratuită."
      />
    </>
  );
}

// Two-column value cells with editorial dividers.
function cnValueCell(i: number): string {
  const base =
    "grid grid-cols-[64px_1fr] gap-4 py-10 pr-8 border-lagoon-foundation/10 dark:border-white/10";
  const bottom = i < VALUES.length - 2 ? " border-b" : "";
  const right = i % 2 === 0 ? " sm:border-r sm:pr-8" : " sm:pl-8";
  return base + bottom + right;
}
