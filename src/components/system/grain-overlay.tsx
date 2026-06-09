/**
 * Static film-grain texture overlay.
 * Uses a fixed feTurbulence data URI (per design reference brief).
 * Opacity and blend adapt per [data-theme] in globals.css.
 * Pointer-events none, aria-hidden, respects reduced motion (stays static).
 */
export function GrainOverlay() {
  return (
    <div
      className="grain-overlay"
      aria-hidden="true"
      data-testid="grain-overlay"
    />
  );
}
