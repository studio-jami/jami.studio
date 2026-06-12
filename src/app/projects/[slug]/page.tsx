import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { createMetadata, createProjectMetadata, projectJsonLd } from "@/lib/metadata";
import { projectLinkTargets, projectPath } from "@/lib/routes";
import { Container, Section } from "@/components/layout/container";
import { GuideLines } from "@/components/system/guide-lines";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/eyebrow";
import { CtaBand } from "@/components/marketing/cta-band";
import { projectArt } from "@/components/marketing/project-art";

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

/**
 * /projects/[slug] — a numbered agency case study in Noir's language:
 *   banner/overview (name / summary / positioning + project CTAs + link rail, with the
 *   project's editorial tile as the banner) → capabilities (divider list) → proof points
 *   (bordered chip row) → family cross-links → closing burst CTA.
 */
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = projectJsonLd(project);
  const linkTargets = projectLinkTargets(project);
  const siblings = projects.filter((entry) => entry.slug !== project.slug);
  const projectIndex = projects.findIndex((entry) => entry.slug === project.slug);
  const art = projectArt[project.slug];
  const primaryCta = project.ctas[0];
  const secondaryCta = project.ctas[1];

  return (
    <article className="case">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 — Overview / banner */}
      <header className="case-hero">
        <Container className="case-hero-inner">
          <GuideLines count={3} />
          <div className="case-eyebrow-row">
            <span className="mono-label">/{String(projectIndex + 1).padStart(2, "0")}</span>
            <Badge tone="accent">{project.shortName}</Badge>
            <span className="mono-label">{project.subdomain}</span>
          </div>
          <h1 className="case-title">{project.name}</h1>
          <p className="case-summary">{project.positioning}</p>
          <p className="case-audience">{project.audience}</p>

          <div className="case-actions">
            {project.ctas.map((cta, index) => (
              <Button
                key={cta.href}
                href={cta.href}
                variant={index === 0 ? "primary" : "secondary"}
              >
                {cta.label}
              </Button>
            ))}
          </div>

          <figure className="case-banner">
            <Image
              src={art.src}
              alt={`${project.name} — editorial banner visual`}
              width={art.width}
              height={art.height}
              sizes="(max-width: 768px) 100vw, 1180px"
              priority
            />
            <figcaption className="case-banner-caption">{project.shortName}</figcaption>
          </figure>

          <dl className="case-rail" aria-label={`${project.name} public links`}>
            {linkTargets.map((target) => (
              <a className="case-rail-row" key={target.label} href={target.href}>
                <dt>{target.label}</dt>
                <dd>{target.value}</dd>
              </a>
            ))}
          </dl>
        </Container>
      </header>

      {/* 02 — Capabilities (divider list, the Services idiom) */}
      <Section className="case-section" ariaLabelledby="case-capabilities">
        <Container>
          <div className="case-section-heading">
            <span className="mono-label" aria-hidden="true">
              /02
            </span>
            <div>
              <h2 id="case-capabilities" className="display-heading">
                Capabilities
              </h2>
              <p className="case-section-lead">{project.summary}</p>
            </div>
          </div>
          <ol className="case-cap-list">
            {project.capabilities.map((capability, i) => (
              <li className="case-cap" key={capability}>
                <span className="case-cap-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>{capability}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 03 — Proof points (bordered chip row, the Stats idiom) */}
      <Section className="case-section" ariaLabelledby="case-proof">
        <Container>
          <div className="case-section-heading">
            <span className="mono-label" aria-hidden="true">
              /03
            </span>
            <div>
              <h2 id="case-proof" className="display-heading">
                Proof posture
              </h2>
              <p className="case-section-lead">{project.aiSummary}</p>
            </div>
          </div>
          <ul className="case-proof-list">
            {project.proofPoints.map((point, i) => (
              <li className="case-proof-item" key={point}>
                <span className="case-proof-index" aria-hidden="true">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <p>{point}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 04 — Family cross-links */}
      <Section className="case-section" ariaLabelledby="case-family">
        <Container>
          <div className="case-section-heading">
            <span className="mono-label" aria-hidden="true">
              /04
            </span>
            <div>
              <h2 id="case-family" className="display-heading">
                Sits alongside
              </h2>
            </div>
          </div>
          <ol className="case-family-grid">
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <Link className="case-family-card" href={projectPath(sibling)}>
                  <span className="case-family-name">{sibling.name}</span>
                  <span className="case-family-summary">{sibling.summary}</span>
                  <span className="case-family-open" aria-hidden="true">
                    Open →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Take it further"
        title={`Work with ${project.shortName}.`}
        lead="Open the repository, read the docs, or visit the live surface — all resolved from centralized project metadata."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={
          secondaryCta ? { label: secondaryCta.label, href: secondaryCta.href } : undefined
        }
      />
    </article>
  );
}
