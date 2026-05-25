import type { Metadata } from "next";
import { ArrowRight, BookOpen, GraduationCap, Globe, Megaphone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Asociația - Misiune și Proiecte Sociale",
  description:
    "Asociația Clubul Micii Campioni - organizație non-profit dedicată promovării educației acvatice în România. Descoperă misiunea și proiectele noastre sociale.",
  alternates: { canonical: "/asociatia" },
  openGraph: {
    title: "Asociația - Misiune și Proiecte Sociale | Micii Campioni",
    description:
      "Asociația Clubul Micii Campioni - organizație non-profit dedicată promovării educației acvatice în România. Descoperă misiunea și proiectele noastre sociale.",
  },
};

const PILLARS: { n: string; title: string; body: string; icon: LucideIcon }[] = [
  { n: "01", title: "Cercetare aplicată", body: "Documentăm, măsurăm și publicăm rezultatele educației acvatice timpurii. Colaborăm cu universități și clinici pediatrice pentru studii longitudinale.", icon: BookOpen },
  { n: "02", title: "Formarea instructorilor", body: "Asigurăm continuarea metodei. Programul de certificare (18 luni) acreditat COR 342215 formează noua generație de instructori.", icon: GraduationCap },
  { n: "03", title: "Acces și echitate", body: "Susținem familii cu situație materială dificilă să beneficieze de programele clubului. 5% din locurile fiecărei serii sunt rezervate prin bursă.", icon: Globe },
  { n: "04", title: "Advocacy", body: "Pledăm pentru recunoașterea educației acvatice timpurii ca parte a îngrijirii pediatrice. Lucrăm cu Ministerul Sănătății și pediatri.", icon: Megaphone },
];

const PARTNERS = [
  { name: "Spitalul Marie Curie", type: "PEDIATRIE" },
  { name: "Asociația Maternități Românești", type: "PARTENER MEDICAL" },
  { name: "Universitatea București · UNEFS", type: "CERCETARE" },
  { name: "Federația Română de Natație", type: "SPORT" },
  { name: "Ministerul Muncii", type: "ACREDITARE" },
  { name: "Casa de Sănătate Mama", type: "PUERICULTURĂ" },
];

const PROJECTS = [
  { y: "2024", title: "Cercetare longitudinală 0–4 ani", body: "Studiu cu 200 de copii, urmărind impactul educației acvatice timpurii asupra dezvoltării psihomotorii pe 48 luni.", status: "ÎN DESFĂȘURARE" },
  { y: "2023", title: "Burse Sultana", body: "Lansarea programului de burse — 20 de copii anual primesc acces gratuit la cursuri.", status: "ACTIV" },
  { y: "2022", title: "Manualul instructorului", body: "Publicarea manualului de educație acvatică timpurie pentru programul COR 342215.", status: "PUBLICAT" },
  { y: "2021", title: "Caravana Sultana", body: "Tur de prezentare a metodei în 8 orașe din România, susținut împreună cu UNICEF.", status: "FINALIZAT" },
];

const ASSOC_DATA: [string, string][] = [
  ["DENUMIRE", "Asociația Clubul Micii Campioni"],
  ["CIF", "24536812"],
  ["IBAN", "RO12 BTRL 0000 0000 0000 0000"],
  ["BANCA", "Banca Transilvania"],
  ["SEDIUL", "Str. Strabuna nr. 26, Sector 1, București"],
];

function statusClasses(status: string): string {
  if (status === "ÎN DESFĂȘURARE") return "bg-coral-refined text-white";
  if (status === "ACTIV") return "bg-lagoon-foundation text-white";
  return "border border-lagoon-foundation/[0.16] bg-cream text-sand-700 dark:border-white/15 dark:bg-night-800 dark:text-sand-300";
}

export default function AsociatiaPage() {
  return (
    <>
      <PageHero
        variant="cream"
        eyebrow="ASOCIAȚIA MICII CAMPIONI"
        no="V"
        title={
          <>
            Mai mult decât un club. <em>O misiune.</em>
          </>
        }
        sub="Asociația Micii Campioni este structura non-profit care susține cercetarea, formarea și accesul echitabil la educație acvatică timpurie în România. Înființată în 2008."
        meta={
          <>
            <Badge variant="credential">ONG · CF 24536812</Badge>
            <Badge variant="credential">EST · 2008</Badge>
            <Badge variant="credential">2% din impozit</Badge>
          </>
        }
        height={620}
      />

      {/* Mission */}
      <section className="bg-white py-24 md:py-28 dark:bg-night-900">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[88px]">
            <div className="lg:sticky lg:top-[120px]">
              <Eyebrow color="coral">MISIUNEA NOASTRĂ</Eyebrow>
              <h2
                className="display mt-3.5 text-balance text-sand-900 dark:text-white"
                style={{ fontSize: "clamp(36px, 4.6vw, 56px)", lineHeight: 1.05 }}
              >
                Educația acvatică, <em>parte din pediatria modernă</em>.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-sand-700 dark:text-sand-300">
              <p>
                Pe Asociație am înființat-o în 2008, după șapte ani de practică la club. Ne-am dat
                seama că Metoda Sultana nu poate rămâne doar un produs — trebuia să devină un domeniu
                profesional cu suport științific, cu instructori certificați și cu un standard de
                calitate.
              </p>
              <p>
                Astăzi, asociația finanțează cercetarea aplicată, susține bursele de acces și
                organizează programul de certificare COR 342215. Suntem singura organizație non-profit
                din România dedicată exclusiv educației acvatice timpurii.
              </p>
              <p>
                Lucrăm cu Ministerul Sănătății, pediatrii independenți și clinicile de specialitate
                pentru a integra educația acvatică în recomandările standard de îngrijire 0–4 ani.
                Drumul este lung, dar fiecare an aduce un pas mai aproape.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pillars */}
      <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
        <Container>
          <SectionHead
            no="01"
            eyebrow="PATRU PILONI"
            title={
              <>
                Ce face <em>asociația</em>.
              </>
            }
          />
          <div className="grid gap-7 sm:grid-cols-2">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.n}
                  className="group rounded-2xl bg-white p-9 shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-cinematic dark:bg-night-900"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="display text-[48px] italic leading-none text-coral-refined dark:text-coral-400">
                      {p.n}
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lagoon-50 text-lagoon-foundation dark:bg-night-700 dark:text-lagoon-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="display mb-3 mt-6 text-[26px] leading-snug text-sand-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="m-0 text-[15.5px] leading-relaxed text-sand-600 dark:text-sand-400">{p.body}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Projects */}
      <section className="bg-white py-24 md:py-28 dark:bg-night-900">
        <Container>
          <SectionHead
            no="02"
            eyebrow="PROIECTE"
            title={
              <>
                Ce <em>am făcut</em>. Ce <em>facem</em>.
              </>
            }
          />
          <div>
            {PROJECTS.map((p, i) => (
              <article
                key={p.title}
                className={`grid items-center gap-6 border-t border-lagoon-foundation/[0.14] py-9 lg:grid-cols-[120px_1fr_1fr_160px] lg:gap-8 dark:border-white/15 ${
                  i === PROJECTS.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="display text-[56px] italic leading-none text-coral-refined dark:text-coral-400">
                  {p.y}
                </div>
                <h3 className="display text-2xl leading-snug text-sand-900 dark:text-white">{p.title}</h3>
                <p className="m-0 text-[14.5px] leading-relaxed text-sand-600 dark:text-sand-400">{p.body}</p>
                <div className="lg:text-right">
                  <span
                    className={`inline-block rounded-full px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[var(--tracking-mono)] ${statusClasses(p.status)}`}
                  >
                    {p.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners */}
      <section className="texture-grain relative overflow-hidden bg-lagoon-foundation py-20 text-white md:py-24">
        <Container className="relative">
          <div className="mb-14 grid items-end gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
            <div>
              <Eyebrow color="cream">PARTENERI</Eyebrow>
              <h2 className="display mt-3.5 text-white" style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.05 }}>
                Lucrăm cu cei care <em className="text-lagoon-accent">au aceeași grijă.</em>
              </h2>
            </div>
            <p className="m-0 text-[17px] leading-relaxed text-[rgba(229,250,247,0.78)]">
              Spitale, universități, federații sportive, organisme de stat. Toate, în jurul aceleiași
              convingeri — că primii ani de viață sunt fundamentul.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className={`border-t border-white/[0.12] px-6 py-7 ${
                  (i + 1) % 3 !== 0 ? "lg:border-r" : ""
                } ${i >= PARTNERS.length - 3 ? "lg:border-b" : ""}`}
              >
                <div className="mono-eyebrow text-[9px] text-lagoon-accent">{p.type}</div>
                <p className="display mt-2.5 text-[22px] italic leading-snug text-white">{p.name}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Support / 2% */}
      <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
        <Container>
          <div className="grid items-center gap-12 rounded-3xl bg-white p-8 shadow-soft md:p-16 lg:grid-cols-2 lg:gap-16 dark:bg-night-900">
            <div>
              <Eyebrow color="coral">SUSȚINE ASOCIAȚIA</Eyebrow>
              <h2
                className="display mt-3.5 text-balance text-sand-900 dark:text-white"
                style={{ fontSize: "clamp(36px, 4.4vw, 56px)", lineHeight: 1.05 }}
              >
                Direcționează <em>2%</em> din impozitul tău anual.
              </h2>
              <p className="mt-6 text-[17px] leading-relaxed text-sand-700 dark:text-sand-300">
                Prin Formularul 230, poți direcționa 2% (sau 3.5% pentru sponsorizări) din impozitul
                pe venit către Asociația Micii Campioni. Banii susțin direct bursele de acces și
                cercetarea.
              </p>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button href="/contact" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Completează formularul
                </Button>
                <Button href="/contact" variant="ghost">
                  Vezi raportul anual
                </Button>
              </div>
            </div>
            <div className="rounded-2xl bg-lagoon-foundation p-8 text-white">
              <p className="mono-eyebrow text-amber-credential">DATELE ASOCIAȚIEI</p>
              <dl className="mt-[18px] flex flex-col gap-[18px]">
                {ASSOC_DATA.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] items-baseline gap-4">
                    <dt className="font-mono text-[10px] uppercase tracking-[var(--tracking-mono)] text-white/60">{k}</dt>
                    <dd className="m-0 text-sm text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
