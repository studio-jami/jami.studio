/**
 * Texture layer for the editorial canvas: a single fixed, GPU-cheap film-grain
 * overlay (static SVG feTurbulence data-URI) plus an optional very-soft glow.
 * Opacity and blend mode are token-driven (`--grain-opacity`, `--grain-blend`)
 * so they adapt per theme. No animation — it's tooth, not motion.
 */
export function Atmosphere() {
  return <div className="atmosphere" aria-hidden="true" />;
}
