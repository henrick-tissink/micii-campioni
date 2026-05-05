"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TreatedImage } from "@/components/ui/TreatedImage";
import { MotionSection } from "@/components/motion/MotionSection";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SIZES } from "@/lib/contentful/image";
import type { ContentfulMedia } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  media?: ContentfulMedia;
  ctaButton?: {
    label: string;
    href: string;
  };
  reverse?: boolean;
}

// =============================================================================
// Default Content
// =============================================================================

const defaultFeatures = [
  "Metode certificate internațional",
  "Instructori cu experiență vastă",
  "Grupe mici pentru atenție maximă",
  "Program flexibil adaptat nevoilor tale",
  "Echipament modern și sigur",
  "Mediu prietenos și distractiv",
];

// =============================================================================
// Component
// =============================================================================

export function AboutSection({
  title = "De Ce Să Alegi Micii Campioni?",
  subtitle = "Despre Noi",
  description = "Suntem primul club de educație acvatică din România, dedicat formării copiilor într-un mediu sigur și prietenos. De peste 15 ani, transformăm frica de apă în pasiune pentru înot.",
  features = defaultFeatures,
  media,
  ctaButton = { label: "Află Mai Multe", href: "/despre-noi" },
  reverse = false,
}: AboutSectionProps) {
  const isVideo = media?.contentType?.startsWith("video/");

  return (
    <Section background="white" spacing="loose">
      <div className="grid items-center gap-12 lg:grid-cols-5">
        {/* Image — 60% on lg+ */}
        <div
          className={cn(
            "relative lg:col-span-3",
            reverse ? "lg:order-2" : ""
          )}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            {media ? (
              isVideo ? (
                <video
                  src={media.url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <TreatedImage
                  src={media.url}
                  alt={media.title || "Micii Campioni"}
                  fill
                  sizes={SIZES.about}
                  className="object-cover"
                  crop="center"
                />
              )
            ) : (
              <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-lagoon-100 to-lagoon-200 dark:from-night-700 dark:to-night-800">
                <svg className="absolute bottom-0 left-0 right-0 h-24 text-lagoon-300/40" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 48C240 16 480 80 720 48C960 16 1200 80 1440 48V96H0V48Z" fill="currentColor" />
                </svg>
                <div className="relative z-10 text-center">
                  <p className="font-heading text-lg font-semibold text-lagoon-foundation dark:text-lagoon-accent">
                    Micii Campioni
                  </p>
                  <p className="text-sm text-lagoon-700 dark:text-lagoon-200">Educație Acvatică</p>
                </div>
              </div>
            )}
          </div>

          {/* Credential chip overlay — bottom-left of the image */}
          <motion.div
            className="absolute bottom-4 left-4 md:bottom-6 md:left-6"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="credential" size="lg" className="bg-white/95 backdrop-blur shadow-cinematic text-sand-900 dark:text-sand-900">
              25+ ani · primul club
            </Badge>
          </motion.div>
        </div>

        {/* Content — 40% on lg+ */}
        <MotionSection
          animation="fadeUp"
          className={cn("lg:col-span-2", reverse ? "lg:order-1" : "")}
        >
          <span className="mb-2 inline-block font-mono text-[11px] font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
            {subtitle}
          </span>
          <h2
            className="font-heading font-bold text-sand-900 dark:text-white"
            style={{
              fontSize: "var(--text-section)",
              letterSpacing: "var(--tracking-section)",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-sand-600 dark:text-sand-400">{description}</p>

          {features.length > 0 && (
            <motion.ul
              className="mt-8 grid gap-3 sm:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
            >
              {features.map((feature, index) => {
                const isCoral = (index + 1) % 3 === 0;
                return (
                  <motion.li
                    key={feature}
                    className="flex items-start gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                    }}
                  >
                    <span className={cn(
                      "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full",
                      isCoral ? "bg-coral-100 dark:bg-coral-500/20" : "bg-lagoon-100 dark:bg-lagoon-accent/20"
                    )}>
                      <Check className={cn("h-4 w-4", isCoral ? "text-coral-600 dark:text-coral-400" : "text-lagoon-foundation dark:text-lagoon-accent")} />
                    </span>
                    <span className="text-sand-700 dark:text-sand-300">{feature}</span>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}

          {ctaButton && (
            <div className="mt-8">
              <MagneticButton strength={0.15}>
                <Button href={ctaButton.href} variant="ghost">{ctaButton.label} &nbsp;→</Button>
              </MagneticButton>
            </div>
          )}
        </MotionSection>
      </div>
    </Section>
  );
}
