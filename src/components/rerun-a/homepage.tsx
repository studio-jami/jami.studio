import type { CSSProperties } from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectPath } from "@/lib/routes";
import { AtlasProjectCard } from "./project-card";
import { AtlasHeroVisual } from "./svg/atlas-hero-visual";

export function AtlasHomepage() {
  return (
    <div className="atlas-page">
      <section className="atlas-hero">
        <div className="atlas-hero-grid">
          <div className="atlas-hero-copy">
            <p className="atlas-eyebrow">{site.home.eyebrow}</p>
            <h1 className="atlas-display-title">{site.home.title}</h1>
            <p className="atlas-lead">{site.home.lead}</p>
            <div className="atlas-button-row">
              <Link className="atlas-button atlas-button-primary" href={site.home.primaryCta.href}>
                {site.home.primaryCta.label}
              </Link>
              <Link className="atlas-button atlas-button-ghost" href={site.home.secondaryCta.href}>
                {site.home.secondaryCta.label}
              </Link>
            </div>
            <ul className="atlas-hero-stats" aria-label="Studio family highlights">
              <li>
                <strong>5</strong>
                <span>OSS surfaces</span>
              </li>
              <li>
                <strong>1</strong>
                <span>source registry</span>
              </li>
              <li>
                <strong>AI</strong>
                <span>readable by design</span>
              </li>
            </ul>
          </div>
          <div className="atlas-hero-visual-wrap">
            <AtlasHeroVisual />
          </div>
        </div>
      </section>

      <section className="atlas-section">
        <div className="atlas-section-heading">
          <p className="atlas-eyebrow">Project family</p>
          <h2>One atlas, separate implementation surfaces</h2>
          <p>{site.home.proof}</p>
        </div>
        <div className="atlas-project-grid">
          {projects.map((project) => (
            <AtlasProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="atlas-section atlas-pillars">
        {site.home.pillars.map((pillar, index) => (
          <article
            key={pillar.title}
            className="atlas-glass-card atlas-pillar-card"
            style={{ "--pillar-index": index } as CSSProperties}
          >
            <span className="atlas-pillar-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2>{pillar.title}</h2>
            <p>{pillar.body}</p>
          </article>
        ))}
      </section>

      <section className="atlas-section">
        <div className="atlas-section-heading">
          <p className="atlas-eyebrow">Source boundaries</p>
          <h2>Designed for human and agent readers</h2>
        </div>
        <div className="atlas-faq-grid">
          {site.faqs.map((faq) => (
            <article key={faq.question} className="atlas-glass-card atlas-faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="atlas-section atlas-cta-band">
        <div className="atlas-cta-band-inner atlas-glass-card">
          <div>
            <p className="atlas-eyebrow">Explore the family</p>
            <h2>Every route resolves from shared source data</h2>
            <p>
              Repositories, docs, APIs, subdomains, and AI summaries stay centralized so each product
              can graduate to its own host without rewriting the hub.
            </p>
          </div>
          <div className="atlas-button-row">
            <Link className="atlas-button atlas-button-primary" href="/projects">
              View all projects
            </Link>
            <Link className="atlas-button atlas-button-ghost" href="/llms.txt">
              Read AI index
            </Link>
          </div>
        </div>
        <nav className="atlas-quick-nav" aria-label="Quick project links">
          {projects.map((project) => (
            <Link key={project.slug} href={projectPath(project)}>
              {project.shortName}
            </Link>
          ))}
        </nav>
      </section>
    </div>
  );
}