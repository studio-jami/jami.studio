/**
 * The Synk signature. An explicit, token-driven seam between every section —
 * a 64px hairline-and-dashed strip carrying the lattice texture and a center
 * swap-node. Reused verbatim everywhere a section boundary occurs; that visible
 * repetition is the "global variable / swap-anything" discipline made visible.
 *
 * Decorative: it carries no content and is hidden from assistive tech.
 */
export function Divider() {
  return <div className="divider" role="presentation" aria-hidden="true" />;
}
