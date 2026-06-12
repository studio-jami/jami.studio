import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "./container";

/**
 * Kirimo section frame. Every section sits transparent on the single
 * near-black canvas and opens with a 1px sand hairline (`rule`) — the
 * template's signature segmentation. `bleed` drops the inner container for
 * full-bleed children (slideshow, CTA panel).
 */
export function Section({
  children,
  rule = true,
  bleed = false,
  size = "default",
  className,
  ...rest
}: {
  children: ReactNode;
  rule?: boolean;
  bleed?: boolean;
  size?: "default" | "hero" | "tight";
  className?: string;
} & HTMLAttributes<HTMLElement>) {
  const classes = [
    "section",
    rule ? "section--rule" : "",
    bleed ? "section--bleed" : "",
    size !== "default" ? `section--${size}` : "",
    className ?? ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} {...rest}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
