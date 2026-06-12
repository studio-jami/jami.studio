import type { ElementType, ReactNode } from "react";

/**
 * Single max-width container bound to the --container token (1280px lattice).
 */
export function Container({
  as: Tag = "div",
  className,
  children
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={["container", className].filter(Boolean).join(" ")}>{children}</Tag>;
}
