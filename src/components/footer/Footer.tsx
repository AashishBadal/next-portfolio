"use client";

import { NAV_LINKS, SITE, SOCIALS } from "@/lib/site";
import { LocalTime } from "./LocalTime";

/**
 * Site footer. Navigation, socials, a live clock, and a back-to-top control.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-bone/10 pt-20" aria-label="Footer">
      <div className="shell grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-sm text-lg text-bone/70">{SITE.tagline}</p>
          <a
            href={`mailto:${SITE.email}`}
            className="mt-6 inline-block text-bone underline-offset-4 hover:underline"
          >
            {SITE.email}
          </a>
        </div>

        <nav className="md:col-span-3 md:col-start-7" aria-label="Footer navigation">
          <h3 className="mb-4 text-xs uppercase tracking-[0.22em] text-smoke">
            Navigate
          </h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-bone/70 transition-colors duration-300 hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3 md:col-start-10">
          <h3 className="mb-4 text-xs uppercase tracking-[0.22em] text-smoke">
            Elsewhere
          </h3>
          <ul className="space-y-2">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-bone/70 transition-colors duration-300 hover:text-bone"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-4 border-t border-bone/10 py-8 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {currentYear} {SITE.name}. Crafted with intent.
        </span>
        <span className="flex items-center gap-6">
          <LocalTime />
          <a
            href="#top"
            className="group inline-flex items-center gap-2 text-bone/70 transition-colors hover:text-bone"
          >
            Back to top
            <span aria-hidden className="transition-transform duration-500 ease-expo group-hover:-translate-y-1">
              ↑
            </span>
          </a>
        </span>
      </div>
    </footer>
  );
}
