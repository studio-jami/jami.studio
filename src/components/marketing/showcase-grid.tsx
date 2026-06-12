import { ProjectCard } from "@/components/marketing/project-card";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { projects } from "@/content/projects";

/**
 * Selected work — the centerpiece. Nouva's Testimonials slot becomes the five-project
 * product-family showcase: an editorial card grid, oversized numbering, hairline rules,
 * generous gutters. Each card opens its `/projects/[slug]` detail. No fake testimonials.
 */
export function ShowcaseGrid({
  number = "05",
  eyebrow = "Selected work",
  title = "Five products, one open-core family.",
  titleId = "showcase-title",
  className
}: {
  number?: string;
  eyebrow?: string;
  title?: string;
  titleId?: string;
  className?: string;
}) {
  return (
    <Section
      className={["showcase", className].filter(Boolean).join(" ")}
      divided
      aria-labelledby={titleId}
    >
      <SectionHeading number={number} eyebrow={eyebrow} title={title} titleId={titleId} />
      <div className="showcase-grid">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
