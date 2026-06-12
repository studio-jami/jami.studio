/**
 * GrainOverlay + Atmosphere — the texture layer for Lane A.
 *
 * A single fixed, GPU-cheap film-grain layer (static feTurbulence data-URI, never
 * animated) blended at --grain-opacity over the canvas. Two low-contrast radial
 * teal glows sit behind it so 8-bit gradient banding dissolves into tooth. All of
 * it is decorative: aria-hidden, pointer-events:none, below content.
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-glow atmosphere-glow-top" />
      <div className="atmosphere-glow atmosphere-glow-bottom" />
      <div className="grain-overlay" />
    </div>
  );
}
