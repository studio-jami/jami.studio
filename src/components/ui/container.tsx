import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
};

/** Max-width wrapper bound to the `--container` token. The single horizontal rhythm. */
export function Container({ children, as: Tag = "div", className }: ContainerProps) {
  return <Tag className={["container", className].filter(Boolean).join(" ")}>{children}</Tag>;
}
