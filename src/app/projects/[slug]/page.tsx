import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConfigPanel } from "@/components/config-panel/config-panel";
import { ProjectDetail } from "@/components/marketing/project-detail";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getProject, projects } from "@/content/projects";
import { createMetadata, createProjectMetadata, projectJsonLd } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return createMetadata({
      title: "Project not found",
      description: "No Studio project exists for this route.",
      path: `/projects/${slug}`
    });
  }

  return createProjectMetadata(project);
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = projectJsonLd(project);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetail project={project}>
        {project.slug === "registry" ? (
          <Section className="detail-exhibit">
            <Reveal>
              <SectionHeading
                number="03+"
                kicker="Exhibit"
                title="The vocabulary, live."
                lead="This site runs on the same contract the registry publishes: schema-validated dials, generated CSS variables, and registry-ready metadata. Adjust the foundation preset below — nothing outside the specimen changes."
              />
            </Reveal>
            <Reveal delay={80}>
              <ConfigPanel />
            </Reveal>
          </Section>
        ) : null}
      </ProjectDetail>
    </>
  );
}
