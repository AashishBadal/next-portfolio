"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, type MotionValue } from "framer-motion";
import { useHasPointer } from "./useMediaQuery";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type MagneticResult = {
  ref: React.RefObject<HTMLElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  onMouseMove: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: () => void;
};

/**
 * Magnetic hover: the element drifts toward the cursor while hovered and
 * springs back on leave. Disabled for touch devices and reduced motion.
 *
 * @param strength how far the element follows the cursor (0–1)
 */
export function useMagnetic(strength = 0.35): MagneticResult {
  const ref = useRef<HTMLElement | null>(null);
  const hasPointer = useHasPointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasPointer && !reducedMotion;

  const config = { stiffness: 180, damping: 18, mass: 0.4 };
  const x = useSpring(useMotionValue(0), config);
  const y = useSpring(useMotionValue(0), config);

  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
