"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS, SITE } from "@/lib/site";
import { EASE } from "@/animations/easing";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/useActiveSection";
import { MobileMenu } from "./MobileMenu";

// Stable list of section ids the nav tracks (derived once at module scope).
const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

/**
 * Fixed top navigation. Condenses into a translucent pill once the user
 * scrolls past the hero, and exposes a full-screen overlay menu on mobile.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 80);
  });

  // Lock body scroll while the mobile overlay is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE.expo, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          className={cn(
            "shell flex items-center justify-between transition-all duration-500 ease-expo",
            condensed ? "py-4" : "py-6",
          )}
        >
          <a
            href="#top"
            className="group flex items-center gap-3 text-sm font-medium tracking-tight"
            aria-label={`${SITE.name} — back to top`}
          >
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-bone/15 transition-colors duration-500 group-hover:border-bone/40">
              <Image
                src="/logo.png"
                alt={`${SITE.name} logo`}
                width={36}
                height={36}
                priority
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden sm:block">{SITE.name}</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative text-sm transition-colors duration-300 hover:text-bone",
                      isActive ? "text-bone" : "text-bone/70",
                    )}
                  >
                    <span
                      className={cn(
                        "mr-1 text-[10px] tabular-nums transition-colors duration-300",
                        isActive ? "text-bone/80" : "text-smoke/70",
                      )}
                    >
                      {link.index}
                    </span>
                    {link.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full origin-left bg-bone/60 transition-transform duration-500 ease-expo group-hover:scale-x-100",
                        isActive ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden rounded-full border border-bone/15 px-5 py-2 text-sm text-bone/90 transition-colors duration-500 ease-expo hover:border-bone/50 hover:bg-bone hover:text-ink md:inline-flex"
            >
              Let&apos;s talk
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE.expo }}
                className="block h-px w-6 bg-bone"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.4, ease: EASE.expo }}
                className="block h-px w-6 bg-bone"
              />
            </button>
          </div>
        </nav>

        {/* Condensed backdrop */}
        <motion.div
          aria-hidden
          initial={false}
          animate={{ opacity: condensed && !menuOpen ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE.expo }}
          className="absolute inset-0 -z-10 border-b border-bone/5 bg-ink/70 backdrop-blur-xl"
        />
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
