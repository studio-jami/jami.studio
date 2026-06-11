import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * Vertical-rhythm band bound to --section. Wraps content in the shared container by default.
 */
export function Section({
  children,
  id,
  tight = false,
  divider = false,
  bleed = false,
  className,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby
}: {
  children: ReactNode;
  id?: string;
  tight?: boolean;
  divider?: boolean;
  /** When true, children are rendered without the inner container (caller controls width). */
  bleed?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}) {
  const classes = [
    "section",
    tight ? "section--tight" : "",
    divider ? "section-divider" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
