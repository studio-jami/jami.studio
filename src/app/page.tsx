import Link from "next/link";
import { ConfigPanel } from "@/components/config-panel/config-panel";
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
          <div className="signal-row" aria-label="Studio public surface signals">
            <span>canonical metadata</span>
            <span>generated AI files</span>
            <span>subdomain-ready routes</span>
          </div>
          <div className="button-row">
            <Link className="button primary" href={site.home.primaryCta.href}>
              {site.home.primaryCta.label}
            </Link>
            <Link className="button secondary" href={site.home.secondaryCta.href}>
              {site.home.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="system-panel" aria-label="Studio project family map">
          <div className="system-panel-head">
            <p className="meta">Project map</p>
            <strong>Separate runtimes, one public contract.</strong>
          </div>
          <div className="system-map">
            {projects.map((project) => (
              <Link key={project.slug} href={projectPath(project)}>
                <span>{project.shortName}</span>
                <small>{project.summary}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section proof-band" aria-label="Source-owned public surface">
        <div>
          <p className="meta">Source-owned public surface</p>
          <strong>{site.home.proof}</strong>
        </div>
        <div className="proof-list">
          <span>Routes</span>
          <span>Project links</span>
          <span>Metadata</span>
          <span>Sitemap</span>
          <span>Robots</span>
          <span>AI index</span>
        </div>
      </section>

      <section className="section split-section">
        <div className="section-heading">
          <p className="meta">Project family</p>
          <h2>One public hub, separate implementation surfaces</h2>
          <p>
            The homepage introduces the whole Studio system while every project page stays grounded
            in centralized route, repository, docs, API, CTA, and AI-summary data.
          </p>
        </div>
        <div className="project-grid project-grid-compact">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section featured-system">
        <div className="featured-copy">
          <p className="meta">First integrated surface</p>
          <h2>{featuredProject.name}</h2>
          <p>{featuredProject.positioning}</p>
          <div className="button-row">
            {featuredProject.ctas.map((cta) => (
              <a key={cta.href} className="button secondary" href={cta.href}>
                {cta.label}
              </a>
            ))}
          </div>
        </div>
        <div className="capability-stack">
          {featuredProject.capabilities.map((capability) => (
            <span key={capability}>{capability}</span>
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

      <ConfigPanel />
    </>
  );
}
