import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
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
  "inline-flex items-center justify-center gap-2 font-heading font-semibold leading-none rounded-full border-2 border-transparent cursor-pointer transition-all duration-150 ease-out active:translate-y-0 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-lagoon-500 text-white hover:bg-lagoon-600 hover:-translate-y-0.5 hover:shadow-lagoon focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2 dark:bg-night-glow dark:hover:bg-night-bright dark:hover:shadow-[0_0_20px_rgba(32,178,170,0.4)] dark:focus-visible:ring-offset-night-900",
  secondary:
    "bg-coral-500 text-white hover:bg-coral-600 hover:-translate-y-0.5 hover:shadow-coral focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-night-900",
  outline:
    "bg-transparent border-lagoon-500 text-lagoon-600 hover:bg-lagoon-100 focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2 dark:border-lagoon-400 dark:text-lagoon-400 dark:hover:bg-night-800 dark:hover:text-lagoon-300 dark:focus-visible:ring-offset-night-900",
  ghost:
    "bg-transparent text-lagoon-600 hover:bg-lagoon-50 focus-visible:ring-2 focus-visible:ring-lagoon-500 focus-visible:ring-offset-2 dark:text-lagoon-400 dark:hover:bg-night-800 dark:hover:text-lagoon-300 dark:focus-visible:ring-offset-night-900",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
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
    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
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

    // Render as link if href is provided
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
