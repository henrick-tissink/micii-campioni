import Image from "next/image";
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
  backgroundImage?: string;
  variant?: "default" | "gradient" | "image";
}

// =============================================================================
// Component
// =============================================================================

export function CTASection({
  title = "Pregătit să începi aventura acvatică?",
  description = "Înscrie-ți copilul astăzi și oferă-i șansa de a deveni un mic campion al apei.",
  primaryButton = { label: "Programează o lecție", href: "/contact" },
  secondaryButton,
  backgroundImage,
  variant = "gradient",
}: CTASectionProps) {
  if (variant === "image" && backgroundImage) {
    return (
      <section className="relative min-h-[400px] overflow-hidden">
        <Image src={backgroundImage} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-lagoon-900/90 to-lagoon-800/70" />
        <div className="relative z-10 flex min-h-[400px] items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-lagoon-100">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href={primaryButton.href} size="lg">
                {primaryButton.label}
              </Button>
              {secondaryButton && (
                <Button
                  href={secondaryButton.href}
                  variant="outline"
                  size="lg"
                  className="border-white/60 text-white hover:bg-white/20"
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === "gradient") {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-coral-500 to-coral-600">
        {/* Decorative elements */}
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute left-1/4 top-1/4 h-16 w-16 rounded-full bg-white/5" />
        <div className="absolute right-1/3 bottom-1/4 h-12 w-12 rounded-full bg-white/5" />
        <div className="absolute left-1/2 -top-6 h-24 w-24 rounded-full bg-white/5" />

        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-lg text-coral-100">{description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                href={primaryButton.href}
                size="lg"
                className="bg-white text-coral-600 hover:bg-coral-50"
              >
                {primaryButton.label}
              </Button>
              {secondaryButton && (
                <Button
                  href={secondaryButton.href}
                  variant="outline"
                  size="lg"
                  className="border-white/60 text-white hover:bg-white/20"
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default variant (sand background)
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
