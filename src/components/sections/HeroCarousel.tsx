"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Carousel, CarouselSlide } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/motion/MagneticButton";
import type { CarouselSlide as CarouselSlideType } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface HeroCarouselProps {
  slides: CarouselSlideType[];
}

// =============================================================================
// Component
// =============================================================================

export function HeroCarousel({ slides }: HeroCarouselProps) {
  if (slides.length === 0) {
    return <HeroFallback />;
  }

  return (
    <section className="relative">
      <Carousel
        autoplay
        autoplayInterval={6000}
        loop
        showArrows={slides.length > 1}
        showDots={slides.length > 1}
        slideClassName="w-full"
      >
        {slides.map((slide, index) => (
          <CarouselSlide key={slide.title} className="px-0">
            <div className="relative min-h-[500px] md:min-h-[600px] lg:min-h-[700px]">
              {/* Background image */}
              {slide.backgroundImage && (
                <Image
                  src={slide.backgroundImage.url}
                  alt={slide.backgroundImage.title || slide.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-sand-900/80 via-sand-900/50 to-transparent" />

              {/* Content */}
              <Container className="relative z-10 flex h-full min-h-[500px] items-center md:min-h-[600px] lg:min-h-[700px]">
                <motion.div
                  className="max-w-2xl py-16"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
                    },
                  }}
                >
                  {slide.badge && (
                    <motion.span
                      className="mb-4 inline-block rounded-full bg-lagoon-500/20 px-4 py-1.5 text-sm font-semibold text-lagoon-300"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      {slide.badge}
                    </motion.span>
                  )}
                  <motion.h1
                    className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    {slide.title}
                  </motion.h1>
                  {slide.subtitle && (
                    <motion.p
                      className="mt-6 text-lg text-sand-200 md:text-xl"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <motion.div
                      className="mt-8 flex flex-wrap gap-4"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <MagneticButton>
                        <Button href={slide.ctaLink} size="lg">
                          {slide.ctaText}
                        </Button>
                      </MagneticButton>
                    </motion.div>
                  )}
                </motion.div>
              </Container>
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </section>
  );
}

// =============================================================================
// Fallback Hero (when no slides)
// =============================================================================

function HeroFallback() {
  return (
    <section className="relative min-h-[500px] bg-gradient-to-br from-lagoon-600 to-lagoon-800 md:min-h-[600px]">
      {/* Decorative waves */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M0 400C240 300 480 500 720 400C960 300 1200 500 1440 400V800H0V400Z"
            fill="currentColor"
          />
          <path
            d="M0 500C240 400 480 600 720 500C960 400 1200 600 1440 500V800H0V500Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      </div>

      <Container className="relative z-10 flex h-full min-h-[500px] items-center md:min-h-[600px]">
        <div className="max-w-2xl py-16">
          <span className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white">
            Primul Club de Educație Acvatică din România
          </span>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Învățăm copiii să înoate cu bucurie și încredere
          </h1>
          <p className="mt-6 text-lg text-lagoon-100 md:text-xl">
            De peste 15 ani formăm micii campioni ai apei, cu metode certificate
            și instructori dedicați.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/servicii" size="lg">
              Descoperă Cursurile
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/60 text-white hover:bg-white/20"
            >
              Contactează-ne
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
