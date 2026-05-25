import { type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "./Eyebrow";

// =============================================================================
// Types
// =============================================================================

export interface SectionHeadProps {
  /** Giant italic anchor numeral (e.g. "II"). */
  no?: ReactNode;
  eyebrow: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  /** "dark" = dark text on light bg; "light" = white text on dark bg. */
  color?: "dark" | "light";
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Editorial section header: a large italic serif anchor numeral beside an
 * eyebrow + display heading + optional sub-paragraph.
 */
export function SectionHead({
  no,
  eyebrow,
  title,
  sub,
  color = "dark",
  className,
}: SectionHeadProps) {
  const isDark = color === "dark";

  return (
    <div
      className={cn(
        "mb-14 grid items-baseline gap-x-8 gap-y-4",
        no ? "md:grid-cols-[auto_1fr]" : "grid-cols-1",
        className
      )}
    >
      {no && (
        <div
          aria-hidden="true"
          className={cn(
            "display italic leading-none",
            isDark
              ? "text-coral-refined dark:text-coral-400"
              : "text-lagoon-accent"
          )}
          style={{
            fontSize: "clamp(48px, 7vw, 88px)",
            fontVariationSettings: '"opsz" 72',
          }}
        >
          {no}
        </div>
      )}
      <div>
        <Eyebrow color={isDark ? "lagoon" : "cream"}>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "display mt-3.5 text-balance",
            isDark ? "text-sand-900 dark:text-white" : "text-white"
          )}
          style={{ fontSize: "clamp(34px, 4.5vw, 60px)", lineHeight: 1.1 }}
        >
          {title}
        </h2>
        {sub && (
          <p
            className={cn(
              "mt-8 max-w-2xl text-lg leading-relaxed",
              isDark ? "text-sand-600 dark:text-sand-300" : "text-white/75"
            )}
          >
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}
