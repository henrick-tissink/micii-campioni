import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Home, Info, Lightbulb, Building2, Briefcase, Images, Mail } from "lucide-react";
import { getServices, getGalleries } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Harta Site-ului",
  description:
    "Navigare completă prin site-ul Clubului Micii Campioni - explorează toate paginile, cursurile de înot și informațiile despre educația acvatică pentru copii.",
  alternates: { canonical: "/harta-site" },
  openGraph: {
    title: "Harta Site-ului | Micii Campioni",
    description:
      "Navigare completă prin site-ul Clubului Micii Campioni - explorează toate paginile, cursurile de înot și informațiile despre educația acvatică pentru copii.",
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
        <h2 className="mb-8 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
          Structura Site-ului
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {structureWithDynamic.map((section) => (
            <Card key={section.href} variant="default" padding="cinematic" className="h-full">
              <section.icon
                className="mb-4 h-8 w-8 text-lagoon-foundation"
                aria-hidden="true"
              />
              <h3 className="font-heading text-xl font-semibold text-sand-900 tracking-[var(--tracking-section)]">
                <Link
                  href={section.href}
                  className="transition-colors hover:text-lagoon-foundation"
                >
                  {section.title}
                </Link>
              </h3>
              {section.description && (
                <p className="mt-1 text-sand-600">{section.description}</p>
              )}

              {section.children && section.children.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-sand-200 pt-4">
                  {section.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="flex items-center text-sand-600 transition-colors hover:text-lagoon-foundation"
                      >
                        <ChevronRight className="mr-2 h-4 w-4 text-lagoon-foundation" aria-hidden="true" />
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

      {/* Quick Links — mono eyebrow + Button-component pills */}
      <Section background="sand" spacing="lg">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation dark:text-lagoon-accent">
            LINK-URI RAPIDE
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">Contactează-ne</Button>
            <Button href="/servicii" variant="outline">Vezi Cursurile</Button>
            <Button href="/galerie" variant="outline">Galerie Foto</Button>
          </div>
        </div>
      </Section>
    </>
  );
}
