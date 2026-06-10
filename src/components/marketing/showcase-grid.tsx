import { ProjectCard } from "@/components/marketing/project-card";
import { Reveal } from "@/components/primitives/reveal";
import type { StudioProject } from "@/content/projects";

type ShowcaseGridProps = {
  projects: StudioProject[];
  /** Promote the first card to a wide feature tile (homepage centerpiece). */
  featureFirst?: boolean;
};

/** The "selected work" grid — the product family as a cohesive showcase. */
export function ShowcaseGrid({ projects, featureFirst = false }: ShowcaseGridProps) {
  return (
    <div className={["showcase-grid", featureFirst ? "showcase-grid--feature" : ""].join(" ")}>
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={Math.min(index, 4) * 60}>
          <ProjectCard project={project} index={index} featured={featureFirst && index === 0} />
        </Reveal>
      ))}
    </div>
  );
}
