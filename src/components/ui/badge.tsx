import type { ReactNode } from "react";

/** Small mono pill for capability tags, OSS markers, status. Variants are props, not one-offs. */
export function Badge({
  children,
  accent = false,
  dot = false,
  className
}: {
  children: ReactNode;
  accent?: boolean;
  dot?: boolean;
  className?: string;
}) {
  const classes = ["badge", accent ? "badge--accent" : "", dot ? "badge--dot" : "", className]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
