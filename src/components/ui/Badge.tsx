import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

export type BadgeVariant =
  | "default"
  | "lagoon"
  | "coral"
  | "sand"
  | "success"
  | "warning"
  | "error"
  | "credential";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

// =============================================================================
// Styles
// =============================================================================

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-full";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-sand-100 text-sand-700",
  lagoon: "bg-lagoon-100 text-lagoon-700",
  coral: "bg-coral-100 text-coral-700",
  sand: "bg-sand-200 text-sand-800",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  error: "bg-red-100 text-red-700",
  credential:
    "bg-transparent border border-amber-credential/40 text-amber-credential font-mono uppercase tracking-[0.10em]",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

// `credential` ignores the size scale and uses its own tighter sizing
const credentialSizeStyles: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-[10px]",
  md: "px-3 py-1 text-[11px]",
  lg: "px-3.5 py-1.5 text-xs",
};

// =============================================================================
// Component
// =============================================================================

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: BadgeProps) {
  const sizeClass =
    variant === "credential" ? credentialSizeStyles[size] : sizeStyles[size];

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeClass, className)}
      {...props}
    >
      {children}
    </span>
  );
}
