import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/** Single max-width gutter primitive bound to `--container`. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={["container", className].filter(Boolean).join(" ")}>{children}</Tag>;
}

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  ariaLabelledby?: string;
  as?: ElementType;
};

/** Vertical-rhythm primitive bound to `--section`. */
export function Section({
  children,
  className,
  id,
  ariaLabelledby,
  as: Tag = "section"
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledby}
      className={["section", className].filter(Boolean).join(" ")}
    >
      {children}
    </Tag>
  );
}
