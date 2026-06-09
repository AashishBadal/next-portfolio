"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { CLUSTER_TECH, getTechIcon } from "@/lib/tech-icons";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { TechLogo } from "./TechLogo";

/**
 * The signature moment of the Expertise section. The brand marks begin
 * dispersed off to the left and right and **assemble into formation as the
 * user scrolls** — the animation is scrubbed to scroll position with GSAP
 * ScrollTrigger, so progress maps directly to how far the section has
 * travelled through the viewport.
 *
 * Each tile's horizontal origin is derived from its grid column (left
 * columns enter from the left, right columns from the right), and distances
 * are recomputed on refresh so it stays correct across breakpoints.
 * Collapses to a static, fully-assembled grid under reduced-motion.
 */
/** Returns true when a hex colour is too dark to be legible on our dark bg. */
function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // Relative luminance — anything below ~0.15 is invisible on near-black.
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.15;
}

export function LogoCluster() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const isLarge = useMediaQuery("(min-width: 1024px)");
  const isMedium = useMediaQuery("(min-width: 640px)");

  const columns = isLarge ? 6 : isMedium ? 4 : 3;

  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>("[data-logo-tile]");
      const centerCol = (columns - 1) / 2;

      // How far (in px) one column-step of separation should reach. Scaled
      // so the outermost columns begin near the viewport edges.
      const step = () => (window.innerWidth * 0.55) / Math.max(centerCol, 1);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 85%",
          end: "top 35%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      tiles.forEach((tile, i) => {
        const offset = (i % columns) - centerCol; // negative = left, positive = right
        const startX = offset * step();
        // Rise from below — outer columns start further down so they
        // sweep a wider arc upward into position.
        const drop = Math.abs(offset) * 34 + 90;

        tl.fromTo(
          tile,
          { autoAlpha: 0, scale: 0.55 },
          {
            autoAlpha: 1,
            scale: 1,
            ease: "power2.out",
            duration: 1,
            // Travel a curved bezier: starts below and to the side, arcs
            // upward through a midpoint, then settles into the grid.
            motionPath: {
              path: [
                { x: startX, y: drop },
                { x: startX * 0.4, y: drop * 0.3 },
                { x: 0, y: 0 },
              ],
              curviness: 1.5,
            },
          },
          0, // all tiles share the scrub window and converge together
        );
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [columns, reducedMotion]);

  return (
    <div
      ref={rootRef}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      className="mx-auto grid max-w-4xl gap-3 sm:gap-4"
    >
      {CLUSTER_TECH.map((name) => {
        const icon = getTechIcon(name);
        return (
          <div
            key={name}
            data-logo-tile
            data-cursor
            style={icon ? ({ "--brand": `#${icon.hex}` } as React.CSSProperties) : undefined}
            className={cn(
              "group relative flex aspect-square items-center justify-center transition-colors duration-500 ease-expo will-change-transform hover:z-10",
              // Hidden until GSAP takes over, avoiding a one-frame flash of the
              // assembled grid. Reduced-motion users see it static and visible.
              !reducedMotion && "opacity-0",
            )}
          >
            <span
              className="h-7 w-7 transition-all duration-500 group-hover:scale-110 sm:h-8 sm:w-8"
              style={{ color: icon && isDark(icon.hex) ? '#ede9e1' : `var(--brand, rgba(237, 233, 225, 0.55))` }}
            >
              <TechLogo name={name} />
            </span>

            {/* Name label */}
            <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-bold">
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
