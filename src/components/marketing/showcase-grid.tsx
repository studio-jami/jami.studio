import { Reveal } from "@/components/system/reveal";
import { ProjectCard } from "@/components/marketing/project-card";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";

type ShowcaseGridProps = {
  /** Render the section heading (home). Index page supplies its own page hero. */
  heading?: boolean;
  number?: string;
};

/**
 * The five Studio projects as the "selected work" grid — the portfolio
 * centerpiece on home and the /projects index.
 */
export function ShowcaseGrid({ heading = true, number = "02" }: ShowcaseGridProps) {
  return (
    <Section divider={heading} aria-labelledby="showcase-title">
      {heading ? (
        <SectionHeading
          number={number}
          eyebrow="Selected work"
          title={<span id="showcase-title">The Studio project family.</span>}
          lead="Five separate products over one shared foundation. Each links to its own repository, docs, and live surface through centralized metadata."
        />
      ) : (
        <h2 id="showcase-title" className="visually-hidden">
          Studio project family
        </h2>
      )}
      <div className="showcase-grid">
        {projects.map((project, index) => (
          <Reveal key={project.slug} index={index}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
