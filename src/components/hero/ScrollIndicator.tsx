"use client";

/**
 * Quiet scroll affordance — a hairline track with a dot that falls and
 * fades on a loop. Uses a CSS keyframe so it costs nothing on the main
 * thread and is automatically paused under reduced-motion.
 */
export function ScrollIndicator() {
  return (
    <a
      href="#about"
      aria-label="Scroll to about section"
      className="group inline-flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-smoke transition-colors duration-500 hover:text-bone"
    >
      <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
        <span className="absolute left-0 top-0 h-3 w-px bg-bone animate-scroll-hint" />
      </span>
      Scroll
    </a>
  );
}
