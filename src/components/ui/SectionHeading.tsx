"use client";

import { motion } from "framer-motion";
import { drawLine, fadeUp, VIEWPORT } from "@/animations/variants";
import { RevealText } from "./RevealText";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  className?: string;
};

/**
 * Consistent editorial section header: a numbered eyebrow, a hairline rule
 * that draws itself, and a masked title reveal.
 */
export function SectionHeading({
  index,
  label,
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("w-full", className)}>
      <motion.div
        className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-smoke"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      >
        <span className="tabular-nums">{index}</span>
        <span className="h-px w-8 bg-smoke/50" />
        <span>{label}</span>
      </motion.div>

      <h2 className="mt-6 max-w-[16ch] text-display-lg font-medium text-bone">
        <RevealText text={title} />
      </h2>

      <motion.div
        className="mt-10 h-px w-full origin-left bg-bone/10"
        variants={drawLine}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
      />
    </div>
  );
}
