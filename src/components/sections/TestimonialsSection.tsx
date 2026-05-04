"use client";

import { Quote } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Carousel, CarouselSlide } from "@/components/ui/Carousel";
import type { Testimonial } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  description?: string;
}

// =============================================================================
// Component
// =============================================================================

export function TestimonialsSection({
  testimonials,
  title = "Ce Spun Părinții",
  subtitle = "Testimoniale",
  description = "Descoperă experiențele familiilor care au ales Micii Campioni pentru educația acvatică a copiilor lor.",
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <Section background="white" spacing="xl">
      <SectionHeader title={title} subtitle={subtitle} description={description} accent="coral" />

      {testimonials.length <= 3 ? (
        // Grid layout for few testimonials
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.authorName} testimonial={testimonial} />
          ))}
        </div>
      ) : (
        // Carousel for many testimonials
        <Carousel
          loop
          showArrows
          showDots
          autoplay
          autoplayInterval={7000}
          slideClassName="w-full sm:w-1/2 lg:w-1/3 px-3"
        >
          {testimonials.map((testimonial) => (
            <CarouselSlide key={testimonial.authorName}>
              <TestimonialCard testimonial={testimonial} />
            </CarouselSlide>
          ))}
        </Carousel>
      )}
    </Section>
  );
}

// =============================================================================
// Testimonial Card
// =============================================================================

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card variant="elevated" padding="lg" className="h-full">
      {/* Quote icon */}
      <Quote className="mb-4 h-8 w-8 text-lagoon-200" />

      {/* Quote text */}
      <blockquote className="mb-6 text-sand-700">
        <p className="leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4 border-t border-sand-100 pt-4">
        <Avatar
          src={testimonial.photo?.url}
          alt={testimonial.authorName}
          size="lg"
        />
        <div>
          <p className="font-semibold text-sand-900">{testimonial.authorName}</p>
          {testimonial.authorTitle && (
            <p className="text-sm text-sand-500">{testimonial.authorTitle}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

// =============================================================================
// Featured Testimonial (for homepage highlight)
// =============================================================================

export interface FeaturedTestimonialProps {
  testimonial: Testimonial;
}

export function FeaturedTestimonial({ testimonial }: FeaturedTestimonialProps) {
  return (
    <Section background="foundation" spacing="lg">
      <div className="mx-auto max-w-4xl text-center">
        <Quote className="mx-auto mb-6 h-12 w-12 text-lagoon-300" />
        <blockquote className="font-heading text-2xl font-medium text-white md:text-3xl">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Avatar
            src={testimonial.photo?.url}
            alt={testimonial.authorName}
            size="lg"
            className="ring-4 ring-lagoon-400/50"
          />
          <div className="text-left">
            <p className="font-semibold text-white">{testimonial.authorName}</p>
            {testimonial.authorTitle && (
              <p className="text-lagoon-200">{testimonial.authorTitle}</p>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
