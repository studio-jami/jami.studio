import Link from "next/link";
import Image from "next/image";
import { ConfigPanel } from "@/components/config-panel/config-panel";
import { ProjectCard } from "@/components/marketing/project-card";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectPath } from "@/lib/routes";

export default function HomePage() {
  const primaryProjects = projects.slice(0, 3);
  const supportingProjects = projects.slice(3);

  return (
    <>
      <section className="hero command-hero">
        <div className="hero-copy command-panel">
          <div className="status-strip" aria-label="Public surface coverage">
            <span>Public hub</span>
            <span>5 project routes</span>
            <span>AI-readable</span>
          </div>
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

        <div className="topology-panel" aria-label="Studio project family topology">
          <div className="topology-core">
            <span>www</span>
            <strong>jami.studio</strong>
            <small>canonical hub</small>
          </div>
          <div className="topology-grid">
            {projects.map((project) => (
              <Link key={project.slug} href={projectPath(project)} className="topology-node">
                <span>{project.shortName}</span>
                <small>{project.subdomain}</small>
              </Link>
            ))}
          </div>
          <div className="telemetry-row" aria-label="Generated public files">
            <span>robots.txt</span>
            <span>sitemap.xml</span>
            <span>llms.txt</span>
          </div>
        </div>
      </section>

      <section className="section command-section">
        <div className="section-heading">
          <p className="meta">Operational topology</p>
          <h2>One public control surface, separate implementation routes</h2>
          <p>{site.home.proof}</p>
        </div>
        <div className="project-grid featured-grid">
          {primaryProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section routing-section">
        <div className="signal-board">
          <div>
            <p className="meta">Registry-ready routing</p>
            <h2>Every visible path resolves through shared source data.</h2>
          </div>
          <div className="route-stack">
            {supportingProjects.map((project) => (
              <Link key={project.slug} href={projectPath(project)} className="route-row">
                <Image src={project.socialImage} alt="" width={1200} height={630} />
                <span>
                  <strong>{project.name}</strong>
                  <small>{project.positioning}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section pillar-grid">
        {site.home.pillars.map((pillar, index) => (
          <article key={pillar.title}>
            <span className="index-mark">{String(index + 1).padStart(2, "0")}</span>
            <h2>{pillar.title}</h2>
            <p>{pillar.body}</p>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="meta">Source boundary</p>
          <h2>Designed for human and agent readers</h2>
        </div>
        <div className="detail-grid faq-grid">
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
