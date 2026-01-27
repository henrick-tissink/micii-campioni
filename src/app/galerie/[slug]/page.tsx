import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, Images } from "lucide-react";
import { getGalleryBySlug, getAllGallerySlugs, getGalleries } from "@/lib/contentful/queries";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
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

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-lagoon-600 to-lagoon-700 py-12 md:py-16">
        <Container>
          {/* Back link */}
          <Link
            href="/galerie"
            className="mb-6 inline-flex items-center text-lagoon-200 transition-colors hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Galerie
          </Link>

          <div className="max-w-3xl">
            <h1 className="font-heading text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              {gallery.title}
            </h1>

            {/* Meta info */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {formattedDate && (
                <Badge
                  variant="lagoon"
                  size="lg"
                  className="bg-white/20 text-white"
                >
                  <Calendar className="mr-1 h-4 w-4" />
                  {formattedDate}
                </Badge>
              )}
              <Badge
                variant="lagoon"
                size="lg"
                className="bg-white/20 text-white"
              >
                <Images className="mr-1 h-4 w-4" />
                {gallery.images.length} fotografii
              </Badge>
            </div>

            {/* Description */}
            {gallery.description && (
              <p className="mt-6 text-lg text-lagoon-100">
                {gallery.description}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <Section background="white" spacing="xl">
        <ImageGallery images={gallery.images} columns={3} />
      </Section>

      {/* Other Galleries */}
      {otherGalleries.length > 0 && (
        <Section background="sand" spacing="xl">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-semibold text-sand-900">
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

      {/* CTA */}
      <CTASection
        title="Vrei să capturezi momente speciale?"
        description="Înscrie copilul tău la cursurile noastre și creează amintiri de neuitat."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
