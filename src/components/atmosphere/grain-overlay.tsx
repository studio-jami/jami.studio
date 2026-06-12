/**
 * Static film-grain overlay — a single fixed, GPU-cheap layer using an inline
 * `feTurbulence` (fractalNoise) data-URI, blended at low opacity. Never animated
 * (no per-frame reseed), so it is safe to keep under `prefers-reduced-motion`.
 * Opacity and blend mode come from the `--grain-opacity` / `--grain-blend` theme
 * vars so the texture adapts per theme without a second component.
 */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
