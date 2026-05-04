import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

export type ButtonVariant = "primary" | "outline" | "outline-on-dark" | "ghost" | "credential";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

// =============================================================================
// Styles
// =============================================================================

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-heading font-semibold leading-none rounded-full border-2 border-transparent cursor-pointer transition-all duration-300 ease-out active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-coral-refined text-white hover:-translate-y-0.5 hover:shadow-cinematic focus-visible:ring-2 focus-visible:ring-coral-refined focus-visible:ring-offset-2 dark:focus-visible:ring-offset-night-900",
  outline:
    "bg-transparent border-lagoon-foundation text-lagoon-foundation hover:bg-lagoon-50 focus-visible:ring-2 focus-visible:ring-lagoon-foundation focus-visible:ring-offset-2 dark:border-lagoon-accent dark:text-lagoon-accent dark:hover:bg-night-800 dark:focus-visible:ring-offset-night-900",
  "outline-on-dark":
    "bg-transparent border-white/60 text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-night-900",
  ghost:
    "bg-transparent text-lagoon-foundation hover:bg-lagoon-50 focus-visible:ring-2 focus-visible:ring-lagoon-foundation focus-visible:ring-offset-2 dark:text-lagoon-accent dark:hover:bg-night-800",
  credential:
    "bg-transparent border-amber-credential/40 text-amber-credential font-mono uppercase tracking-[0.10em] text-xs hover:bg-amber-credential/10 cursor-default",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-9 py-4 text-[15px]",
};

const credentialSizeOverride: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-[10px]",
  md: "px-3.5 py-1.5 text-[11px]",
  lg: "px-4 py-2 text-xs",
};

// =============================================================================
// Component
// =============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      href,
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isCredential = variant === "credential";
    const classes = cn(
      baseStyles,
      variantStyles[variant],
      isCredential ? credentialSizeOverride[size] : sizeStyles[size],
      fullWidth && "w-full",
      isLoading && "relative text-transparent",
      className
    );

    const content = (
      <>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          </span>
        )}
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </>
    );

    if (href && !disabled) {
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {content}
          </a>
        );
      }

      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
