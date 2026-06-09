"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/lib/site";
import { EASE } from "@/animations/easing";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Generative case-study artwork. Rather than ship placeholder photos, each
 * project gets a composed tonal panel — layered gradients keyed to its
 * accent, a fine grid, and a ghosted wordmark. The panel reveals from
 * behind a clip-path mask and parallaxes its inner layer on scroll.
 */
export function ProjectVisual({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const innerY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={ref}
      data-cursor
      initial={reducedMotion ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.2, ease: EASE.expo }}
      className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-bone/10 bg-ink-raised"
    >
      {project.image ? (
        /* Full project screenshot — contained so nothing is cropped. */
        <Image
          src={project.image}
          alt={`${project.title} — ${project.category}`}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-contain p-2"
        />
      ) : (
        <motion.div
          style={{ y: reducedMotion ? 0 : innerY }}
          className="absolute inset-0 scale-110"
        >
          {/* Accent wash */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background: `radial-gradient(120% 90% at 25% 15%, ${project.accent}66 0%, transparent 55%), radial-gradient(100% 100% at 90% 100%, ${project.accent}33 0%, transparent 60%)`,
            }}
          />
          {/* Fine grid */}
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(248,248,248,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(248,248,248,0.6) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          {/* Ghosted wordmark */}
          <span className="absolute -bottom-[0.18em] left-[-0.03em] select-none text-[28vw] font-semibold leading-none tracking-tightest text-bone/[0.06] md:text-[14vw]">
            {project.title}
          </span>
        </motion.div>
      )}

      {/* Index chip */}
      <div className="absolute left-5 top-5 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-bone/70">
        <span className="tabular-nums">{project.index}</span>
        <span className="h-px w-6 bg-bone/30" />
        <span>{project.year}</span>
      </div>

      {/* Hover sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-bone/0 transition-all duration-700 group-hover:to-bone/[0.05]" />

      {/* Clicking the artwork opens the live site */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Open ${project.title} live site`}
        className="absolute inset-0 z-10"
      />
    </motion.div>
  );
}
