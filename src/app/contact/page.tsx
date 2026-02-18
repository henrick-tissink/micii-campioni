import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getSiteSettings, getPageBySlug } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";
import { RichText } from "@/lib/contentful/rich-text";

// =============================================================================
// Helpers
// =============================================================================

/** Parse a schedule string like "9:00 - 20:00" into { opens, closes }. */
function parseScheduleTimes(schedule: string): {
  opens: string;
  closes: string;
} | null {
  const match = schedule.match(/(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/);
  if (!match) return null;
  const pad = (t: string) => (t.length === 4 ? `0${t}` : t);
  return { opens: pad(match[1]), closes: pad(match[2]) };
}

// =============================================================================
// Metadata
// =============================================================================

const FALLBACK_TITLE = "Contact";
const FALLBACK_DESCRIPTION =
  "Contactează-ne pentru informații despre cursurile de înot, programări sau orice alte întrebări. Suntem aici să te ajutăm.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("contact");

  return {
    title: page?.metaTitle || FALLBACK_TITLE,
    description: page?.metaDescription || FALLBACK_DESCRIPTION,
    alternates: { canonical: "/contact" },
    openGraph: {
      title: page?.metaTitle || `Contactează Micii Campioni`,
      description: page?.metaDescription || FALLBACK_DESCRIPTION,
      images: page?.heroImage
        ? [{ url: page.heroImage.url, width: page.heroImage.width, height: page.heroImage.height, alt: page.heroImage.title }]
        : undefined,
    },
  };
}

// =============================================================================
// Page
// =============================================================================

export default async function ContactPage() {
  const [settings, page] = await Promise.all([
    getSiteSettings(),
    getPageBySlug("contact"),
  ]);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

  // Schedule values from Contentful with fallbacks
  const scheduleWeekdays =
    settings?.scheduleWeekdays || "Luni - Vineri: 9:00 - 20:00";
  const scheduleSaturday =
    settings?.scheduleSaturday || "Sâmbătă: 9:00 - 14:00";
  const scheduleSunday = settings?.scheduleSunday || "Duminică: Închis";

  // Build opening hours from dynamic schedule
  const openingHoursSpecification: object[] = [];
  const weekdayTimes = parseScheduleTimes(scheduleWeekdays);
  if (weekdayTimes) {
    openingHoursSpecification.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: weekdayTimes.opens,
      closes: weekdayTimes.closes,
    });
  }
  const saturdayTimes = parseScheduleTimes(scheduleSaturday);
  if (saturdayTimes) {
    openingHoursSpecification.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: saturdayTimes.opens,
      closes: saturdayTimes.closes,
    });
  }
  const sundayTimes = parseScheduleTimes(scheduleSunday);
  if (sundayTimes) {
    openingHoursSpecification.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: sundayTimes.opens,
      closes: sundayTimes.closes,
    });
  }

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "Clubul Micii Campioni",
    description:
      "Primul club de educatie acvatica din Romania - cursuri de inot pentru bebelusi si copii.",
    url: siteUrl,
    telephone: settings?.phone,
    email: settings?.email,
    address: settings?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: "Bucuresti",
          addressCountry: "RO",
        }
      : undefined,
    geo:
      settings?.gpsLatitude && settings?.gpsLongitude
        ? {
            "@type": "GeoCoordinates",
            latitude: settings.gpsLatitude,
            longitude: settings.gpsLongitude,
          }
        : undefined,
    openingHoursSpecification:
      openingHoursSpecification.length > 0
        ? openingHoursSpecification
        : undefined,
  };

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd),
        }}
      />

      {/* Hero Section */}
      <SectionHero
        title={page?.title || "Contactează-ne"}
        subtitle="Suntem aici să răspundem la toate întrebările tale. Completează formularul sau folosește una din metodele de contact de mai jos."
        heroImage={page?.heroImage}
      />

      {/* Rich Text Content from Contentful */}
      {page?.content && (
        <Section background="white" spacing="lg">
          <div className="mx-auto max-w-4xl">
            <div className="prose max-w-none">
              <RichText content={page.content} />
            </div>
          </div>
        </Section>
      )}

      {/* Contact Info + Form */}
      <Section background="sand" spacing="xl">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-6 lg:col-span-1">
            <h2 className="font-heading text-2xl font-semibold text-sand-900">
              Informații Contact
            </h2>

            {/* Phone */}
            {settings?.phone && (
              <Card
                variant="default"
                padding="md"
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-lagoon-100">
                  <Phone className="h-6 w-6 text-lagoon-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sand-900">Telefon</h3>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-lagoon-600 hover:text-lagoon-700"
                  >
                    {settings.phone}
                  </a>
                </div>
              </Card>
            )}

            {/* Email */}
            {settings?.email && (
              <Card
                variant="default"
                padding="md"
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-lagoon-100">
                  <Mail className="h-6 w-6 text-lagoon-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sand-900">Email</h3>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-lagoon-600 hover:text-lagoon-700"
                  >
                    {settings.email}
                  </a>
                </div>
              </Card>
            )}

            {/* Address */}
            {settings?.address && (
              <Card
                variant="default"
                padding="md"
                className="flex items-start gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-lagoon-100">
                  <MapPin className="h-6 w-6 text-lagoon-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sand-900">Adresă</h3>
                  <a
                    href={
                      settings.gpsLatitude && settings.gpsLongitude
                        ? `https://www.google.com/maps/search/?api=1&query=${settings.gpsLatitude},${settings.gpsLongitude}`
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lagoon-600 hover:text-lagoon-700"
                  >
                    {settings.address}
                  </a>
                </div>
              </Card>
            )}

            {/* Working Hours */}
            <Card
              variant="default"
              padding="md"
              className="flex items-start gap-4"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-lagoon-100">
                <Clock className="h-6 w-6 text-lagoon-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sand-900">Program</h3>
                <p className="text-sand-600">{scheduleWeekdays}</p>
                <p className="text-sand-600">{scheduleSaturday}</p>
                <p className="text-sand-600">{scheduleSunday}</p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card variant="default" padding="lg">
              <h2 className="mb-6 font-heading text-2xl font-semibold text-sand-900">
                Trimite-ne un mesaj
              </h2>
              <ContactForm />
            </Card>
          </div>
        </div>
      </Section>

      {/* Map Section - Uses GPS coordinates if available */}
      {settings?.gpsLatitude && settings?.gpsLongitude && (
        <Section background="white" spacing="lg" noContainer>
          <div className="h-[400px] w-full">
            <iframe
              src={`https://www.google.com/maps?q=${settings.gpsLatitude},${settings.gpsLongitude}&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Locația Micii Campioni"
            />
          </div>
        </Section>
      )}
    </>
  );
}
