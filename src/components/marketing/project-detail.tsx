import Link from "next/link";
import { Button } from "@/components/system/button";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";
import { projects } from "@/content/projects";

export function ProjectDetail({ project }: { project: StudioProject }) {
  const siblings = projects.filter((p) => p.slug !== project.slug);

  const primaryCta = project.ctas.find((c) => c.kind === "primary") ?? project.ctas[0];
  const secondaryCtas = project.ctas.filter((c) => c !== primaryCta);

  return (
    <article>
      {/* Hero */}
      <div className="project-hero">
        <div>
          <p className="meta">{project.subdomain}</p>
          <h1>{project.name}</h1>
          <p className="lead" style={{ maxWidth: "52ch" }}>{project.positioning}</p>

          <div className="button-row">
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>
            {secondaryCtas.map((cta) => (
              <Button key={cta.href} href={cta.href} variant="secondary">
                {cta.label}
              </Button>
            ))}
          </div>
        </div>

        <aside className="project-facts" aria-label={`${project.name} public links`}>
          {[
            { label: "Route", value: project.route, href: projectPath(project) },
            { label: "Subdomain", value: project.subdomain, href: project.domainTarget },
            { label: "Repository", value: project.repoUrl.replace("https://github.com/", ""), href: project.repoUrl },
            { label: "Docs", value: "Documentation", href: project.docsUrl },
            ...(project.apiUrl ? [{ label: "API", value: "API surface", href: project.apiUrl }] : [])
          ].map((fact) => (
            <a key={fact.label} href={fact.href}>
              <span className="label">{fact.label}</span>
              <span className="value">{fact.value}</span>
            </a>
          ))}
        </aside>
      </div>

      {/* Audience + AI-readable summary */}
      <div className="overview-grid section">
        <section>
          <p className="meta">Audience</p>
          <h2>Who it serves</h2>
          <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem" }}>{project.audience}</p>
        </section>
        <section>
          <p className="meta">For agents and tools</p>
          <h2>Agent-readable shape</h2>
          <p style={{ color: "var(--muted-foreground)", marginTop: "0.5rem" }}>{project.aiSummary}</p>
        </section>
      </div>

      {/* Capabilities */}
      <div className="capabilities-grid section">
        <section>
          <p className="meta">Capabilities</p>
          <h2>What it provides</h2>
          <ul>
            {project.capabilities.map((cap, i) => (
              <li key={i}>{cap}</li>
            ))}
          </ul>
        </section>
        <section>
          <p className="meta">Proof posture</p>
          <h2>Why the boundary holds</h2>
          <ul>
            {project.proofPoints.map((pp, i) => (
              <li key={i}>{pp}</li>
            ))}
          </ul>
        </section>
      </div>

      {/* Family cross-links */}
      <section className="section" aria-labelledby="family-heading">
        <div className="section-number">Part of the family</div>
        <h2 id="family-heading" style={{ marginBottom: "1rem" }}>Explore the rest of Studio</h2>
        <div className="family-grid">
          {siblings.map((sib) => (
            <Link key={sib.slug} href={projectPath(sib)} className="family-link card">
              <div className="name">{sib.shortName}</div>
              <div className="sub">{sib.summary}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Final CTAs */}
      <section className="section" style={{ paddingBottom: "calc(var(--section) * 0.55)" }}>
        <div className="cta-band">
          <div>
            <h2 style={{ fontSize: "var(--text-lg)" }}>Start here</h2>
            <p className="small" style={{ marginTop: "0.25rem", maxWidth: "42ch" }}>
              All project links, repositories, docs, and subdomain targets are resolved from the central registry.
            </p>
          </div>
          <div className="actions">
            {project.ctas.map((cta, idx) => (
              <Button
                key={idx}
                href={cta.href}
                variant={idx === 0 ? "primary" : "secondary"}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
