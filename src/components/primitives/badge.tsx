import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "outline";
  className?: string;
};

/** Small mono/small-caps pill used for capability tags, statuses, version marks. */
export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span className={`badge badge--${tone}${className ? ` ${className}` : ""}`}>{children}</span>
  );
}
