"use client";

import { type ReactNode } from "react";
import { useInView } from "@/lib/hooks/useInView";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

interface AnimateOnScrollProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimateOnScroll({
  children,
  delay = 0,
  className,
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
