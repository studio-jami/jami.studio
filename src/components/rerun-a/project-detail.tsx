import type { StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";
import { ProjectIllustration } from "./svg/project-illustrations";

export function AtlasProjectDetail({ project }: { project: StudioProject }) {
  const linkTargets = projectLinkTargets(project);

  return (
    <article className="atlas-page atlas-project-detail">
      <header className="atlas-project-hero atlas-glass-card">
        <div className="atlas-project-hero-copy">
          <p className="atlas-eyebrow">{project.subdomain}</p>
          <h1 className="atlas-display-title atlas-display-title-sm">{project.name}</h1>
          <p className="atlas-lead">{project.positioning}</p>
          <div className="atlas-button-row">
            {project.ctas.map((cta) => (
              <a
                key={cta.href}
                className={cta.kind === "primary" ? "atlas-button atlas-button-primary" : "atlas-button atlas-button-ghost"}
                href={cta.href}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>
        <div className="atlas-project-hero-art">
          <ProjectIllustration slug={project.slug} className="atlas-project-illustration atlas-project-illustration-hero" />
        </div>
      </header>

      <section className="atlas-section atlas-detail-grid">
        <article className="atlas-glass-card">
          <h2>Who it serves</h2>
          <p>{project.audience}</p>
        </article>
        <article className="atlas-glass-card">
          <h2>Link contract</h2>
          <dl className="atlas-link-list">
            {linkTargets.map((target) => (
              <div key={target.label}>
                <dt>{target.label}</dt>
                <dd>
                  <a href={target.href}>{target.value}</a>
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </section>

      <section className="atlas-section atlas-detail-grid">
        <article className="atlas-glass-card">
          <h2>Capabilities</h2>
          <ul className="atlas-bullet-list">
            {project.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="atlas-glass-card">
          <h2>Proof posture</h2>
          <ul className="atlas-bullet-list">
            {project.proofPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>
    </article>
  );
}