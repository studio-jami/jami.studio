import { ProjectCard } from "@/components/marketing/project-card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";

/**
 * The centerpiece: the five Studio products presented as the selected-work
 * ledger — number, name, summary, host — each row a doorway into a case study.
 */
export function FamilyShowcase({ number }: { number: string }) {
  return (
    <Section id="work" className="showcase">
      <Reveal>
        <SectionHeading
          number={number}
          kicker="Selected work"
          title="The product family."
          lead="Five surfaces, one substrate. Every name, link, and claim below is generated from the shared project registry."
        />
      </Reveal>
      <div className="work-list">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard project={project} position={index + 1} variant="row" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
