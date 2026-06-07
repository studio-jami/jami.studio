import type { ReactNode } from "react";
import type { ProjectSlug } from "@/content/projects";
import { atlasPalette } from "./atlas-palette";

type IllustrationProps = {
  className?: string;
};

function IllustrationFrame({ className, children, label }: IllustrationProps & { children: ReactNode; label: string }) {
  return (
    <svg className={className} viewBox="0 0 480 200" role="img" aria-label={label}>
      <defs>
        <radialGradient id={`${label}-vignette`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={atlasPalette.gold} stopOpacity="0.1" />
          <stop offset="55%" stopColor={atlasPalette.panel} stopOpacity="0.25" />
          <stop offset="100%" stopColor={atlasPalette.background} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${label}-gold`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={atlasPalette.gold} stopOpacity="0.8" />
          <stop offset="100%" stopColor={atlasPalette.slate} stopOpacity="0.25" />
        </linearGradient>
        <filter id={`${label}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="480" height="200" fill={`url(#${label}-vignette)`} />
      {children}
    </svg>
  );
}

function HarnessIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationFrame className={className} label="harness-loop">
      <ellipse cx="240" cy="100" rx="168" ry="72" fill="none" stroke={atlasPalette.border} strokeWidth="0.7" opacity="0.55" />
      <ellipse cx="240" cy="100" rx="118" ry="52" fill="none" stroke={atlasPalette.borderSoft} strokeWidth="0.5" opacity="0.4" />
      <circle cx="240" cy="100" r="38" fill={atlasPalette.panel} stroke="url(#harness-loop-gold)" strokeWidth="1.5" />
      <path d="M240 62 L240 138 M202 100 L278 100" stroke={atlasPalette.gold} strokeWidth="1" opacity="0.55" />
      <circle cx="240" cy="100" r="9" fill={atlasPalette.gold} />
      <circle cx="240" cy="100" r="3" fill={atlasPalette.goldBright} opacity="0.5" />
      {[
        [118, 100],
        [362, 100],
        [240, 28],
        [240, 172]
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`} filter="url(#harness-loop-soft)">
          <circle cx={cx} cy={cy} r="7" fill={atlasPalette.panelRaised} stroke={atlasPalette.slate} strokeWidth="1" />
          <circle cx={cx} cy={cy} r="2" fill={atlasPalette.gold} opacity="0.5" />
        </g>
      ))}
      <path
        d="M125 100 L202 100 M278 100 L355 100 M240 35 L240 62 M240 138 L240 165"
        stroke={atlasPalette.gold}
        strokeWidth="0.7"
        opacity="0.38"
      />
      <rect x="208" y="86" width="64" height="28" rx="5" fill="none" stroke={atlasPalette.gold} strokeWidth="0.7" opacity="0.45" />
      <path d="M214 100 H266" stroke={atlasPalette.slate} strokeWidth="0.5" strokeDasharray="3 4" opacity="0.4" />
    </IllustrationFrame>
  );
}

function RegistryIllustration({ className }: IllustrationProps) {
  const tiles = [
    [80, 38],
    [200, 38],
    [320, 38],
    [140, 118],
    [260, 118]
  ];

  return (
    <IllustrationFrame className={className} label="registry-grid">
      <g stroke={atlasPalette.border} strokeWidth="0.7" fill="none" opacity="0.7">
        {tiles.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="80" height="56" rx="6" />
        ))}
      </g>
      <g fill={atlasPalette.gold} opacity="0.65">
        {tiles.map(([x, y]) => (
          <rect key={`bar-${x}`} x={x + 16} y={y + 18} width="48" height="7" rx="2" />
        ))}
      </g>
      <g stroke={atlasPalette.gold} strokeWidth="0.7" fill="none" opacity="0.42">
        <path d="M160 66 L200 66 M280 66 L320 66" />
        <path d="M200 94 L220 118 M280 94 L260 118" />
        <path d="M120 66 L80 94 M360 66 L400 94" opacity="0.25" />
      </g>
      <circle cx="240" cy="98" r="5" fill={atlasPalette.panel} stroke={atlasPalette.gold} strokeWidth="1.25" />
      <circle cx="240" cy="98" r="2" fill={atlasPalette.gold} />
      <rect x="36" y="82" width="28" height="20" rx="4" fill={atlasPalette.panelRaised} stroke={atlasPalette.borderSoft} strokeWidth="0.6" opacity="0.6" />
      <rect x="416" y="82" width="28" height="20" rx="4" fill={atlasPalette.panelRaised} stroke={atlasPalette.borderSoft} strokeWidth="0.6" opacity="0.6" />
    </IllustrationFrame>
  );
}

function OrchestraIllustration({ className }: IllustrationProps) {
  const lanes = [100, 180, 260, 340, 420];

  return (
    <IllustrationFrame className={className} label="orchestra-score">
      <path
        d="M48 124 Q108 58 176 98 T296 76 T416 106 T452 84"
        fill="none"
        stroke={atlasPalette.gold}
        strokeWidth="1.35"
        opacity="0.75"
      />
      <path
        d="M48 142 Q128 88 188 128 T308 108 T432 128"
        fill="none"
        stroke={atlasPalette.slate}
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M48 162 Q92 152 152 158 T272 146 T392 160"
        fill="none"
        stroke={atlasPalette.border}
        strokeWidth="0.7"
        opacity="0.55"
      />
      {lanes.map((x, i) => (
        <g key={x}>
          <line
            x1={x}
            y1={52 + i * 3}
            x2={x}
            y2={168 - i * 2}
            stroke={atlasPalette.borderSoft}
            strokeWidth="0.45"
            opacity="0.38"
          />
          <circle
            cx={x}
            cy={98 + (i % 2 === 0 ? -14 : 14)}
            r="6"
            fill={atlasPalette.panelRaised}
            stroke={atlasPalette.gold}
            strokeWidth="1"
          />
          <circle cx={x} cy={98 + (i % 2 === 0 ? -14 : 14)} r="2" fill={atlasPalette.gold} opacity="0.55" />
        </g>
      ))}
      <circle cx="240" cy="92" r="12" fill={atlasPalette.panel} stroke={atlasPalette.gold} strokeWidth="1.5" />
      <circle cx="240" cy="92" r="4" fill={atlasPalette.goldBright} />
      <line x1="28" y1="178" x2="452" y2="178" stroke={atlasPalette.border} strokeWidth="0.5" opacity="0.35" />
    </IllustrationFrame>
  );
}

function IntercalIllustration({ className }: IllustrationProps) {
  return (
    <IllustrationFrame className={className} label="intercal-layers">
      {[0, 1, 2, 3, 4].map((layer) => (
        <g key={layer} opacity={0.45 + layer * 0.11}>
          <path
            d={`M52 ${48 + layer * 22} H428`}
            stroke={atlasPalette.border}
            strokeWidth="0.65"
            strokeDasharray="5 7"
          />
          <rect
            x={96 + layer * 16}
            y={40 + layer * 22}
            width={64 + layer * 10}
            height="13"
            rx="3"
            fill={atlasPalette.panelRaised}
            stroke={atlasPalette.slate}
            strokeWidth="0.7"
          />
          <rect
            x={104 + layer * 16}
            y={44 + layer * 22}
            width={24 + layer * 4}
            height="4"
            rx="1"
            fill={atlasPalette.gold}
            opacity={0.35 + layer * 0.12}
          />
          <circle cx={388 - layer * 18} cy={46.5 + layer * 22} r="4.5" fill={atlasPalette.gold} opacity={0.45 + layer * 0.1} />
        </g>
      ))}
      <path
        d="M196 44 L196 168"
        stroke={atlasPalette.gold}
        strokeWidth="1"
        opacity="0.48"
        strokeDasharray="3 5"
      />
      <circle cx="196" cy="106" r="8" fill="none" stroke={atlasPalette.gold} strokeWidth="0.7" opacity="0.4" />
      <text x="208" y="110" fill={atlasPalette.ivory} fontSize="11" fontFamily="ui-monospace, monospace">
        Δt
      </text>
    </IllustrationFrame>
  );
}

function CollectivaIllustration({ className }: IllustrationProps) {
  const nodes: [number, number][] = [
    [140, 58],
    [340, 58],
    [388, 132],
    [92, 132],
    [240, 174],
    [176, 142],
    [304, 142]
  ];

  return (
    <IllustrationFrame className={className} label="collectiva-mesh">
      <g stroke={atlasPalette.gold} strokeWidth="0.7" opacity="0.38" fill="none">
        {nodes.map(([cx, cy]) => (
          <path key={`link-${cx}`} d={`M240 100 L${cx} ${cy}`} />
        ))}
        <path d="M140 58 L340 58" opacity="0.22" />
        <path d="M92 132 L388 132" opacity="0.22" />
        <path d="M176 142 L304 142" opacity="0.18" />
      </g>
      <circle cx="240" cy="100" r="18" fill="none" stroke={atlasPalette.gold} strokeWidth="0.5" opacity="0.28" />
      <circle cx="240" cy="100" r="15" fill={atlasPalette.panel} stroke={atlasPalette.gold} strokeWidth="1.5" />
      {nodes.map(([cx, cy]) => (
        <g key={`node-${cx}`}>
          <circle cx={cx} cy={cy} r="8" fill={atlasPalette.panelRaised} stroke={atlasPalette.slate} strokeWidth="1" />
          <circle cx={cx} cy={cy} r="2.5" fill={atlasPalette.gold} opacity="0.5" />
        </g>
      ))}
      <circle cx="240" cy="100" r="5.5" fill={atlasPalette.gold} />
      <circle cx="237" cy="97" r="1.5" fill={atlasPalette.goldBright} opacity="0.45" />
    </IllustrationFrame>
  );
}

const illustrations: Record<ProjectSlug, (props: IllustrationProps) => ReactNode> = {
  harness: HarnessIllustration,
  registry: RegistryIllustration,
  orchestra: OrchestraIllustration,
  intercal: IntercalIllustration,
  collectiva: CollectivaIllustration
};

export function ProjectIllustration({
  slug,
  className
}: IllustrationProps & { slug: ProjectSlug }) {
  const Component = illustrations[slug];
  return <Component className={className} />;
}