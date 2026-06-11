import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";

type ShowcaseGridProps = {
  eyebrow?: string;
  number?: string;
  title?: string;
  lead?: string;
  /** Render as a page section with heading (home) or bare grid (index page handles its own header). */
  withHeading?: boolean;
};

/**
 * The five projects as the "selected work" centerpiece. On home it carries a section
 * heading; the `/projects` index passes `withHeading={false}` and supplies its own page
 * hero. Grid gives each item room to breathe (Kirimo gallery immersion).
 */
export function ShowcaseGrid({
  eyebrow = "Selected work",
  number = "02",
  title = "Five products over one shared foundation.",
  lead = "Each Studio project is a distinct surface — governed agents, trusted UI, coordination, temporal knowledge, and open agent society.",
  withHeading = true
}: ShowcaseGridProps) {
  const grid = (
    <div className="showcase-grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );

  if (!withHeading) {
    return grid;
  }

  return (
    <Section className="showcase" aria-labelledby="showcase-title">
      <SectionHeading eyebrow={eyebrow} number={number} title={title} lead={lead} />
      {grid}
    </Section>
  );
}
