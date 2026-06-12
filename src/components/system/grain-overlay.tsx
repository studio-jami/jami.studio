/**
 * Film-grain texture layer — used ONLY on the inverted Stats panel (the template keeps
 * grain off the dark run). A `fractalNoise` SVG encoded as a data-URI background, blended
 * via the `--grain-opacity` / `--grain-blend` CSS vars. Always `aria-hidden`,
 * `pointer-events: none`, never animated.
 *
 * `color-interpolation-filters='sRGB'` is required for correct cross-browser grain.
 */
const grainDataUri =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

export function GrainOverlay({ className = "grain-overlay" }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{ backgroundImage: `url("${grainDataUri}")` }}
    />
  );
}
