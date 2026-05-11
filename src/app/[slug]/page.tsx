import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageBySlug, getAllPageSlugs } from "@/lib/contentful/queries";
import { RichText } from "@/lib/contentful/rich-text";
import { PageLayout, SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
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

  const hasSidebar = page.sidebarWidgets && page.sidebarWidgets.length > 0;

  if (hasSidebar) {
    return (
      <>
        <PageLayout
          title={page.title}
          heroImage={page.heroImage}
          heroImageAlt={page.heroImageAlt}
          sidebarWidgets={page.sidebarWidgets}
        >
          {page.content && (
            <div className="mx-auto max-w-[720px]">
              <div className="prose prose-lg max-w-none">
                <RichText content={page.content} />
              </div>
            </div>
          )}
        </PageLayout>

        {/* CTA — gradient (foundation+grain post-M3) */}
        <CTASection
          title="Ai întrebări?"
          description="Suntem aici să te ajutăm. Contactează-ne pentru mai multe informații."
          primaryButton={{ label: "Contactează-ne", href: "/contact" }}
          variant="gradient"
        />
      </>
    );
  }

  return (
    <>
      {/* Hero — M5a SectionHero, auto-refreshed treatment */}
      <SectionHero
        title={page.title}
        heroImage={page.heroImage}
      />

      {/* Body — RichText in 720px reading column */}
      {page.content && (
        <Section background="white" spacing="xl">
          <div className="mx-auto max-w-[720px]">
            <div className="prose prose-lg max-w-none">
              <RichText content={page.content} />
            </div>
          </div>
        </Section>
      )}

      {/* CTA — gradient (foundation+grain post-M3) */}
      <CTASection
        title="Ai întrebări?"
        description="Suntem aici să te ajutăm. Contactează-ne pentru mai multe informații."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}
