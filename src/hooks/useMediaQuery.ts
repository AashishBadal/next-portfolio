"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. Returns false during SSR and on the
 * first client paint, then updates once mounted to avoid hydration drift.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Convenience: true when a fine pointer (mouse) is available. */
export function useHasPointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}
