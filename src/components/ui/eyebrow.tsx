import type { ReactNode } from "react";

/** Small-caps mono label (Geist Mono) — the lane's kicker/eyebrow voice. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={["eyebrow", className].filter(Boolean).join(" ")}>{children}</p>;
}

type BadgeProps = {
  children: ReactNode;
  tone?: "default" | "accent";
  className?: string;
};

/** Mono pill for capability tags, statuses, version-style labels. */
export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span className={["badge", `badge--${tone}`, className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
