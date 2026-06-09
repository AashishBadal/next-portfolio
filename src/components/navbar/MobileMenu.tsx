"use client";

import { motion } from "framer-motion";
import { NAV_LINKS, SITE, SOCIALS } from "@/lib/site";
import { EASE } from "@/animations/easing";

const overlay = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.7, ease: EASE.expo, when: "beforeChildren", staggerChildren: 0.06 },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.5, ease: EASE.inOutQuint },
  },
};

const item = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE.expo } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.3 } },
};

/** Full-screen mobile navigation overlay. */
export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={overlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 md:hidden"
    >
      <nav>
        <ul className="flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="overflow-hidden">
              <motion.a
                variants={item}
                href={link.href}
                onClick={onClose}
                className="flex items-baseline gap-4 py-2 text-5xl font-medium tracking-tightest text-bone"
              >
                <span className="text-sm tabular-nums text-smoke">{link.index}</span>
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div variants={item} className="space-y-6">
        <div className="rule" />
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-bone/70">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {social.label}
            </a>
          ))}
        </div>
        <a href={`mailto:${SITE.email}`} className="block text-lg text-bone">
          {SITE.email}
        </a>
      </motion.div>
    </motion.div>
  );
}
