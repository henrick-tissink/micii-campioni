import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Images } from "lucide-react";
import { getGalleryBySlug, getAllGallerySlugs, getGalleries } from "@/lib/contentful/queries";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ImageGallery, GalleryCard } from "@/components/content/ImageGallery";
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
  const gallery = await getGalleryBySlug(slug);

  if (!gallery) {
    return {
      title: "Galerie negăsită",
    };
  }

  return {
    title: `${gallery.title} - Galerie Foto`,
    description: gallery.description || `Galerie foto: ${gallery.title}`,
    alternates: { canonical: `/galerie/${slug}` },
    openGraph: {
      title: gallery.title,
      description: gallery.description,
      images: gallery.coverImage
        ? [
            {
              url: gallery.coverImage.url,
              width: gallery.coverImage.width,
              height: gallery.coverImage.height,
              alt: gallery.coverImage.title,
            },
          ]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllGallerySlugs();
  return slugs.map((slug) => ({ slug }));
}

// =============================================================================
// Page Component
// =============================================================================

export default async function GalleryDetailPage({ params }: Props) {
  const { slug } = await params;
  const [gallery, allGalleries] = await Promise.all([
    getGalleryBySlug(slug),
    getGalleries(),
  ]);

  if (!gallery) {
    notFound();
  }

  // Get other galleries for recommendations
  const otherGalleries = allGalleries.filter((g) => g.slug !== slug).slice(0, 3);

  // Format date
  const formattedDate = gallery.date
    ? new Date(gallery.date).toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Galerie", item: `${siteUrl}/galerie` },
      { "@type": "ListItem", position: 3, name: gallery.title, item: `${siteUrl}/galerie/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero — foundation + grain treatment, M3.1-aligned */}
      <Section background="foundation" spacing="lg" texture="grain" className="text-white">
        <Container>
          <Link
            href="/galerie"
            className="mb-6 inline-flex items-center font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
            Înapoi la Galerie
          </Link>

          <div className="max-w-3xl">
            <h1
              className="font-heading font-bold text-white"
              style={{
                fontSize: "var(--text-section)",
                letterSpacing: "var(--tracking-section)",
                lineHeight: 1.1,
              }}
            >
              {gallery.title}
            </h1>

            {/* Meta chips — mono treatment */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {formattedDate && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[var(--tracking-mono)] text-white/90">
                  <Calendar className="h-3 w-3" aria-hidden="true" />
                  {formattedDate}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-[var(--tracking-mono)] text-white/90">
                <Images className="h-3 w-3" aria-hidden="true" />
                {gallery.images.length} fotografii
              </span>
            </div>

            {/* Description */}
            {gallery.description && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-lagoon-100/90">
                {gallery.description}
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* Gallery Grid — masonry preserves natural aspect ratios */}
      <Section background="white" spacing="xl">
        <ImageGallery images={gallery.images} columns={3} layout="masonry" />
      </Section>

      {/* Other Galleries */}
      {otherGalleries.length > 0 && (
        <Section background="sand" spacing="xl">
          <div className="mb-8">
            <h2 className="font-heading text-xl font-semibold text-sand-900 tracking-[var(--tracking-section)]">
              Alte Galerii
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherGalleries.map((g) => (
              <GalleryCard
                key={g.slug}
                title={g.title}
                coverImage={g.coverImage}
                imageCount={g.images.length}
                href={`/galerie/${g.slug}`}
                date={g.date ? new Date(g.date).toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "long",
                }) : undefined}
              />
            ))}
          </div>
        </Section>
      )}

      {/* CTA — gradient (foundation+grain post-M3) */}
      <CTASection
        title="Vrei să capturezi momente speciale?"
        description="Înscrie copilul tău la cursurile noastre și creează amintiri de neuitat."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
      />
    </>
  );
}
