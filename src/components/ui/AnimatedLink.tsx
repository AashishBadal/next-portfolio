"use client";

import { cn } from "@/lib/utils";

type AnimatedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

/**
 * Inline link with a clip-path underline that wipes in from the left on
 * hover/focus — a small, restrained interaction used throughout the site.
 */
export function AnimatedLink({
  href,
  children,
  className,
  external,
}: AnimatedLinkProps) {
  const isExternal = external ?? href.startsWith("http");
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-block w-fit text-bone/80 transition-colors duration-500 ease-expo hover:text-bone focus-visible:text-bone focus-visible:outline-none",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100" />
      </span>
    </a>
  );
}
