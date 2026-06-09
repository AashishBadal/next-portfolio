import {
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siFramer,
  siGreensock,
  siNodedotjs,
  siGo,
  siGraphql,
  siTrpc,
  siPostgresql,
  siRedis,
  siPrisma,
  siMongodb,
  siDrizzle,
  siClickhouse,
  siDocker,
  siKubernetes,
  siGithubactions,
  siTerraform,
  siNginx,
  siGrafana,
  siVercel,
  siCloudflare,
  siGooglecloud,
  siSupabase,
  siFlydotio,
  siLangchain,
  siHtml5,
  siCss,
  siJavascript,
  siExpress,
  siMysql,
  siJira,
  siRedux,
} from "simple-icons";

export type TechIcon = {
  /** Human-readable brand name. */
  title: string;
  /** Brand hex (without #), revealed on hover. */
  hex: string;
  /** 24×24 SVG path data. */
  path: string;
};

/**
 * Registry keyed by the exact skill label used in `SITE` data. Labels that
 * have no recognized brand mark (REST, OpenAI, AWS, RAG, …) are simply
 * absent — consumers fall back to a text treatment.
 *
 * Brand marks are sourced from simple-icons; only `title`, `hex`, and
 * `path` are retained so the bundle stays lean.
 */
const pick = ({ title, hex, path }: TechIcon): TechIcon => ({ title, hex, path });

export const TECH_ICONS: Record<string, TechIcon> = {
  React: pick(siReact),
  "Next.js": pick(siNextdotjs),
  TypeScript: pick(siTypescript),
  Tailwind: pick(siTailwindcss),
  "Framer Motion": pick(siFramer),
  GSAP: pick(siGreensock),
  "Node.js": pick(siNodedotjs),
  Go: pick(siGo),
  GraphQL: pick(siGraphql),
  tRPC: pick(siTrpc),
  PostgreSQL: pick(siPostgresql),
  Redis: pick(siRedis),
  Prisma: pick(siPrisma),
  MongoDB: pick(siMongodb),
  Drizzle: pick(siDrizzle),
  ClickHouse: pick(siClickhouse),
  Docker: pick(siDocker),
  Kubernetes: pick(siKubernetes),
  "GitHub Actions": pick(siGithubactions),
  Terraform: pick(siTerraform),
  Nginx: pick(siNginx),
  Grafana: pick(siGrafana),
  Vercel: pick(siVercel),
  Cloudflare: pick(siCloudflare),
  GCP: pick(siGooglecloud),
  Supabase: pick(siSupabase),
  "Fly.io": pick(siFlydotio),
  LangChain: pick(siLangchain),
  HTML: pick(siHtml5),
  CSS: pick(siCss),
  JavaScript: pick(siJavascript),
  Express: pick(siExpress),
  MySQL: pick(siMysql),
  Jira: pick(siJira),
  Redux: pick(siRedux),
};

export function getTechIcon(name: string): TechIcon | undefined {
  return TECH_ICONS[name];
}

/**
 * Ordered set of headline brands featured in the assembling logo cluster.
 * All are guaranteed present in `TECH_ICONS`.
 */
export const CLUSTER_TECH: string[] = [
  // Original cluster
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "GSAP",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Prisma",
  "MongoDB",
  "Express",
  "MySQL",
  "Jira",
  "Redux",
];
