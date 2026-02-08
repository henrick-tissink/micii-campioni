import type { Transition, Easing } from "framer-motion";

// =============================================================================
// Easing Presets
// =============================================================================

// Premium smooth easing (similar to Apple)
export const easeSmooth: Easing = [0.22, 1, 0.36, 1];

// Quick start, smooth end
export const easeOut: Easing = [0, 0, 0.2, 1];

// Smooth start, quick end
export const easeIn: Easing = [0.4, 0, 1, 1];

// Natural feel
export const easeInOut: Easing = [0.4, 0, 0.2, 1];

// Bounce effect
export const easeBounce: Easing = [0.34, 1.56, 0.64, 1];

// Elastic effect
export const easeElastic: Easing = [0.68, -0.55, 0.265, 1.55];

// =============================================================================
// Duration Presets
// =============================================================================

export const duration = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  slowest: 1,
} as const;

// =============================================================================
// Transition Presets
// =============================================================================

export const transitionFast: Transition = {
  duration: duration.fast,
  ease: easeOut,
};

export const transitionNormal: Transition = {
  duration: duration.normal,
  ease: easeSmooth,
};

export const transitionSlow: Transition = {
  duration: duration.slow,
  ease: easeSmooth,
};

export const transitionBounce: Transition = {
  duration: duration.normal,
  ease: easeBounce,
};

export const transitionSpring: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const transitionSpringBouncy: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

export const transitionSpringStiff: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 40,
};

// =============================================================================
// Page Transition Presets
// =============================================================================

export const pageEnterTransition: Transition = {
  duration: 0.5,
  ease: easeSmooth,
};

export const pageExitTransition: Transition = {
  duration: 0.3,
  ease: easeIn,
};

// =============================================================================
// Stagger Presets
// =============================================================================

export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.15,
} as const;
