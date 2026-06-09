import type { Variants } from "framer-motion";
import { EASE, DURATION } from "./easing";

/** Container that staggers its children's entrance. */
export const staggerContainer = (
  stagger = 0.08,
  delayChildren = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** A line/word rising into view from behind a mask. */
export const maskReveal: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DURATION.reveal, ease: EASE.expo },
  },
};

/** Subtle fade + lift used for blocks of content. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.outQuint },
  },
};

/** Plain fade for low-emphasis supporting elements. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.softOut },
  },
};

/** Horizontal divider that draws itself in. */
export const drawLine: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DURATION.slow, ease: EASE.inOutQuint },
  },
};

/** Default viewport config: animate once, trigger slightly before fully visible. */
export const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;
