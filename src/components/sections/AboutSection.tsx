"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { MotionSection } from "@/components/motion/MotionSection";
import { MagneticButton } from "@/components/motion/MagneticButton";

// =============================================================================
// Types
// =============================================================================

export interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  image?: {
    url: string;
    alt?: string;
  };
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
  image,
  ctaButton = { label: "Află Mai Multe", href: "/despre-noi" },
  reverse = false,
}: AboutSectionProps) {
  return (
    <Section background="white" spacing="xl">
      <div
        className={`grid items-center gap-12 lg:grid-cols-2`}
      >
        {/* Image */}
        <div
          className={`relative pb-6 pr-6 ${
            reverse ? "lg:order-2" : ""
          }`}
        >
          <div className="aspect-[4/3] overflow-hidden rounded-3xl">
            {image ? (
              <Image
                src={image.url}
                alt={image.alt || title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="relative flex h-full items-center justify-center overflow-hidden bg-gradient-to-br from-lagoon-100 to-lagoon-200">
                {/* Layered wave SVGs */}
                <svg className="absolute bottom-0 left-0 right-0 h-24 text-lagoon-300/40" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 48C240 16 480 80 720 48C960 16 1200 80 1440 48V96H0V48Z" fill="currentColor" />
                </svg>
                <svg className="absolute bottom-0 left-0 right-0 h-16 text-lagoon-200/60" viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 32C360 0 720 64 1080 32C1260 16 1380 24 1440 32V64H0V32Z" fill="currentColor" />
                </svg>

                {/* Scattered bubbles */}
                <div className="absolute left-[10%] top-[15%] h-4 w-4 rounded-full bg-lagoon-300/30" />
                <div className="absolute left-[25%] top-[25%] h-3 w-3 rounded-full bg-coral-300/30" />
                <div className="absolute right-[15%] top-[20%] h-5 w-5 rounded-full bg-lagoon-400/20" />
                <div className="absolute right-[30%] top-[10%] h-2.5 w-2.5 rounded-full bg-coral-400/25" />
                <div className="absolute left-[15%] bottom-[35%] h-3 w-3 rounded-full bg-lagoon-300/25" />
                <div className="absolute right-[20%] bottom-[40%] h-4 w-4 rounded-full bg-coral-300/20" />

                {/* Centered swimmer icon */}
                <div className="relative z-10 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/80 shadow-soft">
                    <svg className="h-10 w-10 text-lagoon-600" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M4 28C8 24 14 32 20 28C26 24 32 32 36 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      <path d="M4 22C8 18 14 26 20 22C26 18 32 26 36 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                      <circle cx="20" cy="13" r="4" fill="currentColor" />
                    </svg>
                  </div>
                  <p className="mt-4 font-heading text-lg font-semibold text-lagoon-700">
                    Micii Campioni
                  </p>
                  <p className="text-sm text-lagoon-500">Educație Acvatică</p>
                </div>
              </div>
            )}
          </div>

          {/* Decorative badge */}
          <motion.div
            className="absolute bottom-0 right-0 rounded-2xl bg-coral-500 dark:bg-coral-600 px-6 py-4 text-center shadow-elevated dark:shadow-[0_0_20px_rgba(232,108,74,0.3)]"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-heading text-2xl font-bold text-white lg:text-3xl">
              15+
            </p>
            <p className="text-sm text-coral-100">Ani Experiență</p>
          </motion.div>
        </div>

        {/* Content */}
        <MotionSection animation="fadeUp" className={reverse ? "lg:order-1" : ""}>
          <span className="mb-2 inline-block font-heading text-sm font-semibold uppercase tracking-wider text-lagoon-600 dark:text-lagoon-400">
            {subtitle}
          </span>
          <h2 className="font-heading text-3xl font-bold text-sand-900 dark:text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-sand-600 dark:text-sand-400">{description}</p>

          {/* Features list */}
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
                      isCoral ? "bg-coral-100 dark:bg-coral-500/20" : "bg-lagoon-100 dark:bg-lagoon-500/20"
                    )}>
                      <Check className={cn("h-4 w-4", isCoral ? "text-coral-600 dark:text-coral-400" : "text-lagoon-600 dark:text-lagoon-400")} />
                    </span>
                    <span className="text-sand-700 dark:text-sand-300">{feature}</span>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}

          {ctaButton && (
            <div className="mt-8">
              <MagneticButton>
                <Button href={ctaButton.href}>{ctaButton.label}</Button>
              </MagneticButton>
            </div>
          )}
        </MotionSection>
      </div>
    </Section>
  );
}
