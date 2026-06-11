/**
 * Static film-grain + atmosphere overlay.
 *
 * A single fixed, GPU-cheap layer: an SVG `feTurbulence` (fractalNoise, sRGB) data-URI tiled small,
 * blended at a token-driven opacity that adapts per theme (`--grain-opacity`, `--grain-blend`). No
 * runtime filter, no animation — it is texture, not motion, so it is safe under reduced-motion.
 */
const GRAIN_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function GrainOverlay() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-glow" />
      <div className="grain-overlay" style={{ backgroundImage: GRAIN_DATA_URI }} />
    </div>
  );
}
