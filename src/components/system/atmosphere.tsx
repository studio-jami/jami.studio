/**
 * Static atmosphere layer: a faint film-grain tooth + one low-contrast indigo
 * glow behind the hero. Lane B keeps this barely-there (grain opacity ~0.02
 * light / ~0.05 dark, themed in globals.css). It is texture, not motion, so it
 * stays under prefers-reduced-motion. Decorative only.
 */
export function Atmosphere() {
  return <div className="atmosphere" aria-hidden="true" />;
}
