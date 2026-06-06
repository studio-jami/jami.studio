export type ProjectSlug = "harness" | "registry" | "orchestra" | "intercal" | "collectiva";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "primary" | "secondary" | "repo" | "docs" | "api";
};

export type StudioProject = {
  slug: ProjectSlug;
  name: string;
  shortName: string;
  route: `/projects/${ProjectSlug}`;
  subdomain: string;
  domainTarget: string;
  repoUrl: string;
  docsUrl: string;
  apiUrl?: string;
  summary: string;
  aiSummary: string;
  positioning: string;
  audience: string;
  capabilities: string[];
  proofPoints: string[];
  ctas: ProjectLink[];
  socialImage: string;
  internalStatus: "planned" | "foundation" | "live";
};

const githubOrg = "https://github.com/studio-jami";

export const projects = [
  {
    slug: "harness",
    name: "Jami Agent Harness",
    shortName: "Harness",
    route: "/projects/harness",
    subdomain: "harness.jami.studio",
    domainTarget: "https://harness.jami.studio",
    repoUrl: `${githubOrg}/harness`,
    docsUrl: "https://harness.jami.studio/docs",
    apiUrl: "https://harness.jami.studio/api",
    summary: "A governed agent runtime and BYOK reference foundation.",
    aiSummary:
      "Harness is the Studio runtime layer for governed agent loops, durable runs, provider abstraction, tool contracts, memory, and policy-gated dual invocation.",
    positioning:
      "Run agents through one governed loop where tools, memory, approvals, model routing, and user-facing actions share the same contract.",
    audience:
      "Developers building agent-native products that need control, auditability, and provider choice.",
    capabilities: [
      "Governed run loop with policy checks before every action",
      "BYOK-friendly engine registry and model catalog",
      "Shared contracts for human UI actions and agent tool calls",
      "Durable run state, memory, and resumable execution"
    ],
    proofPoints: [
      "Designed around one enforcement path instead of UI backdoors",
      "Provider choices live in adapters and configuration",
      "Keeps runtime implementation outside the marketing site"
    ],
    ctas: [
      { label: "Explore Harness", href: "/projects/harness", kind: "primary" },
      { label: "Repository", href: `${githubOrg}/harness`, kind: "repo" }
    ],
    socialImage: "/social/harness.svg",
    internalStatus: "foundation"
  },
  {
    slug: "registry",
    name: "Studio UI Registry",
    shortName: "UI Registry",
    route: "/projects/registry",
    subdomain: "registry.jami.studio",
    domainTarget: "https://registry.jami.studio",
    repoUrl: `${githubOrg}/ui`,
    docsUrl: "https://registry.jami.studio/docs",
    apiUrl: "https://registry.jami.studio/api",
    summary: "A tokenized UI registry and trusted render contract.",
    aiSummary:
      "Studio UI Registry is the shared token and component vocabulary for trusted agent-rendered interfaces, with build-time registry seeding and runtime allowlisted payload rendering.",
    positioning:
      "Give agents a safe UI vocabulary: data payloads name resident components, props validate, and the app renders without accepting injected code.",
    audience:
      "Teams that want agent-authored interfaces without surrendering design systems or runtime safety.",
    capabilities: [
      "Tokenized visual system with registry-ready theme metadata",
      "Build-time component seeding through source-owned primitives",
      "Runtime allowlist for agent-emitted UI payloads",
      "Graceful fallbacks for unknown components or invalid props"
    ],
    proofPoints: [
      "Separates source installation from runtime rendering",
      "Treats tokens as public product infrastructure",
      "Seeds the marketing site's own theme foundation"
    ],
    ctas: [
      { label: "Explore UI Registry", href: "/projects/registry", kind: "primary" },
      { label: "Repository", href: `${githubOrg}/ui`, kind: "repo" }
    ],
    socialImage: "/social/registry.svg",
    internalStatus: "foundation"
  },
  {
    slug: "orchestra",
    name: "Orchestra",
    shortName: "Orchestra",
    route: "/projects/orchestra",
    subdomain: "orchestra.jami.studio",
    domainTarget: "https://orchestra.jami.studio",
    repoUrl: `${githubOrg}/orchestra`,
    docsUrl: "https://orchestra.jami.studio/docs",
    apiUrl: "https://orchestra.jami.studio/api",
    summary: "A development and multi-agent coordination framework.",
    aiSummary:
      "Orchestra coordinates work records, squads, scheduling, approvals, and supervised harness runs without reimplementing the core agent loop.",
    positioning:
      "Coordinate multi-agent work through durable records, approvals, and supervised runs while keeping product orchestration separate from dev-system automation.",
    audience:
      "Builders coordinating teams of humans and agents across long-running implementation work.",
    capabilities: [
      "Tracker-agnostic work records",
      "Squad and scheduling primitives",
      "Harness-run supervision through event streams",
      "Verification ladders and approval checkpoints"
    ],
    proofPoints: [
      "Keeps the agent loop in Harness and orchestration in Orchestra",
      "Supports a gradual path from single-agent work to supervised squads",
      "Turns coordination state into durable source, not chat memory"
    ],
    ctas: [
      { label: "Explore Orchestra", href: "/projects/orchestra", kind: "primary" },
      { label: "Repository", href: `${githubOrg}/orchestra`, kind: "repo" }
    ],
    socialImage: "/social/orchestra.svg",
    internalStatus: "foundation"
  },
  {
    slug: "intercal",
    name: "Intercal",
    shortName: "Intercal",
    route: "/projects/intercal",
    subdomain: "intercal.jami.studio",
    domainTarget: "https://intercal.jami.studio",
    repoUrl: `${githubOrg}/intercal`,
    docsUrl: "https://intercal.jami.studio/docs",
    apiUrl: "https://intercal.jami.studio/api",
    summary: "A provenance-backed temporal knowledge substrate.",
    aiSummary:
      "Intercal is the temporal and delta knowledge layer for provenance-backed updates, changelog-oriented knowledge, and agent-readable freshness.",
    positioning:
      "Make changing knowledge legible: provenance, deltas, freshness, and temporal context exposed for products and agents.",
    audience:
      "Teams that need agents to reason over what changed, why it changed, and which source supports it.",
    capabilities: [
      "Temporal records and delta-oriented knowledge",
      "Provenance-first source posture",
      "Agent-readable public surface",
      "Subdomain integration with the Studio family"
    ],
    proofPoints: [
      "Treated as its own product surface, not absorbed into the marketing repo",
      "Designed as a shared substrate for freshness-sensitive products",
      "Links can move through centralized metadata"
    ],
    ctas: [
      { label: "Explore Intercal", href: "/projects/intercal", kind: "primary" },
      { label: "Live surface", href: "https://intercal.jami.studio", kind: "secondary" }
    ],
    socialImage: "/social/intercal.svg",
    internalStatus: "live"
  },
  {
    slug: "collectiva",
    name: "Collectiva",
    shortName: "Collectiva",
    route: "/projects/collectiva",
    subdomain: "collectiva.jami.studio",
    domainTarget: "https://collectiva.jami.studio",
    repoUrl: `${githubOrg}/collectiva`,
    docsUrl: "https://collectiva.jami.studio/docs",
    apiUrl: "https://collectiva.jami.studio/api",
    summary: "An open agent society and governance layer.",
    aiSummary:
      "Collectiva is the Studio family surface for open agent society mechanics: deposits, reputation, governance, and public-view harnesses.",
    positioning:
      "Give autonomous and assisted agents a social layer: visible governance, reputation, commitments, and public participation.",
    audience: "Communities and builders exploring open, governed agent collaboration.",
    capabilities: [
      "Agent society and public participation model",
      "Deposit and reputation-oriented governance primitives",
      "Public-view harness patterns",
      "Composable with Harness, Registry, Orchestra, and Intercal"
    ],
    proofPoints: [
      "Presented as a coherent family member with its own future host",
      "Boundaries stay clear: this site markets it, separate repos build it",
      "Central metadata owns the route and link contract"
    ],
    ctas: [
      { label: "Explore Collectiva", href: "/projects/collectiva", kind: "primary" },
      { label: "Repository", href: `${githubOrg}/collectiva`, kind: "repo" }
    ],
    socialImage: "/social/collectiva.svg",
    internalStatus: "planned"
  }
] satisfies StudioProject[];

export function getProject(slug: string): StudioProject | undefined {
  return projects.find((project) => project.slug === slug);
}
