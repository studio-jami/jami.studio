import { ProjectCard } from "@/components/marketing/project-card";
import { Button } from "@/components/ui/button";
import { Eyebrow, Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { projects } from "@/content/projects";

/**
 * The five Studio products as the "selected work" centerpiece. A 6-column grid where the
 * first two cards span wider — portfolio-grade rhythm that gives each item room to breathe.
 * On the /projects index this same set renders through `ShowcaseGrid variant="index"`.
 */
export function ShowcaseGrid({ variant = "home" }: { variant?: "home" | "index" }) {
  const isHome = variant === "home";

  return (
    <Section aria-labelledby="showcase-heading">
      <Reveal>
        <div className="showcase-head">
          <div className="section-head">
            <Eyebrow>Selected work</Eyebrow>
            <h2 id="showcase-heading">
              {isHome ? "The Studio product family" : "Every product in the family"}
            </h2>
            <p>
              Separate implementation surfaces over one shared foundation: governed agents, trusted
              UI, coordination, temporal knowledge, and open agent society.
            </p>
          </div>
          {isHome ? (
            <Button href="/projects" variant="secondary" withArrow>
              View all projects
            </Button>
          ) : null}
        </div>
      </Reveal>

      <Reveal>
        <div className={isHome ? "showcase-grid" : "index-grid"}>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
