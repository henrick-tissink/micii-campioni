import type { Metadata } from "next";
import { getServices } from "@/lib/contentful/queries";
import { Section, SectionHeader } from "@/components/ui/Section";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { WaveDivider } from "@/components/ui/WaveDivider";

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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lagoon-600 to-lagoon-700 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
              Cursurile Noastre
            </h1>
            <p className="mt-4 text-lg text-lagoon-100 md:text-xl">
              Programe de educație acvatică adaptate fiecărei etape de dezvoltare,
              de la bebeluși la copii de toate vârstele.
            </p>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider color="white" />
        </div>
      </section>

      {/* Services Grid */}
      <ServicesSection
        services={services}
        title=""
        subtitle=""
        description=""
      />

      {/* CTA */}
      <CTASection
        title="Nu știi ce curs să alegi?"
        description="Echipa noastră te poate ajuta să găsești programul potrivit pentru copilul tău. Contactează-ne pentru o consultație gratuită."
        primaryButton={{ label: "Programează o Consultație", href: "/contact" }}
        variant="gradient"
      />
    </>
  );
}
