import type { ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  /** Visual tone of the section band. */
  tone?: "canvas" | "panel" | "inverse";
  /** Vertical-rhythm size mapped to the `--section` token scale. */
  size?: "default" | "tight" | "tall";
  width?: "default" | "wide";
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

/**
 * Section primitive: one vertical-rhythm token (`--section`), one gutter system,
 * a tone toggle for canvas / barely-lifted panel / inverse bands. Composes the
 * `Container` so every page is a stack of consistent bands.
 */
export function Section({
  id,
  tone = "canvas",
  size = "default",
  width = "default",
  className,
  children,
  ...aria
}: SectionProps) {
  const classes = ["section", `section-${tone}`, `section-${size}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} {...aria}>
      <Container width={width}>{children}</Container>
    </section>
  );
}
