import type { ElementType, ReactNode } from "react";

/** Single max-width measure bound to --container. Used by every section. */
export function Container({
  children,
  as: Tag = "div",
  className
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  return <Tag className={["container", className].filter(Boolean).join(" ")}>{children}</Tag>;
}
