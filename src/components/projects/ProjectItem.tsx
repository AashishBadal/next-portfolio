"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/site";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";
import { RevealText } from "@/components/ui/RevealText";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

/**
 * A single project, presented as a compact case study. Layouts alternate
 * sides on large screens so the showcase reads with editorial rhythm.
 */
export function ProjectItem({
  project,
  reversed,
}: {
  project: Project;
  reversed: boolean;
}) {
  return (
    <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={cn("lg:col-span-7", reversed && "lg:order-2 lg:col-start-6")}>
        <ProjectVisual project={project} />
      </div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className={cn(
          "lg:col-span-5",
          reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-8",
        )}
      >
        <motion.p
          variants={fadeUp}
          className="text-xs uppercase tracking-[0.24em] text-smoke"
        >
          {project.category}
        </motion.p>

        <h3 className="mt-4 text-display-md font-medium text-bone">
          <RevealText text={project.title} stagger={0.05} />
        </h3>

        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-prose text-bone/65"
        >
          {project.summary}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 flex items-baseline gap-3 text-bone"
        >
          <span className="text-lg leading-none text-bone/40">↳</span>
          <span className="text-base">{project.achievement}</span>
        </motion.p>

        <motion.ul
          variants={fadeUp}
          className="mt-8 flex flex-wrap gap-2"
        >
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-bone/12 px-3 py-1 text-xs uppercase tracking-wider text-bone/60"
            >
              {tech}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor
            className="inline-flex items-center gap-2 border border-bone/20 px-6 py-3 text-sm uppercase tracking-[0.14em] text-bone transition-colors duration-500 ease-expo hover:border-bone hover:bg-bone hover:text-ink"
          >
            Live site
            <span aria-hidden>↗</span>
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            data-cursor
            className="inline-flex items-center gap-2 border border-bone/20 px-6 py-3 text-sm uppercase tracking-[0.14em] text-bone/80 transition-colors duration-500 ease-expo hover:border-bone hover:text-bone"
          >
            GitHub
            <span aria-hidden>↗</span>
          </a>
        </motion.div>
      </motion.div>
    </article>
  );
}
