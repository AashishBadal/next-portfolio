"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/animations/gsap";
import { HERO, SITE } from "@/lib/site";
import { GSAP_EASE } from "@/animations/easing";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { HeroBackground } from "./HeroBackground";
import { ScrollIndicator } from "./ScrollIndicator";

/**
 * The opening statement. A GSAP timeline orchestrates the entrance:
 * the eyebrow, the masked headline lines, then the supporting copy and
 * meta — each beat slightly overlapping the last for a cohesive sequence.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: GSAP_EASE.expo },
        delay: 0.35,
      });

      tl.from(".hero-logo", { opacity: 0, scale: 0.9, duration: 1.3 }, 0)
        .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.9 }, 0)
        .from(
          ".hero-line-inner",
          { yPercent: 118, duration: 1.25, stagger: 0.12 },
          "-=0.5",
        )
        .from(
          ".hero-intro",
          { y: 24, opacity: 0, duration: 1 },
          "-=0.75",
        )
        .from(
          ".hero-meta-item",
          { y: 18, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.7",
        )
        .from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.5");
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32"
      aria-label="Introduction"
    >
      <HeroBackground />

      <div className="shell relative z-10">
        <p className="hero-eyebrow mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-smoke">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-bone/80" />
          {SITE.role} · {SITE.location}
        </p>

        <h1 className="text-display-xl font-semibold text-bone text-balance">
          {HERO.headline.map((line, i) => (
            <span
              key={i}
              className="block overflow-hidden pb-[0.06em]"
            >
              <span className="hero-line-inner block">{line}</span>
            </span>
          ))}
        </h1>

        <div className="mt-12 flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <p className="hero-intro max-w-prose text-lg leading-relaxed text-bone/70 md:text-xl">
            {HERO.intro}
          </p>

          <dl className="flex gap-10">
            {HERO.meta.map((m) => (
              <div key={m.label} className="hero-meta-item">
                <dt className="mb-2 text-[11px] uppercase tracking-[0.22em] text-smoke">
                  {m.label}
                </dt>
                <dd className="max-w-[18ch] text-sm text-bone/85">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="hero-scroll shell relative z-10 mt-16">
        <ScrollIndicator />
      </div>
    </section>
  );
}
