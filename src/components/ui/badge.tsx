import type { ReactNode } from "react";

type BadgeProps = {
  tone?: "default" | "accent" | "outline";
  children: ReactNode;
};

/** Mono pill label for capability tags, OSS markers, and status-free metadata. */
export function Badge({ tone = "default", children }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}
