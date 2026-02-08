"use client";

import { Section } from "@/components/ui/Section";
import { MotionSection, MotionItem } from "@/components/motion/MotionSection";
import { FloatingElements } from "@/components/decorative/FloatingElements";

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
  variant?: "default" | "lagoon" | "cards";
}

// =============================================================================
// Default Stats
// =============================================================================

const defaultStats: Stat[] = [
  {
    value: "15+",
    label: "Ani de Experiență",
    description: "De peste 15 ani formăm micii campioni ai apei",
  },
  {
    value: "10.000+",
    label: "Copii Absolvenți",
    description: "Mii de copii au învățat să înoate cu noi",
  },
  {
    value: "50+",
    label: "Instructori Certificați",
    description: "Echipa noastră de profesioniști dedicați",
  },
  {
    value: "98%",
    label: "Părinți Mulțumiți",
    description: "Rata de satisfacție a familiilor noastre",
  },
];

// =============================================================================
// Component
// =============================================================================

export function StatsSection({
  stats = defaultStats,
  variant = "lagoon",
}: StatsSectionProps) {
  if (variant === "lagoon") {
    return (
      <Section
        background="lagoon"
        spacing="lg"
        className="relative bg-gradient-to-br from-lagoon-600 to-lagoon-700 dark:from-night-800 dark:to-night-900 overflow-hidden"
      >
        {/* Floating decorative elements */}
        <FloatingElements count={8} color="mixed" />

        <MotionSection animation="stagger" className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <MotionItem key={stat.label}>
              <div className="text-center">
                <p className="font-heading text-4xl font-bold text-white md:text-5xl dark:drop-shadow-[0_0_10px_rgba(32,178,170,0.3)]">
                  {stat.value}
                </p>
                <p className="mt-2 font-semibold text-lagoon-100">{stat.label}</p>
                {stat.description && (
                  <p className="mt-1 text-sm text-lagoon-200">{stat.description}</p>
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
        <MotionSection animation="stagger" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <MotionItem key={stat.label}>
              <div className="rounded-2xl bg-sand-50 dark:bg-night-800 p-6 text-center transition-all duration-300 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(32,178,170,0.2)]">
                <p className="font-heading text-3xl font-bold text-lagoon-600 dark:text-lagoon-400 md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-semibold text-sand-900 dark:text-white">{stat.label}</p>
                {stat.description && (
                  <p className="mt-1 text-sm text-sand-600 dark:text-sand-400">{stat.description}</p>
                )}
              </div>
            </MotionItem>
          ))}
        </MotionSection>
      </Section>
    );
  }

  // Default variant
  return (
    <Section background="sand" spacing="lg">
      <MotionSection animation="stagger" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <MotionItem key={stat.label}>
            <div className="text-center">
              <p className="font-heading text-4xl font-bold text-lagoon-600 dark:text-lagoon-400 md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 font-semibold text-sand-900 dark:text-white">{stat.label}</p>
            </div>
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}
