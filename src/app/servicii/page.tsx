import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, User } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { CTAStrip } from "@/components/sections/CTAStrip";

export const metadata: Metadata = {
  title: "Cursuri de Înot pentru Copii",
  description:
    "Descoperă programele noastre de educație acvatică pentru toate vârstele: cursuri prenatale, înot bebeluși, înot copii și kinetoterapie.",
  alternates: { canonical: "/servicii" },
  openGraph: {
    title: "Cursuri de Înot pentru Copii",
    description:
      "Descoperă programele noastre de educație acvatică pentru toate vârstele: cursuri prenatale, înot bebeluși, înot copii și kinetoterapie.",
  },
};

interface Course {
  id: string;
  no: string;
  creature: string | null;
  image: string;
  title: string;
  age: string;
  duration: string;
  frequency: string;
  color: string;
  summary: string;
  description: string;
  benefits: string[];
  schedule: string[];
}

const COURSES: Course[] = [
  {
    id: "gravide", no: "01", creature: "seahorse", image: "/images/carousel/hero-5.jpg",
    title: "Activitate acvatică pentru gravide", age: "PRENATAL", duration: "60 minute", frequency: "Săptămânal",
    color: "var(--color-coral-refined)",
    summary: "Exerciții acvatice adaptate fiecărui trimestru. Apa susține, descarcă greutatea, calmează.",
    description: "Cursul de activitate acvatică pentru gravide este adaptat în funcție de trimestrul sarcinii. Exercițiile sunt blânde, cu accent pe relaxare, mobilitate articulară și respirație controlată. Apa elimină 80% din greutatea corporală, oferind un mediu unic de echilibru și confort.",
    benefits: ["Reducerea durerilor de spate și pelvis", "Îmbunătățirea calității somnului", "Pregătire respiratorie pentru travaliu", "Reducerea retenției de apă în membre", "Echilibru emoțional și relaxare profundă"],
    schedule: ["LUNI 17:00", "MIERCURI 17:00", "SÂMBĂTĂ 11:00"],
  },
  {
    id: "metoda", no: "02", creature: "crab", image: "/images/carousel/hero-baby.jpg",
    title: "Metoda Sultana — bebeluși 0–6 luni", age: "0–6 LUNI", duration: "45 minute", frequency: "Bisăptămânal",
    color: "var(--color-amber-credential)",
    summary: "Stimulare psiho-motorie prin tehnici de masaj subacvatic și imersiuni controlate.",
    description: "Protocolul de start al Metodei Sultana. Imersiuni controlate alături de părinte, masaj subacvatic, lucru pe planul vestibular. Construim încrederea, calmul și prima referință a bebelușului în mediul acvatic.",
    benefits: ["Activare sistem nervos parasimpatic", "Stimularea sistemului vestibular", "Îmbunătățirea calității somnului", "Întărirea legăturii părinte–copil", "Reglare termică precoce"],
    schedule: ["MARȚI 10:00", "JOI 10:00", "SÂMBĂTĂ 09:00"],
  },
  {
    id: "educatie", no: "03", creature: "fish", image: "/images/carousel/hero-2.jpg",
    title: "Educație acvatică — 4–12 luni", age: "4–12 LUNI", duration: "40 minute", frequency: "Săptămânal",
    color: "var(--color-lagoon-500)",
    summary: "Coordonare, curaj, plutire. Lucru pe protocoale, în funcție de gradul de adaptare.",
    description: "Următoarea etapă a Metodei Sultana. Bebelușul are deja referințe acvatice — acum construim independența motrică: rotații, plutire dorsală asistată, traversări scurte cu sprijin. Părintele rămâne în apă.",
    benefits: ["Coordonare neuromotorie superioară", "Control respirator precoce", "Echilibru și plutire", "Socializare cu mediul exterior", "Pregătire pentru autonomia acvatică"],
    schedule: ["LUNI 11:00", "MIERCURI 11:00", "VINERI 11:00"],
  },
  {
    id: "joaca", no: "04", creature: "tortoise", image: "/images/carousel/hero-4.jpg",
    title: "Joacă acvatică — 1–4 ani", age: "1–4 ANI", duration: "40 minute", frequency: "Săptămânal",
    color: "var(--color-lagoon-700)",
    summary: "Apa devine teren de joacă structurat. Tranziție lentă către independență.",
    description: "La 1 an, copilul devine autonom. Folosim jocuri și exerciții structurate ca instrument de dezvoltare: aruncări, prinderi, traversări sub apă, mici curse. Părintele iese din apă treptat; copilul rămâne cu instructorul.",
    benefits: ["Curaj și inițiativă", "Coordonare ochi–mână–corp", "Tranziție de la dependență la autonomie", "Socializare cu alți copii", "Pregătire pentru inițierea în înot"],
    schedule: ["MARȚI 16:00", "JOI 16:00", "SÂMBĂTĂ 10:00"],
  },
  {
    id: "initiere", no: "05", creature: "whale", image: "/images/carousel/hero-3.jpg",
    title: "Inițiere înot — 4 ani +", age: "4 ANI +", duration: "50 minute", frequency: "Bisăptămânal",
    color: "var(--color-lagoon-foundation)",
    summary: "Pregătire tehnică, descoperirea stilurilor, construirea performanței.",
    description: "La 4 ani, personalitatea copilului este complexă, iar abordarea se schimbă: introducerea stilurilor de înot, lucrul tehnic, construcția performanței. Foștii mici campioni intră astăzi în loturile naționale juvenile.",
    benefits: ["Stiluri de înot: spate, craul, bras", "Forță și anduranță musculară", "Reziliență mentală", "Pregătire pentru competiție (opțional)", "Disciplină și rutină sportivă"],
    schedule: ["LUNI 16:00 / 17:00", "MIERCURI 16:00 / 17:00", "VINERI 16:00 / 17:00"],
  },
  {
    id: "parinti", no: "06", creature: null, image: "/images/carousel/hero-6.jpg",
    title: "Școala Părinților de Campioni", age: "VIITORI PĂRINȚI", duration: "90 minute", frequency: "6 sesiuni",
    color: "var(--color-coral-refined)",
    summary: "Cursuri de puericultură, Metoda Sultana și alăptare pentru viitorii părinți.",
    description: "Primul program complet de educație prenatală și îngrijire a bebelușului din România. Acoperă puericultura (îngrijirea zilnică), Metoda Sultana (pregătirea pentru educație acvatică), alăptarea și pregătirea camerei copilului.",
    benefits: ["Tehnici de îngrijire 0–12 luni", "Bazele Metodei Sultana în teorie", "Lactație și alăptare la cerere", "Somnul bebelușului", "Comunicare ne-verbală cu nou-născutul"],
    schedule: ["CICLU NOU LA FIECARE 6 SĂPTĂMÂNI", "DUMINICĂ 10:00–11:30"],
  },
];

const PRICING = [
  { name: "Vizită", price: "GRATUIT", desc: "Vizionează o ședință completă. 45 minute. Consultanță cu un instructor.", cta: "Programează", highlight: false, features: ["Tour de bazin", "Asistare ședință", "Consultanță 30 min"] },
  { name: "Pachet 8", price: "— RON", desc: "8 ședințe consecutive. Cea mai aleasă opțiune pentru începere.", cta: "Solicită tarif", highlight: true, features: ["1 instructor / copil", "Plan personalizat", "Fișă de observație", "Foto/video opțional"] },
  { name: "Abonament", price: "— RON/lună", desc: "Acces lunar, frecvență adaptată vârstei. Reducere la achiziție de 3 luni.", cta: "Solicită tarif", highlight: false, features: ["Frecvență flexibilă", "Pauze de vacanță", "Reducere 3 luni"] },
];

function CourseRow({ course, i }: { course: Course; i: number }) {
  const flip = i % 2 === 1;
  return (
    <article id={`course-${course.id}`} className="scroll-mt-28 border-t border-lagoon-foundation/10 py-16 md:py-[88px] dark:border-white/10">
      <Container>
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            flip ? "lg:grid-cols-[1fr_1.2fr]" : "lg:grid-cols-[1.2fr_1fr]"
          }`}
        >
          {/* Image */}
          <div className={`relative ${flip ? "lg:order-2" : "lg:order-1"}`}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-cinematic" style={{ filter: "saturate(1.05) contrast(1.05)" }}>
              <Image src={course.image} alt={course.title} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(7,51,47,0.5))" }} />
              {course.creature && (
                <Image
                  src={`/images/animations/animation-${course.creature}.png`}
                  alt=""
                  width={140}
                  height={140}
                  aria-hidden="true"
                  className="float-bob absolute -bottom-2.5 -right-3.5 h-[140px] w-auto"
                  style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.3))" }}
                />
              )}
              <span className="absolute left-[18px] top-[18px] rounded-full bg-lagoon-foundation/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[var(--tracking-mono)] text-white backdrop-blur-md">
                {course.no} · {course.age}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className={flip ? "lg:order-1" : "lg:order-2"}>
            <div className="flex items-center gap-3">
              <span className="display text-[64px] italic leading-none" style={{ color: course.color }}>
                {course.no}
              </span>
              <div className="mono-eyebrow text-sand-500 dark:text-sand-400">
                {course.duration} · {course.frequency}
              </div>
            </div>
            <h2
              className="display mt-5 text-balance text-sand-900 dark:text-white"
              style={{ fontSize: "clamp(28px, 3.2vw, 42px)", lineHeight: 1.1 }}
            >
              {course.title}
            </h2>
            <p className="mt-4 font-display text-[19px] font-normal italic leading-snug text-sand-700 dark:text-sand-300">
              {course.summary}
            </p>
            <p className="mt-4 text-base leading-relaxed text-sand-600 dark:text-sand-400">
              {course.description}
            </p>

            <div className="mt-7 border-t border-lagoon-foundation/10 pt-6 dark:border-white/10">
              <p className="mono-eyebrow" style={{ color: course.color }}>BENEFICII</p>
              <ul className="mt-3.5 grid list-none grid-cols-1 gap-x-6 gap-y-2.5 p-0 sm:grid-cols-2">
                {course.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14.5px] text-sand-700 dark:text-sand-300">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0" strokeWidth={2.5} style={{ color: course.color }} />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-lagoon-foundation/10 pt-5 dark:border-white/10">
              <p className="mono-eyebrow mr-2 text-sand-500 dark:text-sand-400">PROGRAM</p>
              {course.schedule.map((s) => (
                <span key={s} className="rounded-full bg-cream px-3 py-1.5 font-mono text-[11px] tracking-[0.04em] text-sand-800 dark:bg-night-800 dark:text-sand-200">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Înscrie copilul
              </Button>
              <Button href="/contact" variant="ghost">
                Detalii și tarife
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}

export default function ServiciiPage() {
  return (
    <>
      <PageHero
        variant="photo"
        image="/images/carousel/hero-2.jpg"
        imageAlt="Copil la cursul de educație acvatică"
        eyebrow="CURSURILE NOASTRE"
        no="III"
        title={
          <>
            Șase cursuri. <em>Un singur ritm — </em>al copilului tău.
          </>
        }
        sub="De la sarcină până la primul stil de înot. Cursurile noastre acoperă fiecare etapă a educației acvatice timpurii — fiecare cu propriul protocol, propriul instructor, propriul ritm."
        meta={
          <>
            <Button href="/contact" rightIcon={<ArrowRight className="h-4 w-4" />}>Programează vizită</Button>
            <Button href="/contact" variant="outline-on-dark">Descarcă pliantul</Button>
          </>
        }
        height={680}
      />

      {/* Quick-link filter strip */}
      <section className="bg-white py-16 md:py-20 dark:bg-night-900">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {COURSES.map((c) => (
              <a
                key={c.id}
                href={`#course-${c.id}`}
                className="flex flex-col items-center gap-3 rounded-2xl border border-lagoon-foundation/[0.12] bg-white px-3 py-5 text-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-transparent hover:shadow-cinematic dark:border-white/10 dark:bg-night-800"
              >
                {c.creature ? (
                  <Image src={`/images/animations/animation-${c.creature}.png`} alt="" width={48} height={48} className="h-12 w-12 object-contain" />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream dark:bg-night-700">
                    <User className="h-5 w-5 text-coral-refined" />
                  </span>
                )}
                <span>
                  <span className="mono-eyebrow block text-[9px]" style={{ color: c.color }}>
                    {c.no}
                  </span>
                  <span className="display mt-1 block text-sm leading-tight text-sand-900 dark:text-white">
                    {c.age}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Course rows */}
      <div className="bg-white dark:bg-night-900">
        {COURSES.map((c, i) => (
          <CourseRow key={c.id} course={c} i={i} />
        ))}
      </div>

      {/* Pricing */}
      <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
        <Container>
          <SectionHead
            eyebrow="TARIFE"
            title={
              <>
                Pachete <em>flexibile</em>.
              </>
            }
            sub="Fiecare program se construiește pe nevoile copilului. Tarifele de mai jos sunt orientative; o vizită gratuită îți oferă tariful final, în funcție de programul ales."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {PRICING.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border p-8 ${
                  p.highlight
                    ? "border-transparent bg-lagoon-foundation text-white shadow-[0_24px_60px_-20px_rgba(7,51,47,0.4)] lg:-translate-y-2"
                    : "border-lagoon-foundation/[0.08] bg-white shadow-soft dark:border-white/10 dark:bg-night-900"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-6 rounded-full bg-coral-refined px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[var(--tracking-mono)] text-white">
                    Recomandat
                  </span>
                )}
                <p className={`mono-eyebrow ${p.highlight ? "text-lagoon-accent" : "text-coral-refined"}`}>
                  {p.name}
                </p>
                <div
                  className={`display mb-2 mt-3.5 italic leading-none ${
                    p.highlight ? "text-white" : "text-lagoon-foundation dark:text-lagoon-accent"
                  }`}
                  style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
                >
                  {p.price}
                </div>
                <p className={`min-h-[60px] text-sm leading-relaxed ${p.highlight ? "text-white/[0.78]" : "text-sand-600 dark:text-sand-400"}`}>
                  {p.desc}
                </p>
                <ul className="my-5 flex list-none flex-col gap-2 p-0">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-[13.5px] ${p.highlight ? "text-white/[0.88]" : "text-sand-700 dark:text-sand-300"}`}>
                      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" strokeWidth={2.5} style={{ color: p.highlight ? "var(--color-lagoon-accent)" : "var(--color-coral-refined)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href="/contact" variant={p.highlight ? "white" : "dark"} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  {p.cta}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTAStrip
        title={
          <>
            Ai întrebări? <em>Vino la o vizită</em>.
          </>
        }
        sub="Tot ce nu se poate scrie pe site se vede la bazin. Te așteptăm pentru o consultanță gratuită."
      />
    </>
  );
}
