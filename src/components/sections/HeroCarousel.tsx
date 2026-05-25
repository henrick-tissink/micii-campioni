"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GlassChip } from "@/components/ui/GlassChip";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

// =============================================================================
// Content (hardcoded per design handoff — wire to Contentful later)
// =============================================================================

interface HeroSlide {
  tag: string;
  pre: string;
  headlineItalic: string;
  sub: string;
  image: string;
  alt: string;
  cta: string;
  ctaHref: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    tag: "BEBELUȘI · 0–6 LUNI",
    pre: "Educație acvatică,",
    headlineItalic: "de 25 de ani.",
    sub: "Singura metodologie românească acreditată pentru educație acvatică timpurie. Metoda Sultana, dezvoltată de Georgeta Sultana din 2001.",
    image: "/images/carousel/hero-baby.jpg",
    alt: "Bebeluș în bazin alături de instructor",
    cta: "Programează o vizită",
    ctaHref: "/contact",
  },
  {
    tag: "ȘCOALA PĂRINȚILOR",
    pre: "Devii părinte.",
    headlineItalic: "Noi te pregătim.",
    sub: "Cursuri de puericultură, Metoda Sultana și alăptare pentru viitorii părinți. Un program complet, susținut de o echipă acreditată.",
    image: "/images/carousel/hero-3.jpg",
    alt: "Părinți la cursul Școala Părinților",
    cta: "Înscrie-te",
    ctaHref: "/servicii",
  },
  {
    tag: "ACTIVITATE PRENATALĂ",
    pre: "Apa pregătește",
    headlineItalic: "venirea pe lume.",
    sub: "Relaxare în apă pentru viitoarele mămici. Cel mai bun mijloc de echilibru fizic și psihic pentru perioada prenatală.",
    image: "/images/carousel/hero-5.jpg",
    alt: "Activitate prenatală în apă",
    cta: "Află detalii",
    ctaHref: "/servicii",
  },
];

const AVATARS = ["/images/carousel/hero-2.jpg", "/images/carousel/hero-4.jpg", "/images/carousel/hero-6.jpg"];

// =============================================================================
// Component
// =============================================================================

export interface HeroCarouselProps {
  /** @deprecated Slides are hardcoded per the design handoff; prop ignored. */
  slides?: unknown;
}

export function HeroCarousel(_props: HeroCarouselProps = {}) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const total = HERO_SLIDES.length;

  // Auto-rotate slides; pause on hover.
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 8500);
    return () => clearInterval(t);
  }, [paused, total]);

  // Scroll-linked parallax.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const fn = () => setScrollY(window.scrollY);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [prefersReducedMotion]);

  const parallax = Math.min(scrollY * 0.25, 200);
  const scale = 1 + Math.min(scrollY / 8000, 0.04);
  const fade = Math.max(0, 1 - scrollY / 700);
  const active = HERO_SLIDES[idx];

  return (
    <section
      className="relative -mt-16 overflow-hidden bg-lagoon-foundation pt-16 text-white lg:-mt-20 lg:pt-20"
      style={{ minHeight: "min(820px, 100vh)" }}
      aria-roledescription="carousel"
      aria-label="Programe Micii Campioni"
    >
      {/* Background slides */}
      {HERO_SLIDES.map((s, i) => (
        <div
          key={s.image}
          aria-hidden={i !== idx}
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: i === idx ? 1 : 0,
            transform: `scale(${scale}) translateY(${parallax}px)`,
            willChange: "transform, opacity",
          }}
        >
          <Image
            src={s.image}
            alt={i === idx ? s.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(1.08) contrast(1.06) brightness(0.98)" }}
          />
        </div>
      ))}

      {/* Editorial gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(7,51,47,0.94) 0%, rgba(7,51,47,0.70) 36%, rgba(7,51,47,0.22) 62%, rgba(7,51,47,0.50) 100%)",
        }}
      />

      {/* Vertical "EST. 2001" rail */}
      <div
        aria-hidden="true"
        className="absolute left-6 top-1/2 z-10 hidden origin-left -translate-y-1/2 -rotate-90 items-center gap-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] text-white/55 xl:flex"
      >
        <span className="h-px w-9 bg-current opacity-55" />
        Est. 2001 · București
        <span className="h-px w-9 bg-current opacity-55" />
        Primul club de educație acvatică din România
      </div>

      {/* Credential chips top-right */}
      <div className="absolute right-6 top-24 z-20 flex flex-col items-end gap-2.5 md:right-8">
        <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">
          COR · 342215
        </Badge>
        <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">
          Metoda Sultana
        </Badge>
      </div>

      {/* Main content */}
      <Container
        className="relative z-10 flex items-center pb-24 pt-16"
        style={{ minHeight: "min(820px, 100vh)", opacity: fade }}
      >
        <div className="max-w-[880px]">
          <div className="mb-7 flex items-center gap-3.5">
            <GlassChip>{active.tag}</GlassChip>
            <span className="font-mono text-[11px] tracking-[var(--tracking-mono)] text-white/50">
              {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h1
            className="display text-white"
            style={{
              fontSize: "clamp(48px, 8.4vw, 124px)",
              lineHeight: 0.98,
              textShadow: "0 2px 24px rgba(0,0,0,0.18)",
            }}
          >
            {active.pre}
            <br />
            <em className="text-lagoon-accent">{active.headlineItalic}</em>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[rgba(229,250,247,0.92)] md:text-xl">
            {active.sub}
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-4">
            <MagneticButton strength={0.18}>
              <Button href={active.ctaHref} size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {active.cta}
              </Button>
            </MagneticButton>
            <Button href="/servicii" variant="outline-on-dark" size="lg">
              Vezi cursurile
            </Button>

            <div className="ml-3 flex items-center gap-3">
              <div className="flex">
                {AVATARS.map((src, i) => (
                  <span
                    key={src}
                    className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-lagoon-foundation"
                    style={{ marginLeft: i > 0 ? -10 : 0 }}
                  >
                    <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                ))}
              </div>
              <div className="font-mono text-[12px] uppercase leading-tight tracking-[0.04em] text-white/[0.78]">
                7.900+ familii
                <br />
                ne-au ales
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Slide dots */}
      <div className="absolute bottom-9 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.image}
            type="button"
            onClick={() => setIdx(i)}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            aria-label={`Slide ${i + 1}: ${s.tag}`}
            aria-current={i === idx}
            className="h-1 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: i === idx ? 36 : 8,
              background: i === idx ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">Scroll</span>
        <span className="block h-9 w-px bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}
