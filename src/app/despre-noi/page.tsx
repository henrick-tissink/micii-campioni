import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, History, Shield, Award, Newspaper } from "lucide-react";
import {
  getPageBySlug,
  getTeamMembers,
  getTimelineEvents,
} from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { RichText } from "@/lib/contentful/rich-text";
import { CompactTimeline } from "@/components/content/Timeline";
import { CompactTeamList } from "@/components/content/TeamGrid";
import { CTASection } from "@/components/sections/CTASection";
import { FounderStrip } from "@/components/sections/FounderStrip";

export const metadata: Metadata = {
  title: "Despre Noi - Povestea și Echipa Noastră",
  description:
    "Descoperiți povestea Clubului Micii Campioni, primul club de educație acvatică din România, fondat în 2001 de Georgeta Sultana. Echipă dedicată, metodă unică.",
  alternates: { canonical: "/despre-noi" },
  openGraph: {
    title: "Despre Noi - Povestea și Echipa Noastră | Micii Campioni",
    description:
      "Descoperiți povestea Clubului Micii Campioni, primul club de educație acvatică din România, fondat în 2001 de Georgeta Sultana. Echipă dedicată, metodă unică.",
  },
};

// Section navigation cards
const sectionCards = [
  {
    slug: "istoric",
    title: "Istoric",
    description: "Povestea Micii Campioni din 1981 până în prezent",
    icon: History,
  },
  {
    slug: "siguranta-si-securitate-pentru-copilul-tau",
    title: "Siguranță și Securitate",
    description: "Standardele noastre de siguranță pentru copilul tău",
    icon: Shield,
  },
  {
    slug: "echipa-micii-campioni",
    title: "Echipa",
    description: "Cunoaște instructorii și specialiștii noștri",
    icon: Users,
  },
  {
    slug: "press-info",
    title: "Press Info",
    description: "Articole și aparții media despre noi",
    icon: Newspaper,
  },
  {
    slug: "distinctii-si-certificari",
    title: "Distincții și Certificări",
    description: "Recunoașterea muncii noastre",
    icon: Award,
  },
];

export default async function DespreNoiPage() {
  const [page, teamMembers, timelineEvents] = await Promise.all([
    getPageBySlug("despre-noi"),
    getTeamMembers(),
    getTimelineEvents(),
  ]);

  return (
    <>
      {/* Hero — auto-refreshed via M5a.1 SectionHero refactor */}
      <SectionHero
        title="Despre Noi"
        subtitle="Primul club de educație acvatică din România, dedicat dezvoltării armonioase a copiilor prin intermediul apei încă din 2001."
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

      {/* Founder section — Georgeta Sultana, biographical voice */}
      <FounderStrip
        imageUrl="/images/team/georgeta-sultana.png"
        imageAlt="Georgeta Sultana, fondatoarea Clubului Micii Campioni"
        quote="Am fondat Clubul Micii Campioni în 2001. De 25 de ani, ne dedicăm susținerii nou-născuților și copiilor mici într-o călătorie de auto-descoperire în apă."
        attribution="Georgeta Sultana — Fondatoare, Psiholog & Asistent Medical Pediatru"
        ctaHref="/concept"
        ctaLabel="Citește metodologia"
      />

      {/* Sub-page navigation cards — cream background */}
      <Section background="cream" spacing="xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectionCards.map((card) => (
            <Link
              key={card.slug}
              href={`/despre-noi/${card.slug}`}
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

      {/* Quick Preview Sections — Timeline + Team in 2-col on lg+ */}
      <Section background="white" spacing="xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Timeline Preview */}
          {timelineEvents.length > 0 && (
            <div>
              <h2 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
                Repere Istorice
              </h2>
              <CompactTimeline events={timelineEvents} limit={4} />
              <Link
                href="/despre-noi/istoric"
                className="group mt-6 inline-flex items-center text-lagoon-foundation transition-colors hover:text-lagoon-deep"
              >
                Vezi istoricul complet
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}

          {/* Team Preview */}
          {teamMembers.length > 0 && (
            <div>
              <h2 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
                Echipa Noastră
              </h2>
              <CompactTeamList members={teamMembers} limit={3} />
              <Link
                href="/despre-noi/echipa-micii-campioni"
                className="group mt-6 inline-flex items-center text-lagoon-foundation transition-colors hover:text-lagoon-deep"
              >
                Cunoaște întreaga echipă
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </Section>

      {/* CTA — gradient (foundation+grain post-M3) */}
      <CTASection
        title="Vrei să afli mai multe?"
        description="Contactează-ne pentru a programa o vizită sau pentru orice întrebări."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
      />
    </>
  );
}
