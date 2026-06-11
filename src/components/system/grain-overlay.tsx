/**
 * Static film-grain + atmosphere layer (Lane A core craft).
 *
 * One fixed, GPU-cheap overlay: a `feTurbulence` fractalNoise data-URI blended at a
 * token-driven `--grain-opacity`, plus two low-contrast radial gradients for depth.
 * Never a live `filter` on the background, never animated — so it is safe under
 * `prefers-reduced-motion`. `aria-hidden` + `pointer-events: none` keep it inert.
 */
export function GrainOverlay() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
