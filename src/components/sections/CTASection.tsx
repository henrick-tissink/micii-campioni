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
}

// =============================================================================
// Component
// =============================================================================

export function CTASection({
  title = "Pregătit să începi aventura acvatică?",
  description = "Înscrie-ți copilul astăzi și oferă-i șansa de a deveni un mic campion al apei.",
  primaryButton = { label: "Programează o lecție", href: "/contact" },
  secondaryButton,
}: CTASectionProps) {
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
