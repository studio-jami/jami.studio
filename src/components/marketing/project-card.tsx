import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";
import styles from "./project-card.module.css";

type ProjectCardProps = {
  project: StudioProject;
  /** Position in the showcase — drives the 01/02 index plate. */
  index?: number;
  /** `feature` spans wider in an editorial showcase grid. */
  variant?: "default" | "feature";
};

/**
 * The portfolio unit: one Studio product. Name, summary, positioning hook, a
 * capability tease, and a resolved CTA into the detail page. The whole card is a
 * link; the visual plate is a token-driven monogram (no fabricated screenshots).
 */
export function ProjectCard({ project, index, variant = "default" }: ProjectCardProps) {
  const ordinal = index !== undefined ? String(index + 1).padStart(2, "0") : undefined;

  return (
    <Link
      href={projectPath(project)}
      className={[styles.card, variant === "feature" ? styles.feature : ""].filter(Boolean).join(" ")}
      data-reveal
    >
      <div className={styles.plate} aria-hidden="true">
        <span className={styles.monogram}>{project.shortName.charAt(0)}</span>
        {ordinal ? <span className={styles.plateIndex}>{ordinal}</span> : null}
        <span className={styles.plateName}>{project.name}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.head}>
          <h3 className={styles.name}>{project.name}</h3>
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </div>
        <p className={styles.summary}>{project.summary}</p>
        <p className={styles.positioning}>{project.positioning}</p>
        <div className={styles.tags}>
          <Badge variant="ghost">{project.shortName}</Badge>
          <span className={styles.capCount}>
            {project.capabilities.length} capabilities · {project.proofPoints.length} proof points
          </span>
        </div>
      </div>
    </Link>
  );
}
