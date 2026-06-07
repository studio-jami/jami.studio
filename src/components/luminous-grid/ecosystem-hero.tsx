import type { StudioProject } from "@/content/projects";

type NodePosition = {
  x: number;
  y: number;
  label: string;
  slug: string;
};

const nodePositions: NodePosition[] = [
  { x: 200, y: 88, label: "Harness", slug: "harness" },
  { x: 340, y: 168, label: "Registry", slug: "registry" },
  { x: 280, y: 268, label: "Orchestra", slug: "orchestra" },
  { x: 120, y: 268, label: "Intercal", slug: "intercal" },
  { x: 60, y: 168, label: "Collectiva", slug: "collectiva" }
];

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
  const w = 72;
  const h = 36;
  const d = 18;
  const top = `M${x} ${y - h} L${x + w / 2} ${y - h + d} L${x} ${y - h + d * 2} L${x - w / 2} ${y - h + d} Z`;
  const left = `M${x - w / 2} ${y - h + d} L${x} ${y - h + d * 2} L${x} ${y + d} L${x - w / 2} ${y} Z`;
  const right = `M${x + w / 2} ${y - h + d} L${x} ${y - h + d * 2} L${x} ${y + d} L${x + w / 2} ${y} Z`;

  return (
    <g>
      <path d={left} fill={accent ? "#1d4ed8" : "#e2e8f0"} />
      <path d={right} fill={accent ? "#2563eb" : "#f1f5f9"} />
      <path d={top} fill={accent ? "#3b82f6" : "#ffffff"} stroke="#e2e8f0" strokeWidth="0.5" />
      <text
        x={x}
        y={y - h + d + 6}
        textAnchor="middle"
        fill={accent ? "#ffffff" : "#0f172a"}
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-plus-jakarta), system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

export function EcosystemHero({ projects }: { projects: StudioProject[] }) {
  const projectMap = new Map(projects.map((p) => [p.slug, p]));

  return (
    <svg
      viewBox="0 0 400 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="lg-ecosystem-svg"
      role="img"
      aria-label="Isometric diagram of the jami.studio ecosystem with five connected product modules"
    >
      <defs>
        <linearGradient id="lg-grid-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" stopOpacity="0" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="1" />
        </linearGradient>
        <filter id="lg-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Dot grid background */}
      <pattern id="lg-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.75" fill="#cbd5e1" opacity="0.5" />
      </pattern>
      <rect width="400" height="340" fill="url(#lg-dots)" />
      <rect width="400" height="60" fill="url(#lg-grid-fade)" />

      {/* Connection lines */}
      <g stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6">
        {nodePositions.map((node) => (
          <line key={`line-${node.slug}`} x1="200" y1="148" x2={node.x} y2={node.y - 10} />
        ))}
      </g>

      {/* Central hub */}
      <g filter="url(#lg-shadow)">
        <IsometricNode x={200} y={148} label="jami.studio" accent />
      </g>

      {/* Product nodes */}
      {nodePositions.map((node) => {
        const project = projectMap.get(node.slug as StudioProject["slug"]);
        if (!project) return null;
        return (
          <g key={node.slug} filter="url(#lg-shadow)">
            <IsometricNode x={node.x} y={node.y} label={project.shortName} />
          </g>
        );
      })}

      {/* Floating accent elements */}
      <circle cx="360" cy="48" r="3" fill="#2563eb" opacity="0.4" />
      <circle cx="32" cy="72" r="2" fill="#3b82f6" opacity="0.3" />
      <rect x="320" y="300" width="24" height="4" rx="2" fill="#e2e8f0" />
      <rect x="56" y="24" width="16" height="4" rx="2" fill="#e2e8f0" />
    </svg>
  );
}