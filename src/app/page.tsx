import Link from "next/link";
import { ConfigPanel } from "@/components/config-panel/config-panel";
import { ProjectCard } from "@/components/marketing/project-card";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="meta">{site.home.eyebrow}</p>
          <h1>{site.home.title}</h1>
          <p className="lead">{site.home.lead}</p>
          <div className="button-row">
            <Link className="button primary" href={site.home.primaryCta.href}>
              {site.home.primaryCta.label}
            </Link>
            <Link className="button secondary" href={site.home.secondaryCta.href}>
              {site.home.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="system-map" aria-label="Studio project family map">
          {projects.map((project) => (
            <Link key={project.slug} href={project.route}>
              <span>{project.shortName}</span>
              <small>{project.summary}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="meta">Project family</p>
          <h2>One public hub, separate implementation surfaces</h2>
          <p>{site.home.proof}</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section pillar-grid">
        {site.home.pillars.map((pillar) => (
          <article key={pillar.title}>
            <h2>{pillar.title}</h2>
            <p>{pillar.body}</p>
          </article>
        ))}
      </section>

      <ConfigPanel />
    </>
  );
}
