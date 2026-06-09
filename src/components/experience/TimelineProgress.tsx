"use client";

import { type RefObject } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * The vertical rail behind the timeline. A faint full-height track sits
 * under a bright line that scales with scroll progress through the
 * container — giving the section a sense of forward motion.
 */
export function TimelineProgress({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 w-px md:left-2">
      <div className="absolute inset-0 bg-bone/10" />
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 origin-top bg-bone/70"
      />
      <motion.span
        style={{ top: dotY }}
        className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone shadow-[0_0_18px_2px_rgba(248,248,248,0.5)]"
      />
    </div>
  );
}
