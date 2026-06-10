import type { ElementType, ReactNode } from "react";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  as?: ElementType;
  width?: "default" | "wide" | "narrow";
  tone?: "canvas" | "sunken" | "inverse";
  size?: "default" | "compact" | "flush";
  bordered?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: ReactNode;
};

/**
 * Vertical-rhythm section shell bound to the `--section` token. Composes a
 * `Container` so every page keeps consistent gutters at every breakpoint.
 */
export function Section({
  id,
  as: Tag = "section",
  width = "default",
  tone = "canvas",
  size = "default",
  bordered = false,
  className,
  children,
  ...aria
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={`section section--${tone} section--${size}${
        bordered ? " section--bordered" : ""
      }${className ? ` ${className}` : ""}`}
      {...aria}
    >
      <Container width={width}>{children}</Container>
    </Tag>
  );
}
