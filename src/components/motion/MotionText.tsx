"use client";

import { useRef, useEffect, type ElementType } from "react";
import { motion, useInView } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { textRevealContainer, textRevealWord } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

type RevealType = "words" | "chars" | "lines";

interface MotionTextProps {
  children: string;
  className?: string;
  type?: RevealType;
  once?: boolean;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
}

// =============================================================================
// Component
// =============================================================================

export function MotionText({
  children,
  className,
  type = "words",
  once = true,
  delay = 0,
  as = "p",
}: MotionTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  // If reduced motion, render plain text
  if (prefersReducedMotion) {
    const StaticComponent = as as ElementType;
    return <StaticComponent className={className}>{children}</StaticComponent>;
  }

  // Split text based on type
  const getElements = () => {
    switch (type) {
      case "chars":
        return children.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20, rotateX: -45 },
              visible: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ));

      case "lines":
        return children.split("\n").map((line, i) => (
          <motion.span
            key={i}
            variants={textRevealWord}
            className="block"
          >
            {line}
          </motion.span>
        ));

      case "words":
      default:
        return children.split(" ").map((word, i) => (
          <motion.span
            key={i}
            variants={textRevealWord}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ));
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn("overflow-hidden", className)}
      variants={{
        ...textRevealContainer,
        visible: {
          ...textRevealContainer.visible,
          transition: {
            ...((textRevealContainer.visible as { transition?: object })?.transition || {}),
            delayChildren: delay,
          },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {getElements()}
    </motion.div>
  );
}

// =============================================================================
// Counter Animation
// =============================================================================

interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  className,
  suffix = "",
  prefix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const hasAnimated = useRef(false);

  // Animate counter when in view
  useEffect(() => {
    if (isInView && !hasAnimated.current && countRef.current && !prefersReducedMotion) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const durationMs = duration * 1000;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        // Ease out
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(from + (to - from) * eased);

        if (countRef.current) {
          countRef.current.textContent = current.toString();
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, from, to, duration, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span className={className}>
        {prefix}
        {to}
        {suffix}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {prefix}
      <span ref={countRef}>{isInView ? to : from}</span>
      {suffix}
    </motion.span>
  );
}
