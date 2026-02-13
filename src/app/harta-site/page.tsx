import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Info, Lightbulb, Building2, Briefcase, Images, Mail } from "lucide-react";
import { getServices, getGalleries } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Harta Site-ului",
  description:
    "Navigare completă prin site-ul Clubului Micii Campioni - găsește rapid informațiile de care ai nevoie.",
  alternates: { canonical: "/harta-site" },
  openGraph: {
    title: "Harta Site-ului Micii Campioni",
    description:
      "Navigare completă prin site-ul Clubului Micii Campioni - găsește rapid informațiile de care ai nevoie.",
  },
};

// Site structure definition
const siteStructure = [
  {
    title: "Acasă",
    href: "/",
    icon: Home,
    description: "Pagina principală",
  },
  {
    title: "Despre Noi",
    href: "/despre-noi",
    icon: Info,
    description: "Informații despre clubul nostru",
    children: [
      { title: "Istoric", href: "/despre-noi/istoric" },
      { title: "Siguranță și Securitate", href: "/despre-noi/siguranta-si-securitate-pentru-copilul-tau" },
      { title: "Echipa", href: "/despre-noi/echipa-micii-campioni" },
      { title: "Press Info", href: "/despre-noi/press-info" },
      { title: "Distincții și Certificări", href: "/despre-noi/distinctii-si-certificari" },
    ],
  },
  {
    title: "Concept",
    href: "/concept",
    icon: Lightbulb,
    description: "Filosofia și metodologia noastră",
    children: [
      { title: "Micii Campioni și FAAEL", href: "/concept/micii-campioni-si-faael" },
      { title: "Viziune și Obiective", href: "/concept/viziune-si-obiective" },
    ],
  },
  {
    title: "Asociația",
    href: "/asociatia",
    icon: Building2,
    description: "Activitatea asociației noastre",
    children: [
      { title: "Misiune", href: "/asociatia/misiune" },
      { title: "Proiecte și Programe", href: "/asociatia/proiecte-si-programe" },
      { title: "Conferințe și Congrese", href: "/asociatia/conferinte-si-congrese" },
      { title: "Sponsorizări", href: "/asociatia/sponsorizari" },
    ],
  },
  {
    title: "Cursuri",
    href: "/servicii",
    icon: Briefcase,
    description: "Programele noastre de educație acvatică",
    // Children will be dynamically populated
    isDynamic: true,
    dynamicKey: "services",
  },
  {
    title: "Galerie",
    href: "/galerie",
    icon: Images,
    description: "Galerie foto",
    isDynamic: true,
    dynamicKey: "galleries",
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
    description: "Informații de contact și formular",
  },
];

export default async function SitemapPage() {
  const [services, galleries] = await Promise.all([
    getServices(),
    getGalleries(),
  ]);

  // Build dynamic children
  const structureWithDynamic = siteStructure.map((section) => {
    if (section.isDynamic) {
      if (section.dynamicKey === "services") {
        return {
          ...section,
          children: services.map((s) => ({
            title: s.title,
            href: `/servicii/${s.slug}`,
          })),
        };
      }
      if (section.dynamicKey === "galleries") {
        return {
          ...section,
          children: galleries.slice(0, 5).map((g) => ({
            title: g.title,
            href: `/galerie/${g.slug}`,
          })),
        };
      }
    }
    return section;
  });

  return (
    <>
      {/* Hero */}
      <SectionHero
        title="Harta Site-ului"
        subtitle="Navigare completă prin toate paginile site-ului nostru"
      />

      {/* Sitemap Grid */}
      <Section background="white" spacing="xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {structureWithDynamic.map((section) => (
            <Card key={section.href} variant="default" padding="lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lagoon-100">
                  <section.icon className="h-5 w-5 text-lagoon-600" />
                </div>
                <div>
                  <Link
                    href={section.href}
                    className="font-heading text-lg font-semibold text-sand-900 hover:text-lagoon-600"
                  >
                    {section.title}
                  </Link>
                  {section.description && (
                    <p className="text-sm text-sand-500">{section.description}</p>
                  )}
                </div>
              </div>

              {section.children && section.children.length > 0 && (
                <ul className="space-y-2 border-t border-sand-100 pt-4">
                  {section.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="flex items-center text-sand-600 transition-colors hover:text-lagoon-600"
                      >
                        <ChevronRight className="mr-2 h-4 w-4 text-sand-400" />
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </Section>

      {/* Quick Links */}
      <Section background="sand" spacing="lg">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 font-heading text-2xl font-semibold text-sand-900">
            Link-uri Rapide
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-full bg-lagoon-500 px-6 py-2 text-white transition-colors hover:bg-lagoon-600"
            >
              Contactează-ne
            </Link>
            <Link
              href="/servicii"
              className="rounded-full bg-white px-6 py-2 text-sand-700 shadow-soft transition-colors hover:bg-sand-50"
            >
              Vezi Cursurile
            </Link>
            <Link
              href="/galerie"
              className="rounded-full bg-white px-6 py-2 text-sand-700 shadow-soft transition-colors hover:bg-sand-50"
            >
              Galerie Foto
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
