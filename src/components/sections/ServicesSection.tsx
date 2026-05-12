"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TreatedImage } from "@/components/ui/TreatedImage";
import { MotionSection, MotionItem } from "@/components/motion/MotionSection";
import { SIZES } from "@/lib/contentful/image";
import type { Service } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface ServicesSectionProps {
  services: Service[];
  title?: string;
  subtitle?: string;
  description?: string;
  eyebrow?: string;
}

// =============================================================================
// Component
// =============================================================================

export function ServicesSection({
  services,
  title = "Cursurile Noastre",
  subtitle = "Ce Oferim",
  description = "Descoperă programele noastre de educație acvatică, create special pentru fiecare etapă de dezvoltare a copilului tău.",
  eyebrow,
}: ServicesSectionProps) {
  const filteredServices = services.filter((s) => s.slug !== "intrebari-frecvente");

  if (filteredServices.length === 0) return null;

  const showHeader = title && title.length > 0;

  return (
    <Section background="cream" spacing="xl">
      {showHeader && (
        <SectionHeader title={title} subtitle={subtitle} description={description} />
      )}
      {!showHeader && eyebrow && (
        <h2 className="mb-10 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
          {eyebrow}
        </h2>
      )}

      <MotionSection animation="stagger" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredServices.map((service) => (
          <MotionItem key={service.slug}>
            <ServiceCard service={service} />
          </MotionItem>
        ))}
      </MotionSection>
    </Section>
  );
}

// =============================================================================
// Service Card
// =============================================================================

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  const primaryAgeRange = service.ageGroups?.[0]?.ageRange;

  return (
    <Link
      href={`/servicii/${service.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-foundation focus-visible:ring-offset-2"
    >
      <Card
        variant="default"
        padding="none"
        className="h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-cinematic dark:group-hover:shadow-[0_0_30px_rgba(94,234,219,0.15)]"
      >
        {service.heroImage && (
          <div className="relative aspect-[4/3] overflow-hidden">
            <TreatedImage
              src={service.heroImage.url}
              alt={service.heroImage.title || service.title}
              fill
              sizes={SIZES.serviceCard}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {primaryAgeRange && (
              <Badge
                variant="credential"
                size="sm"
                className="absolute left-4 top-4 bg-white/95 backdrop-blur text-sand-900"
              >
                {primaryAgeRange}
              </Badge>
            )}
          </div>
        )}

        <div className="p-6">
          <CardTitle as="h3" className="group-hover:text-lagoon-foundation dark:group-hover:text-lagoon-accent transition-colors">
            {service.title}
          </CardTitle>
          {service.shortDescription && (
            <CardDescription className="line-clamp-2">
              {service.shortDescription}
            </CardDescription>
          )}

          {service.ageGroups && service.ageGroups.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {service.ageGroups.slice(0, 3).map((ageGroup) => (
                <span
                  key={ageGroup.name}
                  className="inline-flex items-center gap-1.5 text-sm text-sand-600 dark:text-sand-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-lagoon-foundation dark:bg-lagoon-accent" />
                  {ageGroup.ageRange}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-center gap-2 font-medium text-lagoon-foundation dark:text-lagoon-accent">
            <span>Află mai multe</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Card>
    </Link>
  );
}

// =============================================================================
// Compact Services Grid (for sidebars or smaller sections)
// =============================================================================

export interface CompactServicesProps {
  services: Service[];
  title?: string;
}

export function CompactServices({
  services,
  title = "Alte Cursuri",
}: CompactServicesProps) {
  if (services.length === 0) return null;

  return (
    <div>
      {title && (
        <h3 className="mb-4 font-heading text-lg font-semibold text-sand-900 dark:text-white">
          {title}
        </h3>
      )}
      <div className="space-y-3">
        {services.map((service) => {
          const primaryAgeRange = service.ageGroups?.[0]?.ageRange;

          return (
            <Link
              key={service.slug}
              href={`/servicii/${service.slug}`}
              className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-sand-50 dark:hover:bg-night-800"
            >
              {service.heroImage && (
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                  <TreatedImage
                    src={service.heroImage.url}
                    alt={service.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sand-900 dark:text-white group-hover:text-lagoon-foundation dark:group-hover:text-lagoon-accent">
                  {service.title}
                </h4>
                {primaryAgeRange && (
                  <p className="text-sm text-sand-500 dark:text-sand-400">{primaryAgeRange}</p>
                )}
              </div>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-sand-400 dark:text-sand-500 transition-transform group-hover:translate-x-1 group-hover:text-lagoon-foundation dark:group-hover:text-lagoon-accent" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
