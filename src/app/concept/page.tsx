import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Target } from "lucide-react";
import { getPageBySlug, getPartners } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RichText } from "@/lib/contentful/rich-text";
import { PartnersStrip } from "@/components/content/PartnersStrip";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Conceptul și Metodologia Noastră",
  description:
    "Descoperă conceptul și metodologia Clubului Micii Campioni - educație acvatică bazată pe încredere, siguranță și bucurie. Partener FAAEL internațional.",
  alternates: { canonical: "/concept" },
  openGraph: {
    title: "Conceptul și Metodologia Noastră | Micii Campioni",
    description:
      "Descoperă conceptul și metodologia Clubului Micii Campioni - educație acvatică bazată pe încredere, siguranță și bucurie. Partener FAAEL internațional.",
  },
};

// Section navigation cards
const sectionCards = [
  {
    slug: "micii-campioni-si-faael",
    title: "Micii Campioni și FAAEL",
    description: "Parteneriatul nostru cu Federația Internațională de Activități Acvatice",
    icon: Globe,
  },
  {
    slug: "viziune-si-obiective",
    title: "Viziune și Obiective",
    description: "Misiunea și valorile care ne ghidează activitatea",
    icon: Target,
  },
];

export default async function ConceptPage() {
  const [page, partners] = await Promise.all([
    getPageBySlug("concept"),
    getPartners(),
  ]);

  // Filter for partner type endorsements (international orgs)
  const endorsements = partners.filter((p) => p.partnerType === "endorsement" || p.partnerType === "partner");

  return (
    <>
      {/* Hero */}
      <SectionHero
        title="Conceptul Nostru"
        subtitle="Educație acvatică bazată pe încredere, siguranță și bucurie - fundamentele metodei noastre recunoscute internațional."
        heroImage={page?.heroImage}
      />

      {/* Main Content */}
      {page?.content && (
        <Section background="white" spacing="xl">
          <div className="mx-auto max-w-4xl">
            <div className="prose max-w-none">
              <RichText content={page.content} />
            </div>
          </div>
        </Section>
      )}

      {/* Navigation Cards */}
      <Section background="sand" spacing="xl">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-sand-900">
            Explorează Mai Mult
          </h2>
        </div>

        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {sectionCards.map((card) => (
            <Link
              key={card.slug}
              href={`/concept/${card.slug}`}
              className="group block"
            >
              <Card
                variant="default"
                padding="lg"
                className="h-full transition-all duration-300 group-hover:shadow-medium group-hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lagoon-100 transition-colors group-hover:bg-lagoon-500">
                  <card.icon className="h-6 w-6 text-lagoon-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-sand-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sand-600">{card.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-lagoon-600 group-hover:text-lagoon-700">
                  Citește mai mult
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Partners */}
      {endorsements.length > 0 && (
        <PartnersStrip partners={endorsements} title="Recunoaștere Internațională" />
      )}

      {/* CTA */}
      <CTASection
        title="Descoperă Cursurile Noastre"
        description="Aplică conceptul nostru în practică - explorează programele de educație acvatică."
        primaryButton={{ label: "Vezi Cursurile", href: "/servicii" }}
        secondaryButton={{ label: "Contactează-ne", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}
