export function HeroSignalArt() {
  return (
    <div className="hero-signal-art" aria-hidden="true">
      <svg viewBox="0 0 520 420" role="presentation">
        <defs>
          <linearGradient id="signal-wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="52%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="signal-core-gradient" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.15" />
          </linearGradient>
          <filter id="signal-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="24" y="24" width="472" height="372" rx="14" fill="#0c101c" stroke="#1e2a45" />
        <rect x="24" y="24" width="472" height="372" rx="14" fill="url(#signal-core-gradient)" />

        <path
          d="M48 300 C120 220, 180 340, 260 260 S400 180, 472 220"
          fill="none"
          stroke="url(#signal-wave-gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#signal-glow)"
        />
        <path
          d="M48 260 C140 180, 200 300, 280 220 S420 140, 472 180"
          fill="none"
          stroke="url(#signal-wave-gradient)"
          strokeWidth="2"
          strokeOpacity="0.55"
          strokeLinecap="round"
        />
        <path
          d="M48 340 C110 280, 190 360, 270 300 S390 240, 472 280"
          fill="none"
          stroke="url(#signal-wave-gradient)"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          strokeLinecap="round"
        />

        <circle cx="260" cy="210" r="52" fill="none" stroke="#1e2a45" strokeWidth="1" />
        <circle cx="260" cy="210" r="36" fill="none" stroke="#22d3ee" strokeOpacity="0.4" />
        <circle cx="260" cy="210" r="8" fill="#22d3ee" filter="url(#signal-glow)" />

        <g stroke="#1e2a45" strokeWidth="1">
          <line x1="260" y1="158" x2="260" y2="72" />
          <line x1="312" y1="210" x2="398" y2="210" />
          <line x1="260" y1="262" x2="260" y2="348" />
          <line x1="208" y1="210" x2="122" y2="210" />
        </g>

        <g fontFamily="ui-monospace, monospace" fontSize="10" fill="#8b9dc4">
          <text x="52" y="56">SIGNAL_FORGE</text>
          <text x="52" y="72">v0.1.0</text>
          <text x="380" y="56">5 NODES</text>
          <text x="380" y="72">LIVE</text>
        </g>

        <g>
          {[
            { x: 260, y: 72, label: "hub" },
            { x: 398, y: 210, label: "route" },
            { x: 260, y: 348, label: "meta" },
            { x: 122, y: 210, label: "ai" }
          ].map((node) => (
            <g key={node.label}>
              <rect
                x={node.x - 28}
                y={node.y - 14}
                width="56"
                height="28"
                rx="6"
                fill="#111827"
                stroke="#1e2a45"
              />
              <text
                x={node.x}
                y={node.y + 4}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="10"
                fill="#22d3ee"
              >
                {node.label}
              </text>
            </g>
          ))}
        </g>

        <rect x="48" y="368" width="424" height="12" rx="6" fill="#111827" />
        <rect x="48" y="368" width="312" height="12" rx="6" fill="url(#signal-wave-gradient)" />
      </svg>
    </div>
  );
}