import type { StudioProject } from "@/content/projects";

type NodePosition = {
  x: number;
  y: number;
  label: string;
  slug: string;
};

const nodePositions: NodePosition[] = [
  { x: 200, y: 84, label: "Harness", slug: "harness" },
  { x: 318, y: 162, label: "Registry", slug: "registry" },
  { x: 268, y: 258, label: "Orchestra", slug: "orchestra" },
  { x: 132, y: 258, label: "Intercal", slug: "intercal" },
  { x: 82, y: 162, label: "Collectiva", slug: "collectiva" }
];

const diagramLabels: Partial<Record<StudioProject["slug"], string>> = {
  registry: "Registry"
};

function IsometricNode({
  x,
  y,
  label,
  accent = false
}: {
  x: number;
  y: number;
  label: string;
  accent?: boolean;
}) {
  const w = 68;
  const h = 34;
  const d = 17;
  const top = `M${x} ${y - h} L${x + w / 2} ${y - h + d} L${x} ${y - h + d * 2} L${x - w / 2} ${y - h + d} Z`;
  const left = `M${x - w / 2} ${y - h + d} L${x} ${y - h + d * 2} L${x} ${y + d} L${x - w / 2} ${y} Z`;
  const right = `M${x + w / 2} ${y - h + d} L${x} ${y - h + d * 2} L${x} ${y + d} L${x + w / 2} ${y} Z`;
  const edge = `M${x - w / 2} ${y - h + d} L${x} ${y - h + d * 2} L${x + w / 2} ${y - h + d}`;

  return (
    <g className={accent ? "lg-iso-node lg-iso-node--accent" : "lg-iso-node"}>
      <path className="lg-iso-face lg-iso-face--left" d={left} />
      <path className="lg-iso-face lg-iso-face--right" d={right} />
      <path className="lg-iso-face lg-iso-face--top" d={top} />
      <path className="lg-iso-edge" d={edge} />
      <text
        x={x}
        y={y - h + d + 5}
        textAnchor="middle"
        className={accent ? "lg-iso-label lg-iso-label--accent" : "lg-iso-label"}
      >
        {label}
      </text>
    </g>
  );
}

export function EcosystemHero({ projects }: { projects: StudioProject[] }) {
  const projectMap = new Map(projects.map((p) => [p.slug, p]));
  const hubY = 142;

  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="lg-ecosystem-svg"
      role="img"
      aria-label="Isometric diagram of the jami.studio ecosystem with five connected product modules"
    >
      <defs>
        <linearGradient id="lg-hub-glow" x1="200" y1="100" x2="200" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lg-line-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--muted-foreground)" stopOpacity="0.35" />
        </linearGradient>
        <filter id="lg-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.07" />
        </filter>
        <filter id="lg-shadow-accent" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="var(--accent)" floodOpacity="0.22" />
        </filter>
        <pattern id="lg-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.65" className="lg-iso-dot" />
        </pattern>
      </defs>

      <rect width="400" height="320" fill="url(#lg-dots)" className="lg-iso-canvas" />
      <ellipse cx="200" cy={hubY} rx="92" ry="36" fill="url(#lg-hub-glow)" />

      <g className="lg-iso-links" aria-hidden="true">
        {nodePositions.map((node) => (
          <line
            key={`line-${node.slug}`}
            x1="200"
            y1={hubY - 8}
            x2={node.x}
            y2={node.y - 12}
            stroke="url(#lg-line-fade)"
            strokeWidth="1.25"
            strokeDasharray="5 4"
            strokeLinecap="round"
          />
        ))}
      </g>

      <g className="lg-iso-links lg-iso-links--pulse" aria-hidden="true">
        {nodePositions.map((node) => (
          <line
            key={`pulse-${node.slug}`}
            x1="200"
            y1={hubY - 8}
            x2={node.x}
            y2={node.y - 12}
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="4 96"
            strokeLinecap="round"
            opacity="0.5"
          />
        ))}
      </g>

      <g filter="url(#lg-shadow-accent)">
        <IsometricNode x={200} y={hubY} label="jami.studio" accent />
      </g>

      {nodePositions.map((node) => {
        const project = projectMap.get(node.slug as StudioProject["slug"]);
        if (!project) return null;
        const label = diagramLabels[project.slug] ?? project.shortName;
        return (
          <g key={node.slug} filter="url(#lg-shadow)">
            <IsometricNode x={node.x} y={node.y} label={label} />
          </g>
        );
      })}

      <g className="lg-iso-orbit" aria-hidden="true">
        <circle cx="338" cy="42" r="2.5" className="lg-iso-orbit-dot" />
        <circle cx="48" cy="58" r="1.75" className="lg-iso-orbit-dot lg-iso-orbit-dot--soft" />
        <rect x="52" y="28" width="20" height="3" rx="1.5" className="lg-iso-orbit-bar" />
        <rect x="312" y="286" width="28" height="3" rx="1.5" className="lg-iso-orbit-bar" />
      </g>
    </svg>
  );
}