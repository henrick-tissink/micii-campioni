import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getPageBySlug, getAllPageSlugs } from "@/lib/contentful/queries";
import { RichText } from "@/lib/contentful/rich-text";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";

// =============================================================================
// Metadata
// =============================================================================

interface Props {
  params: Promise<{ slug: string }>;
}

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
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
      images: page.heroImage
        ? [
            {
              url: page.heroImage.url,
              width: page.heroImage.width,
              height: page.heroImage.height,
              alt: page.heroImage.title,
            },
          ]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

// =============================================================================
// Page
// =============================================================================

export default async function GenericPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[300px] overflow-hidden bg-gradient-to-br from-lagoon-600 to-lagoon-700">
        {page.heroImage && (
          <>
            <Image
              src={page.heroImage.url}
              alt={page.heroImageAlt || page.heroImage.title || page.title}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lagoon-900/70 to-lagoon-800/40" />
          </>
        )}
        <Container className="relative z-10 flex min-h-[300px] items-center py-16">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              {page.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section background="white" spacing="xl">
        <div className="mx-auto max-w-4xl">
          {page.content && (
            <div className="prose prose-sand prose-lg max-w-none">
              <RichText content={page.content} />
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ai întrebări?"
        description="Suntem aici să te ajutăm. Contactează-ne pentru mai multe informații."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        variant="default"
      />
    </>
  );
}
