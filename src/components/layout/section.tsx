import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * A home/detail section rendered inside the boxed 1280px lattice (the Synk
 * "Content Wrapper" cell). Provides the consistent vertical rhythm via the
 * --section token and a hairline-framed interior.
 */
export function Section({
  id,
  label,
  className,
  children
}: {
  id?: string;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Container>
      <section
        id={id}
        aria-label={label}
        className={["lattice", "section", className].filter(Boolean).join(" ")}
      >
        <div className="section-inner">{children}</div>
      </section>
    </Container>
  );
}
