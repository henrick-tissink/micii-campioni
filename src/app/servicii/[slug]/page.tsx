import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import {
  getServiceBySlug,
  getServices,
  getFAQs,
} from "@/lib/contentful/queries";
import { RichText } from "@/lib/contentful/rich-text";
import { Markdown } from "@/lib/contentful/markdown";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { TreatedImage } from "@/components/ui/TreatedImage";
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/Tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/Accordion";
import { CompactServices } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";
import { ViewContentTracker } from "@/components/analytics/ViewContentTracker";
import { SIZES } from "@/lib/contentful/image";

// =============================================================================
// Metadata
// =============================================================================

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Serviciu negăsit",
    };
  }

  // Strip "Micii Campioni" from metaTitle if present to avoid duplication with template
  const rawTitle = service.metaTitle || service.title;
  const title = rawTitle.replace(/\s*[-–|]\s*Micii Campioni\s*$/i, "");

  return {
    title,
    description: service.metaDescription || service.shortDescription,
    alternates: { canonical: `/servicii/${slug}` },
    openGraph: {
      title: rawTitle,
      description: service.metaDescription || service.shortDescription,
      images: service.heroImage
        ? [
            {
              url: service.heroImage.url,
              width: service.heroImage.width,
              height: service.heroImage.height,
              alt: service.heroImage.title,
            },
          ]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// =============================================================================
// Page
// =============================================================================

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const isFAQPage = slug === "intrebari-frecvente";
  const [service, allServices, faqs] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    isFAQPage ? getFAQs() : Promise.resolve([]),
  ]);

  if (!service) {
    notFound();
  }

  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 4);

  // Get first age group's age range if available
  const primaryAgeRange = service.ageGroups?.[0]?.ageRange;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Cursuri",
        item: `${siteUrl}/servicii`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteUrl}/servicii/${slug}`,
      },
    ],
  };

  // Course structured data for rich results
  const heroImageUrl = service.heroImage?.url?.startsWith("//")
    ? `https:${service.heroImage.url}`
    : service.heroImage?.url;

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: service.title,
    description: service.shortDescription || service.metaDescription,
    url: `${siteUrl}/servicii/${slug}`,
    provider: {
      "@type": "Organization",
      name: "Clubul Micii Campioni",
      url: siteUrl,
    },
    image: heroImageUrl,
    inLanguage: "ro",
    ...(primaryAgeRange && {
      coursePrerequisites: `Vârstă: ${primaryAgeRange}`,
    }),
    ...(service.ageGroups &&
      service.ageGroups.length > 0 && {
        hasCourseInstance: service.ageGroups.map((group) => ({
          "@type": "CourseInstance",
          name: group.name,
          description: group.description,
          ...(group.duration && { duration: group.duration }),
        })),
      }),
  };

  // FAQ structured data for rich results
  const faqJsonLd =
    isFAQPage && faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Facebook ViewContent tracking */}
      <ViewContentTracker
        contentName={service.title}
        contentCategory="Servicii"
        contentId={slug}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Hero Section — TreatedImage + .hero-overlay */}
      <section className="relative min-h-[480px] overflow-hidden bg-lagoon-foundation">
        {service.heroImage && (
          <TreatedImage
            src={service.heroImage.url}
            alt={service.heroImage.title || service.title}
            fill
            sizes={SIZES.hero}
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 hero-overlay" />
        <Container className="relative z-10 flex min-h-[480px] flex-col justify-center py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-lagoon-100/80">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Acasă
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                <Link
                  href="/servicii"
                  className="transition-colors hover:text-white"
                >
                  Cursuri
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                <span aria-current="page" className="text-white">{service.title}</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {primaryAgeRange && (
              <Badge
                variant="credential"
                size="lg"
                className="mb-4 bg-white/95 backdrop-blur text-sand-900"
              >
                {primaryAgeRange}
              </Badge>
            )}
            <h1
              className="font-heading font-bold text-white"
              style={{
                fontSize: "var(--text-section)",
                letterSpacing: "var(--tracking-section)",
                lineHeight: 1.1,
              }}
            >
              {service.title}
            </h1>
            {service.shortDescription && (
              <p className="mt-4 max-w-2xl text-xl leading-relaxed text-lagoon-100/90">
                {service.shortDescription}
              </p>
            )}
            <div className="mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Programează o vizită
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Age Groups Info Bar — light refresh: amber-credential dot */}
      {service.ageGroups && service.ageGroups.length > 0 && (
        <div className="border-b border-sand-200 bg-white">
          <Container>
            <div className="flex flex-wrap justify-center gap-6 py-6 md:justify-start md:gap-8">
              {service.ageGroups.map((ageGroup) => (
                <div key={ageGroup.name} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-credential" />
                  <span className="text-sand-700">
                    <strong className="text-sand-900">{ageGroup.name}:</strong>{" "}
                    {ageGroup.ageRange}
                    {ageGroup.duration && ` (${ageGroup.duration})`}
                  </span>
                </div>
              ))}
            </div>
          </Container>
        </div>
      )}

      {/* Main Content — single 720px reading column */}
      <Section id="detalii" background="white" spacing="xl">
        <div className="mx-auto max-w-[720px]">
          {/* Tabs for different sections */}
          {service.tabs && service.tabs.length > 0 ? (
            <Tabs defaultTab="descriere">
              <TabList>
                <TabTrigger id="descriere">Descriere</TabTrigger>
                {service.tabs.map((tab) => (
                  <TabTrigger
                    key={tab.title}
                    id={tab.title.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {tab.title}
                  </TabTrigger>
                ))}
              </TabList>

              <TabContent id="descriere">
                <div className="prose prose-lg max-w-none">
                  <RichText content={service.content} />
                </div>
              </TabContent>

              {service.tabs.map((tab) => (
                <TabContent
                  key={tab.title}
                  id={tab.title.toLowerCase().replace(/\s+/g, "-")}
                >
                  <div className="prose prose-lg max-w-none">
                    <Markdown content={tab.content} />
                  </div>
                </TabContent>
              ))}
            </Tabs>
          ) : (
            <div className="prose prose-lg max-w-none">
              <RichText content={service.content} />
            </div>
          )}

          {/* FAQ Accordion */}
          {isFAQPage && faqs.length > 0 && (
            <div className="mt-12">
              <Accordion allowMultiple>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} id={`faq-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>
                      <Markdown content={faq.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* Age Groups Detail — clean table format (hairline-divided rows) */}
          {service.ageGroups && service.ageGroups.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
                Grupele de Vârstă
              </h2>
              <div className="border-t border-sand-100 dark:border-night-700">
                {service.ageGroups.map((ageGroup) => (
                  <div
                    key={ageGroup.name}
                    className="border-b border-sand-100 py-6 dark:border-night-700"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-heading text-lg font-medium text-sand-900 dark:text-white">
                        {ageGroup.name}
                      </h3>
                      <p className="font-mono text-sm uppercase tracking-[var(--tracking-mono)] text-sand-500 dark:text-sand-400">
                        {ageGroup.ageRange}
                        {ageGroup.duration && ` · ${ageGroup.duration}`}
                      </p>
                    </div>
                    {ageGroup.description && (
                      <div className="mt-3 text-[15px] leading-relaxed text-sand-600 dark:text-sand-400">
                        <Markdown content={ageGroup.description} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {/* Other courses — soft visual differentiator from body white */}
      {otherServices.length > 0 && (
        <Section background="cream" spacing="lg">
          <div className="mx-auto max-w-3xl">
            <CompactServices services={otherServices} title="Alte Cursuri" />
          </div>
        </Section>
      )}

      {/* CTA Section — course-specific booking */}
      <CTASection
        title={`Pregătit pentru ${service.title}?`}
        description="Programează o vizită și vino să cunoști echipa noastră."
        primaryButton={{ label: "Programează o vizită", href: "/contact" }}
        secondaryButton={{ label: "Vezi Toate Cursurile", href: "/servicii" }}
      />
    </>
  );
}
