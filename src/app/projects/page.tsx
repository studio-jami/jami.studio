import type { Metadata } from "next";
import { ProjectCard } from "@/components/marketing/project-card";
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
      <section className="section page-hero">
        <div className="section-heading">
          <p className="meta">Studio OSS family</p>
          <h1>Projects</h1>
          <p>
            Separate products over shared foundations: governed agents, trusted UI, coordination,
            temporal knowledge, and open agent society.
          </p>
        </div>
      </section>
      <section className="section project-index">
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
