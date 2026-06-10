import type { ReactNode } from "react";
import { Container } from "@/components/primitives/container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Vertical-rhythm bound to `--section`. "tight" halves it for adjacent bands. */
  rhythm?: "default" | "tight" | "flush";
  /** Adds a hairline divider above the section. */
  divider?: boolean;
  containerWidth?: "default" | "narrow" | "wide";
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Section shell: consistent vertical rhythm + a container. Every page is
 * header → main(sections) → footer with uniform gutters at every breakpoint.
 */
export function Section({
  children,
  id,
  className,
  rhythm = "default",
  divider = false,
  containerWidth = "default",
  ...aria
}: SectionProps) {
  const classes = [
    "section",
    rhythm !== "default" ? `section--${rhythm}` : "",
    divider ? "section--divider" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} {...aria}>
      <Container width={containerWidth}>{children}</Container>
    </section>
  );
}
