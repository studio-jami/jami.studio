import Link from "next/link";
import { ConfigPanel } from "@/components/config-panel/config-panel";
import { HeroSignalArt } from "@/components/signal-forge/hero-signal-art";
import { MetricsStrip } from "@/components/signal-forge/metrics-strip";
import { SignalForgeProjectCard } from "@/components/signal-forge/project-card";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectPath } from "@/lib/routes";

export default function HomePage() {
  return (
    <>
      <section className="hero forge-hero">
        <div className="hero-copy">
          <p className="meta">{site.home.eyebrow}</p>
          <h1>{site.home.title}</h1>
          <p className="lead">{site.home.lead}</p>
          <MetricsStrip
            items={[
              { label: "Projects", value: "5 surfaces" },
              { label: "Routes", value: "Source-owned" },
              { label: "AI index", value: "Generated" }
            ]}
          />
          <div className="button-row">
            <Link className="button primary" href={site.home.primaryCta.href}>
              {site.home.primaryCta.label}
            </Link>
            <Link className="button secondary" href={site.home.secondaryCta.href}>
              {site.home.secondaryCta.label}
            </Link>
          </div>
        </div>
        <HeroSignalArt />
      </section>

      <section className="section">
        <div className="forge-proof-band">
          <div>
            <p className="meta">Source-owned public surface</p>
            <strong>{site.home.proof}</strong>
          </div>
          <div className="forge-proof-tags" aria-label="Generated public artifacts">
            <span>routes</span>
            <span>metadata</span>
            <span>sitemap</span>
            <span>robots</span>
            <span>llms.txt</span>
            <span>llms-full.txt</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="meta">Project family</p>
          <h2>One public hub, separate implementation surfaces</h2>
          <p>
            The Studio family ships as distinct products over shared foundations. Every card, route,
            and CTA resolves from centralized registry data.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <SignalForgeProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="forge-lattice-panel">
          <p className="meta">Signal lattice</p>
          <h2>Subdomain-ready topology from one canonical hub</h2>
          <div className="forge-signal-lattice" aria-label="Studio project subdomain lattice">
            {projects.map((project) => (
              <Link key={project.slug} href={projectPath(project)}>
                <span>{project.shortName}</span>
                <small>{project.subdomain}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section pillar-grid">
        {site.home.pillars.map((pillar, index) => (
          <article key={pillar.title}>
            <span className="pillar-index">{String(index + 1).padStart(2, "0")}</span>
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