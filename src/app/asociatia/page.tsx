import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, FolderKanban, Mic2, Handshake } from "lucide-react";
import { getPageBySlug, getProjects } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { RichText } from "@/lib/contentful/rich-text";
import { Markdown } from "@/lib/contentful/markdown";
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
  const [page, projects] = await Promise.all([
    getPageBySlug("asociatia"),
    getProjects(),
  ]);

  // Get active projects for preview
  const activeProjects = projects.filter((p) => p.status === "active").slice(0, 3);

  return (
    <>
      {/* Hero */}
      <SectionHero
        title="Asociația"
        subtitle="Promovăm educația acvatică în România și susținem accesul tuturor copiilor la beneficiile activităților acvatice."
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
            Activitatea Asociației
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectionCards.map((card) => (
            <Link
              key={card.slug}
              href={`/asociatia/${card.slug}`}
              className="group block"
            >
              <Card
                variant="default"
                padding="lg"
                className="h-full transition-all duration-300 group-hover:shadow-medium group-hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-coral-100 transition-colors group-hover:bg-coral-500">
                  <card.icon className="h-6 w-6 text-coral-600 transition-colors group-hover:text-white" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-sand-900">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm text-sand-600">{card.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-coral-600 group-hover:text-coral-700">
                  Citește mai mult
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* Active Projects Preview */}
      {activeProjects.length > 0 && (
        <Section background="white" spacing="xl">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-3xl font-bold text-sand-900">
              Proiecte Active
            </h2>
            <p className="mt-2 text-lg text-sand-600">
              Inițiativele în desfășurare
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {activeProjects.map((project) => (
              <Card key={project.title} variant="default" padding="lg">
                <Badge variant="lagoon" size="sm" className="mb-4">
                  Activ
                </Badge>
                <h3 className="font-heading text-xl font-semibold text-sand-900">
                  {project.title}
                </h3>
                <div className="mt-2 line-clamp-3 text-sand-600">
                  <Markdown content={project.description} />
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/asociatia/proiecte-si-programe"
              className="inline-flex items-center font-medium text-lagoon-600 hover:text-lagoon-700"
            >
              Vezi toate proiectele
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </Section>
      )}

      {/* CTA */}
      <CTASection
        title="Vrei să susții misiunea noastră?"
        description="Află cum poți contribui la promovarea educației acvatice în România."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        secondaryButton={{ label: "Sponsorizări", href: "/asociatia/sponsorizari" }}
        variant="gradient"
      />
    </>
  );
}
