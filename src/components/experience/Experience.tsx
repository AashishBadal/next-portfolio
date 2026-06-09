"use client";

import { useRef } from "react";
import { EXPERIENCE } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ExperienceRow } from "./ExperienceRow";
import { TimelineProgress } from "./TimelineProgress";

/**
 * Career timeline. A scroll-scrubbed line tracks reading progress down the
 * left rail while each role reveals as it enters view.
 */
export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section id="journey" className="relative" aria-label="Experience">
      <div className="shell">
        <SectionHeading
          index="04"
          label="Journey"
          title="Where I've been."
        />

        <div ref={trackRef} className="relative mt-24 pl-8 md:pl-16">
          <TimelineProgress containerRef={trackRef} />

          <ol className="space-y-20 md:space-y-28">
            {EXPERIENCE.map((entry, i) => (
              <ExperienceRow key={entry.company} entry={entry} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
