import type { ElementType, ReactNode } from "react";

/**
 * Single max-width container bound to the --container token (Synk's 1200px
 * content lattice).
 */
export function Container({
  as: Tag = "div",
  className,
  id,
  ariaLabel,
  children
}: {
  as?: ElementType;
  className?: string;
  id?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={["container", className].filter(Boolean).join(" ")}
      {...(id ? { id } : {})}
      {...(ariaLabel ? { "aria-label": ariaLabel } : {})}
    >
      {children}
    </Tag>
  );
}
