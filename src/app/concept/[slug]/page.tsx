import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getPagesByParentSlug, getPartners } from "@/lib/contentful/queries";
import { PageLayout, type Breadcrumb } from "@/components/layout/PageLayout";
import { RichText } from "@/lib/contentful/rich-text";
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
    alternates: { canonical: `/concept/${slug}` },
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
  const pages = await getPagesByParentSlug("concept");
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// =============================================================================
// Page Component
// =============================================================================

export default async function ConceptSubPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // Breadcrumbs
  const breadcrumbs: Breadcrumb[] = [
    { label: "Concept", href: "/concept" },
    { label: page.title, href: `/concept/${slug}` },
  ];

  // Fetch partners for FAAEL page
  const isFAAELPage = slug.includes("faael");
  const partners = isFAAELPage ? await getPartners() : [];

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

        {/* Partners Section for FAAEL page */}
        {isFAAELPage && partners.length > 0 && (
          <div className="mt-12">
            <PartnersSection partners={partners} />
          </div>
        )}
      </PageLayout>

      {/* CTA */}
      <CTASection
        title="Interesat de programele noastre?"
        description="Descoperă cum putem ajuta copilul tău să devină un mic campion."
        primaryButton={{ label: "Vezi Cursurile", href: "/servicii" }}
        variant="default"
      />
    </>
  );
}
