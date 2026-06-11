/**
 * Static film-grain + atmosphere layer (brief §4).
 *
 * Fixed, GPU-cheap overlay: a small tiled `feTurbulence` data-URI blended at a
 * token-driven opacity (`--grain-opacity`) plus two large low-contrast radial glows
 * behind the canvas. No runtime filter, no animation — texture, not motion — so it is
 * safe to keep under `prefers-reduced-motion`. Decorative and inert.
 */
export function GrainOverlay() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-glow" />
      <div className="grain-overlay" />
    </div>
  );
}
