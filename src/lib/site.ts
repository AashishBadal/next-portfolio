/**
 * Centralized site content & identity.
 * Swap these values to make the portfolio your own — every section
 * reads from this single source of truth.
 */

export const SITE = {
  name: "Aashish Badal",
  initials: "AB",
  role: "Full Stack Developer",
  location: "Kathmandu — Remote worldwide",
  email: "aashishbadal4@gmail.com",
  availability: "Available for select work — Q3 2026",
  tagline:
    "I build web products end to end — clean, responsive interfaces backed by solid APIs and data models.",
  description:
    "Full Stack Developer building fast, accessible web apps with React, Next.js, and Node — from interface to database.",
  url: "https://aashishbadal.dev",
} as const;

export type NavLink = { label: string; href: string; index: string };

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about", index: "01" },
  { label: "Work", href: "#work", index: "02" },
  { label: "Expertise", href: "#expertise", index: "03" },
  { label: "Journey", href: "#journey", index: "04" },
  { label: "Contact", href: "#contact", index: "05" },
];

export const HERO = {
  // Each line animates in as a masked reveal.
  headline: ["Building the", "web with", "intent."],
  intro:
    "I'm Aashish — a full stack developer who loves turning ideas into clean, responsive web apps, from the interface down to the database.",
  meta: [
    { label: "Currently", value: "Full Stack Developer" },
    { label: "Focus", value: "React · Next.js · Node" },
  ],
} as const;

export const ABOUT = {
  lead: "I'm a full stack developer who likes building things that are simple to use and clean under the hood.",
  paragraphs: [
    "I work across the stack — crafting responsive interfaces with React and Next.js, and backing them with APIs and databases using Node, Express, and SQL or MongoDB. I started out focused on the frontend and kept following the problem all the way to the data layer.",
    "I care about the details that make software feel good: a smooth interaction, a fast response, a clear error message. I'm early in my career, learning fast, and I'd rather ship something small that works well than something big that doesn't.",
  ],
  philosophy: [
    {
      title: "Build it clean",
      body: "Readable, well-structured code I won't be afraid to come back to next month.",
    },
    {
      title: "User first",
      body: "Interfaces should be obvious. If it needs a manual, it needs a redesign.",
    },
    {
      title: "Keep learning",
      body: "Every project is a chance to pick up a new tool or do the last one better.",
    },
  ],
} as const;

export type SkillGroup = {
  index: string;
  category: string;
  caption: string;
  items: string[];
};

export const SKILLS: SkillGroup[] = [
  {
    index: "01",
    category: "Frontend",
    caption: "Interfaces that feel alive",
    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "GSAP"],
  },
  {
    index: "02",
    category: "Backend",
    caption: "Resilient services & APIs",
    items: ["Node.js", "Go", "GraphQL", "tRPC", "REST", "WebSockets"],
  },
  {
    index: "03",
    category: "Database",
    caption: "Modeling data that lasts",
    items: ["PostgreSQL", "Redis", "Prisma", "MongoDB", "Drizzle", "ClickHouse"],
  },
  {
    index: "04",
    category: "DevOps",
    caption: "Ship with confidence",
    items: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "Nginx", "Grafana"],
  },
  {
    index: "05",
    category: "Cloud",
    caption: "Infrastructure at scale",
    items: ["AWS", "Vercel", "Cloudflare", "GCP", "Supabase", "Fly.io"],
  },
  {
    index: "06",
    category: "AI / Automation",
    caption: "Leverage that compounds",
    items: ["OpenAI", "LangChain", "Vector DBs", "RAG", "Edge AI", "Pipelines"],
  },
];

export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  achievement: string;
  stack: string[];
  liveUrl: string; // deployed site
  githubUrl: string; // source repository
  image?: string; // path in /public; falls back to generative artwork when absent
  accent: string; // CSS color used for the project's tonal artwork
};

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "Interview AI",
    category: "AI Mock Interview Platform",
    year: "2026",
    summary:
      "An AI-powered mock interview platform with personalized questions, voice-based sessions, real-time feedback, and detailed performance reports — backed by resume analysis and a credit system.",
    achievement:
      "Voice interviews scored live on confidence, communication & correctness",
    stack: ["React", "Redux", "Express", "MongoDB", "OpenRouter"],
    liveUrl: "https://interview-ai-client1.onrender.com/",
    githubUrl: "https://github.com/AashishBadal/Interview-AI",
    image: "/interviewai.png",
    accent: "#5A6470",
  },
  {
    index: "02",
    title: "AI Zone",
    category: "AI SaaS Platform",
    year: "2026",
    summary:
      "A full-stack AI SaaS for content creators bundling six tools — article writing, blog titles, image generation and editing, and resume review — in one dashboard with auth, billing, and a community gallery.",
    achievement: "Six AI tools behind Clerk auth, billing, and usage-based plans",
    stack: ["React", "Express", "PostgreSQL", "Gemini", "Clerk"],
    liveUrl: "https://quickai-client-9f61.onrender.com/",
    githubUrl: "https://github.com/AashishBadal/AiZone",
    image: "/quickai.png",
    accent: "#6A5E72",
  },
];

export type ExperienceEntry = {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "Jan 18 — Apr 17 2026",
    role: "Frontend Developer",
    company: "BlackMoon Pvt Ltd",
    location: "Ekantakuna, Lalitpur",
    description:
      "Built responsive, interactive interfaces and shipped production features as part of the frontend team.",
    highlights: [
      "Delivered accessible, component-driven UI in a fast-paced team",
      "Collaborated across design and backend to ship features end to end",
    ],
  },
];

export type Social = { label: string; href: string };

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com/AashishBadal" },
  { label: "Read.cv", href: "https://read.cv" },
];
