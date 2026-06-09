"use client";

import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  ariaLabel?: string;
};

/**
 * Button or link with a magnetic hover. The shell follows the cursor and
 * the inner label counter-drifts slightly for depth. Renders as an anchor
 * when `href` is provided, otherwise a button.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.4,
  ariaLabel,
}: MagneticButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);

  const content = (
    <motion.span className="relative z-10 inline-flex items-center gap-2">
      {children}
    </motion.span>
  );

  const sharedClass = cn(
    "group relative inline-flex select-none items-center justify-center rounded-full",
    className,
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ x, y }}
        className={sharedClass}
        {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className={sharedClass}
    >
      {content}
    </motion.button>
  );
}
