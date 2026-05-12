import type { Metadata } from "next";
import { getServices } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
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
      {/* Hero — SectionHero with COR credential eyebrow + grain texture */}
      <SectionHero
        title="Cursurile Noastre"
        subtitle="Programe de educație acvatică adaptate fiecărei etape de dezvoltare, de la bebeluși la copii de toate vârstele."
        texture="grain"
        eyebrow={
          <Badge variant="credential" size="sm" className="bg-amber-credential/10">
            COR · 342215
          </Badge>
        }
      />

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
