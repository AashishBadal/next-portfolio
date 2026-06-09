"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/animations/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Architectural hero backdrop: a faint perspective grid, a slow-drifting
 * radial glow, and a hairline horizon — all parallaxed on scroll. Purely
 * decorative; hidden from assistive tech.
 */
export function HeroBackground() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context((self) => {
      const q = gsap.utils.selector(self.selector!);

      // Slow ambient drift of the glow.
      gsap.to(q(".hero-glow"), {
        xPercent: 8,
        yPercent: -6,
        duration: 9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Parallax layers as the hero scrolls away.
      gsap.to(q(".hero-grid"), {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(q(".hero-glow"), {
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        yPercent: 30,
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reducedMotion]);

  return (
    <div ref={root} aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Perspective grid */}
      <div
        className="hero-grid absolute inset-x-0 top-0 h-[140%] opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(248,248,248,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(248,248,248,0.05) 1px, transparent 1px)",
          backgroundSize: "clamp(48px, 7vw, 96px) clamp(48px, 7vw, 96px)",
          maskImage:
            "radial-gradient(120% 80% at 50% 30%, black 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(120% 80% at 50% 30%, black 30%, transparent 78%)",
        }}
      />
      {/* Drifting glow */}
      <div className="hero-glow glow-radial absolute left-1/2 top-1/2 h-[80vmax] w-[80vmax] -translate-x-1/2 -translate-y-1/2 will-change-transform" />
      {/* Horizon hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bone/10 to-transparent" />
    </div>
  );
}
