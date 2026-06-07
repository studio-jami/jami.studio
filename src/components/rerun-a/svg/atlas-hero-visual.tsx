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
        <radialGradient id="atlas-glow" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#c9a962" stopOpacity="0.18" />
          <stop offset="55%" stopColor="#10182a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#080c14" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="atlas-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a962" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6b7a94" stopOpacity="0.25" />
        </linearGradient>
        <filter id="atlas-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="640" height="520" fill="url(#atlas-glow)" />

      {/* Contour rings */}
      <ellipse cx="320" cy="250" rx="220" ry="140" fill="none" stroke="#2a3548" strokeWidth="0.75" opacity="0.6" />
      <ellipse cx="320" cy="250" rx="170" ry="108" fill="none" stroke="#2a3548" strokeWidth="0.5" opacity="0.45" />
      <ellipse cx="320" cy="250" rx="118" ry="74" fill="none" stroke="#3a4658" strokeWidth="0.5" opacity="0.35" />

      {/* Iso lines */}
      <path
        d="M80 180 Q200 120 320 150 T560 200"
        fill="none"
        stroke="#2a3548"
        strokeWidth="0.6"
        opacity="0.5"
      />
      <path
        d="M60 300 Q220 360 320 330 T580 280"
        fill="none"
        stroke="#2a3548"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <path
        d="M120 100 Q280 60 420 90 T520 160"
        fill="none"
        stroke="#2a3548"
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* Connection paths */}
      <g stroke="url(#atlas-line)" strokeWidth="1" fill="none" opacity="0.65">
        <path d="M320 250 L180 160" />
        <path d="M320 250 L460 150" />
        <path d="M320 250 L520 280" />
        <path d="M320 250 L420 380" />
        <path d="M320 250 L140 340" />
        <path d="M180 160 L460 150" opacity="0.35" />
        <path d="M140 340 L420 380" opacity="0.35" />
        <path d="M460 150 L520 280" opacity="0.35" />
        <path d="M520 280 L420 380" opacity="0.35" />
      </g>

      {/* Secondary nodes */}
      <g filter="url(#atlas-soft)">
        <circle cx="180" cy="160" r="5" fill="#141f34" stroke="#6b7a94" strokeWidth="1" />
        <circle cx="460" cy="150" r="5" fill="#141f34" stroke="#6b7a94" strokeWidth="1" />
        <circle cx="520" cy="280" r="5" fill="#141f34" stroke="#6b7a94" strokeWidth="1" />
        <circle cx="420" cy="380" r="5" fill="#141f34" stroke="#6b7a94" strokeWidth="1" />
        <circle cx="140" cy="340" r="5" fill="#141f34" stroke="#6b7a94" strokeWidth="1" />
      </g>

      {/* Central hub */}
      <circle cx="320" cy="250" r="28" fill="#10182a" stroke="#c9a962" strokeWidth="1.5" />
      <circle cx="320" cy="250" r="12" fill="#c9a962" opacity="0.9" />
      <circle cx="320" cy="250" r="38" fill="none" stroke="#c9a962" strokeWidth="0.5" opacity="0.35" />

      {/* Node labels */}
      <g fill="#9a9286" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.08em">
        <text x="180" y="145" textAnchor="middle">
          HARNESS
        </text>
        <text x="460" y="135" textAnchor="middle">
          REGISTRY
        </text>
        <text x="535" y="275" textAnchor="start">
          ORCHESTRA
        </text>
        <text x="420" y="405" textAnchor="middle">
          INTERCAL
        </text>
        <text x="125" y="365" textAnchor="end">
          COLLECTIVA
        </text>
      </g>

      {/* Accent markers on contour */}
      <circle cx="100" cy="220" r="2" fill="#c9a962" opacity="0.5" />
      <circle cx="540" cy="200" r="2" fill="#c9a962" opacity="0.4" />
      <circle cx="500" cy="400" r="2" fill="#c9a962" opacity="0.35" />
      <circle cx="200" cy="420" r="2" fill="#c9a962" opacity="0.45" />
    </svg>
  );
}