import { notFound } from "next/navigation";
import Image from "next/image";
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
      {/* Hero Section */}
      <section className="relative min-h-[400px] overflow-hidden bg-gradient-to-br from-lagoon-600 to-lagoon-800">
        {service.heroImage && (
          <>
            <Image
              src={service.heroImage.url}
              alt={service.heroImage.title || service.title}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-lagoon-900/80 to-lagoon-800/50" />
          </>
        )}
        <Container className="relative z-10 flex min-h-[400px] flex-col justify-center py-16">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-lagoon-200">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Acasă
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                <Link
                  href="/servicii"
                  className="transition-colors hover:text-white"
                >
                  Cursuri
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{service.title}</span>
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {primaryAgeRange && (
              <Badge
                variant="lagoon"
                size="lg"
                className="mb-4 bg-white/20 text-white"
              >
                {primaryAgeRange}
              </Badge>
            )}
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              {service.title}
            </h1>
            {service.shortDescription && (
              <p className="mt-4 text-xl text-lagoon-100">
                {service.shortDescription}
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" size="lg">
                Programează o Lecție
              </Button>
              <Button
                href="#detalii"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Vezi Detalii
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Age Groups Info Bar */}
      {service.ageGroups && service.ageGroups.length > 0 && (
        <div className="border-b border-sand-200 bg-white">
          <Container>
            <div className="flex flex-wrap justify-center gap-6 py-6 md:justify-start md:gap-8">
              {service.ageGroups.map((ageGroup) => (
                <div key={ageGroup.name} className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-lagoon-500" />
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

      {/* Main Content */}
      <Section id="detalii" background="white" spacing="xl">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
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
                  <div className="prose max-w-none">
                    <RichText content={service.content} />
                  </div>
                </TabContent>

                {service.tabs.map((tab) => (
                  <TabContent
                    key={tab.title}
                    id={tab.title.toLowerCase().replace(/\s+/g, "-")}
                  >
                    <div className="prose max-w-none">
                      <Markdown content={tab.content} />
                    </div>
                  </TabContent>
                ))}
              </Tabs>
            ) : (
              <div className="prose max-w-none">
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

            {/* Age Groups Detail */}
            {service.ageGroups && service.ageGroups.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-6 font-heading text-2xl font-semibold text-sand-900">
                  Grupele de Vârstă
                </h2>
                <div className="space-y-6">
                  {service.ageGroups.map((ageGroup) => (
                    <div
                      key={ageGroup.name}
                      className="rounded-2xl border border-sand-200 p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-sand-900">
                            {ageGroup.name}
                          </h3>
                          <p className="text-lagoon-600">{ageGroup.ageRange}</p>
                        </div>
                        {ageGroup.duration && (
                          <Badge variant="sand">{ageGroup.duration}</Badge>
                        )}
                      </div>
                      {ageGroup.description && (
                        <div className="mt-4 text-sand-600">
                          <Markdown content={ageGroup.description} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* CTA Card */}
              <div className="rounded-2xl bg-lagoon-50 p-6">
                <h3 className="mb-2 font-heading text-lg font-semibold text-sand-900">
                  Înscrie-te Acum
                </h3>
                <p className="mb-4 text-sand-600">
                  Programează o întâlnire pentru a discuta despre nevoile
                  copilului tău.
                </p>
                <Button href="/contact" fullWidth>
                  Programează o Lecție
                </Button>
              </div>

              {/* Other Services */}
              {otherServices.length > 0 && (
                <CompactServices
                  services={otherServices}
                  title="Alte Cursuri"
                />
              )}
            </div>
          </aside>
        </div>
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Ai întrebări despre acest curs?"
        description="Echipa noastră este gata să te ajute. Contactează-ne pentru mai multe informații."
        primaryButton={{ label: "Contactează-ne", href: "/contact" }}
        secondaryButton={{ label: "Vezi Toate Cursurile", href: "/servicii" }}
        variant="default"
      />
    </>
  );
}
