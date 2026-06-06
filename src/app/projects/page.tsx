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
      <section className="section page-hero index-hero">
        <div className="section-heading">
          <p className="meta">Studio OSS family</p>
          <h1>Projects</h1>
          <p>
            The Studio family is modeled as separate products over shared foundations. This site
            keeps their public routes, repositories, docs, APIs, and AI summaries in one
            source-owned registry.
          </p>
        </div>
        <div className="index-ledger" aria-label="Shared project registry fields">
          <span>route</span>
          <span>subdomain</span>
          <span>repository</span>
          <span>docs</span>
          <span>API</span>
          <span>AI summary</span>
        </div>
      </section>

      <section className="section project-index">
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section matrix-section">
        <div className="section-heading">
          <p className="meta">Route contract</p>
          <h2>Every project can move without component rewrites</h2>
        </div>
        <div className="project-matrix">
          {projects.map((project) => (
            <article key={project.slug}>
              <span>{project.shortName}</span>
              <strong>{project.subdomain}</strong>
              <p>{project.aiSummary}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
