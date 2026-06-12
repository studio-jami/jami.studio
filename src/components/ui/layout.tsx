import type { CSSProperties, ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  width?: "default" | "wide" | "narrow";
};

/** Single max-width container bound to the --container token. */
export function Container({ children, className, as, width = "default" }: ContainerProps) {
  const Tag = as ?? "div";
  return (
    <Tag className={["container", `container-${width}`, className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: ElementType;
  /** Section vertical rhythm bound to --section. "flush" removes top padding. */
  rhythm?: "default" | "tight" | "flush";
  tone?: "canvas" | "raised";
  ariaLabelledby?: string;
  ariaLabel?: string;
  style?: CSSProperties;
};

/** Vertical-rhythm primitive bound to the --section token. */
export function Section({
  children,
  className,
  id,
  as,
  rhythm = "default",
  tone = "canvas",
  ariaLabelledby,
  ariaLabel,
  style
}: SectionProps) {
  const Tag = as ?? "section";
  return (
    <Tag
      id={id}
      className={["section", `section-${rhythm}`, `section-${tone}`, className]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </Tag>
  );
}
