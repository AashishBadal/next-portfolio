import { getTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

type TechLogoProps = {
  name: string;
  className?: string;
};

/**
 * Renders a brand mark for a given tech name as a monochrome SVG (it
 * inherits `currentColor`). Returns null when no mark exists so callers can
 * fall back to a text label.
 */
export function TechLogo({ name, className }: TechLogoProps) {
  const icon = getTechIcon(name);
  if (!icon) return null;

  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className={cn("h-full w-full", className)}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}
