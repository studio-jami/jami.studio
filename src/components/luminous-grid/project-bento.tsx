import type { StudioProject } from "@/content/projects";
import type { projectLinkTargets } from "@/lib/routes";
import { ProjectIcon } from "./project-icons";

export function ProjectBento({
  project,
  linkTargets
}: {
  project: StudioProject;
  linkTargets: ReturnType<typeof projectLinkTargets>;
}) {
  return (
    <div className="lg-bento">
      <section className="lg-bento-cell lg-bento-cell--hero">
        <div className="lg-bento-hero-icon">
          <ProjectIcon slug={project.slug} />
        </div>
        <div>
          <p className="lg-meta">{project.subdomain}</p>
          <h1>{project.name}</h1>
          <p className="lg-lead">{project.positioning}</p>
        </div>
        <div className="lg-button-row">
          {project.ctas.map((cta) => {
            const isExternal = cta.href.startsWith("http");
            return (
              <a
                key={cta.href}
                href={cta.href}
                className={
                  cta.kind === "primary" ? "lg-button lg-button--primary" : "lg-button lg-button--secondary"
                }
                {...(isExternal ? { rel: "noopener noreferrer", target: "_blank" } : {})}
              >
                {cta.label}
              </a>
            );
          })}
        </div>
      </section>

      <section className="lg-bento-cell lg-bento-cell--audience">
        <h2>Who it serves</h2>
        <p>{project.audience}</p>
      </section>

      <section className="lg-bento-cell lg-bento-cell--ai">
        <h2>AI summary</h2>
        <p>{project.aiSummary}</p>
      </section>

      <section className="lg-bento-cell lg-bento-cell--links">
        <h2>Link contract</h2>
        <dl className="lg-link-list">
          {linkTargets.map((target) => (
            <div key={target.label}>
              <dt>{target.label}</dt>
              <dd>
                <a
                  href={target.href}
                  {...(target.href.startsWith("http")
                    ? { rel: "noopener noreferrer", target: "_blank" }
                    : {})}
                >
                  {target.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="lg-bento-cell lg-bento-cell--capabilities">
        <h2>Capabilities</h2>
        <ul className="lg-check-list">
          {project.capabilities.map((item) => (
            <li key={item}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="16" height="16">
                <path
                  d="M3 8l3.5 3.5L13 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="lg-bento-cell lg-bento-cell--proof">
        <h2>Proof posture</h2>
        <ul className="lg-check-list">
          {project.proofPoints.map((item) => (
            <li key={item}>
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="16" height="16">
                <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="lg-bento-cell lg-bento-cell--boundary">
        <h2>Marketing boundary</h2>
        <p>
          This page presents the public route, source links, positioning, and AI-readable description
          for {project.shortName}. The product runtime remains owned by its separate implementation
          surface at {project.subdomain}.
        </p>
      </section>
    </div>
  );
}