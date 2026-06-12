/**
 * The closing-CTA atmosphere: concentric dotted rings receding into a radial
 * vortex, generated as deterministic inline SVG (authored, not an asset).
 * Static by design — the texture itself is the atmosphere; nothing animates.
 */
export function CtaRings() {
  const rings: { rx: number; ry: number; dots: number; opacity: number }[] = [];
  const RING_COUNT = 11;
  for (let i = 0; i < RING_COUNT; i += 1) {
    const t = (i + 1) / RING_COUNT;
    rings.push({
      rx: 80 + t * 470,
      ry: 34 + t * 220,
      dots: 26 + Math.round(t * 88),
      opacity: 0.42 - t * 0.3
    });
  }

  return (
    <svg
      className="cta-rings"
      viewBox="0 0 1100 560"
      preserveAspectRatio="xMidYMid slice"
      fill="currentColor"
      aria-hidden="true"
    >
      {rings.map((ring, ringIndex) => {
        const dots = [];
        for (let d = 0; d < ring.dots; d += 1) {
          const a = (d / ring.dots) * Math.PI * 2 + ringIndex * 0.35;
          dots.push(
            <circle
              key={d}
              cx={550 + Math.cos(a) * ring.rx}
              cy={280 + Math.sin(a) * ring.ry}
              r={1.4}
            />
          );
        }
        return (
          <g key={ringIndex} opacity={ring.opacity}>
            {dots}
          </g>
        );
      })}
    </svg>
  );
}
