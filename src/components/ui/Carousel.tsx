"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

type EmblaApi = UseEmblaCarouselType[1];

export interface CarouselProps {
  children: ReactNode;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  slidesToScroll?: number;
  className?: string;
  slideClassName?: string;
}

// =============================================================================
// Component
// =============================================================================

export function Carousel({
  children,
  autoplay = false,
  autoplayInterval = 5000,
  loop = true,
  showArrows = true,
  showDots = true,
  slidesToScroll = 1,
  className,
  slideClassName,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    slidesToScroll,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((api: EmblaApi) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || !emblaApi) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else if (loop) {
        emblaApi.scrollTo(0);
      }
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [emblaApi, autoplay, autoplayInterval, loop]);

  return (
    <div className={cn("relative", className)}>
      {/* Main carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {Array.isArray(children) ? (
            children.map((child, index) => (
              <div
                key={index}
                className={cn("min-w-0 flex-shrink-0 flex-grow-0", slideClassName)}
              >
                {child}
              </div>
            ))
          ) : (
            <div className={cn("min-w-0 flex-shrink-0 flex-grow-0", slideClassName)}>
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Navigation arrows */}
      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!loop && !canScrollPrev}
            className={cn(
              "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-medium backdrop-blur-sm transition-all hover:bg-white hover:shadow-elevated disabled:opacity-50 disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2"
            )}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5 text-sand-700" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!loop && !canScrollNext}
            className={cn(
              "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-medium backdrop-blur-sm transition-all hover:bg-white hover:shadow-elevated disabled:opacity-50 disabled:cursor-not-allowed",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2"
            )}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5 text-sand-700" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {showDots && scrollSnaps.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2",
                index === selectedIndex
                  ? "w-6 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/75"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Carousel Slide Wrapper (for consistent sizing)
// =============================================================================

export interface CarouselSlideProps {
  children: ReactNode;
  className?: string;
}

export function CarouselSlide({ children, className }: CarouselSlideProps) {
  return (
    <div className={cn("w-full px-2", className)}>
      {children}
    </div>
  );
}
