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
      <section className="section page-hero project-index-hero">
        <div className="section-heading command-panel">
          <p className="meta">Studio OSS family</p>
          <h1>Projects</h1>
          <p>
            The Studio family is modeled as separate products over shared foundations. This site
            keeps their public routes, repositories, docs, APIs, and AI summaries in one
            source-owned registry.
          </p>
        </div>
        <div className="index-metrics" aria-label="Project index coverage">
          <span>
            <strong>{projects.length}</strong>
            <small>project pages</small>
          </span>
          <span>
            <strong>1</strong>
            <small>hub registry</small>
          </span>
          <span>
            <strong>0</strong>
            <small>component link forks</small>
          </span>
        </div>
      </section>

      <section className="section">
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
