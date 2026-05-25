import { type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

// =============================================================================
// Types
// =============================================================================

export interface PageHeroProps {
  variant?: "photo" | "cream" | "dark";
  image?: string;
  imageAlt?: string;
  eyebrow: ReactNode;
  no?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  meta?: ReactNode;
  /** Minimum hero height in px (desktop). */
  height?: number;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Editorial header for inner pages. Pulls under the (cream-blur) header.
 * Variants: `photo` (full-bleed image), `dark` (lagoon), `cream`.
 */
export function PageHero({
  variant = "photo",
  image,
  imageAlt = "",
  eyebrow,
  no,
  title,
  sub,
  meta,
  height = 600,
}: PageHeroProps) {
  const isDark = variant === "photo" || variant === "dark";

  return (
    <section
      className={cn(
        "relative -mt-16 overflow-hidden pt-16 lg:-mt-20 lg:pt-20",
        variant === "cream"
          ? "bg-cream dark:bg-night-800"
          : "bg-lagoon-foundation text-white"
      )}
      style={{ minHeight: height }}
    >
      {/* Photo background */}
      {variant === "photo" && image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "saturate(1.05) contrast(1.05)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, rgba(7,51,47,0.94) 0%, rgba(7,51,47,0.70) 38%, rgba(7,51,47,0.30) 64%, rgba(7,51,47,0.55) 100%)",
            }}
          />
        </>
      )}

      {/* Vertical breadcrumb rail */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute left-6 top-1/2 z-10 hidden origin-left -translate-y-1/2 -rotate-90 items-center gap-4 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.14em] xl:flex",
          isDark ? "text-white/50" : "text-sand-500 dark:text-sand-400"
        )}
      >
        <span className="h-px w-9 bg-current opacity-55" />
        Micii Campioni · 2026
      </div>

      <Container
        className="relative z-10 flex items-end pb-20 pt-[120px]"
        style={{ minHeight: height }}
      >
        <div className="max-w-[920px]">
          {no && (
            <div
              className={cn(
                "display italic leading-none",
                isDark ? "text-lagoon-accent" : "text-coral-refined"
              )}
              style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
            >
              {no}
            </div>
          )}
          <Eyebrow color={isDark ? "cream" : "lagoon"} className={no ? "mt-4" : undefined}>
            {eyebrow}
          </Eyebrow>
          <h1
            className={cn(
              "display mt-4 text-balance",
              isDark ? "text-white" : "text-sand-900 dark:text-white"
            )}
            style={{
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 1.08,
              textShadow: isDark ? "0 2px 24px rgba(0,0,0,0.2)" : undefined,
            }}
          >
            {title}
          </h1>
          {sub && (
            <p
              className={cn(
                "mt-9 max-w-[620px] text-xl leading-relaxed",
                isDark ? "text-[rgba(229,250,247,0.85)]" : "text-sand-700 dark:text-sand-300"
              )}
            >
              {sub}
            </p>
          )}
          {meta && <div className="mt-9 flex flex-wrap items-center gap-4">{meta}</div>}
        </div>
      </Container>
    </section>
  );
}
