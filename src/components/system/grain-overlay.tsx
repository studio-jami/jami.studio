/**
 * Static film-tooth overlay. A single fixed, GPU-cheap layer using a `feTurbulence`
 * data-URI (no live filter on the canvas, never animated). Opacity + blend are
 * driven by `--grain-opacity` / `--grain-blend` so each theme tunes its own tooth.
 * Decorative only: `aria-hidden`, `pointer-events: none`.
 */
export function GrainOverlay() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
