import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, History, Shield, Award, Newspaper } from "lucide-react";
import {
  getPageBySlug,
  getPagesByParentSlug,
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

export const metadata: Metadata = {
  title: "Despre Noi",
  description:
    "Descoperiți povestea Clubului Micii Campioni, primul club de educație acvatică din România, fondat în 2001 de Georgeta Sultana.",
  alternates: { canonical: "/despre-noi" },
  openGraph: {
    title: "Despre Noi - Clubul Micii Campioni",
    description:
      "Descoperiți povestea Clubului Micii Campioni, primul club de educație acvatică din România, fondat în 2001 de Georgeta Sultana.",
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
  const [page, childPages, teamMembers, timelineEvents] = await Promise.all([
    getPageBySlug("despre-noi"),
    getPagesByParentSlug("despre-noi"),
    getTeamMembers(),
    getTimelineEvents(),
  ]);

  return (
    <>
      {/* Hero */}
      <SectionHero
        title="Despre Noi"
        subtitle="Primul club de educație acvatică din România, dedicat dezvoltării armonioase a copiilor prin intermediul apei încă din 2001."
        heroImage={page?.heroImage}
      />

      {/* Main Content */}
      {page?.content && (
        <Section background="white" spacing="xl">
          <div className="mx-auto max-w-4xl">
            <div className="prose prose-sand prose-lg max-w-none">
              <RichText content={page.content} />
            </div>
          </div>
        </Section>
      )}

      {/* Navigation Cards */}
      <Section background="sand" spacing="xl">
        <div className="mb-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-sand-900">
            Explorează Secțiunile
          </h2>
          <p className="mt-2 text-lg text-sand-600">
            Află mai multe despre noi
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectionCards.map((card) => (
            <Link
              key={card.slug}
              href={`/despre-noi/${card.slug}`}
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

      {/* Quick Preview Sections */}
      <Section background="white" spacing="xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Timeline Preview */}
          {timelineEvents.length > 0 && (
            <div>
              <h2 className="mb-6 font-heading text-2xl font-semibold text-sand-900">
                Repere Istorice
              </h2>
              <CompactTimeline events={timelineEvents} limit={4} />
              <Link
                href="/despre-noi/istoric"
                className="mt-6 inline-flex items-center text-lagoon-600 hover:text-lagoon-700"
              >
                Vezi istoricul complet
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}

          {/* Team Preview */}
          {teamMembers.length > 0 && (
            <div>
              <h2 className="mb-6 font-heading text-2xl font-semibold text-sand-900">
                Echipa Noastră
              </h2>
              <CompactTeamList members={teamMembers} limit={3} />
              <Link
                href="/despre-noi/echipa"
                className="mt-6 inline-flex items-center text-lagoon-600 hover:text-lagoon-700"
              >
                Cunoaște întreaga echipă
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </Section>

      {/* CTA */}
      <CTASection
        title="Vrei să afli mai multe?"
        description="Contactează-ne pentru a programa o vizită sau pentru orice întrebări."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
