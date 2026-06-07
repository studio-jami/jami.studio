import Link from "next/link";
import { ConfigPanel } from "@/components/config-panel/config-panel";
import { EcosystemHero } from "@/components/luminous-grid/ecosystem-hero";
import { LuminousProjectCard } from "@/components/luminous-grid/project-card";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="lg-hero">
        <div className="lg-hero-copy">
          <div className="lg-hero-badge">
            <span className="lg-hero-badge-dot" aria-hidden="true" />
            Studio OSS family
          </div>
          <p className="lg-meta">{site.home.eyebrow}</p>
          <h1>{site.home.title}</h1>
          <p className="lg-lead">{site.home.lead}</p>
          <div className="lg-button-row">
            <Link className="lg-button lg-button--primary" href={site.home.primaryCta.href}>
              {site.home.primaryCta.label}
            </Link>
            <Link className="lg-button lg-button--secondary" href={site.home.secondaryCta.href}>
              {site.home.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="lg-hero-visual">
          <EcosystemHero projects={projects} />
        </div>
      </section>

      <section className="lg-section">
        <div className="lg-proof-band">
          <div>
            <p className="lg-meta">Source-owned surface</p>
            <h2>One hub, five implementation routes</h2>
          </div>
          <p>{site.home.proof}</p>
        </div>
      </section>

      <section className="lg-section">
        <div className="lg-section-heading">
          <p className="lg-meta">Project family</p>
          <h2>Separate products, shared foundations</h2>
          <p>
            Each project owns its runtime, repository, and subdomain. This site keeps their public
            routes, metadata, and AI summaries in one registry.
          </p>
        </div>
        <div className="lg-project-grid">
          {projects.map((project) => (
            <LuminousProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="lg-section">
        <div className="lg-section-heading">
          <p className="lg-meta">Foundation pillars</p>
          <h2>Built for agent-native products</h2>
        </div>
        <div className="lg-pillar-grid">
          {site.home.pillars.map((pillar, index) => (
            <article key={pillar.title} className="lg-pillar-card">
              <span className="lg-pillar-index">{String(index + 1).padStart(2, "0")}</span>
              <h2>{pillar.title}</h2>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lg-section">
        <div className="lg-section-heading">
          <p className="lg-meta">Source boundaries</p>
          <h2>Designed for human and agent readers</h2>
        </div>
        <div className="lg-faq-grid">
          {site.faqs.map((faq) => (
            <section key={faq.question} className="lg-faq-card">
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