import Image from "next/image";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

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
        className={`grid items-center gap-12 lg:grid-cols-2 ${
          reverse ? "lg:flex-row-reverse" : ""
        }`}
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
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-lagoon-100 to-lagoon-200">
                <div className="text-center">
                  <span className="text-6xl">🏊</span>
                  <p className="mt-4 font-heading text-lg font-semibold text-lagoon-600">
                    Micii Campioni
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Decorative badge */}
          <div className="absolute bottom-0 right-0 rounded-2xl bg-coral-500 px-6 py-4 text-center shadow-elevated">
            <p className="font-heading text-2xl font-bold text-white lg:text-3xl">
              15+
            </p>
            <p className="text-sm text-coral-100">Ani Experiență</p>
          </div>
        </div>

        {/* Content */}
        <div className={reverse ? "lg:order-1" : ""}>
          <span className="mb-2 inline-block font-heading text-sm font-semibold uppercase tracking-wider text-lagoon-600">
            {subtitle}
          </span>
          <h2 className="font-heading text-3xl font-bold text-sand-900 md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-sand-600">{description}</p>

          {/* Features list */}
          {features.length > 0 && (
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-lagoon-100">
                    <Check className="h-4 w-4 text-lagoon-600" />
                  </span>
                  <span className="text-sand-700">{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {ctaButton && (
            <div className="mt-8">
              <Button href={ctaButton.href}>{ctaButton.label}</Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
