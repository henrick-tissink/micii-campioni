import {
  getCarouselSlides,
  getServices,
  getTestimonials,
} from "@/lib/contentful/queries";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { CTASection } from "@/components/sections/CTASection";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { AnimatedSection } from "./HomePageSections";

export default async function HomePage() {
  const [slides, services, testimonials] = await Promise.all([
    getCarouselSlides(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel slides={slides} />

      {/* Stats Section */}
      <StatsSection variant="lagoon" />
      <WaveDivider color="white" />

      {/* About Section */}
      <AnimatedSection>
        <AboutSection />
      </AnimatedSection>
      <WaveDivider color="sand" />

      {/* Services Section */}
      <AnimatedSection delay={100}>
        <ServicesSection services={services} />
      </AnimatedSection>
      <WaveDivider color="white" />

      {/* Testimonials Section */}
      <AnimatedSection delay={100}>
        <TestimonialsSection testimonials={testimonials} />
      </AnimatedSection>

      {/* CTA Section */}
      <CTASection
        title="Pregătit să începi aventura acvatică?"
        description="Înscrie-ți copilul astăzi și oferă-i șansa de a deveni un mic campion al apei."
        primaryButton={{ label: "Programeaza o vizită", href: "/contact" }}
        secondaryButton={{ label: "Vezi Programul", href: "/servicii" }}
        variant="gradient"
      />
    </>
  );
}
