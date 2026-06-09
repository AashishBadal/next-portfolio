"use client";

import { motion } from "framer-motion";
import { createElement } from "react";
import { EASE, DURATION } from "@/animations/easing";
import { VIEWPORT } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  text: string;
  className?: string;
  /** HTML tag to render the block as. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Per-word stagger in seconds. */
  stagger?: number;
  /** Delay before the first word, in seconds. */
  delay?: number;
};

/**
 * Editorial word-by-word reveal. Each word rises from behind a clipping
 * mask with staggered timing. Falls back to a plain block when the user
 * prefers reduced motion.
 */
export function RevealText({
  text,
  className,
  as = "span",
  stagger = 0.06,
  delay = 0,
}: RevealTextProps) {
  const reducedMotion = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reducedMotion) {
    return createElement(as, { className }, text);
  }

  return createElement(
    as,
    { className: cn("inline", className) },
    <motion.span
      className="inline"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: i < words.length - 1 ? "0.25em" : 0 }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              visible: {
                y: "0%",
                transition: { duration: DURATION.reveal, ease: EASE.expo },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>,
  );
}
