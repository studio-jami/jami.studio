import Link from "next/link";
import { projects } from "@/content/projects";

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
            <Link key={project.slug} href={project.route} className="project-card">
              <span className="eyebrow">{project.shortName}</span>
              <h3>{project.name}</h3>
              <p className="summary">{project.summary}</p>
              <div className="positioning">{project.positioning}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
