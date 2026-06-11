import type { ReactNode } from "react";
import styles from "./section-heading.module.css";

type SectionHeadingProps = {
  /** Two-digit index — the Noir numbered-section motif (01 / 02 / 03 …). */
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  as?: "h1" | "h2";
  align?: "start" | "center";
  /** Optional slot rendered to the right of the heading (e.g. a CTA at desktop). */
  aside?: ReactNode;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "start",
  aside
}: SectionHeadingProps) {
  return (
    <div className={[styles.heading, align === "center" ? styles.center : ""].filter(Boolean).join(" ")}>
      <div className={styles.lead}>
        {(index || eyebrow) && (
          <div className={styles.meta}>
            {index ? <span className={styles.index}>{index}</span> : null}
            {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
          </div>
        )}
        <Heading className={styles.title}>{title}</Heading>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {aside ? <div className={styles.aside}>{aside}</div> : null}
    </div>
  );
}
