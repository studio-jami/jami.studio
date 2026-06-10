import type { Metadata } from "next";
import { Atmosphere } from "@/components/layout/atmosphere";
import { CtaBand } from "@/components/marketing/cta-band";
import { ProjectCard } from "@/components/marketing/project-card";
import { Reveal } from "@/components/ui/reveal";
import { Section, Shell } from "@/components/ui/section";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero" aria-label="Projects introduction">
        <Atmosphere variant="hero" />
        <Shell className="page-hero-inner">
          <p className="eyebrow">Studio OSS family</p>
          <h1 className="page-title">
            The <em className="page-title-em">index</em>.
          </h1>
          <p className="page-lead">
            Separate products over shared foundations: governed agents, trusted UI, coordination,
            temporal knowledge, and open agent society.
          </p>
        </Shell>
      </section>

      <Section className="project-index">
        <div className="card-grid">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 70}>
              <ProjectCard
                project={project}
                position={index + 1}
                variant="card"
                headingLevel="h2"
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        kicker="Machine readable"
        title={
          <>
            The same family, as <em className="cta-em">source</em>.
          </>
        }
        lead={site.home.proof}
        actions={[
          { label: site.home.secondaryCta.label, href: site.home.secondaryCta.href },
          { label: "Back to the studio", href: "/", variant: "secondary" }
        ]}
      />
    </>
  );
}
