"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

/**
 * Single GSAP registration point. Importing { gsap, ScrollTrigger,
 * MotionPathPlugin } from here guarantees the plugins are registered exactly
 * once and only in the browser.
 */
let registered = false;

export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  registered = true;
}

registerGsap();

export { gsap, ScrollTrigger, MotionPathPlugin };
