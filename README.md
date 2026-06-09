# Adrian Cole — Portfolio

A premium, production-ready portfolio for a Full Stack Developer. Minimal,
editorial, and motion-led — built to feel handcrafted rather than templated.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** (custom editorial design tokens)
- **Framer Motion** — reveals, staggers, hover & micro-interactions
- **GSAP + ScrollTrigger** — hero sequence, parallax, marquees, timeline
- **Lenis** — global smooth scrolling (synced to GSAP's ticker)
- **Poppins** via `next/font` (self-hosted, zero layout shift)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing content

Everything visible on the page — identity, copy, projects, skills,
experience, and links — lives in **`src/lib/site.ts`**. Swap those values to
make the portfolio your own; no component edits required.

## Structure

```
src/
├── app/                 # layout, page, global styles
├── components/
│   ├── navbar/          # Navbar, MobileMenu
│   ├── hero/            # Hero, HeroBackground, ScrollIndicator
│   ├── about/           # About, Stat (count-up)
│   ├── projects/        # Projects, ProjectItem, ProjectVisual
│   ├── skills/          # Skills, SkillCard
│   ├── experience/      # Experience, ExperienceRow, TimelineProgress
│   ├── contact/         # Contact
│   ├── footer/          # Footer, LocalTime
│   ├── providers/       # SmoothScroll (Lenis)
│   └── ui/              # RevealText, MagneticButton, AnimatedLink,
│                        # SectionHeading, Marquee, Cursor
├── hooks/               # usePrefersReducedMotion, useMediaQuery, useMagnetic
├── animations/          # easing, variants, gsap registration
└── lib/                 # site content + utils
```

## Notes on craft

- **Accessibility** — semantic landmarks, skip link, visible focus rings,
  reduced-motion support across every animation, and keyboard-navigable.
- **Performance** — static prerender, self-hosted font, no image payloads
  (project artwork is generated with CSS), `console` stripped in production.
- **Motion discipline** — one easing system shared by Framer & GSAP; Lenis
  drives a single RAF loop forwarded to GSAP to avoid jank.
