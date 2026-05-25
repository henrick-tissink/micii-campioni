"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

// =============================================================================
// Content
// =============================================================================

const MILESTONES = [
  { year: "2001", title: "Începutul", body: "Georgeta Sultana fondează primul Club de Educație Acvatică din România." },
  { year: "2004", title: "Metoda Sultana", body: "Se conturează metodologia proprie pentru bebeluși 0–12 luni." },
  { year: "2008", title: "Bazin propriu", body: "Inaugurarea bazinului purificat, dedicat exclusiv bebelușilor și copiilor mici." },
  { year: "2012", title: "Școala Părinților", body: "Se lansează cursurile complete de puericultură și pregătire prenatală." },
  { year: "2016", title: "Acreditarea COR", body: "Singura metodologie românească acreditată — cod COR 342215." },
  { year: "2019", title: "5.000 mici campioni", body: "Comunitatea trece de 5.000 de copii formați." },
  { year: "2023", title: "Performanță națională", body: "Foști mici campioni intră în loturile naționale juvenile de natație." },
  { year: "2026", title: "25 de ani", body: "Sărbătorim 25 ani și 7.900+ mici campioni formați." },
];

// =============================================================================
// Component
// =============================================================================

export function HistoryTimeline() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section className="texture-grain relative overflow-hidden bg-lagoon-foundation py-24 text-white md:py-28">
      <Container className="relative">
        <div className="mb-14 flex flex-wrap items-baseline justify-between gap-6">
          <div className="max-w-[720px]">
            <Eyebrow color="cream">25 DE ANI</Eyebrow>
            <h2
              className="display mt-3.5 text-balance text-white"
              style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}
            >
              O cronologie a <em className="text-lagoon-accent">celor mai mici campioni</em>.
            </h2>
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Milestone anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Milestone următor"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      {/* Horizontal scroller — full-bleed with container-aligned padding */}
      <div
        ref={scrollRef}
        className="no-scrollbar relative overflow-x-auto"
        style={{
          scrollSnapType: "x mandatory",
          paddingLeft: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))",
          paddingRight: "max(1rem, calc((100vw - 80rem) / 2 + 1rem))",
        }}
      >
        <ol className="m-0 flex list-none gap-6 p-0 pb-2">
          {MILESTONES.map((m, i) => {
            const isLast = i === MILESTONES.length - 1;
            return (
              <li
                key={m.year}
                className="relative shrink-0 basis-[300px] border-t border-white/20 pt-8 sm:basis-[360px]"
                style={{ scrollSnapAlign: "start" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-[7px] left-0 h-[13px] w-[13px] rounded-full"
                  style={{
                    background: isLast
                      ? "var(--color-coral-refined)"
                      : "var(--color-lagoon-accent)",
                    boxShadow: isLast
                      ? "0 0 0 5px rgba(234,88,12,0.22)"
                      : "0 0 0 5px rgba(94,234,219,0.18)",
                  }}
                />
                <div
                  className="display italic leading-none"
                  style={{
                    fontSize: 64,
                    color: isLast ? "var(--color-coral-refined)" : "var(--color-lagoon-accent)",
                  }}
                >
                  {m.year}
                </div>
                <h3 className="display mb-2 mt-3.5 text-2xl text-white">{m.title}</h3>
                <p className="m-0 text-[15px] leading-relaxed text-[rgba(229,250,247,0.7)]">
                  {m.body}
                </p>
              </li>
            );
          })}
          <li aria-hidden="true" className="shrink-0 basis-4" />
        </ol>
      </div>
    </section>
  );
}
