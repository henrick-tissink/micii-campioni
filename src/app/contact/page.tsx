import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getSiteSettings } from "@/lib/contentful/queries";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact - Micii Campioni",
  description:
    "Contactează-ne pentru informații despre cursurile de înot, programări sau orice alte întrebări. Suntem aici să te ajutăm.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lagoon-600 to-lagoon-700 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Contactează-ne
            </h1>
            <p className="mt-4 text-lg text-lagoon-100 md:text-xl">
              Suntem aici să răspundem la toate întrebările tale. Completează
              formularul sau folosește una din metodele de contact de mai jos.
            </p>
          </div>
        </Container>
      </section>

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
              <Card variant="default" padding="md" className="flex items-start gap-4">
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
              <Card variant="default" padding="md" className="flex items-start gap-4">
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
              <Card variant="default" padding="md" className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-lagoon-100">
                  <MapPin className="h-6 w-6 text-lagoon-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sand-900">Adresă</h3>
                  <p className="text-sand-600">{settings.address}</p>
                </div>
              </Card>
            )}

            {/* Working Hours */}
            <Card variant="default" padding="md" className="flex items-start gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-lagoon-100">
                <Clock className="h-6 w-6 text-lagoon-600" />
              </div>
              <div>
                <h3 className="font-semibold text-sand-900">Program</h3>
                <p className="text-sand-600">Luni - Vineri: 9:00 - 20:00</p>
                <p className="text-sand-600">Sâmbătă: 9:00 - 14:00</p>
                <p className="text-sand-600">Duminică: Închis</p>
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
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${settings.gpsLongitude - 0.005},${settings.gpsLatitude - 0.003},${settings.gpsLongitude + 0.005},${settings.gpsLatitude + 0.003}&layer=mapnik&marker=${settings.gpsLatitude},${settings.gpsLongitude}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Locația Micii Campioni"
            />
          </div>
        </Section>
      )}
    </>
  );
}
