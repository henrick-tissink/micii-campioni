import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPageBySlug,
  getPagesByParentSlug,
  getProjects,
  getConferences,
  getPartners,
} from "@/lib/contentful/queries";
import { PageLayout, type Breadcrumb } from "@/components/layout/PageLayout";
import { RichText } from "@/lib/contentful/rich-text";
import { Markdown } from "@/lib/contentful/markdown";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PartnersSection } from "@/components/content/PartnersStrip";
import { CTASection } from "@/components/sections/CTASection";

// =============================================================================
// Types
// =============================================================================

interface Props {
  params: Promise<{ slug: string }>;
}

// =============================================================================
// Metadata
// =============================================================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: "Pagină negăsită",
    };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription,
    alternates: { canonical: `/asociatia/${slug}` },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
    },
  };
}

export async function generateStaticParams() {
  const pages = await getPagesByParentSlug("asociatia");
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// =============================================================================
// Page Component
// =============================================================================

export default async function AsociatiaSubPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Breadcrumbs
  const breadcrumbs: Breadcrumb[] = [
    { label: "Asociația", href: "/asociatia" },
    { label: page.title, href: `/asociatia/${slug}` },
  ];

  // Determine page type and fetch additional data
  const isProjectsPage = slug.includes("proiecte");
  const isConferencesPage = slug.includes("conferinte");
  const isSponsorsPage = slug.includes("sponsorizari");

  const [projects, conferences, partners] = await Promise.all([
    isProjectsPage ? getProjects() : Promise.resolve([]),
    isConferencesPage ? getConferences() : Promise.resolve([]),
    isSponsorsPage ? getPartners() : Promise.resolve([]),
  ]);

  return (
    <>
      <PageLayout
        title={page.title}
        heroImage={page.heroImage}
        heroImageAlt={page.heroImageAlt}
        breadcrumbs={breadcrumbs}
        sidebarWidgets={page.sidebarWidgets}
      >
        {/* Main Content */}
        {page.content && (
          <div className="prose max-w-none">
            <RichText content={page.content} />
          </div>
        )}

        {/* Projects List */}
        {isProjectsPage && projects.length > 0 && (
          <div className="mt-12 space-y-8">
            <h2 className="font-heading text-2xl font-semibold text-sand-900">
              Proiectele Noastre
            </h2>
            {projects.map((project) => (
              <Card key={project.title} variant="default" padding="lg">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-semibold text-sand-900">
                      {project.title}
                    </h3>
                    <div className="mt-2 text-sand-600">
                      <Markdown content={project.description} />
                    </div>
                    {project.objectives && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-sand-800">Obiective:</h4>
                        <div className="text-sand-600">
                          <Markdown content={project.objectives} />
                        </div>
                      </div>
                    )}
                    {project.results && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-sand-800">Rezultate:</h4>
                        <div className="text-sand-600">
                          <Markdown content={project.results} />
                        </div>
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={project.status === "active" ? "lagoon" : "sand"}
                    className="flex-shrink-0"
                  >
                    {project.status === "active" ? "Activ" : project.status === "completed" ? "Finalizat" : "Planificat"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Conferences List */}
        {isConferencesPage && conferences.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-sand-900">
              Conferințe și Congrese
            </h2>

            {/* International Conferences */}
            {conferences.filter((c) => c.isInternational).length > 0 && (
              <div className="mb-8">
                <h3 className="mb-4 font-heading text-lg font-semibold text-lagoon-700">
                  Conferințe Internaționale
                </h3>
                <div className="space-y-4">
                  {conferences
                    .filter((c) => c.isInternational)
                    .map((conf) => (
                      <Card key={`${conf.title}-${conf.year}`} variant="default" padding="md">
                        <div className="flex items-center gap-4">
                          <span className="font-heading text-2xl font-bold text-lagoon-500">
                            {conf.year}
                          </span>
                          <div>
                            <h4 className="font-semibold text-sand-900">{conf.title}</h4>
                            {conf.location && (
                              <p className="text-sm text-sand-500">{conf.location}</p>
                            )}
                            {conf.description && (
                              <p className="mt-1 text-sand-600">{conf.description}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}

            {/* National Conferences */}
            {conferences.filter((c) => !c.isInternational).length > 0 && (
              <div>
                <h3 className="mb-4 font-heading text-lg font-semibold text-coral-700">
                  Conferințe Naționale
                </h3>
                <div className="space-y-4">
                  {conferences
                    .filter((c) => !c.isInternational)
                    .map((conf) => (
                      <Card key={`${conf.title}-${conf.year}`} variant="default" padding="md">
                        <div className="flex items-center gap-4">
                          <span className="font-heading text-2xl font-bold text-coral-500">
                            {conf.year}
                          </span>
                          <div>
                            <h4 className="font-semibold text-sand-900">{conf.title}</h4>
                            {conf.location && (
                              <p className="text-sm text-sand-500">{conf.location}</p>
                            )}
                            {conf.description && (
                              <p className="mt-1 text-sand-600">{conf.description}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sponsors Section */}
        {isSponsorsPage && partners.length > 0 && (
          <div className="mt-12">
            <PartnersSection partners={partners} />
          </div>
        )}
      </PageLayout>

      {/* CTA */}
      <CTASection
        title="Vrei să ne susții?"
        description="Contactează-ne pentru a afla cum poți contribui la misiunea noastră."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
