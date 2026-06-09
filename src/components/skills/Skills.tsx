"use client";

import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/animations/variants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoCluster } from "./LogoCluster";

/**
 * Expertise. The scroll-assembled logo cluster is the whole show here —
 * brand marks converge into formation as the section scrolls past.
 */
export function Skills() {
  return (
    <section className="relative py-28 md:py-40" aria-label="Expertise">
      <div className="shell">
        <SectionHeading
          index="03"
          label="Expertise"
          title="A full stack, end to end."
        />

        {/* Signature scroll-assembled logo cluster */}
        <div id="expertise" className="mt-24 scroll-mt-28 md:mt-32">
          <LogoCluster />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mx-auto mt-16 max-w-md text-center text-sm text-smoke"
          >
The tools I reach for to build full stack web apps — and a list
            that keeps growing with every project.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
