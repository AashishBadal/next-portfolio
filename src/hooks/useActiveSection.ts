"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy. Observes the given section ids and returns the one currently
 * crossing the viewport's focus band, so navigation can reflect where the
 * reader actually is. Uses a single IntersectionObserver — no scroll
 * listeners, no layout thrash.
 *
 * @param ids section element ids, in document order
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Track each section's intersection ratio and pick the most prominent.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      {
        // Focus band roughly centered in the viewport.
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
