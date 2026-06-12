import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  width?: "default" | "wide";
  className?: string;
  children: ReactNode;
};

/** Max-width wrapper bound to the `--container` token. */
export function Container({
  as: Tag = "div",
  width = "default",
  className,
  children
}: ContainerProps) {
  return (
    <Tag className={["container", width === "wide" ? "container-wide" : "", className].filter(Boolean).join(" ")}>
      {children}
    </Tag>
  );
}
