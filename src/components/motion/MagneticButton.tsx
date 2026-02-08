"use client";

import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/utils/cn";

// =============================================================================
// Types
// =============================================================================

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

// =============================================================================
// Component
// =============================================================================

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  radius = 200,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Check for touch device after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsTouchDevice("ontouchstart" in window);
  }, []);

  // Motion values for smooth animation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring config for magnetic feel
  const springConfig = { stiffness: 150, damping: 15 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current || prefersReducedMotion || isTouchDevice) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < radius) {
      const factor = 1 - distance / radius;
      x.set(distanceX * strength * factor);
      y.set(distanceY * strength * factor);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  // Always render the same structure for hydration, disable effects via state
  const isDisabled = prefersReducedMotion || isTouchDevice || !mounted;

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={isDisabled ? undefined : { x: springX, y: springY }}
      onMouseMove={isDisabled ? undefined : handleMouseMove}
      onMouseEnter={isDisabled ? undefined : handleMouseEnter}
      onMouseLeave={isDisabled ? undefined : handleMouseLeave}
    >
      <motion.div
        animate={isDisabled ? undefined : { scale: isHovering ? 1.05 : 1 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// =============================================================================
// Ripple Effect
// =============================================================================

interface RippleProps {
  className?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function useRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const createRipple = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);
  };

  const RippleContainer = ({ className }: RippleProps) => (
    <span className={cn("absolute inset-0 overflow-hidden rounded-inherit pointer-events-none", className)}>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </span>
  );

  return { createRipple, RippleContainer };
}
