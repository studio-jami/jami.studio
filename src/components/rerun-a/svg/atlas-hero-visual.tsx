import { atlasPalette } from "./atlas-palette";

export function AtlasHeroVisual() {
  return (
    <svg
      className="atlas-hero-visual"
      viewBox="0 0 640 520"
      role="img"
      aria-label="Studio project family topology atlas"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="atlas-hero-glow" cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor={atlasPalette.gold} stopOpacity="0.2" />
          <stop offset="50%" stopColor={atlasPalette.panel} stopOpacity="0.45" />
          <stop offset="100%" stopColor={atlasPalette.background} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="atlas-hero-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={atlasPalette.gold} stopOpacity="0.75" />
          <stop offset="100%" stopColor={atlasPalette.slate} stopOpacity="0.22" />
        </linearGradient>
        <radialGradient id="atlas-hero-hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={atlasPalette.goldBright} stopOpacity="0.95" />
          <stop offset="100%" stopColor={atlasPalette.gold} stopOpacity="0.7" />
        </radialGradient>
        <filter id="atlas-hero-soft" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="640" height="520" fill="url(#atlas-hero-glow)" />

      {/* Topographic contour rings */}
      <ellipse
        cx="320"
        cy="250"
        rx="228"
        ry="148"
        fill="none"
        stroke={atlasPalette.border}
        strokeWidth="0.75"
        opacity="0.55"
      />
      <ellipse
        cx="320"
        cy="250"
        rx="176"
        ry="114"
        fill="none"
        stroke={atlasPalette.border}
        strokeWidth="0.55"
        opacity="0.42"
      />
      <ellipse
        cx="320"
        cy="250"
        rx="122"
        ry="78"
        fill="none"
        stroke={atlasPalette.borderSoft}
        strokeWidth="0.5"
        opacity="0.32"
      />

      {/* Iso contour lines */}
      <path
        d="M72 178 Q196 108 320 142 T568 196"
        fill="none"
        stroke={atlasPalette.border}
        strokeWidth="0.55"
        opacity="0.45"
      />
      <path
        d="M52 304 Q216 368 320 334 T588 276"
        fill="none"
        stroke={atlasPalette.border}
        strokeWidth="0.55"
        opacity="0.38"
      />
      <path
        d="M108 96 Q272 48 428 84 T532 158"
        fill="none"
        stroke={atlasPalette.borderSoft}
        strokeWidth="0.45"
        opacity="0.28"
      />

      {/* Meridian ticks */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const inner = 118;
        const outer = 132;
        const cx = 320;
        const cy = 250;
        return (
          <line
            key={angle}
            x1={cx + inner * Math.cos(rad)}
            y1={cy + (inner * 0.64) * Math.sin(rad)}
            x2={cx + outer * Math.cos(rad)}
            y2={cy + (outer * 0.64) * Math.sin(rad)}
            stroke={atlasPalette.borderSoft}
            strokeWidth="0.5"
            opacity="0.35"
          />
        );
      })}

      {/* Connection paths */}
      <g stroke="url(#atlas-hero-line)" strokeWidth="1" fill="none" opacity="0.7">
        <path d="M320 250 L180 160" />
        <path d="M320 250 L460 150" />
        <path d="M320 250 L520 280" />
        <path d="M320 250 L420 380" />
        <path d="M320 250 L140 340" />
        <path d="M180 160 L460 150" opacity="0.3" />
        <path d="M140 340 L420 380" opacity="0.3" />
        <path d="M460 150 L520 280" opacity="0.3" />
        <path d="M520 280 L420 380" opacity="0.3" />
      </g>

      {/* Satellite nodes */}
      <g filter="url(#atlas-hero-soft)">
        {[
          [180, 160],
          [460, 150],
          [520, 280],
          [420, 380],
          [140, 340]
        ].map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="7" fill={atlasPalette.panelRaised} stroke={atlasPalette.slate} strokeWidth="1" />
            <circle cx={cx} cy={cy} r="2.5" fill={atlasPalette.gold} opacity="0.55" />
          </g>
        ))}
      </g>

      {/* Central hub */}
      <circle cx="320" cy="250" r="42" fill="none" stroke={atlasPalette.gold} strokeWidth="0.5" opacity="0.3" />
      <circle cx="320" cy="250" r="30" fill={atlasPalette.panel} stroke={atlasPalette.gold} strokeWidth="1.5" />
      <circle cx="320" cy="250" r="13" fill="url(#atlas-hero-hub)" />
      <circle cx="316" cy="246" r="4" fill={atlasPalette.goldBright} opacity="0.35" />

      {/* Node labels */}
      <g fill={atlasPalette.ivory} fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.1em">
        <text x="180" y="142" textAnchor="middle">
          HARNESS
        </text>
        <text x="460" y="132" textAnchor="middle">
          REGISTRY
        </text>
        <text x="538" y="272" textAnchor="start">
          ORCHESTRA
        </text>
        <text x="420" y="402" textAnchor="middle">
          INTERCAL
        </text>
        <text x="122" y="362" textAnchor="end">
          COLLECTIVA
        </text>
      </g>

      {/* Accent survey markers */}
      {[
        [96, 218],
        [544, 198],
        [504, 404],
        [204, 424]
      ].map(([cx, cy], i) => (
        <g key={`marker-${cx}`} opacity={0.35 + i * 0.05}>
          <circle cx={cx} cy={cy} r="2.5" fill={atlasPalette.gold} />
          <circle cx={cx} cy={cy} r="5" fill="none" stroke={atlasPalette.gold} strokeWidth="0.5" opacity="0.5" />
        </g>
      ))}
    </svg>
  );
}