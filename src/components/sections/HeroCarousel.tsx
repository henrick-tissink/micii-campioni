"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Carousel, CarouselSlide } from "@/components/ui/Carousel";
import { Container } from "@/components/ui/Container";
import { TreatedImage } from "@/components/ui/TreatedImage";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SIZES } from "@/lib/contentful/image";
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
  const [activeIndex, setActiveIndex] = useState(0);

  if (slides.length === 0) {
    return <HeroFallback />;
  }

  const totalSlides = slides.length;

  return (
    <section className="relative">
      <Carousel
        autoplay
        autoplayInterval={8000}
        loop
        showArrows={slides.length > 1}
        showDots={false}
        slideClassName="w-full"
        onSlideChange={setActiveIndex}
      >
        {slides.map((slide, index) => (
          <CarouselSlide key={slide.title} className="px-0">
            <div
              className="relative min-h-[560px] md:min-h-[680px] lg:min-h-[760px]"
              aria-hidden={index !== activeIndex}
              inert={index !== activeIndex || undefined}
            >
              {/* Background image */}
              {slide.backgroundImage && (
                <TreatedImage
                  src={slide.backgroundImage.url}
                  alt={slide.backgroundImage.title || slide.title}
                  fill
                  sizes={SIZES.hero}
                  className="object-cover"
                  priority={index === 0}
                />
              )}

              {/* Unified hero overlay */}
              <div className="hero-overlay" />

              {/* COR credential chip — pinned top-right */}
              <div className="absolute right-6 top-6 z-20 md:right-10 md:top-10">
                <Badge variant="credential">COR · 342215</Badge>
              </div>

              {/* Mono progress counter — pinned bottom-right */}
              {slides.length > 1 && (
                <div className="absolute bottom-6 right-6 z-20 font-mono text-[11px] tracking-[0.14em] text-white/70 md:bottom-10 md:right-10">
                  {String(index + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
                </div>
              )}

              {/* Content */}
              <Container className="relative z-10 flex h-full min-h-[560px] items-center md:min-h-[680px] lg:min-h-[760px]">
                <motion.div
                  className="max-w-3xl py-20"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                >
                  {slide.badge && (
                    <motion.span
                      className="mb-6 inline-block rounded-full border border-white/20 bg-white/8 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur"
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      {slide.badge}
                    </motion.span>
                  )}
                  <motion.h1
                    className="font-heading font-bold text-white"
                    style={{
                      fontSize: "var(--text-hero)",
                      letterSpacing: "var(--tracking-display)",
                      lineHeight: 1.02,
                    }}
                    variants={{
                      hidden: { opacity: 0, y: 28 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                      },
                    }}
                  >
                    {slide.title}
                  </motion.h1>
                  {slide.subtitle && (
                    <motion.p
                      className="mt-6 max-w-xl text-lg text-lagoon-100 md:text-xl"
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      {slide.subtitle}
                    </motion.p>
                  )}
                  {slide.ctaText && slide.ctaLink && (
                    <motion.div
                      className="mt-10 flex flex-wrap items-center gap-4"
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                    >
                      <MagneticButton strength={0.15}>
                        <Button href={slide.ctaLink} size="lg">
                          {slide.ctaText} &nbsp;→
                        </Button>
                      </MagneticButton>
                      <Button href="/servicii" variant="outline-on-dark" size="lg">
                        Vezi cursurile
                      </Button>
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
    <section className="relative min-h-[560px] bg-lagoon-foundation md:min-h-[680px]">
      <div className="hero-overlay" />
      <div className="absolute right-6 top-6 z-20 md:right-10 md:top-10">
        <Badge variant="credential">COR · 342215</Badge>
      </div>
      <Container className="relative z-10 flex h-full min-h-[560px] items-center md:min-h-[680px]">
        <div className="max-w-3xl py-20">
          <span className="mb-6 inline-block rounded-full border border-white/20 bg-white/8 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85">
            Primul club · din 2001
          </span>
          <h1
            className="font-heading font-bold text-white"
            style={{
              fontSize: "var(--text-hero)",
              letterSpacing: "var(--tracking-display)",
              lineHeight: 1.02,
            }}
          >
            Educație acvatică, de 25 de ani.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-lagoon-100 md:text-xl">
            Metoda Sultana — singura metodologie românească acreditată pentru educație acvatică timpurie.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/contact" size="lg">
              Programează o vizită &nbsp;→
            </Button>
            <Button href="/servicii" variant="outline-on-dark" size="lg">
              Vezi cursurile
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
