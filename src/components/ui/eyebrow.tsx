import type { ReactNode } from "react";
import styles from "./eyebrow.module.css";

/** Mono, letterspaced kicker label — the `--font-mono` accent voice. */
export function Eyebrow({ children, as: Tag = "p" }: { children: ReactNode; as?: "p" | "span" }) {
  return <Tag className={styles.eyebrow}>{children}</Tag>;
}
