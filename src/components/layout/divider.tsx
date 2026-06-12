import { Container } from "./container";

/**
 * The Synk seam: a diagonal-hatch divider BAND between major sections —
 * hairline-bounded, filled with 45° hatch lines. One component, reused
 * verbatim at every section boundary (the visible structural rhythm).
 *
 * `thin` renders the narrow strip Synk uses between paired feature rows.
 * Decorative only: hidden from assistive tech.
 */
export function Divider({ thin }: { thin?: boolean }) {
  return (
    <Container>
      <div
        className="hatch"
        {...(thin ? { "data-thin": "" } : {})}
        role="presentation"
        aria-hidden="true"
      />
    </Container>
  );
}
