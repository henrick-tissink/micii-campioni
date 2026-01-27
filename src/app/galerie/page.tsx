import type { Metadata } from "next";
import { getGalleries } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { GalleryCard } from "@/components/content/ImageGallery";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Galerie Foto",
  description:
    "Galerie foto cu activitățile Clubului Micii Campioni - momente speciale din cursurile noastre de educație acvatică.",
  alternates: { canonical: "/galerie" },
  openGraph: {
    title: "Galerie Foto - Micii Campioni",
    description:
      "Galerie foto cu activitățile Clubului Micii Campioni - momente speciale din cursurile noastre de educație acvatică.",
  },
};

export default async function GaleriePage() {
  const galleries = await getGalleries();

  // Separate featured from regular galleries
  const featuredGalleries = galleries.filter((g) => g.featured);
  const regularGalleries = galleries.filter((g) => !g.featured);

  return (
    <>
      {/* Hero */}
      <SectionHero
        title="Galerie Foto"
        subtitle="Momente speciale din activitățile clubului nostru - bucuria copiilor în apă."
      />

      {/* Featured Galleries */}
      {featuredGalleries.length > 0 && (
        <Section background="white" spacing="xl">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-semibold text-sand-900">
              Galerii Recomandate
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredGalleries.map((gallery) => (
              <GalleryCard
                key={gallery.slug}
                title={gallery.title}
                coverImage={gallery.coverImage}
                imageCount={gallery.images.length}
                href={`/galerie/${gallery.slug}`}
                date={gallery.date ? new Date(gallery.date).toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "long",
                }) : undefined}
              />
            ))}
          </div>
        </Section>
      )}

      {/* All Galleries */}
      {regularGalleries.length > 0 && (
        <Section background="sand" spacing="xl">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-semibold text-sand-900">
              {featuredGalleries.length > 0 ? "Toate Galeriile" : "Galeriile Noastre"}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {regularGalleries.map((gallery) => (
              <GalleryCard
                key={gallery.slug}
                title={gallery.title}
                coverImage={gallery.coverImage}
                imageCount={gallery.images.length}
                href={`/galerie/${gallery.slug}`}
                date={gallery.date ? new Date(gallery.date).toLocaleDateString("ro-RO", {
                  year: "numeric",
                  month: "long",
                }) : undefined}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Empty State */}
      {galleries.length === 0 && (
        <Section background="white" spacing="xl">
          <div className="mx-auto max-w-md text-center">
            <p className="text-lg text-sand-600">
              Galeria foto va fi disponibilă în curând.
            </p>
          </div>
        </Section>
      )}

      {/* CTA */}
      <CTASection
        title="Vrei să vezi copilul tău aici?"
        description="Înscrie-l la cursurile noastre și surprinde momentele speciale din călătoria lui acvatică."
        primaryButton={{ label: "Înscrie-te Acum", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}
