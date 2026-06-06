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
      <div className="section-heading">
        <p className="meta">{project.subdomain}</p>
        <h1>{project.name}</h1>
        <p>{project.positioning}</p>
        <div className="button-row">
          {project.ctas.map((cta) => (
            <a key={cta.href} className="button secondary" href={cta.href}>
              {cta.label}
            </a>
          ))}
        </div>
      </div>

      <div className="detail-grid">
        <section>
          <h2>Who it serves</h2>
          <p>{project.audience}</p>
        </section>
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
      </div>

      <div className="detail-grid">
        <section>
          <h2>Capabilities</h2>
          <ul>
            {project.capabilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Proof posture</h2>
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
