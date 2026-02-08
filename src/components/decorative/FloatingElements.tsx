"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

interface FloatingElement {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  opacity: number;
}

interface FloatingElementsProps {
  className?: string;
  count?: number;
  variant?: "bubbles" | "circles" | "dots";
  color?: "lagoon" | "coral" | "mixed";
}

// =============================================================================
// Seeded random number generator for consistent SSR/client values
// =============================================================================

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

function generateElements(count: number, seed: number = 42): FloatingElement[] {
  const random = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => ({
    size: random() * 60 + 20,
    x: `${random() * 100}%`,
    y: `${random() * 100}%`,
    delay: i * 0.5,
    duration: random() * 4 + 4,
    opacity: random() * 0.3 + 0.1,
  }));
}

// =============================================================================
// Color Classes
// =============================================================================

const colorClasses = {
  lagoon: "bg-lagoon-400/20 dark:bg-lagoon-400/10",
  coral: "bg-coral-400/20 dark:bg-coral-400/10",
  mixed: "",
};

// =============================================================================
// Component
// =============================================================================

export function FloatingElements({
  className,
  count = 6,
  variant = "circles",
  color = "lagoon",
}: FloatingElementsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Only render on client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use seeded random for consistent values
  const elements = generateElements(count, 42);

  if (prefersReducedMotion || !mounted) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {elements.map((element, index) => {
        const colorClass =
          color === "mixed"
            ? index % 2 === 0
              ? colorClasses.lagoon
              : colorClasses.coral
            : colorClasses[color];

        return (
          <motion.div
            key={index}
            className={cn(
              "absolute rounded-full",
              variant === "bubbles" && "backdrop-blur-sm",
              variant === "dots" && "rounded-full",
              colorClass
            )}
            style={{
              width: element.size,
              height: element.size,
              left: element.x,
              top: element.y,
              opacity: element.opacity,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

// =============================================================================
// Animated Wave Background
// =============================================================================

interface AnimatedWaveProps {
  className?: string;
  position?: "top" | "bottom";
}

export function AnimatedWave({
  className,
  position = "bottom",
}: AnimatedWaveProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "absolute left-0 right-0 overflow-hidden",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "w-full h-auto",
          position === "top" && "rotate-180"
        )}
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,60 1440,60 L1440,120 L0,120 Z"
          className="fill-white dark:fill-night-900"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  d: [
                    "M0,60 C360,120 720,0 1080,60 C1260,90 1380,60 1440,60 L1440,120 L0,120 Z",
                    "M0,80 C360,20 720,100 1080,40 C1260,20 1380,80 1440,60 L1440,120 L0,120 Z",
                    "M0,60 C360,120 720,0 1080,60 C1260,90 1380,60 1440,60 L1440,120 L0,120 Z",
                  ],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,80 C360,140 720,20 1080,80 C1260,110 1380,80 1440,80 L1440,120 L0,120 Z"
          className="fill-lagoon-50/50 dark:fill-night-800/50"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  d: [
                    "M0,80 C360,140 720,20 1080,80 C1260,110 1380,80 1440,80 L1440,120 L0,120 Z",
                    "M0,60 C360,0 720,120 1080,60 C1260,30 1380,60 1440,80 L1440,120 L0,120 Z",
                    "M0,80 C360,140 720,20 1080,80 C1260,110 1380,80 1440,80 L1440,120 L0,120 Z",
                  ],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </svg>
    </div>
  );
}

// =============================================================================
// Gradient Mesh Background
// =============================================================================

interface GradientMeshProps {
  className?: string;
}

export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 opacity-50 dark:opacity-30",
        className
      )}
      aria-hidden="true"
      style={{
        background: `
          radial-gradient(at 20% 30%, rgba(32, 178, 170, 0.15) 0%, transparent 50%),
          radial-gradient(at 80% 70%, rgba(92, 217, 209, 0.1) 0%, transparent 50%),
          radial-gradient(at 50% 50%, rgba(20, 184, 166, 0.05) 0%, transparent 70%)
        `,
      }}
    />
  );
}

// =============================================================================
// Scroll Progress Indicator
// =============================================================================

export function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-lagoon-500 dark:bg-night-glow origin-left z-[999]"
      style={{
        scaleX: "var(--scroll-progress, 0)",
      }}
    />
  );
}
