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
          <h1>Project briefs</h1>
          <p>
            The Studio family is modeled as separate products over shared foundations. This site
            keeps their public routes, repositories, docs, APIs, and AI summaries in one
            source-owned registry.
          </p>
        </div>
        <div className="route-ledger" aria-label="Project route ledger">
          {projects.map((project) => (
            <a key={project.slug} href={project.route}>
              <span>{project.shortName}</span>
              <code>{project.route}</code>
            </a>
          ))}
        </div>
      </section>
      <div className="section project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
