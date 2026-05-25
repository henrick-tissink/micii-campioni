import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { PressStrip } from "@/components/sections/PressStrip";
import { StatsBand } from "@/components/sections/StatsBand";
import { MetodaSection } from "@/components/sections/MetodaSection";
import { AgePicker } from "@/components/sections/AgePicker";
import { FacilityStrip } from "@/components/sections/FacilityStrip";
import { HistoryTimeline } from "@/components/sections/HistoryTimeline";
import { FounderSection } from "@/components/sections/FounderSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { AnimatedSection } from "./HomePageSections";

// Static reviews for structured data (mirrors the testimonials rendered on-page).
const REVIEWS = [
  { author: "Simona Bălănescu", quote: "Înotul timpuriu crește încrederea în sine și independența copilului." },
  { author: "Adela și Dragoș Stan", quote: "Metoda a pus bazele psihomotorii ale unor performanțe remarcabile." },
  { author: "Sanda Ladoși", quote: "Mișcarea încă de la o vârstă fragedă nu poate să facă decât bine." },
  { author: "Andreea P.", quote: "E calm, e atent, e prezent. Apa devine prietena lui." },
];

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

  const reviewsJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#organization`,
    name: "Clubul Micii Campioni",
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewBody: r.quote,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: REVIEWS.length.toString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
      />

      <HeroCarousel />
      <PressStrip />
      <StatsBand />

      <AnimatedSection>
        <MetodaSection />
      </AnimatedSection>

      <AnimatedSection>
        <AgePicker />
      </AnimatedSection>

      <AnimatedSection>
        <FacilityStrip />
      </AnimatedSection>

      <HistoryTimeline />

      <AnimatedSection>
        <FounderSection />
      </AnimatedSection>

      <AnimatedSection>
        <TestimonialsSection />
      </AnimatedSection>

      <AnimatedSection>
        <FaqSection />
      </AnimatedSection>

      <ClosingCta />
    </>
  );
}
