"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp } from "@/animations/variants";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type StatProps = { value: string; label: string };

/**
 * A single statistic. When the value is purely numeric it counts up once
 * in view; symbolic values (e.g. "∞") render as-is.
 */
export function Stat({ value, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reducedMotion = usePrefersReducedMotion();

  const numeric = /^\d+/.exec(value);
  const target = numeric ? parseInt(numeric[0], 10) : null;
  const suffix = numeric ? value.slice(numeric[0].length) : "";

  const [display, setDisplay] = useState(target !== null ? "0" : value);

  useEffect(() => {
    if (target === null || reducedMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    let raf = 0;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
      setDisplay(`${Math.round(eased * target)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, suffix, value, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className="flex flex-col gap-2"
    >
      <span className="text-5xl font-medium tracking-tight text-bone tabular-nums sm:text-6xl">
        {display}
      </span>
      <span className="text-sm text-smoke">{label}</span>
    </motion.div>
  );
}
