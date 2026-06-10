import { ProjectCard } from "@/components/marketing/project-card";
import { Reveal } from "@/components/primitives/reveal";
import { projects } from "@/content/projects";

/**
 * The "selected work" gallery — the five Studio products as the portfolio.
 * `feature` promotes the first card to a wide editorial tile.
 */
export function ProjectShowcase({ feature = false }: { feature?: boolean }) {
  return (
    <div className={`showcase${feature ? " showcase--featured" : ""}`}>
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={Math.min(index, 4) * 60} className="showcase__cell">
          <ProjectCard project={project} index={index} featured={feature && index === 0} />
        </Reveal>
      ))}
    </div>
  );
}
