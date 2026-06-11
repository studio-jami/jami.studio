import type { ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** When true the section sits flush (no inner container); used by full-bleed bands. */
  bleed?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Vertical-rhythm primitive bound to the `--section` token. Wraps children in a
 * `Container` unless `bleed` is set (full-bleed bands handle their own inner container).
 */
export function Section({ children, className, id, bleed, ...aria }: SectionProps) {
  const cls = ["section", bleed ? "section-bleed" : null, className].filter(Boolean).join(" ");
  return (
    <section className={cls} id={id} {...aria}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
