import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "neutral" | "accent" | "outline";
  className?: string;
};

/** Small mono label / tag — capability tags, "OSS", status pills. */
export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span className={["badge", `badge-${tone}`, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
