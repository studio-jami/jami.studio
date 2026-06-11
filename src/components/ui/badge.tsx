import type { ReactNode } from "react";
import styles from "./badge.module.css";

type BadgeProps = {
  children: ReactNode;
  /** `solid` for emphasis (accent fill); `outline` for quiet capability tags. */
  variant?: "outline" | "solid" | "ghost";
};

/** Small mono label — capability tags, OSS markers, status-free metadata. */
export function Badge({ children, variant = "outline" }: BadgeProps) {
  return <span className={[styles.badge, styles[variant]].join(" ")}>{children}</span>;
}
