"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

type AnimationType = "fadeUp" | "fadeIn" | "scaleIn" | "stagger" | "none";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  once?: boolean;
  as?: "section" | "div" | "article";
}

// =============================================================================
// Animation Variants Map
// =============================================================================

const animationVariants: Record<AnimationType, Variants> = {
  fadeUp: fadeUp,
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  },
  stagger: staggerContainer,
  none: {
    hidden: {},
    visible: {},
  },
};

// =============================================================================
// Component
// =============================================================================

export function MotionSection({
  children,
  className,
  animation = "fadeUp",
  delay = 0,
  threshold = 0.2,
  once = true,
  as = "section",
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });
  const prefersReducedMotion = useReducedMotion();

  const variants = animationVariants[animation];

  // If reduced motion, render without animation
  if (prefersReducedMotion) {
    const StaticComponent = as as ElementType;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  // Use motion.div as wrapper, with semantic element rendered inside if needed
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...variants,
        visible: {
          ...variants.visible,
          transition: {
            ...((variants.visible as { transition?: object })?.transition || {}),
            delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// =============================================================================
// Motion Item (for use with stagger container)
// =============================================================================

interface MotionItemProps {
  children: React.ReactNode;
  className?: string;
}

export function MotionItem({ children, className }: MotionItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  );
}

// =============================================================================
// Scroll Progress Section
// =============================================================================

interface ScrollProgressSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollProgressSection({
  children,
  className,
}: ScrollProgressSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {children}
    </div>
  );
}
