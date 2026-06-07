export function ForgeMesh() {
  return (
    <div className="forge-mesh" aria-hidden="true">
      <svg className="forge-mesh-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="forge-mesh-cyan" cx="30%" cy="25%" r="55%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="forge-mesh-violet" cx="75%" cy="65%" r="50%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="forge-grid-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="600" fill="url(#forge-mesh-cyan)" />
        <rect width="800" height="600" fill="url(#forge-mesh-violet)" />
        <path
          d="M0 120 L800 80 M0 240 L800 200 M0 360 L800 320 M0 480 L800 440"
          stroke="url(#forge-grid-fade)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M160 0 L120 600 M320 0 L280 600 M480 0 L440 600 M640 0 L600 600"
          stroke="url(#forge-grid-fade)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}