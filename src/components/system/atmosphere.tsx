/**
 * Lane B atmosphere: a single fixed, GPU-cheap paper-grain overlay at very low opacity
 * plus a faint editorial color wash. Static (texture, not motion), `aria-hidden`, and
 * `pointer-events: none`. Grain opacity and blend mode adapt per theme via tokens in
 * `globals.css` (`--grain-opacity`). No animation — safe under reduced motion.
 */
export function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="atmosphere-wash" />
      <div className="atmosphere-grain" />
    </div>
  );
}
