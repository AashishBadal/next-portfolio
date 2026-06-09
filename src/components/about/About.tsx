"use client";

import { motion } from "framer-motion";
import { ABOUT } from "@/lib/site";
import { fadeUp, staggerContainer, VIEWPORT } from "@/animations/variants";
import { RevealText } from "@/components/ui/RevealText";

/**
 * Narrative-driven about section. An oversized lead statement anchors the
 * left rail while the story and philosophy flow in an asymmetrical
 * editorial grid.
 */
export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40" aria-label="About">
      <div className="shell">
        {/* Lead statement */}
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <motion.span
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="inline-flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-smoke"
            >
              <span className="tabular-nums">01</span>
              <span className="h-px w-8 bg-smoke/50" />
              About
            </motion.span>
          </div>

          <div className="lg:col-span-9">
            <p className="text-display-md font-medium leading-[1.1] text-bone text-balance">
              <RevealText text={ABOUT.lead} stagger={0.045} />
            </p>
          </div>
        </div>

        {/* Story + philosophy */}
        <div className="mt-24 grid gap-16 lg:grid-cols-12">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="space-y-6 lg:col-span-6 lg:col-start-1"
          >
            {ABOUT.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className="max-w-prose text-lg leading-relaxed text-bone/65"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>

          <motion.ul
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="lg:col-span-5 lg:col-start-8"
          >
            {ABOUT.philosophy.map((item, i) => (
              <motion.li
                key={item.title}
                variants={fadeUp}
                className="border-t border-bone/10 py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-xs tabular-nums text-smoke">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-medium text-bone">{item.title}</h3>
                    <p className="mt-2 text-bone/55">{item.body}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
