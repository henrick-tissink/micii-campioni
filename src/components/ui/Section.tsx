import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container, type ContainerSize } from "./Container";

// =============================================================================
// Types
// =============================================================================

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl" | "loose";
export type SectionBackground =
  | "white"
  | "sand"
  | "cream"
  | "foundation"
  | "deep"
  | "gradient";
export type SectionTexture = "grain";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  background?: SectionBackground;
  texture?: SectionTexture;
  containerSize?: ContainerSize;
  noContainer?: boolean;
  children: ReactNode;
}

// =============================================================================
// Styles
// =============================================================================

const spacingStyles: Record<SectionSpacing, string> = {
  none: "",
  sm: "py-8 md:py-12",
  md: "py-10 md:py-14",
  lg: "py-12 md:py-16",
  xl: "py-16 md:py-24",
  loose: "py-24 md:py-36",
};

const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-white dark:bg-night-900",
  sand: "bg-sand-50 dark:bg-night-800",
  cream: "bg-cream dark:bg-night-800",
  foundation: "bg-lagoon-foundation text-white dark:bg-lagoon-foundation",
  deep: "bg-lagoon-deep text-white dark:bg-lagoon-deep",
  gradient:
    "bg-gradient-to-b from-white to-sand-50 dark:from-night-900 dark:to-night-800",
};

const textureStyles: Record<SectionTexture, string> = {
  grain: "texture-grain",
};

// =============================================================================
// Component
// =============================================================================

export function Section({
  spacing = "lg",
  background = "white",
  texture,
  containerSize = "xl",
  noContainer = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        spacingStyles[spacing],
        backgroundStyles[background],
        texture && textureStyles[texture],
        className
      )}
      {...props}
    >
      {noContainer ? (
        children
      ) : (
        <Container size={containerSize}>{children}</Container>
      )}
    </section>
  );
}

// =============================================================================
// Section Subcomponents
// =============================================================================

interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  align?: "left" | "center";
  accent?: "lagoon" | "coral";
  children?: ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  align = "center",
  accent = "lagoon",
  className,
  children,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
      {...props}
    >
      {subtitle && (
        <p
          className={cn(
            "mb-3 font-mono text-xs font-semibold uppercase tracking-[var(--tracking-mono)]",
            accent === "coral"
              ? "text-coral-refined dark:text-coral-400"
              : "text-lagoon-foundation dark:text-lagoon-accent"
          )}
        >
          {subtitle}
        </p>
      )}
      <h2
        className="font-heading font-semibold text-sand-900 dark:text-white tracking-[var(--tracking-section)]"
        style={{ fontSize: "var(--text-section)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed text-sand-600 dark:text-sand-400",
            align === "center" && "mx-auto max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
