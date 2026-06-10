/**
 * Atmosphere layer for Lane A: a fixed, GPU-cheap film-grain overlay plus two
 * low-contrast radial glows behind the canvas. The grain is a static SVG
 * `feTurbulence` data-URI (fractalNoise, sRGB), tiled small so it stays crisp at
 * any DPR; opacity + blend mode are theme tokens (`--grain-opacity`,
 * `--grain-blend`). It is decorative, non-interactive, and never animated — so
 * it is safe to keep under `prefers-reduced-motion`.
 */
const GRAIN_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-glow atmosphere-glow--1" />
      <div className="atmosphere-glow atmosphere-glow--2" />
      <div className="grain-overlay" style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }} />
    </div>
  );
}
