import type { ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Adds a hairline rule above the section, the lane's editorial divider. */
  divided?: boolean;
  /** Renders without the inner `Container` (for sections owning their own width). */
  bleed?: boolean;
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

/**
 * Section primitive bound to the shared `--section` vertical-rhythm token. Mirrors the
 * Nouva `Section > Container > content` rhythm with a hairline divider option.
 */
export function Section({
  id,
  children,
  className,
  divided = false,
  bleed = false,
  ...aria
}: SectionProps) {
  const classes = ["section", divided ? "section--divided" : null, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} {...aria}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
