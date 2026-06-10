import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "wide" relaxes to the full container; "narrow" tightens for prose. */
  width?: "default" | "narrow" | "wide";
};

/** Layout primitive bound to the `--container` token. One max-width, everywhere. */
export function Container({ as: Tag = "div", children, className, width = "default" }: ContainerProps) {
  const classes = ["container", width !== "default" ? `container--${width}` : "", className]
    .filter(Boolean)
    .join(" ");
  return <Tag className={classes}>{children}</Tag>;
}
