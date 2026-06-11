import type { ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Render a hairline divider above the section — Synk's modular section seam. */
  divider?: boolean;
  containerSize?: "default" | "wide" | "narrow";
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Vertical-rhythm primitive bound to `--section`. Sections are separated by a
 * hairline divider — the systematized, modular seam borrowed from Synk.
 */
export function Section({
  children,
  id,
  className,
  divider = false,
  containerSize = "default",
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={["section", divider ? "section-divided" : "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
