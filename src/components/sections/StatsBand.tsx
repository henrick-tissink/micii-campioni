"use client";

import { useState, useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

// =============================================================================
// Content
// =============================================================================

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  description: string;
  format?: "comma";
}

const STATS: StatItem[] = [
  {
    value: 25,
    suffix: "+",
    label: "ANI DE EXPERIENȚĂ",
    description: "De peste 25 ani formăm mici campioni ai educației acvatice românești.",
  },
  {
    value: 7900,
    suffix: "+",
    label: "MICI CAMPIONI",
    description: "Mii de copii au absolvit cursurile noastre.",
    format: "comma",
  },
  {
    value: 50,
    suffix: "+",
    label: "INSTRUCTORI CERTIFICAȚI",
    description: "Echipa noastră urmează singurele cursuri acreditate (COR 342215).",
  },
  {
    value: 98,
    suffix: "%",
    label: "COPII MULȚUMIȚI",
    description: "Perfecționăm permanent metodele și exercițiile.",
  },
];

// =============================================================================
// Count-up
// =============================================================================

function CountUp({
  to,
  suffix,
  format,
}: {
  to: number;
  suffix: string;
  format?: "comma";
}) {
  // Default to the final value so SSR / reduced-motion renders the real number.
  const [n, setN] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      if (fired.current) return;
      fired.current = true;
      setN(0);
      const dur = 1600;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animate();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animate();
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    const safety = setTimeout(animate, 1500);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, [to, prefersReducedMotion]);

  const display =
    format === "comma" ? n.toLocaleString("ro-RO").replace(/,/g, ".") : n.toString();

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

// =============================================================================
// Component
// =============================================================================

export function StatsBand() {
  return (
    <section className="texture-grain relative overflow-hidden bg-lagoon-foundation py-20 text-white md:py-24">
      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(94,234,219,0.45), transparent)",
        }}
      />
      <Container className="relative">
        <div className="mb-16 flex flex-wrap items-baseline justify-between gap-x-7 gap-y-8">
          <div className="flex-1 basis-[480px]">
            <Eyebrow color="cream">PE SCURT</Eyebrow>
            <h2
              className="display mt-3.5 max-w-[720px] text-balance text-white"
              style={{ fontSize: "clamp(28px, 3.4vw, 44px)", lineHeight: 1.1 }}
            >
              Un sfert de secol în <em className="text-lagoon-accent">apele românești</em>.
            </h2>
          </div>
          <div className="self-end">
            <Badge variant="credential" size="lg" className="bg-lagoon-foundation/40 backdrop-blur-sm">
              COR · 342215 — singura metodologie acreditată
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={
                i < STATS.length - 1 ? "lg:mr-7 lg:border-r lg:border-white/10 lg:pr-7" : ""
              }
            >
              <p
                className="stat-num italic text-lagoon-accent"
                style={{ fontSize: "clamp(48px, 6vw, 84px)" }}
              >
                <CountUp to={s.value} suffix={s.suffix} format={s.format} />
              </p>
              <p className="mono-eyebrow mt-4 text-[rgba(204,251,244,0.7)]">{s.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-[rgba(229,250,247,0.7)]">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
