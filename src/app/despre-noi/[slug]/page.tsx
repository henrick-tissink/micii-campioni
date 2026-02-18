import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getPageBySlug,
  getPagesByParentSlug,
  getTeamMembers,
  getTimelineEvents,
  getCertificates,
  getPressClippings,
} from "@/lib/contentful/queries";
import { PageLayout, type Breadcrumb } from "@/components/layout/PageLayout";
import { RichText } from "@/lib/contentful/rich-text";
import { Timeline } from "@/components/content/Timeline";
import { TeamGrid } from "@/components/content/TeamGrid";
import { ImageGallery } from "@/components/content/ImageGallery";
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
    alternates: { canonical: `/despre-noi/${slug}` },
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
  const pages = await getPagesByParentSlug("despre-noi");
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// =============================================================================
// Page Component
// =============================================================================

export default async function DespreNoiSubPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Breadcrumbs
  const breadcrumbs: Breadcrumb[] = [
    { label: "Despre Noi", href: "/despre-noi" },
    { label: page.title, href: `/despre-noi/${slug}` },
  ];

  // Fetch additional data based on page type
  const isTeamPage = slug === "echipa" || slug === "echipa-micii-campioni";
  const isHistoryPage = slug === "istoric";
  const isCertificatesPage = slug === "distinctii" || slug === "distinctii-si-certificari";
  const isPressPage = slug === "press-info" || slug === "press";

  const [teamMembers, timelineEvents, certificates, pressClippings] = await Promise.all([
    isTeamPage ? getTeamMembers() : Promise.resolve([]),
    isHistoryPage ? getTimelineEvents() : Promise.resolve([]),
    isCertificatesPage ? getCertificates() : Promise.resolve([]),
    isPressPage ? getPressClippings() : Promise.resolve([]),
  ]);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

  // Person structured data for team members
  const teamJsonLd = isTeamPage && teamMembers.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Clubul Micii Campioni",
    employee: teamMembers.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.shortBio,
      image: member.photo?.url?.startsWith("//")
        ? `https:${member.photo.url}`
        : member.photo?.url,
      ...(member.certifications && member.certifications.length > 0 && {
        hasCredential: member.certifications.map((cert) => ({
          "@type": "EducationalOccupationalCredential",
          name: cert,
        })),
      }),
      worksFor: {
        "@type": "Organization",
        name: "Clubul Micii Campioni",
      },
    })),
  } : null;

  return (
    <>
      {teamJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
        />
      )}
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

        {/* Team Grid */}
        {isTeamPage && teamMembers.length > 0 && (
          <div className="mt-12">
            <TeamGrid members={teamMembers} />
          </div>
        )}

        {/* Timeline */}
        {isHistoryPage && timelineEvents.length > 0 && (
          <div className="mt-12">
            <Timeline events={timelineEvents} />
          </div>
        )}

        {/* Certificates Gallery */}
        {isCertificatesPage && certificates.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-sand-900">
              Certificări și Distincții
            </h2>
            <ImageGallery
              images={certificates.map((cert) => cert.image)}
              columns={3}
            />
          </div>
        )}

        {/* Press Clippings Gallery */}
        {isPressPage && pressClippings.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 font-heading text-2xl font-semibold text-sand-900">
              Apariții în Presă
            </h2>
            <ImageGallery
              images={pressClippings.map((clip) => clip.image)}
              columns={3}
            />
          </div>
        )}
      </PageLayout>

      {/* CTA */}
      <CTASection
        title="Ai întrebări?"
        description="Suntem aici să te ajutăm. Contactează-ne pentru mai multe informații."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
