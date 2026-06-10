import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/cta-band";
import { ProjectShowcase } from "@/components/marketing/project-showcase";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container container--wide">
          <Eyebrow index="—">Studio OSS family</Eyebrow>
          <h1 className="page-hero__title">Projects</h1>
          <p className="page-hero__lead">
            Separate products over shared foundations: governed agents, trusted UI, coordination,
            temporal knowledge, and open agent society. {projects.length} products, one public hub.
          </p>
        </div>
      </header>

      <Section width="wide" size="compact" bordered>
        <ProjectShowcase feature />
      </Section>

      <Section width="wide" size="compact">
        <CtaBand
          eyebrow="Agent-readable"
          title="Read the whole family at a glance."
          lead="The AI index resolves the product family, public routes, and source boundaries from stable generated text."
          actions={[
            { label: "Read AI index", href: "/llms.txt" },
            { label: "Full AI source", href: "/llms-full.txt", variant: "secondary" }
          ]}
        />
      </Section>
    </>
  );
}
