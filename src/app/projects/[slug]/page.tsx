import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCapabilityDiagram } from "@/components/signal-forge/project-capability-diagram";
import { getProject, projects, type ProjectSlug } from "@/content/projects";
import { createMetadata, createProjectMetadata, projectJsonLd } from "@/lib/metadata";
import { projectLinkTargets } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return createMetadata({
      title: "Project not found",
      description: "No Studio project exists for this route.",
      path: `/projects/${slug}`
    });
  }

  return createProjectMetadata(project);
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = projectJsonLd(project);
  const linkTargets = projectLinkTargets(project);

  return (
    <article className="section project-detail forge-page-hero">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="project-detail-hero">
        <div className="project-dashboard-panel">
          <p className="meta">{project.subdomain}</p>
          <h1>{project.name}</h1>
          <p>{project.positioning}</p>
          <div className="button-row">
            {project.ctas.map((cta) => (
              <a
                key={cta.href}
                className={cta.kind === "primary" ? "button primary" : "button secondary"}
                href={cta.href}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>
        <ProjectCapabilityDiagram slug={project.slug as ProjectSlug} />
      </header>

      <dl className="project-metrics-row" aria-label={`${project.shortName} dashboard metrics`}>
        <div className="project-metric-card">
          <dt>Audience</dt>
          <dd>{project.audience}</dd>
        </div>
        <div className="project-metric-card">
          <dt>Route</dt>
          <dd>{project.route}</dd>
        </div>
        <div className="project-metric-card">
          <dt>AI summary</dt>
          <dd>{project.aiSummary}</dd>
        </div>
      </dl>

      <div className="detail-grid">
        <section>
          <h2>Link contract</h2>
          <dl>
            {linkTargets.map((target) => (
              <div key={target.label}>
                <dt>{target.label}</dt>
                <dd>
                  <a href={target.href}>{target.value}</a>
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <h2>Capabilities</h2>
          <ul>
            {project.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>

      <div className="detail-grid">
        <section>
          <h2>Proof posture</h2>
          <ul>
            {project.proofPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Marketing boundary</h2>
          <p>
            This page presents the public route, source links, positioning, and AI-readable
            description for {project.shortName}. The product runtime remains owned by its separate
            implementation surface.
          </p>
        </section>
      </div>
    </article>
  );
}