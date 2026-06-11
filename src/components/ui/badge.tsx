import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  /** "solid" tints with the accent; "outline" is a hairline chip. */
  variant?: "solid" | "outline";
  className?: string;
};

/** Small mono/uppercase pill for capability tags, version markers, and OSS labels. */
export function Badge({ children, variant = "outline", className }: BadgeProps) {
  return (
    <span className={["badge", `badge-${variant}`, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
