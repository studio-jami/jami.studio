import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "accent" | "outline";
  className?: string;
};

/** Small mono pill for capability tags, OSS markers, version chips. */
export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span className={["badge", `badge--${tone}`, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
