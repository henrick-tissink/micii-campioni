import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Target } from "lucide-react";
import { getPageBySlug, getPartners } from "@/lib/contentful/queries";
import { SectionHero } from "@/components/layout/PageLayout";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { PartnersStrip } from "@/components/content/PartnersStrip";
import { CTASection } from "@/components/sections/CTASection";
import { MethodologyPrinciples } from "@/components/sections/MethodologyPrinciples";
import { AgeGroups } from "@/components/sections/AgeGroups";
import { Badge } from "@/components/ui/Badge";

// NOTE: The Contentful body (`page.content`) for /concept is intentionally
// NOT rendered. The methodology principles and age groups now live as
// hardcoded structured data in MethodologyPrinciples.tsx and AgeGroups.tsx.
// The CMS body field can stay populated in Contentful — it just won't
// appear on the page. Future cleanup can clear it via the Contentful UI.

export const metadata: Metadata = {
  title: "Conceptul și Metodologia Noastră",
  description:
    "Descoperă conceptul și metodologia Clubului Micii Campioni - educație acvatică bazată pe încredere, siguranță și bucurie. Partener FAAEL internațional.",
  alternates: { canonical: "/concept" },
  openGraph: {
    title: "Conceptul și Metodologia Noastră | Micii Campioni",
    description:
      "Descoperă conceptul și metodologia Clubului Micii Campioni - educație acvatică bazată pe încredere, siguranță și bucurie. Partener FAAEL internațional.",
  },
};

// Section navigation cards (sub-pages under /concept)
const sectionCards = [
  {
    slug: "micii-campioni-si-faael",
    title: "Micii Campioni și FAAEL",
    description:
      "Parteneriatul nostru cu Federația Internațională de Activități Acvatice",
    icon: Globe,
  },
  {
    slug: "viziune-si-obiective",
    title: "Viziune și Obiective",
    description: "Misiunea și valorile care ne ghidează activitatea",
    icon: Target,
  },
];

export default async function ConceptPage() {
  const [page, partners] = await Promise.all([
    getPageBySlug("concept"),
    getPartners(),
  ]);

  // International endorsements/partners only (filter out commercial sponsors)
  const endorsements = partners.filter(
    (p) => p.partnerType === "endorsement" || p.partnerType === "partner",
  );

  return (
    <>
      {/* 1. Hero — cascade-refreshed via M5a.1 */}
      <SectionHero
        title="Conceptul Nostru"
        subtitle="Educație acvatică bazată pe încredere, siguranță și bucurie - fundamentele metodei noastre recunoscute internațional."
        heroImage={page?.heroImage}
      />

      {/* 2. Editorial intro + Principles — continuous block on white, 640px column */}
      <Section background="white" spacing="xl">
        <div className="mx-auto max-w-[640px]">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[var(--tracking-mono)] text-lagoon-foundation">
            Principii fundamentale
          </p>
          <h2
            className="mt-3 font-heading font-semibold text-sand-900 tracking-[var(--tracking-section)]"
            style={{ fontSize: "var(--text-section)" }}
          >
            Metoda Sultana
          </h2>
          <p className="mt-6 text-base leading-relaxed text-sand-700">
            Conceptul nostru reprezintă o interferență unică între standardele
            europene de educație acvatică promovate de FAAEL (Federația Franceză
            de Activități Acvatice) și experiența de peste 40 de ani a
            specialiștilor noștri. Suntem primul centru de educație acvatică din
            România și oferim o metodă inovatoare de fortificare a organismului
            nou-născutului și copilului, bazată pe cercetări științifice și o
            practică recunoscută internațional.
          </p>
          <MethodologyPrinciples className="mt-12" />
        </div>
      </Section>

      {/* 3. Age groups — cream, full-width 4-col journey */}
      <AgeGroups />

      {/* 3.5. COR credential block — editorial framing per spec §5.5 */}
      <Section background="foundation" spacing="lg" texture="grain">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="credential" size="lg" className="bg-amber-credential/10">
            COR · 342215
          </Badge>
          <p
            className="mt-6 font-heading font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.4)]"
            style={{
              fontSize: "var(--text-section)",
              letterSpacing: "var(--tracking-section)",
              lineHeight: 1.2,
            }}
          >
            Singura metodologie românească acreditată pentru educație acvatică timpurie.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-lagoon-100/85">
            Codul Ocupațional Românesc 342215 — instructor educație acvatică pentru bebeluși și copii — recunoaște Metoda Sultana ca standard profesional în România.
          </p>
        </div>
      </Section>

      {/* 4. Partners strip + sub-page nav — combined section on white */}
      <Section background="white" spacing="xl">
        {endorsements.length > 0 && (
          <PartnersStrip
            partners={endorsements}
            title="Recunoaștere internațională"
          />
        )}
        <div
          className={`mx-auto grid max-w-3xl gap-6 sm:grid-cols-2 ${endorsements.length > 0 ? "mt-16" : ""}`}
        >
          {sectionCards.map((card) => (
            <Link
              key={card.slug}
              href={`/concept/${card.slug}`}
              className="group block"
            >
              <Card
                variant="default"
                padding="cinematic"
                className="h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-cinematic"
              >
                <card.icon
                  className="mb-4 h-8 w-8 text-lagoon-foundation"
                  aria-hidden="true"
                />
                <h3 className="font-heading text-xl font-semibold text-sand-900 tracking-[var(--tracking-section)]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sand-600">{card.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium text-lagoon-foundation transition-colors group-hover:text-lagoon-deep">
                  Citește mai mult
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* 5. CTA — foundation+grain gradient */}
      <CTASection
        title="Aplică metoda în practică"
        description="Descoperă programele noastre de educație acvatică, structurate pe etape de vârstă."
        primaryButton={{ label: "Vezi cursurile", href: "/servicii" }}
        secondaryButton={{ label: "Contactează-ne", href: "/contact" }}
      />
    </>
  );
}
