import type { Metadata } from "next";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { CTAStrip } from "@/components/sections/CTAStrip";
import { GalleryExplorer } from "./GalleryExplorer";

export const metadata: Metadata = {
  title: "Galerie Foto - Momente din Cursuri",
  description:
    "Galerie foto cu activitățile Clubului Micii Campioni - momente speciale din cursurile de educație acvatică pentru bebeluși și copii. Vezi bucuria micilor campioni!",
  alternates: { canonical: "/galerie" },
  openGraph: {
    title: "Galerie Foto - Momente din Cursuri | Micii Campioni",
    description:
      "Galerie foto cu activitățile Clubului Micii Campioni - momente speciale din cursurile de educație acvatică pentru bebeluși și copii. Vezi bucuria micilor campioni!",
  },
};

export default function GaleriePage() {
  return (
    <>
      <PageHero
        variant="dark"
        eyebrow="GALERIE"
        no="IV"
        title={
          <>
            Cum arată <em>25 de ani</em> de bazin.
          </>
        }
        sub="Mii de fotografii. Familii, instructori, primii pași în apă, primele competiții, aniversări. O selecție din ce a trecut prin bazinul nostru."
        height={520}
      />

      {/* Featured */}
      <section className="bg-white py-16 md:py-20 dark:bg-night-900">
        <Container>
          <div className="grid gap-7 lg:grid-cols-2">
            {/* Video featurette */}
            <article
              className="relative aspect-[4/5] overflow-hidden rounded-[28px]"
              style={{ filter: "saturate(0.95) contrast(1.05)" }}
            >
              <Image src="/images/carousel/hero-6.jpg" alt="Documentar 25 de ani" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(7,51,47,0.85))" }} />
              <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_24px_60px_rgba(0,0,0,0.3)]">
                <Play className="h-7 w-7 fill-coral-refined text-coral-refined" />
              </span>
              <div className="absolute inset-x-8 bottom-8 text-white">
                <Badge variant="credential" size="lg" className="bg-lagoon-foundation/40 backdrop-blur-sm">FILM · 25 ANI</Badge>
                <h2 className="display mt-4 text-white" style={{ fontSize: "clamp(28px, 3vw, 40px)", lineHeight: 1.05 }}>
                  Un sfert de secol, <em>în 6 minute</em>.
                </h2>
                <p className="mt-3 max-w-[460px] text-[15px] leading-relaxed text-white/[0.86]">
                  Documentar realizat în 2026 cu instructorii, foștii mici campioni și familiile lor.
                </p>
                <div className="mt-6">
                  <Button variant="white" rightIcon={<ArrowRight className="h-4 w-4" />}>Vezi filmul</Button>
                </div>
              </div>
            </article>

            {/* Two stacked */}
            <div className="grid grid-rows-2 gap-7">
              {[
                { img: "/images/carousel/hero-4.jpg", tag: "SERIE · PORTRETE", title: <>Mici campioni, <em>azi adulți</em></>, body: "Foștii mici campioni, fotografiați la 20 de ani după prima ședință." },
                { img: "/images/carousel/hero-2.jpg", tag: "BACKSTAGE", title: <>În spatele <em>ședinței</em></>, body: "Cum se pregătește un instructor pentru o ședință cu un bebeluș de 2 luni." },
              ].map((c) => (
                <article
                  key={c.tag}
                  className="relative min-h-[220px] overflow-hidden rounded-[28px]"
                  style={{ filter: "saturate(0.95) contrast(1.05)" }}
                >
                  <Image src={c.img} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                  <div aria-hidden="true" className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 40%, rgba(7,51,47,0.7))" }} />
                  <div className="absolute inset-x-7 bottom-7 text-white">
                    <Badge variant="credential" className="bg-lagoon-foundation/40 backdrop-blur-sm">{c.tag}</Badge>
                    <h3 className="display mt-3.5 text-[26px] text-white">{c.title}</h3>
                    <p className="mt-2.5 max-w-[360px] text-[13px] text-white/[0.78]">{c.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <GalleryExplorer />

      <CTAStrip
        title={
          <>
            Te-ai recunoscut <em>într-o fotografie</em>?
          </>
        }
        sub="Spune-ne — ne-ar bucura să adaugi o poveste la imagine. Sau pur și simplu, vino la o vizită."
        secondary="Trimite-ne o poveste"
        secondaryHref="/contact"
      />
    </>
  );
}
