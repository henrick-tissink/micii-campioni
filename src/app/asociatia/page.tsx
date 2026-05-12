import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, FolderKanban, Mic2, Handshake } from "lucide-react";
import { getPageBySlug } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RichText } from "@/lib/contentful/rich-text";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Asociația - Misiune și Proiecte Sociale",
  description:
    "Asociația Clubul Micii Campioni - organizație non-profit dedicată promovării educației acvatice în România. Descoperă misiunea și proiectele noastre sociale.",
  alternates: { canonical: "/asociatia" },
  openGraph: {
    title: "Asociația - Misiune și Proiecte Sociale | Micii Campioni",
    description:
      "Asociația Clubul Micii Campioni - organizație non-profit dedicată promovării educației acvatice în România. Descoperă misiunea și proiectele noastre sociale.",
  },
};

// Section navigation cards
const sectionCards = [
  {
    slug: "misiune",
    title: "Misiune",
    description: "Scopul și valorile care ne ghidează activitatea asociației",
    icon: Heart,
  },
  {
    slug: "proiecte-si-programe",
    title: "Proiecte și Programe",
    description: "Inițiativele noastre pentru comunitate",
    icon: FolderKanban,
  },
  {
    slug: "conferinte-si-congrese",
    title: "Conferințe și Congrese",
    description: "Participările noastre la evenimente naționale și internaționale",
    icon: Mic2,
  },
  {
    slug: "sponsorizari",
    title: "Sponsorizări",
    description: "Partenerii care ne susțin misiunea",
    icon: Handshake,
  },
];

export default async function AsociatiaPage() {
  const page = await getPageBySlug("asociatia");

  return (
    <>
      {/* Hero */}
      <SectionHero
        title="Asociația"
        subtitle="Promovăm educația acvatică în România și susținem accesul tuturor copiilor la beneficiile activităților acvatice."
        heroImage={page?.heroImage}
      />

      {/* Body — RichText in 720px reading column */}
      {page?.content && (
        <Section background="white" spacing="xl">
          <div className="mx-auto max-w-[720px]">
            <div className="prose prose-lg max-w-none">
              <RichText content={page.content} demoteH1 />
            </div>
          </div>
        </Section>
      )}

      {/* Sub-page navigation cards — cream background, despre-noi pattern */}
      <Section background="cream" spacing="xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectionCards.map((card) => (
            <Link
              key={card.slug}
              href={`/asociatia/${card.slug}`}
              className="group block"
            >
              <Card
                variant="default"
                padding="cinematic"
                className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-cinematic"
              >
                <card.icon
                  className="mb-4 h-8 w-8 text-lagoon-foundation"
                  aria-hidden="true"
                />
                <h3 className="font-heading text-xl font-semibold text-sand-900 tracking-[var(--tracking-section)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sand-600">{card.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-lagoon-foundation transition-colors group-hover:text-lagoon-deep">
                  Citește mai mult
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        title="Vrei să susții misiunea noastră?"
        description="Află cum poți contribui la promovarea educației acvatice în România."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        secondaryButton={{ label: "Sponsorizări", href: "/asociatia/sponsorizari" }}
      />
    </>
  );
}
