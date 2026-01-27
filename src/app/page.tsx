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

      {/* About Section */}
      <AboutSection />

      {/* Services Section */}
      <ServicesSection services={services} />

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={testimonials} />

      {/* CTA Section */}
      <CTASection
        title="Pregătit să începi aventura acvatică?"
        description="Înscrie-ți copilul astăzi și oferă-i șansa de a deveni un mic campion al apei. Prima lecție este gratuită!"
        primaryButton={{ label: "Programează o lecție gratuită", href: "/contact" }}
        secondaryButton={{ label: "Vezi Programul", href: "/servicii" }}
        variant="gradient"
      />
    </>
  );
}
