"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

// =============================================================================
// Types
// =============================================================================

type AgeGroup = {
  id: string;
  name: string;
  ageRange: string;
  description: string;
};

// =============================================================================
// Data — ported verbatim from Contentful body for /concept.
// Age ranges use U+2014 em-dash for ranges (e.g., "1 — 2 ani").
// =============================================================================

const AGE_GROUPS: readonly AgeGroup[] = [
  {
    id: "pro-bebe",
    name: "Pro-Bebe",
    ageRange: "4,5/6 luni — 1 an",
    description:
      "Acomodare și stimularea reflexelor primare de imersie și apnee.",
  },
  {
    id: "bebe-forte",
    name: "Bebe-Forte",
    ageRange: "1 — 2 ani",
    description:
      "Consolidarea deplasării și învățarea mecanismului respirației acvatice.",
  },
  {
    id: "star",
    name: "Star",
    ageRange: "2 — 3 ani",
    description:
      "Stimularea mișcărilor specifice înotului și însușirea noțiunilor pregătitoare.",
  },
  {
    id: "campion",
    name: "Campion",
    ageRange: "3 — 4 ani+",
    description:
      "Inițiere propriu-zisă în înot și aprofundarea procedeelor (bras, craul, spate).",
  },
] as const;

// =============================================================================
// Component
// =============================================================================

export function AgeGroups() {
  return (
    <Section background="cream" spacing="xl">
      <div className="mx-auto max-w-5xl">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation">
          Progresia
        </p>
        <h2
          className="mt-3 font-heading font-semibold text-sand-900 tracking-[var(--tracking-section)]"
          style={{ fontSize: "var(--text-section)" }}
        >
          Etape de vârstă
        </h2>

        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/*
            Divider rules at each breakpoint:
            - lg: 4-col grid with vertical dividers (border-r) between phases
            - md: 2x2 grid with horizontal dividers (border-t), suppressed on cells
              1–2 via [&:nth-child(-n+2)] arbitrary variant
            - mobile: no dividers, vertical pacing only
          */}
          {AGE_GROUPS.map((g) => (
            <div
              key={g.id}
              className="
                px-5 py-6
                md:border-t md:border-sand-300 md:[&:nth-child(-n+2)]:border-t-0
                lg:border-t-0 lg:border-r lg:border-sand-300 lg:last:border-r-0
                lg:first:pl-0 lg:last:pr-0
              "
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[var(--tracking-mono)] text-amber-credential">
                {g.ageRange}
              </p>
              <h3 className="mt-3 font-heading text-lg font-semibold text-sand-900 tracking-[var(--tracking-section)]">
                {g.name}
              </h3>
              <p className="mt-2 text-sm text-sand-700 leading-relaxed">
                {g.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
