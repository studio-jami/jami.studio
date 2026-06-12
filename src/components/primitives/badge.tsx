import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  /** `solid` is the accent-filled pill; `outline` is the hairline editorial tag. */
  variant?: "solid" | "outline";
  className?: string;
};

/** Small-caps mono label / tag (capability tags, "OSS", status pills). */
export function Badge({ children, variant = "outline", className }: BadgeProps) {
  return (
    <span className={["badge", `badge--${variant}`, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
