import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

export type EyebrowColor = "lagoon" | "coral" | "amber" | "cream";

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  color?: EyebrowColor;
  children: ReactNode;
}

// =============================================================================
// Styles
// =============================================================================

const colorStyles: Record<EyebrowColor, string> = {
  lagoon: "text-lagoon-foundation dark:text-lagoon-accent",
  coral: "text-coral-refined dark:text-coral-400",
  amber: "text-amber-credential",
  cream: "text-white/70",
};

// =============================================================================
// Component
// =============================================================================

/**
 * Small mono uppercase label prefixed by an 18px hairline rule — the editorial
 * eyebrow used above section headings.
 */
export function Eyebrow({
  color = "lagoon",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] font-medium uppercase tracking-[var(--tracking-mono)]",
        colorStyles[color],
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-[18px] bg-current opacity-50"
      />
      {children}
    </p>
  );
}
