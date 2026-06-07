import type { ReactElement } from "react";
import type { ProjectSlug } from "@/content/projects";

type DiagramProps = {
  slug: ProjectSlug;
  className?: string;
};

const gradientId = "capability-gradient";

function DiagramDefs() {
  return (
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="55%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <filter id="capability-glow">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
}

function HarnessDiagram() {
  return (
    <svg viewBox="0 0 480 280" role="img" aria-label="Harness governed runtime loop diagram">
      <DiagramDefs />
      <rect width="480" height="280" rx="12" fill="#0c101c" stroke="#1e2a45" />
      <text x="24" y="32" fill="#8b9dc4" fontFamily="ui-monospace, monospace" fontSize="11">
        RUNTIME_LOOP
      </text>
      <circle cx="240" cy="140" r="44" fill="none" stroke="#1e2a45" />
      <circle cx="240" cy="140" r="28" fill="#111827" stroke="url(#capability-gradient)" strokeWidth="2" />
      <text x="240" y="144" textAnchor="middle" fill="#22d3ee" fontSize="11" fontFamily="ui-monospace, monospace">
        loop
      </text>
      {[
        { x: 240, y: 56, label: "policy" },
        { x: 384, y: 140, label: "tools" },
        { x: 240, y: 224, label: "memory" },
        { x: 96, y: 140, label: "model" }
      ].map((node) => (
        <g key={node.label}>
          <line x1="240" y1="140" x2={node.x} y2={node.y} stroke="#1e2a45" />
          <rect x={node.x - 36} y={node.y - 16} width="72" height="32" rx="8" fill="#111827" stroke="#1e2a45" />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill="#f0f4ff"
            fontSize="10"
            fontFamily="ui-monospace, monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
      <path
        d="M200 140 A40 40 0 1 1 280 140"
        fill="none"
        stroke="url(#capability-gradient)"
        strokeWidth="2"
        filter="url(#capability-glow)"
      />
    </svg>
  );
}

function RegistryDiagram() {
  return (
    <svg viewBox="0 0 480 280" role="img" aria-label="UI Registry token and component diagram">
      <DiagramDefs />
      <rect width="480" height="280" rx="12" fill="#0c101c" stroke="#1e2a45" />
      <text x="24" y="32" fill="#8b9dc4" fontFamily="ui-monospace, monospace" fontSize="11">
        REGISTRY_SEAM
      </text>
      <rect x="40" y="56" width="140" height="180" rx="10" fill="#111827" stroke="#1e2a45" />
      <text x="56" y="80" fill="#22d3ee" fontSize="10" fontFamily="ui-monospace, monospace">
        tokens
      </text>
      {[0, 1, 2, 3].map((row) => (
        <rect
          key={row}
          x="56"
          y={96 + row * 32}
          width="108"
          height="20"
          rx="4"
          fill={row === 1 ? "url(#capability-gradient)" : "#0c101c"}
          stroke="#1e2a45"
        />
      ))}
      <rect x="300" y="56" width="140" height="180" rx="10" fill="#111827" stroke="#1e2a45" />
      <text x="316" y="80" fill="#8b5cf6" fontSize="10" fontFamily="ui-monospace, monospace">
        components
      </text>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <rect x="316" y={96 + row * 44} width="108" height="28" rx="6" fill="#0c101c" stroke="#1e2a45" />
          <circle cx="328" cy={110 + row * 44} r="4" fill="url(#capability-gradient)" />
        </g>
      ))}
      <path
        d="M180 146 L300 146"
        stroke="url(#capability-gradient)"
        strokeWidth="2"
        filter="url(#capability-glow)"
      />
      <polygon points="292,142 300,146 292,150" fill="#22d3ee" />
    </svg>
  );
}

function OrchestraDiagram() {
  return (
    <svg viewBox="0 0 480 280" role="img" aria-label="Orchestra coordination diagram">
      <DiagramDefs />
      <rect width="480" height="280" rx="12" fill="#0c101c" stroke="#1e2a45" />
      <text x="24" y="32" fill="#8b9dc4" fontFamily="ui-monospace, monospace" fontSize="11">
        COORDINATION
      </text>
      <rect x="180" y="48" width="120" height="48" rx="10" fill="#111827" stroke="url(#capability-gradient)" />
      <text x="240" y="78" textAnchor="middle" fill="#f0f4ff" fontSize="10" fontFamily="ui-monospace, monospace">
        conductor
      </text>
      {[
        { x: 80, y: 180, label: "squad_a" },
        { x: 200, y: 210, label: "squad_b" },
        { x: 320, y: 180, label: "squad_c" },
        { x: 400, y: 210, label: "verify" }
      ].map((node) => (
        <g key={node.label}>
          <line x1="240" y1="96" x2={node.x} y2={node.y - 16} stroke="#1e2a45" />
          <rect x={node.x - 40} y={node.y - 16} width="80" height="32" rx="8" fill="#111827" stroke="#1e2a45" />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill="#8b9dc4"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
      <path d="M60 240 H420" stroke="#1e2a45" strokeDasharray="4 4" />
      <text x="60" y="258" fill="#22d3ee" fontSize="9" fontFamily="ui-monospace, monospace">
        event_stream
      </text>
    </svg>
  );
}

function IntercalDiagram() {
  return (
    <svg viewBox="0 0 480 280" role="img" aria-label="Intercal temporal knowledge diagram">
      <DiagramDefs />
      <rect width="480" height="280" rx="12" fill="#0c101c" stroke="#1e2a45" />
      <text x="24" y="32" fill="#8b9dc4" fontFamily="ui-monospace, monospace" fontSize="11">
        TEMPORAL_DELTA
      </text>
      <line x1="60" y1="200" x2="420" y2="200" stroke="#1e2a45" />
      {[80, 160, 240, 320, 400].map((x, index) => (
        <g key={x}>
          <line x1={x} y1="200" x2={x} y2={120 - index * 8} stroke="url(#capability-gradient)" strokeWidth="2" />
          <circle cx={x} cy={120 - index * 8} r="6" fill="#22d3ee" filter="url(#capability-glow)" />
          <text x={x} y="228" textAnchor="middle" fill="#8b9dc4" fontSize="9" fontFamily="ui-monospace, monospace">
            t{index}
          </text>
        </g>
      ))}
      <path
        d="M80 120 Q160 90 240 110 T400 80"
        fill="none"
        stroke="#8b5cf6"
        strokeOpacity="0.6"
        strokeWidth="1.5"
      />
      <rect x="60" y="56" width="120" height="28" rx="6" fill="#111827" stroke="#1e2a45" />
      <text x="72" y="75" fill="#22d3ee" fontSize="9" fontFamily="ui-monospace, monospace">
        provenance
      </text>
    </svg>
  );
}

function CollectivaDiagram() {
  return (
    <svg viewBox="0 0 480 280" role="img" aria-label="Collectiva governance society diagram">
      <DiagramDefs />
      <rect width="480" height="280" rx="12" fill="#0c101c" stroke="#1e2a45" />
      <text x="24" y="32" fill="#8b9dc4" fontFamily="ui-monospace, monospace" fontSize="11">
        OPEN_SOCIETY
      </text>
      <circle cx="240" cy="148" r="64" fill="none" stroke="#1e2a45" />
      <circle cx="240" cy="148" r="48" fill="#111827" stroke="url(#capability-gradient)" strokeWidth="1.5" />
      <text x="240" y="152" textAnchor="middle" fill="#f0f4ff" fontSize="10" fontFamily="ui-monospace, monospace">
        governance
      </text>
      {[
        { x: 120, y: 80, label: "deposit" },
        { x: 360, y: 80, label: "reputation" },
        { x: 120, y: 216, label: "public" },
        { x: 360, y: 216, label: "policy" }
      ].map((node) => (
        <g key={node.label}>
          <line x1="240" y1="148" x2={node.x} y2={node.y} stroke="#1e2a45" strokeDasharray="3 3" />
          <rect x={node.x - 36} y={node.y - 14} width="72" height="28" rx="14" fill="#0c101c" stroke="#22d3ee" strokeOpacity="0.5" />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fill="#8b9dc4"
            fontSize="9"
            fontFamily="ui-monospace, monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const diagrams: Record<ProjectSlug, () => ReactElement> = {
  harness: HarnessDiagram,
  registry: RegistryDiagram,
  orchestra: OrchestraDiagram,
  intercal: IntercalDiagram,
  collectiva: CollectivaDiagram
};

export function ProjectCapabilityDiagram({ slug, className }: DiagramProps) {
  const Diagram = diagrams[slug];

  return (
    <div className={className ?? "capability-diagram"}>
      <Diagram />
    </div>
  );
}