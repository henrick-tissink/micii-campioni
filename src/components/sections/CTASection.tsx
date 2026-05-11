import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

// =============================================================================
// Types
// =============================================================================

export interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButton?: {
    label: string;
    href: string;
  };
  secondaryButton?: {
    label: string;
    href: string;
  };
  variant?: "default" | "gradient";
}

// =============================================================================
// Component
// =============================================================================

export function CTASection({
  title = "Pregătit să începi aventura acvatică?",
  description = "Înscrie-ți copilul astăzi și oferă-i șansa de a deveni un mic campion al apei.",
  primaryButton = { label: "Programează o lecție", href: "/contact" },
  secondaryButton,
  variant = "gradient",
}: CTASectionProps) {
  if (variant === "gradient") {
    return (
      <Section background="foundation" spacing="xl" texture="grain" className="text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="font-heading font-bold text-white"
            style={{
              fontSize: "var(--text-section)",
              letterSpacing: "var(--tracking-section)",
              lineHeight: 1.1,
            }}
          >
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-lagoon-100/90">
            {description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <Button href={primaryButton.href} variant="primary" size="lg">
              {primaryButton.label}
            </Button>
            {secondaryButton && (
              <Button
                href={secondaryButton.href}
                variant="outline-on-dark"
                size="lg"
              >
                {secondaryButton.label}
              </Button>
            )}
          </div>
        </div>
      </Section>
    );
  }

  // Default variant (sand background) — unchanged from prior implementation
  return (
    <Section background="sand" spacing="xl">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-bold text-sand-900 md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-sand-600">{description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href={primaryButton.href} size="lg">
            {primaryButton.label}
          </Button>
          {secondaryButton && (
            <Button href={secondaryButton.href} variant="outline" size="lg">
              {secondaryButton.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
