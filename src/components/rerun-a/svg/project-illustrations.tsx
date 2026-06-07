import type { ReactNode } from "react";
import type { ProjectSlug } from "@/content/projects";

type IllustrationProps = {
  className?: string;
};

function HarnessIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 480 200" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="harness-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a962" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6b7a94" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <ellipse cx="240" cy="100" rx="160" ry="70" fill="none" stroke="#2a3548" strokeWidth="0.75" />
      <ellipse cx="240" cy="100" rx="110" ry="48" fill="none" stroke="#3a4658" strokeWidth="0.5" />
      <circle cx="240" cy="100" r="36" fill="#10182a" stroke="url(#harness-ring)" strokeWidth="1.5" />
      <path
        d="M240 64 L240 136 M204 100 L276 100"
        stroke="#c9a962"
        strokeWidth="1"
        opacity="0.6"
      />
      <circle cx="240" cy="100" r="8" fill="#c9a962" />
      <circle cx="120" cy="100" r="6" fill="#141f34" stroke="#6b7a94" />
      <circle cx="360" cy="100" r="6" fill="#141f34" stroke="#6b7a94" />
      <circle cx="240" cy="30" r="5" fill="#141f34" stroke="#6b7a94" />
      <circle cx="240" cy="170" r="5" fill="#141f34" stroke="#6b7a94" />
      <path
        d="M126 100 L204 100 M276 100 L354 100 M240 35 L240 64 M240 136 L240 165"
        stroke="#c9a962"
        strokeWidth="0.75"
        opacity="0.4"
      />
      <rect x="210" y="88" width="60" height="24" rx="4" fill="none" stroke="#c9a962" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}

function RegistryIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 480 200" role="img" aria-hidden="true">
      <g stroke="#2a3548" strokeWidth="0.75" fill="none">
        <rect x="80" y="40" width="80" height="56" rx="6" />
        <rect x="200" y="40" width="80" height="56" rx="6" />
        <rect x="320" y="40" width="80" height="56" rx="6" />
        <rect x="140" y="120" width="80" height="56" rx="6" />
        <rect x="260" y="120" width="80" height="56" rx="6" />
      </g>
      <g fill="#c9a962" opacity="0.7">
        <rect x="96" y="56" width="48" height="8" rx="2" />
        <rect x="216" y="56" width="48" height="8" rx="2" />
        <rect x="336" y="56" width="48" height="8" rx="2" />
        <rect x="156" y="136" width="48" height="8" rx="2" />
        <rect x="276" y="136" width="48" height="8" rx="2" />
      </g>
      <path
        d="M160 68 L200 68 M280 68 L320 68 M200 96 L220 120 M280 96 L260 120"
        stroke="#c9a962"
        strokeWidth="0.75"
        opacity="0.45"
      />
      <circle cx="240" cy="100" r="4" fill="#c9a962" />
    </svg>
  );
}

function OrchestraIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 480 200" role="img" aria-hidden="true">
      <path
        d="M60 120 Q120 60 180 100 T300 80 T420 110 T460 90"
        fill="none"
        stroke="#c9a962"
        strokeWidth="1.25"
        opacity="0.7"
      />
      <path
        d="M60 140 Q140 90 200 130 T320 110 T440 130"
        fill="none"
        stroke="#6b7a94"
        strokeWidth="0.75"
        opacity="0.5"
      />
      <path
        d="M60 160 Q100 150 160 155 T280 145 T400 158"
        fill="none"
        stroke="#2a3548"
        strokeWidth="0.75"
        opacity="0.6"
      />
      {[100, 180, 260, 340, 420].map((x, i) => (
        <g key={x}>
          <line x1={x} y1={60 + i * 4} x2={x} y2={170 - i * 2} stroke="#2a3548" strokeWidth="0.5" opacity="0.4" />
          <circle cx={x} cy={100 + (i % 2 === 0 ? -15 : 15)} r="5" fill="#141f34" stroke="#c9a962" strokeWidth="1" />
        </g>
      ))}
      <circle cx="240" cy="95" r="10" fill="#10182a" stroke="#c9a962" strokeWidth="1.5" />
    </svg>
  );
}

function IntercalIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 480 200" role="img" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((layer) => (
        <g key={layer} opacity={0.5 + layer * 0.1}>
          <path
            d={`M60 ${50 + layer * 22} H420`}
            stroke="#2a3548"
            strokeWidth="0.75"
            strokeDasharray="4 6"
          />
          <rect
            x={100 + layer * 18}
            y={42 + layer * 22}
            width={60 + layer * 12}
            height="12"
            rx="3"
            fill="#141f34"
            stroke="#6b7a94"
            strokeWidth="0.75"
          />
          <circle cx={380 - layer * 20} cy={48 + layer * 22} r="4" fill="#c9a962" opacity={0.5 + layer * 0.1} />
        </g>
      ))}
      <path
        d="M200 50 L200 170"
        stroke="#c9a962"
        strokeWidth="1"
        opacity="0.5"
        strokeDasharray="2 4"
      />
      <text x="208" y="115" fill="#9a9286" fontSize="9" fontFamily="ui-monospace, monospace">
        Δ
      </text>
    </svg>
  );
}

function CollectivaIllustration({ className }: IllustrationProps) {
  return (
    <svg className={className} viewBox="0 0 480 200" role="img" aria-hidden="true">
      <g stroke="#c9a962" strokeWidth="0.75" opacity="0.4" fill="none">
        <path d="M240 100 L140 60" />
        <path d="M240 100 L340 60" />
        <path d="M240 100 L380 130" />
        <path d="M240 100 L100 130" />
        <path d="M240 100 L240 170" />
        <path d="M140 60 L340 60" opacity="0.25" />
        <path d="M100 130 L380 130" opacity="0.25" />
      </g>
      <circle cx="240" cy="100" r="14" fill="#10182a" stroke="#c9a962" strokeWidth="1.5" />
      {[
        [140, 60],
        [340, 60],
        [380, 130],
        [100, 130],
        [240, 170],
        [180, 140],
        [300, 140]
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="#141f34" stroke="#6b7a94" strokeWidth="1" />
      ))}
      <circle cx="240" cy="100" r="5" fill="#c9a962" />
    </svg>
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