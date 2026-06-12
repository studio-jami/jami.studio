/**
 * Static film-grain + atmosphere layer (Lane A core craft).
 *
 * A single fixed, GPU-cheap overlay: a `fractalNoise` SVG encoded as a data-URI background,
 * blended at low opacity over 1–2 low-contrast radial gradients for depth. Never animated,
 * always `aria-hidden`, `pointer-events: none`. Opacity + blend mode swap per theme through
 * the `--grain-opacity` / `--grain-blend` CSS vars, so there is one overlay for both themes.
 *
 * `color-interpolation-filters='sRGB'` is required for correct cross-browser grain.
 */
const grainDataUri =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function GrainOverlay() {
  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      <div
        className="grain-overlay"
        aria-hidden="true"
        style={{ backgroundImage: `url("${grainDataUri}")` }}
      />
    </>
  );
}
