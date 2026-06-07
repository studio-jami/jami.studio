import Link from "next/link";
import { ProjectCard } from "@/components/marketing/project-card";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectPath } from "@/lib/routes";

export default function HomePage() {
  const featuredProject = projects.find((project) => project.slug === "intercal") ?? projects[0];

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
          <div className="map-orbit" aria-hidden="true">
            <span>runtime</span>
            <span>interface</span>
            <span>memory</span>
          </div>
          {projects.map((project) => (
            <Link key={project.slug} href={projectPath(project)}>
              <span>{project.shortName}</span>
              <small>{project.summary}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section split-section">
        <div className="section-heading">
          <p className="meta">Project family</p>
          <h2>One public hub, separate implementation surfaces.</h2>
          <p>{site.home.proof}</p>
        </div>
        <div className="feature-panel">
          <p className="meta">Live integration</p>
          <h3>{featuredProject.name}</h3>
          <p>{featuredProject.positioning}</p>
          <Link className="text-link" href={projectPath(featuredProject)}>
            Explore {featuredProject.shortName}
          </Link>
        </div>
      </section>

      <section className="section">
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

      <section className="section">
        <div className="section-heading">
          <p className="meta">Source boundaries</p>
          <h2>Designed for human and agent readers</h2>
        </div>
        <div className="detail-grid">
          {site.faqs.map((faq) => (
            <section key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
