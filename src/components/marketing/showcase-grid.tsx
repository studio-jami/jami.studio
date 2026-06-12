import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";

/**
 * Features-2 / centerpiece — the five-project product family as a systematized
 * showcase grid. The live family member leads full-width (Synk's first row of
 * advantage cards), the rest follow 2-up. Each card routes to /projects/[slug].
 */
export function ShowcaseGrid() {
  const lead = projects.find((project) => project.internalStatus === "live") ?? projects[0];
  const rest = projects.filter((project) => project.slug !== lead.slug);

  return (
    <div className="showcase-grid">
      <ProjectCard project={lead} />
      {rest.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
