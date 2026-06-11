import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";
import styles from "./showcase-grid.module.css";

type ShowcaseGridProps = {
  index?: string;
  heading?: string;
  description?: string;
  /** Home uses a feature-led editorial rhythm; the index page uses a flat grid. */
  layout?: "editorial" | "flat";
  showHeading?: boolean;
};

/** The five projects as the selected-work showcase — the home centerpiece. */
export function ShowcaseGrid({
  index = "02",
  heading = "Selected work",
  description = "Five open-core products over one shared foundation. Each is a separate surface with its own repository, docs, and live route.",
  layout = "editorial",
  showHeading = true
}: ShowcaseGridProps) {
  return (
    <Section width="wide" divided={showHeading} aria-labelledby="showcase-heading">
      {showHeading ? (
        <SectionHeading
          index={index}
          eyebrow="Product family"
          title={<span id="showcase-heading">{heading}</span>}
          description={description}
          aside={
            <Button href="/projects" variant="secondary" withArrow>
              View all projects
            </Button>
          }
        />
      ) : null}
      <div className={[styles.grid, layout === "editorial" ? styles.editorial : styles.flat].join(" ")}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            variant={layout === "editorial" && i === 0 ? "feature" : "default"}
          />
        ))}
      </div>
    </Section>
  );
}
