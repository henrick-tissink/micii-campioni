import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Container, type ContainerSize } from "./Container";

// =============================================================================
// Types
// =============================================================================

export type SectionSpacing = "none" | "sm" | "md" | "lg" | "xl";
export type SectionBackground = "white" | "sand" | "lagoon" | "gradient";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  background?: SectionBackground;
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
};

const backgroundStyles: Record<SectionBackground, string> = {
  white: "bg-white dark:bg-night-900",
  sand: "bg-sand-50 dark:bg-night-800",
  lagoon: "bg-lagoon-50 dark:bg-night-800/50",
  gradient: "bg-gradient-to-b from-white to-sand-50 dark:from-night-900 dark:to-night-800",
};

// =============================================================================
// Component
// =============================================================================

export function Section({
  spacing = "lg",
  background = "white",
  containerSize = "xl",
  noContainer = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        spacingStyles[spacing],
        backgroundStyles[background],
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
        <span className={cn(
          "mb-2 inline-block font-heading text-sm font-semibold uppercase tracking-wider",
          accent === "coral" ? "text-coral-600 dark:text-coral-400" : "text-lagoon-600 dark:text-lagoon-400"
        )}>
          {subtitle}
        </span>
      )}
      <h2 className="font-heading text-3xl font-bold text-sand-900 dark:text-white md:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg text-sand-600 dark:text-sand-400",
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
