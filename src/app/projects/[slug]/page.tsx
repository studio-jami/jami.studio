import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
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
    <article className="section project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="project-hero">
        <div className="section-heading">
          <p className="meta">{project.subdomain}</p>
          <h1>{project.name}</h1>
          <p>{project.positioning}</p>
          <div className="button-row">
            {project.ctas.map((cta, index) => (
              <a
                key={cta.href}
                className={`button ${index === 0 ? "primary" : "secondary"}`}
                href={cta.href}
              >
                {cta.label}
              </a>
            ))}
          </div>
        </div>
        <aside className="project-facts" aria-label={`${project.name} public links`}>
          {linkTargets.map((target) => (
            <a key={target.label} href={target.href}>
              <span>{target.label}</span>
              <strong>{target.value}</strong>
            </a>
          ))}
        </aside>
      </div>

      <div className="detail-grid project-overview">
        <section>
          <p className="meta">Audience</p>
          <h2>Who it serves</h2>
          <p>{project.audience}</p>
        </section>
        <section>
          <p className="meta">AI summary</p>
          <h2>Agent-readable shape</h2>
          <p>{project.aiSummary}</p>
        </section>
      </div>

      <div className="detail-grid">
        <section>
          <p className="meta">Capabilities</p>
          <h2>What it provides</h2>
          <ul>
            {project.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <p className="meta">Proof posture</p>
          <h2>Why the boundary holds</h2>
          <ul>
            {project.proofPoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
