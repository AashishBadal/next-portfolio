/**
 * Shared easing curves used across Framer Motion and GSAP.
 * Centralizing them keeps motion feeling consistent and "expensive".
 */

// Framer Motion accepts cubic-bezier arrays [x1, y1, x2, y2].
export const EASE = {
  expo: [0.16, 1, 0.3, 1] as const,
  outQuint: [0.22, 1, 0.36, 1] as const,
  inOutQuint: [0.83, 0, 0.17, 1] as const,
  softOut: [0.25, 0.46, 0.45, 0.94] as const,
};

// GSAP-friendly cubic-bezier strings (used with CustomEase or transitions).
export const GSAP_EASE = {
  expo: "expo.out",
  outQuint: "power4.out",
  inOutQuint: "power4.inOut",
};

// Durations, in seconds, tuned for a calm, premium cadence.
export const DURATION = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  reveal: 1.2,
};
