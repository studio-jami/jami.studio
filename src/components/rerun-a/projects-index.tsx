import { projects } from "@/content/projects";
import { AtlasProjectCard } from "./project-card";

export function AtlasProjectsIndex() {
  return (
    <div className="atlas-page">
      <section className="atlas-section atlas-page-hero">
        <div className="atlas-section-heading atlas-page-hero-heading">
          <p className="atlas-eyebrow">Studio OSS family</p>
          <h1 className="atlas-display-title atlas-display-title-sm">Projects</h1>
          <p>
            The Studio family is modeled as separate products over shared foundations. This site keeps
            their public routes, repositories, docs, APIs, and AI summaries in one source-owned
            registry.
          </p>
        </div>
        <div className="atlas-project-grid atlas-project-grid-full">
          {projects.map((project) => (
            <AtlasProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}