"use client";

import { Section } from "@/components/ui/Section";
import { MotionSection, MotionItem } from "@/components/motion/MotionSection";

// =============================================================================
// Types
// =============================================================================

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface StatsSectionProps {
  stats?: Stat[];
  variant?: "foundation-deep" | "default" | "cards";
}

// =============================================================================
// Default Stats
// =============================================================================

const defaultStats: Stat[] = [
  {
    value: "25+",
    label: "Ani de Experiență",
    description: "De peste 25 ani formăm mici campioni ai educației acvatice",
  },
  {
    value: "7.900+",
    label: "Mici Campioni",
    description: "Mii de copii au absolvit cursurile noastre de educație acvatică",
  },
  {
    value: "50+",
    label: "Instructori Certificați",
    description:
      "Instructori certificați în educație acvatică pentru copii. Echipa noastră urmează singurele cursuri de profil acreditate (cod COR: 342215)",
  },
  {
    value: "98%",
    label: "Copii & Părinți mulțumiți",
    description: "Perfecționăm permanent metodele și exercițiile de educație acvatică",
  },
];

// =============================================================================
// Component
// =============================================================================

export function StatsSection({
  stats = defaultStats,
  variant = "foundation-deep",
}: StatsSectionProps) {
  if (variant === "foundation-deep") {
    return (
      <Section background="deep" spacing="lg" className="overflow-hidden">
        {/* Top hairline */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(94,234,219,0.4) 50%, transparent 100%)",
          }}
        />
        <MotionSection
          animation="stagger"
          className="relative grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <MotionItem key={stat.label}>
              <div
                className={
                  index < stats.length - 1
                    ? "lg:border-r lg:border-white/8 lg:pr-8"
                    : ""
                }
              >
                <p
                  className="font-heading font-bold text-lagoon-accent"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 2.75rem)",
                    letterSpacing: "var(--tracking-section)",
                    lineHeight: 1,
                    fontFeatureSettings: '"tnum", "ss01"',
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="mt-3 font-mono text-[10px] uppercase text-lagoon-200"
                  style={{ letterSpacing: "var(--tracking-mono)" }}
                >
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-lagoon-100/80">
                    {stat.description}
                  </p>
                )}
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </Section>
    );
  }

  if (variant === "cards") {
    return (
      <Section background="white" spacing="lg">
        <MotionSection
          animation="stagger"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <MotionItem key={stat.label}>
              <div className="rounded-2xl bg-sand-50 p-6 text-center transition-all duration-300 hover:shadow-lg dark:bg-night-800 dark:hover:shadow-[0_0_20px_rgba(32,178,170,0.2)]">
                <p className="font-heading text-3xl font-bold text-lagoon-foundation md:text-4xl dark:text-lagoon-accent">
                  {stat.value}
                </p>
                <p className="mt-2 font-semibold text-sand-900 dark:text-white">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="mt-1 text-sm text-sand-600 dark:text-sand-400">
                    {stat.description}
                  </p>
                )}
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </Section>
    );
  }

  // Default variant — sand background, centered
  return (
    <Section background="sand" spacing="lg">
      <MotionSection
        animation="stagger"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => (
          <MotionItem key={stat.label}>
            <div className="text-center">
              <p className="font-heading text-4xl font-bold text-lagoon-foundation dark:text-lagoon-accent md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-semibold text-sand-900 dark:text-white">
                {stat.label}
              </p>
            </div>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
