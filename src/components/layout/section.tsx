import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * A home/detail section: container-bound band in the Synk rhythm — an
 * optional dotted title block (SectionHeading) followed by a dashed lattice.
 * Bottom padding closes the band before the next hatch Divider.
 */
export function Section({
  id,
  label,
  className,
  tight,
  children
}: {
  id?: string;
  label?: string;
  className?: string;
  tight?: boolean;
  children: ReactNode;
}) {
  return (
    <Container
      as="section"
      className={["band", tight ? "band-tight" : "", className].filter(Boolean).join(" ")}
      id={id}
      ariaLabel={label}
    >
      {children}
    </Container>
  );
}
