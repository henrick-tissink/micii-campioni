import { type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface GlassChipProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

/**
 * Frosted-glass mono chip used over dark photography (e.g. the hero slide tag).
 */
export function GlassChip({ className, children, ...props }: GlassChipProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full border border-white/20 bg-white/10 px-4 py-[7px]",
        "font-mono text-[10px] uppercase tracking-[var(--tracking-mono)] text-white/90 backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
