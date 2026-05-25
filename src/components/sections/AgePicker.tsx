"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { Button } from "@/components/ui/Button";

// =============================================================================
// Content
// =============================================================================

interface Stage {
  id: string;
  creature: string;
  no: string;
  title: string;
  age: string;
  duration: string;
  headline: string;
  body: string;
  color: string;
  image: string;
  alt: string;
}

// Natural pixel dimensions of each creature PNG — passed to next/image so the
// aspect ratio matches the asset (avoids distortion + dev warnings).
const CREATURE_DIMS: Record<string, { w: number; h: number }> = {
  crab: { w: 87, h: 70 },
  fish: { w: 91, h: 52 },
  seahorse: { w: 62, h: 76 },
  tortoise: { w: 78, h: 74 },
  whale: { w: 109, h: 61 },
};

const STAGES: Stage[] = [
  {
    id: "gravide",
    creature: "seahorse",
    no: "01",
    title: "Gravide",
    age: "Prenatal",
    duration: "60 min · săptămânal",
    headline: "Apa pregătește venirea pe lume.",
    body: "Exerciții acvatice adaptate fiecărui trimestru — cel mai bun mijloc de relaxare, echilibru și confort pentru viitoare mămici. Apa susține, descarcă greutatea, calmează.",
    color: "var(--color-coral-refined)",
    image: "/images/carousel/hero-5.jpg",
    alt: "Viitoare mămică în apă",
  },
  {
    id: "bebelusi",
    creature: "crab",
    no: "02",
    title: "Bebeluși",
    age: "0–6 luni",
    duration: "45 min · bisăptămânal",
    headline: "Reîntâlnirea cu un mediu cunoscut.",
    body: "Metoda Sultana, în varianta sa de start. Stimulare psiho-motorie a nou-născutului prin tehnici de masaj subacvatic și imersiuni controlate, alături de părinte.",
    color: "var(--color-amber-credential)",
    image: "/images/carousel/hero-baby.jpg",
    alt: "Bebeluș în bazin alături de părinte",
  },
  {
    id: "educatie",
    creature: "fish",
    no: "03",
    title: "Educație acvatică",
    age: "4–12 luni",
    duration: "40 min · săptămânal",
    headline: "Coordonare, curaj, plutire.",
    body: "Educația acvatică se desfășoară pe protocoale clare, în funcție de vârsta copilului și nivelul de adaptare la apă. Construim un sistem nervos calm și o relație de încredere cu apa.",
    color: "var(--color-lagoon-500)",
    image: "/images/carousel/hero-2.jpg",
    alt: "Copil mic învățând să plutească",
  },
  {
    id: "joaca",
    creature: "tortoise",
    no: "04",
    title: "Joacă acvatică",
    age: "1–4 ani",
    duration: "40 min · săptămânal",
    headline: "Apa devine teren de joacă structurat.",
    body: "Jocuri și exerciții ce construiesc curajul, coordonarea și socializarea. Tranziția lentă de la siguranța părintelui către independența copilului.",
    color: "var(--color-lagoon-700)",
    image: "/images/carousel/hero-4.jpg",
    alt: "Copil jucându-se în apă",
  },
  {
    id: "initiere",
    creature: "whale",
    no: "05",
    title: "Inițiere înot",
    age: "4 ani +",
    duration: "50 min · bisăptămânal",
    headline: "Personalitatea își găsește stilul.",
    body: "Personalitatea unui copil de peste 4 ani este mult mai complexă — abordarea se schimbă. Pregătire tehnică, descoperirea stilurilor, construirea performanței.",
    color: "var(--color-lagoon-foundation)",
    image: "/images/carousel/hero-3.jpg",
    alt: "Copil la cursul de inițiere înot",
  },
];

// =============================================================================
// Component
// =============================================================================

export function AgePicker() {
  const [active, setActive] = useState(1);
  const stage = STAGES[active];

  return (
    <section id="cursuri" className="relative overflow-hidden bg-white py-24 md:py-28 dark:bg-night-900">
      <Container>
        <SectionHead
          no="II"
          eyebrow="CĂLĂTORIA COPILULUI"
          title={
            <>
              Cinci stadii. Un singur ritm — <em>al copilului tău</em>.
            </>
          }
          sub="De la prima imersiune până la primul stil de înot, Metoda Sultana oferă cinci protocoale construite în jurul vârstei și pregătirii fiecărui copil."
        />

        {/* Stage selector */}
        <div className="relative mb-12">
          {/* Curving water line (desktop) */}
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-14 z-0 hidden h-20 w-full md:block"
          >
            <path
              d="M 60 60 Q 240 10 420 60 T 780 60 T 1140 60"
              stroke="rgba(94,234,219,0.5)"
              strokeWidth="1.5"
              strokeDasharray="2 6"
              fill="none"
            />
          </svg>

          <div
            className="relative z-1 flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:gap-2 md:overflow-visible md:pb-0"
            role="tablist"
            aria-label="Stadiile de dezvoltare"
          >
            {STAGES.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="age-stage-panel"
                  onClick={() => setActive(i)}
                  className="group flex min-w-[120px] flex-col items-center gap-3 px-1 pt-3 text-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 md:min-w-0"
                  style={{ transform: isActive ? "translateY(-4px)" : undefined }}
                >
                  {/* Creature circle */}
                  <span
                    className="flex h-24 w-24 items-center justify-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{
                      background: isActive ? s.color : "var(--color-cream)",
                      boxShadow: isActive
                        ? `0 14px 30px -10px rgba(7,51,47,0.35), 0 0 0 4px #fff, 0 0 0 6px ${s.color}`
                        : "0 0 0 1px rgba(7,51,47,0.12)",
                    }}
                  >
                    <Image
                      src={`/images/animations/animation-${s.creature}.png`}
                      alt=""
                      width={68}
                      height={68}
                      className="h-[68px] w-[68px] object-contain transition-[filter] duration-300"
                      style={{
                        filter: isActive
                          ? "drop-shadow(0 4px 10px rgba(0,0,0,0.25)) brightness(1.05)"
                          : undefined,
                      }}
                    />
                  </span>
                  <span>
                    <span
                      className="mono-eyebrow block text-[10px]"
                      style={{ color: isActive ? s.color : "var(--color-sand-500)" }}
                    >
                      Stadiul {s.no}
                    </span>
                    <span className="display mb-0.5 mt-1.5 block whitespace-nowrap text-[18px] leading-tight text-sand-900 dark:text-white">
                      {s.title}
                    </span>
                    <span className="block whitespace-nowrap font-mono text-xs tracking-[0.02em] text-sand-500 dark:text-sand-400">
                      {s.age}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active stage detail */}
        <div
          key={stage.id}
          id="age-stage-panel"
          role="tabpanel"
          className="fade-stage relative grid items-center gap-10 overflow-hidden rounded-3xl bg-cream p-8 md:grid-cols-2 md:gap-14 md:p-12 dark:bg-night-800"
        >
          {/* Big background numeral */}
          <div
            aria-hidden="true"
            className="display pointer-events-none absolute -top-10 right-6 italic leading-none text-[rgba(7,51,47,0.04)] dark:text-white/[0.04]"
            style={{ fontSize: 320 }}
          >
            {stage.no}
          </div>

          {/* Text */}
          <div className="relative z-1">
            <div className="flex flex-wrap items-center gap-3.5">
              <span
                className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[var(--tracking-mono)] shadow-soft dark:bg-night-900"
                style={{ color: stage.color }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: stage.color }} />
                Stadiul {stage.no} · {stage.age}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[var(--tracking-mono)] text-sand-500 dark:text-sand-400">
                {stage.duration}
              </span>
            </div>
            <h3
              className="display mt-4 text-balance text-sand-900 dark:text-white"
              style={{ fontSize: "clamp(32px, 3.4vw, 44px)", lineHeight: 1.05 }}
            >
              {stage.headline}
            </h3>
            <p className="mt-4 text-[17px] leading-relaxed text-sand-700 dark:text-sand-300">
              {stage.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3.5">
              <Button href="/contact" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Programează vizită
              </Button>
              <Button href="/servicii" variant="ghost">
                Detalii curs
              </Button>
            </div>
          </div>

          {/* Photo */}
          <div className="relative z-1">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-cinematic"
              style={{ filter: "saturate(1.05) contrast(1.04)" }}
            >
              <Image
                src={stage.image}
                alt={stage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, transparent 60%, rgba(7,51,47,0.5))",
                }}
              />
              <Image
                src={`/images/animations/animation-${stage.creature}.png`}
                alt=""
                width={CREATURE_DIMS[stage.creature].w}
                height={CREATURE_DIMS[stage.creature].h}
                aria-hidden="true"
                className="float-bob absolute -bottom-2 -right-2.5 h-[130px] w-auto"
                style={{ filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.3))" }}
              />
              <span className="absolute left-4 top-4 rounded-full bg-lagoon-foundation/55 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[var(--tracking-mono)] text-white backdrop-blur-sm">
                {stage.no} · {stage.title}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
