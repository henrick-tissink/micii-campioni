import { type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";

// =============================================================================
// Types
// =============================================================================

export interface CTAStripProps {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  primary?: string;
  secondary?: string;
  primaryHref?: string;
  secondaryHref?: string;
}

// =============================================================================
// Component
// =============================================================================

/** Reusable centered coral closing CTA for inner pages. */
export function CTAStrip({
  eyebrow = "PRIMUL PAS",
  title,
  sub,
  primary = "Programează vizită",
  secondary = "Vezi programul",
  primaryHref = "/contact",
  secondaryHref = "/servicii",
}: CTAStripProps) {
  return (
    <section className="relative overflow-hidden bg-coral-refined py-24 text-white md:py-28">
      <Image
        src="/images/carousel/hero-baby.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover opacity-[0.12] mix-blend-overlay"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{ backgroundImage: "url(/textures/grain.svg)", backgroundSize: "200px 200px" }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-[800px] text-center">
          <div className="flex justify-center">
            <Eyebrow color="cream">{eyebrow}</Eyebrow>
          </div>
          <h2
            className="display mt-5 text-balance text-white"
            style={{ fontSize: "clamp(38px, 5vw, 72px)", lineHeight: 1.05 }}
          >
            {title}
          </h2>
          {sub && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{sub}</p>
          )}
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <MagneticButton strength={0.18}>
              <Button href={primaryHref} variant="white" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {primary}
              </Button>
            </MagneticButton>
            <Button href={secondaryHref} variant="outline-on-dark" size="lg">
              {secondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
