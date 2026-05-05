"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SIZES } from "@/lib/contentful/image";

// =============================================================================
// Types
// =============================================================================

export interface FounderStripProps {
  /** Portrait image URL — static path under /public (e.g., "/images/team/georgeta-sultana.png"). */
  imageUrl: string;
  /** Alt text for the portrait. */
  imageAlt: string;
  /** Pull quote in the founder's voice. */
  quote: string;
  /** Attribution shown beneath the quote (e.g., "Georgeta Sultana — Fondatoare, Metoda Sultana"). */
  attribution: string;
  /** Link to the long-form context (default: /concept). */
  ctaHref?: string;
  /** CTA label (default: "Citește metodologia"). */
  ctaLabel?: string;
}

// =============================================================================
// Component
// =============================================================================

export function FounderStrip({
  imageUrl,
  imageAlt,
  quote,
  attribution,
  ctaHref = "/concept",
  ctaLabel = "Citește metodologia",
}: FounderStripProps) {
  return (
    <Section background="white" spacing="xl">
      <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">
        {/* Portrait — 40% on lg+ */}
        <motion.div
          className="relative lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl ring-1 ring-amber-credential/40">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes={SIZES.founderPortrait}
              className="photo-graded object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Quote + attribution + CTA — 60% on lg+ */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            aria-hidden="true"
            className="font-heading text-6xl text-amber-credential/30 leading-none md:text-7xl"
          >
            &ldquo;
          </span>
          <blockquote
            className="-mt-4 font-heading font-medium text-sand-900 italic dark:text-white"
            style={{
              fontSize: "clamp(1.25rem, 2.4vw, 1.625rem)",
              lineHeight: 1.4,
              letterSpacing: "var(--tracking-section)",
              maxWidth: "56ch",
            }}
          >
            {quote}
          </blockquote>
          <p
            className="mt-6 font-mono text-[11px] uppercase text-sand-700 dark:text-sand-300"
            style={{ letterSpacing: "var(--tracking-mono)" }}
          >
            {attribution}
          </p>
          <Link
            href={ctaHref}
            className="group mt-6 inline-flex items-center gap-2 font-medium text-lagoon-foundation transition-colors hover:text-lagoon-deep dark:text-lagoon-accent dark:hover:text-white"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
}
