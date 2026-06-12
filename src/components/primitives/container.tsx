import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

/** Layout primitive bound to the shared `--container` width token. */
export function Container({ as: Tag = "div", children, className }: ContainerProps) {
  return <Tag className={["container", className].filter(Boolean).join(" ")}>{children}</Tag>;
}
