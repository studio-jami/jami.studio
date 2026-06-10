import { ProjectCard } from "@/components/marketing/project-card";
import { Reveal } from "@/components/primitives/reveal";
import { projects } from "@/content/projects";

/**
 * The "selected work" gallery — the five Studio products as the portfolio.
 * `feature` promotes the first card to a wide editorial tile. `headingLevel`
 * sets the card-name outline level (h3 under a section h2; h2 when the grid
 * sits directly under a page h1, as on /projects).
 */
export function ProjectShowcase({
  feature = false,
  headingLevel = "h3"
}: {
  feature?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className={`showcase${feature ? " showcase--featured" : ""}`}>
      {projects.map((project, index) => (
        <Reveal key={project.slug} delay={Math.min(index, 4) * 60} className="showcase__cell">
          <ProjectCard
            project={project}
            index={index}
            featured={feature && index === 0}
            headingLevel={headingLevel}
          />
        </Reveal>
      ))}
    </div>
  );
}
