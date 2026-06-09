"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useHasPointer } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Minimal cursor-aware ring. It trails the pointer with a soft spring and
 * grows when hovering interactive elements (anything with [data-cursor] or
 * native links/buttons). Hidden entirely on touch / reduced motion, where
 * the native cursor is left untouched.
 */
export function Cursor() {
  const hasPointer = useHasPointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = hasPointer && !reducedMotion;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.4 });

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor], input, textarea",
      );
      setActive(Boolean(interactive));
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/40 mix-blend-difference md:block"
      style={{ x: springX, y: springY }}
      animate={{
        scale: active ? 1.9 : 1,
        opacity: visible ? 1 : 0,
        backgroundColor: active ? "rgba(248,248,248,0.08)" : "rgba(248,248,248,0)",
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
