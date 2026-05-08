"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

type Principle = {
  id: string;
  title: string;
  description: string;
};

// =============================================================================
// Data — ported verbatim from Contentful body for /concept (slug "concept").
// Titles normalized to sentence case for editorial typography; descriptions
// are exact CMS strings (Romanian, including curly quotes „…" and U+2014 em-dashes).
// =============================================================================

const PRINCIPLES: readonly Principle[] = [
  {
    id: "holistic",
    title: "Abordare holistică",
    description:
      "Ne concentrăm pe toate dimensiunile dezvoltării — fizică (sistem muscular fortificat, imunitate sporită, mobilitate crescută), socială (sociabilitate sporită) și emoțională (inteligență emoțională și încredere în sine).",
  },
  {
    id: "early",
    title: "Stimulare timpurie",
    description:
      "Programul începe încă din primele zile de viață prin Metoda Sultana aplicată la domiciliu sau în maternitate, imediat ce nou-născutul este echilibrat cardiorespirator. Metoda Sultana profită de plasticitatea creierului bebelușului, care asimilează informațiile senzoriale ca un „burete\".",
  },
  {
    id: "partner",
    title: "Parteneriat părinte-copil",
    description:
      "Promovăm momente privilegiate de comunicare între părinți și copil. Activitatea se bazează pe un schimb de energie și pe încrederea părinților, esențială pentru a crea o atmosferă de siguranță.",
  },
  {
    id: "safe",
    title: "Mediu sigur și profesional",
    description:
      "Activitățile se desfășoară într-un mediu prietenos, cu o stație proprie de purificare a apei și o temperatură adaptată fiziologiei copilului mic (30–32°C). Fiecare copil beneficiază de atenția personalului calificat, sub avizarea medicală a unui neonatolog.",
  },
  {
    id: "validated",
    title: "Metodă validată și brevetată",
    description:
      "Metoda Sultana, invenție brevetată la OSIM în 2012, care garantează aplicarea corectă a tehnicilor de masaj.",
  },
  {
    id: "european",
    title: "Standarde europene și certificare",
    description:
      "Clubul Micii Campioni este membru cu drepturi depline al FAAEL Franța. Programele noastre respectă protocoale riguroase adaptate vârstei.",
  },
] as const;

// =============================================================================
// Component
// =============================================================================

export function MethodologyPrinciples({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("border-t border-sand-200", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {PRINCIPLES.map((p, i) => (
        <div
          key={p.id}
          className="grid grid-cols-[64px_1fr] gap-6 border-b border-sand-200 py-6 last:border-b-0"
        >
          <span
            className="font-mono text-[11px] font-semibold tracking-[var(--tracking-mono)] text-amber-credential"
            aria-hidden="true"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-heading text-lg font-semibold text-sand-900 tracking-[var(--tracking-section)]">
              {p.title}
            </h3>
            <p className="mt-1.5 text-sand-700 leading-relaxed">{p.description}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}
