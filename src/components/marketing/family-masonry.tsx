import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/system/reveal";
import { ProjectCard } from "@/components/marketing/project-card";
import { projects } from "@/content/projects";

/**
 * Testimonials slot → the five-project family. Nouva's 3-column testimonial masonry,
 * filled with the five real `ProjectCard`s (NOT fabricated quotes). This is the work
 * showcase in Nouva's idiom — charcoal cards on the void, each opening its detail page.
 */
export function FamilyMasonry() {
  return (
    <section className="section" aria-labelledby="family-title">
      <Container>
        <SectionHeading
          eyebrow="The family"
          title={
            <>
              Five products,{" "}
              <span className="title-soft">one shared foundation.</span>
            </>
          }
          titleId="family-title"
          align="center"
        />

        <div className="family-masonry">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 3) * 70}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
