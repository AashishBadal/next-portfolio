"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { SITE } from "@/lib/site";
import { EASE } from "@/animations/easing";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const HOLD_MS = 5000; // total time the loader stays on screen
const COUNT_MS = 4500; // time for the counter to reach 100
const COLUMNS = 5;

const STATUSES = [
  "Initializing",
  "Composing layout",
  "Calibrating motion",
  "Almost ready",
];

/**
 * First-load experience. A full-screen counter + name reveal that holds for
 * five seconds, then lifts away as a staggered curtain of columns to unveil
 * the page. Also takes ownership of scroll position: it disables the
 * browser's scroll restoration and pins the window to the top, so a refresh
 * always begins at the hero rather than wherever the user left off.
 */
export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  // Reset scroll on (re)load and lock the page while the loader is up.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const done = window.setTimeout(() => setLoading(false), HOLD_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  }, []);

  // Body scroll is locked while loading, released the moment the curtain lifts.
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    if (!loading) window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const status = STATUSES[Math.min(STATUSES.length - 1, Math.floor(progress / 25))];
  const words = SITE.name.split(" ");

  const container: Variants = {
    animate: {},
    exit: reducedMotion
      ? { opacity: 0, transition: { duration: 0.5, ease: EASE.expo } }
      : { transition: { staggerChildren: 0.08 } },
  };

  const column: Variants = {
    animate: { y: "0%" },
    exit: {
      y: "-100%",
      transition: { duration: 0.9, ease: EASE.inOutQuint },
    },
  };

  const content: Variants = {
    animate: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.35, ease: EASE.expo } },
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          variants={container}
          initial="animate"
          animate="animate"
          exit="exit"
          role="progressbar"
          aria-label="Loading"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          className="fixed inset-0 z-[200] overflow-hidden"
        >
          {/* Curtain columns (also the loader's black backdrop) */}
          <div className="absolute inset-0 flex" aria-hidden>
            {Array.from({ length: COLUMNS }).map((_, i) => (
              <motion.div
                key={i}
                variants={reducedMotion ? undefined : column}
                className="h-full flex-1 bg-ink"
              />
            ))}
          </div>

          {/* Foreground content */}
          <motion.div
            variants={content}
            className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 lg:p-16"
          >
            {/* Top meta */}
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-smoke">
              <span>{SITE.role}</span>
              <span className="tabular-nums">© 2026</span>
            </div>

            {/* Center: name reveal */}
            <motion.h1
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
              className="text-center text-display-lg font-semibold tracking-tightest text-bone"
            >
              {words.map((word, i) => (
                <span key={i} className="mx-[0.12em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { y: "110%" },
                      visible: {
                        y: "0%",
                        transition: { duration: 1, ease: EASE.expo },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            {/* Bottom: status + counter + progress line */}
            <div>
              <div className="mb-4 flex items-end justify-between">
                <span className="text-xs uppercase tracking-[0.28em] text-smoke">
                  {status}
                </span>
                <span className="flex items-baseline gap-1 text-bone">
                  <span className="text-5xl font-medium tabular-nums sm:text-6xl">
                    {String(progress).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-smoke">%</span>
                </span>
              </div>
              <div className="h-px w-full bg-bone/15">
                <motion.div
                  className="h-full bg-bone"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
