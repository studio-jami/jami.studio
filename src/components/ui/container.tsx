import type { ElementType, ReactNode } from "react";
import styles from "./container.module.css";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  /** `wide` relaxes the max-width for full-bleed showcase rows; `narrow` for prose. */
  width?: "default" | "wide" | "narrow";
  className?: string;
};

/** Single max-width primitive bound to the `--container` token. */
export function Container({ children, as: Tag = "div", width = "default", className }: ContainerProps) {
  const widthClass =
    width === "wide" ? styles.wide : width === "narrow" ? styles.narrow : styles.default;
  return <Tag className={[styles.container, widthClass, className].filter(Boolean).join(" ")}>{children}</Tag>;
}
