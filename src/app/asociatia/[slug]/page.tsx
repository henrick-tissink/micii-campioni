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
import { ConferenceList } from "@/components/sections/ConferenceList";
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
      images: page.heroImage
        ? [{ url: page.heroImage.url, width: page.heroImage.width, height: page.heroImage.height, alt: page.heroImage.title }]
        : undefined,
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
        {/* Main Content — RichText in 720px reading column */}
        {page.content && (
          <div className="mx-auto max-w-[720px]">
            <div className="prose prose-lg max-w-none">
              <RichText content={page.content} demoteH1 />
            </div>
          </div>
        )}

        {/* Projects List — full PageLayout width, outside the 720px wrapper */}
        {isProjectsPage && projects.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
              PROIECTELE NOASTRE
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <Card key={project.slug ?? `${project.title}-${project.order}`} variant="default" padding="cinematic">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-xl font-semibold text-sand-900 tracking-[var(--tracking-section)]">
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
          </div>
        )}

        {/* Conferences List — full PageLayout width via sealed ConferenceList */}
        {isConferencesPage && conferences.length > 0 && (
          <div className="mt-12">
            <ConferenceList conferences={conferences} />
          </div>
        )}

        {/* Sponsors Section */}
        {isSponsorsPage && partners.length > 0 && (
          <div className="mt-12">
            <PartnersSection partners={partners} />
          </div>
        )}
      </PageLayout>

      {/* CTA — gradient (foundation+grain post-M3) */}
      <CTASection
        title="Vrei să ne susții?"
        description="Contactează-ne pentru a afla cum poți contribui la misiunea noastră."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
      />
    </>
  );
}
