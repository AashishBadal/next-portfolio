"use client";

import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/lib/site";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";

/**
 * A single role in the timeline. A node marks its position on the rail;
 * period, title, and highlights stagger in as the row enters view.
 */
export function ExperienceRow({
  entry,
  index,
}: {
  entry: ExperienceEntry;
  index: number;
}) {
  return (
    <motion.li
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className="relative"
    >
      {/* Node on the rail */}
      <span
        aria-hidden
        className="absolute -left-8 top-2 grid h-3 w-3 -translate-x-1/2 place-items-center md:-left-16"
      >
        <span className="h-2 w-2 rounded-full border border-bone/40 bg-ink" />
      </span>

      <motion.div variants={fadeUp} className="flex flex-wrap items-baseline gap-x-4">
        <span className="text-sm tabular-nums text-smoke">{entry.period}</span>
        <span className="text-xs uppercase tracking-[0.2em] text-smoke/70">
          {entry.location}
        </span>
      </motion.div>

      <motion.h3
        variants={fadeUp}
        className="mt-3 text-2xl font-medium text-bone md:text-3xl"
      >
        {entry.role}
        <span className="text-bone/40"> · {entry.company}</span>
      </motion.h3>

      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-prose text-bone/60"
      >
        {entry.description}
      </motion.p>

      <motion.ul
        variants={fadeUp}
        className="mt-5 space-y-2"
      >
        {entry.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex items-baseline gap-3 text-sm text-bone/70"
          >
            <span className="mt-px text-bone/35">—</span>
            {highlight}
          </li>
        ))}
      </motion.ul>

      <span className="sr-only">{`Role ${index + 1}`}</span>
    </motion.li>
  );
}
