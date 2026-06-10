import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/marketing/project-card";
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="project-detail">
        <section className="section hero">
          <div className="container">
            <div className="hero-content">
              <span className="eyebrow">{project.subdomain}</span>
              <h1 className="hero-heading">{project.name}</h1>
              <p className="lead">{project.positioning}</p>
              <div className="button-group">
                {project.ctas.map((cta) => (
                  <a
                    key={cta.href}
                    className={`button ${cta.kind === "primary" ? "primary" : "secondary"}`}
                    href={cta.href}
                  >
                    {cta.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section audience-band">
          <div className="container">
            <div className="grid-2">
              <div className="pillar-panel">
                <span className="eyebrow">Audience</span>
                <h2>Who it serves</h2>
                <p>{project.audience}</p>
              </div>
              <div className="pillar-panel">
                <span className="eyebrow">AI Summary</span>
                <h2>Agent-readable shape</h2>
                <p>{project.aiSummary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section capability-band">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Capabilities</h2>
              <p className="section-lead">What {project.shortName} provides to the ecosystem.</p>
            </div>
            <div className="grid-2">
              {project.capabilities.map((cap, index) => (
                <div key={cap} className="capability-card pillar-panel">
                  <span className="section-number">{(index + 1).toString().padStart(2, "0")}</span>
                  <p>{cap}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section proof-band">
          <div className="container">
            <div className="proof-panel">
              <span className="eyebrow">Proof Posture</span>
              <h2 className="section-title">Why the boundary holds</h2>
              <ul className="proof-list">
                {project.proofPoints.map((proof) => (
                  <li key={proof}>{proof}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section sibling-band">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Part of the Studio Family</h2>
            </div>
            <div className="grid-4">
              {projects
                .filter((sibling) => sibling.slug !== project.slug)
                .map((sibling) => (
                  <ProjectCard key={sibling.slug} project={sibling} variant="compact" />
                ))}
            </div>
          </div>
        </section>

        <section className="section cta-band">
          <div className="container cta-panel">
            <h2 className="section-title">Explore {project.shortName}</h2>
            <div className="project-facts">
              {linkTargets.map((target) => (
                <a key={target.label} href={target.href} className="fact-link">
                  <span className="eyebrow">{target.label}</span>
                  <strong>{target.value}</strong>
                </a>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
