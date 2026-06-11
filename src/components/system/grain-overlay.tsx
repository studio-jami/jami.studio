/**
 * Static film-grain + atmosphere overlay.
 *
 * A single fixed, GPU-cheap layer (feTurbulence data-URI in globals.css). It is
 * decorative texture, not motion, so it is safe to keep under reduced-motion.
 * Opacity and blend mode are token/theme-driven via `--grain-opacity`.
 */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
