import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";

// =============================================================================
// Types (back-compat — props optional; content hardcoded per design)
// =============================================================================

export interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButton?: { label: string; href: string };
  secondaryButton?: { label: string; href: string };
}

const PHONE = "+40 722 310 052";
const EMAIL = "clubulmiciicampioni@yahoo.com";

// =============================================================================
// Component
// =============================================================================

export function CTASection(_props: CTASectionProps = {}) {
  return (
    <section className="relative overflow-hidden bg-coral-refined py-24 text-white md:py-28">
      {/* Photo wash */}
      <Image
        src="/images/carousel/hero-baby.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover opacity-[0.14] mix-blend-overlay"
      />
      {/* Grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage: "url(/textures/grain.svg)",
          backgroundSize: "200px 200px",
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-14">
          <div>
            <Eyebrow color="cream">PRIMUL PAS</Eyebrow>
            <h2
              className="display mt-4 text-balance text-white"
              style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1 }}
            >
              Pregătit să începi
              <br />
              <em>aventura acvatică</em>?
            </h2>
            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-white/90">
              Înscrie-ți copilul astăzi și oferă-i șansa de a deveni un mic campion al apei.
              Prima vizită la bazin este gratuită.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <MagneticButton strength={0.18}>
                <Button href="/contact" variant="white" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Programează vizită
                </Button>
              </MagneticButton>
              <Button href="/servicii" variant="outline-on-dark" size="lg">
                Vezi programul
              </Button>
            </div>
          </div>

          {/* Contact card */}
          <div className="min-w-[320px] rounded-3xl border border-white/[0.18] bg-black/[0.18] p-8 backdrop-blur-md">
            <div className="mono-eyebrow text-white/70">CONTACT DIRECT</div>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="mt-[18px] block font-display text-[28px] italic text-white no-underline"
            >
              {PHONE}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-2 block text-sm text-white/85 no-underline"
            >
              {EMAIL}
            </a>
            <div className="mt-6 border-t border-white/[0.18] pt-5">
              <div className="mono-eyebrow text-white/70">PROGRAM</div>
              <div className="mt-2.5 text-sm leading-7 text-white">
                Luni — Vineri · 09:00—20:00
                <br />
                Sâmbătă · 09:00—14:00
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
