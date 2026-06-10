import type { Metadata } from "next";
import { ProjectCard } from "@/components/marketing/project-card";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h1 className="hero-heading">Studio Projects</h1>
          <p className="lead">The open-core foundation for governed agents and trusted UI.</p>
        </div>
        <div className="grid-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel="h2" />
          ))}
        </div>
      </div>
    </section>
  );
}
