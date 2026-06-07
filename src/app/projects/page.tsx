import type { Metadata } from "next";
import { LuminousProjectCard } from "@/components/luminous-grid/project-card";
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
      <section className="lg-page-hero">
        <p className="lg-meta">Studio OSS family</p>
        <h1>Projects</h1>
        <p>
          The Studio family is modeled as separate products over shared foundations. This site keeps
          their public routes, repositories, docs, APIs, and AI summaries in one source-owned
          registry.
        </p>
      </section>
      <section className="lg-section" style={{ paddingTop: 0 }}>
        <div className="lg-project-grid">
          {projects.map((project) => (
            <LuminousProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}