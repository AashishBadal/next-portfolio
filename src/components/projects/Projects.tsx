"use client";

import { PROJECTS } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectItem } from "./ProjectItem";

/**
 * Selected work. The flagship section — projects render as alternating
 * case studies with masked artwork reveals and parallax.
 */
export function Projects() {
  return (
    <section id="work" className="relative" aria-label="Selected work">
      <div className="shell">
        <SectionHeading
          index="02"
          label="Selected Work"
          title="Products, shipped with care."
        />

        <div className="mt-24 space-y-32 md:space-y-44">
          {PROJECTS.map((project, i) => (
            <ProjectItem
              key={project.title}
              project={project}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
