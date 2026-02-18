"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { ContentfulImage } from "@/types/contentful";

// =============================================================================
// Types
// =============================================================================

export interface ImageGalleryProps {
  images: ContentfulImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

// =============================================================================
// Gallery Component
// =============================================================================

export function ImageGallery({
  images,
  columns = 3,
  className,
}: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <>
      <div className={cn("grid gap-4", gridCols[columns], className)}>
        {images.map((image, index) => (
          <button
            key={`${image.url}-${index}`}
            onClick={() => setLightboxIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-sand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2"
          >
            <Image
              src={image.url}
              alt={image.description || image.title || `Fotografie din galerie ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-lagoon-900/0 transition-colors duration-300 group-hover:bg-lagoon-900/30" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full bg-white/90 p-3">
                <ZoomIn className="h-6 w-6 text-lagoon-600" />
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}

// =============================================================================
// Lightbox Component
// =============================================================================

interface LightboxProps {
  images: ContentfulImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null;
  const currentImage = currentIndex !== null ? images[currentIndex] : null;

  // Navigation handlers
  const goToPrevious = useCallback(() => {
    if (currentIndex === null) return;
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const goToNext = useCallback(() => {
    if (currentIndex === null) return;
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goToPrevious, goToNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Galerie imagini"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Închide"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation - Previous */}
      {images.length > 1 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Imaginea anterioară"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {/* Navigation - Next */}
      {images.length > 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Imaginea următoare"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Image container */}
      <div className="relative max-h-[85vh] max-w-[90vw]">
        <Image
          src={currentImage.url}
          alt={currentImage.description || currentImage.title || "Fotografie mărită"}
          width={currentImage.width}
          height={currentImage.height}
          className="max-h-[85vh] w-auto object-contain"
          priority
        />
      </div>

      {/* Counter and caption */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
        {images.length > 1 && (
          <span className="mb-2 block text-sm text-white/70">
            {(currentIndex ?? 0) + 1} / {images.length}
          </span>
        )}
        {currentImage.title && (
          <p className="text-white">{currentImage.title}</p>
        )}
        {currentImage.description && (
          <p className="mt-1 text-sm text-white/70">
            {currentImage.description}
          </p>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && images.length <= 10 && (
        <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2">
          {images.map((img, index) => (
            <button
              key={`thumb-${index}`}
              onClick={() => onNavigate(index)}
              className={cn(
                "relative h-12 w-12 overflow-hidden rounded transition-all",
                index === currentIndex
                  ? "ring-2 ring-white"
                  : "opacity-50 hover:opacity-100"
              )}
            >
              <Image
                src={img.url}
                alt={`Previzualizare ${index + 1}`}
                fill
                className="object-cover"
                sizes="48px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// Featured Gallery Card (for homepage/listings)
// =============================================================================

interface GalleryCardProps {
  title: string;
  coverImage: ContentfulImage;
  imageCount: number;
  href: string;
  date?: string;
  className?: string;
}

export function GalleryCard({
  title,
  coverImage,
  imageCount,
  href,
  date,
  className,
}: GalleryCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-sand-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2",
        className
      )}
    >
      <Image
        src={coverImage.url}
        alt={coverImage.title || title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        {date && (
          <span className="mb-2 block text-sm text-white/70">{date}</span>
        )}
        <h3 className="font-heading text-xl font-semibold text-white">
          {title}
        </h3>
        <span className="mt-2 inline-block text-sm text-white/70">
          {imageCount} fotografii
        </span>
      </div>
    </a>
  );
}
