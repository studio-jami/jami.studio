import type { ReactNode } from "react";
import { Container } from "./container";
import styles from "./section.module.css";

type SectionProps = {
  children: ReactNode;
  id?: string;
  width?: "default" | "wide" | "narrow";
  /** Adds a hairline rule above the section — the Noir structural divider. */
  divided?: boolean;
  tone?: "canvas" | "raised";
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/** Vertical-rhythm primitive bound to the `--section` token, wrapping a Container. */
export function Section({
  children,
  id,
  width = "default",
  divided = false,
  tone = "canvas",
  className,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={[styles.section, divided ? styles.divided : "", tone === "raised" ? styles.raised : "", className]
        .filter(Boolean)
        .join(" ")}
      {...aria}
    >
      <Container width={width}>{children}</Container>
    </section>
  );
}
