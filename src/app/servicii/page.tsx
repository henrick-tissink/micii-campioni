import type { Metadata } from "next";
import { getServices } from "@/lib/contentful/queries";
import { Section } from "@/components/ui/Section";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Cursuri de Înot pentru Copii",
  description:
    "Descoperă programele noastre de educație acvatică pentru toate vârstele: cursuri prenatale, înot bebeluși, înot copii și kinetoterapie.",
  alternates: { canonical: "/servicii" },
  openGraph: {
    title: "Cursuri de Înot pentru Copii",
    description:
      "Descoperă programele noastre de educație acvatică pentru toate vârstele: cursuri prenatale, înot bebeluși, înot copii și kinetoterapie.",
  },
};

export default async function ServicesListPage() {
  const services = await getServices();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Acasă", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Cursuri", item: `${siteUrl}/servicii` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero — compact foundation shell */}
      <Section background="foundation" spacing="lg" texture="grain">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="credential"
            size="sm"
            className="mb-6 bg-amber-credential/10"
          >
            COR · 342215
          </Badge>
          <h1
            className="font-heading font-bold text-white"
            style={{
              fontSize: "var(--text-section)",
              letterSpacing: "var(--tracking-section)",
              lineHeight: 1.1,
            }}
          >
            Cursurile Noastre
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-lagoon-100/90">
            Programe de educație acvatică adaptate fiecărei etape de dezvoltare,
            de la bebeluși la copii de toate vârstele.
          </p>
        </div>
      </Section>

      {/* Services Grid */}
      <ServicesSection
        services={services}
        title=""
        subtitle=""
        description=""
        eyebrow="Toate Cursurile"
      />

      {/* CTA */}
      <CTASection
        title="Nu știi ce curs să alegi?"
        description="Echipa noastră te poate ajuta să găsești programul potrivit pentru copilul tău. Contactează-ne pentru o consultație gratuită."
        primaryButton={{ label: "Programează o Consultație", href: "/contact" }}
      />
    </>
  );
}
