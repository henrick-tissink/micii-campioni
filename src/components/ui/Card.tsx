import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outline" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
  href?: string;
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    aspectRatio?: "square" | "video" | "wide" | "auto";
  };
  hoverEffect?: boolean;
}

// =============================================================================
// Styles
// =============================================================================

const baseStyles = "rounded-2xl overflow-hidden transition-all duration-200";

const variantStyles = {
  default: "bg-white shadow-soft dark:bg-night-800 dark:shadow-lg",
  elevated: "bg-white shadow-medium dark:bg-night-700 dark:shadow-xl",
  outline: "bg-white border border-sand-200 dark:bg-night-800 dark:border-night-600",
  ghost: "bg-transparent",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const aspectRatioStyles = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
  auto: "",
};

const hoverStyles =
  "hover:-translate-y-1 hover:shadow-elevated cursor-pointer dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] dark:hover:border-lagoon-500/30";

// =============================================================================
// Component
// =============================================================================

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      href,
      image,
      hoverEffect = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      baseStyles,
      variantStyles[variant],
      !image && paddingStyles[padding],
      hoverEffect && hoverStyles,
      className
    );

    const content = image ? (
      <>
        <div
          className={cn(
            "relative w-full overflow-hidden",
            aspectRatioStyles[image.aspectRatio || "video"]
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill={!image.width}
            width={image.width}
            height={image.height}
            className="object-cover"
          />
        </div>
        {children && (
          <div className={cn(paddingStyles[padding])}>{children}</div>
        )}
      </>
    ) : (
      children
    );

    if (href) {
      const isExternal = href.startsWith("http");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(classes, "block")}
          >
            {content}
            <span className="sr-only"> (deschide în fereastră nouă)</span>
          </a>
        );
      }

      return (
        <Link href={href} className={cn(classes, "block")}>
          {content}
        </Link>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {content}
      </div>
    );
  }
);

Card.displayName = "Card";

// =============================================================================
// Card Subcomponents
// =============================================================================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("mb-4", className)} {...props}>
      {children}
    </div>
  );
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
  children: ReactNode;
}

export function CardTitle({
  as: Component = "h3",
  className,
  children,
  ...props
}: CardTitleProps) {
  return (
    <Component
      className={cn(
        "font-heading font-semibold text-sand-900 dark:text-white",
        Component === "h2" && "text-2xl",
        Component === "h3" && "text-xl",
        Component === "h4" && "text-lg",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export function CardDescription({
  className,
  children,
  ...props
}: CardDescriptionProps) {
  return (
    <p className={cn("mt-2 text-sand-600 dark:text-sand-400", className)} {...props}>
      {children}
    </p>
  );
}

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardContent({
  className,
  children,
  ...props
}: CardContentProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div
      className={cn("mt-4 flex items-center gap-4 pt-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
