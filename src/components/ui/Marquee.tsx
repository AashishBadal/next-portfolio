"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  /** Pixels per second. Negative scrolls the other way. */
  speed?: number;
  className?: string;
  separator?: string;
};

/**
 * Seamless GSAP marquee. The track is duplicated and translated by exactly
 * one copy's width, then wrapped with modulus so the loop never seams.
 * Pauses for reduced-motion users.
 */
export function Marquee({
  items,
  speed = 60,
  className,
  separator = "—",
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    const half = track.scrollWidth / 2;
    const wrap = gsap.utils.wrap(-half, 0);
    const duration = half / Math.abs(speed);

    const tween = gsap.fromTo(
      track,
      { x: speed > 0 ? -half : 0 },
      {
        x: speed > 0 ? 0 : -half,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: { x: (value) => `${wrap(parseFloat(value))}px` },
      },
    );

    return () => {
      tween.kill();
    };
  }, [speed, reducedMotion, items]);

  // Duplicate the items so the loop has a seamless second copy.
  const loop = [...items, ...items];

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div ref={trackRef} className="flex w-max flex-nowrap will-change-transform">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center whitespace-nowrap"
            aria-hidden={i >= items.length}
          >
            <span>{item}</span>
            <span className="mx-8 text-smoke/60" aria-hidden>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
