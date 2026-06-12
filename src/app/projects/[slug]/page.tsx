import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { createMetadata, createProjectMetadata, projectJsonLd } from "@/lib/metadata";
import { projectLinkTargets, projectPath } from "@/lib/routes";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/system/section-heading";
import { Button } from "@/components/ui/button";
import { Eyebrow, Badge } from "@/components/ui/eyebrow";
import { CtaBand } from "@/components/marketing/cta-band";
import Link from "next/link";

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
 * /projects/[slug] — a numbered agency case study composed to Noir's spine:
 *   01 Overview (name / summary / positioning + project CTAs + link rail)
 *   02 Capabilities
 *   03 Proof points
 *   04 Family cross-links
 *   → closing CTA band (repo / docs / live links from the content layer)
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
  const primaryCta = project.ctas[0];
  const secondaryCta = project.ctas[1];

  return (
    <article className="case">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 01 — Overview */}
      <header className="case-hero">
        <Container>
          <Eyebrow className="case-hero-eyebrow">
            <span className="section-number" aria-hidden="true">
              01
            </span>
            <span>{project.subdomain}</span>
          </Eyebrow>
          <h1 className="case-title">{project.name}</h1>
          <p className="case-summary">{project.positioning}</p>

          <div className="case-meta">
            <Badge tone="accent">{project.shortName}</Badge>
            <span className="case-audience">{project.audience}</span>
          </div>

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

      {/* 02 — Capabilities */}
      <Section className="case-section" ariaLabelledby="case-capabilities">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="What it provides"
            id="case-capabilities"
            title="Capabilities"
            lead={project.summary}
          />
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

      {/* 03 — Proof points */}
      <Section className="case-section case-proof" ariaLabelledby="case-proof">
        <Container>
          <SectionHeading
            index="03"
            eyebrow="Why the boundary holds"
            id="case-proof"
            title="Proof posture"
            lead={project.aiSummary}
          />
          <ul className="case-proof-list">
            {project.proofPoints.map((point) => (
              <li className="case-proof-item" key={point}>
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* 04 — Family cross-links */}
      <Section className="case-section case-family" ariaLabelledby="case-family">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Part of the family"
            id="case-family"
            title="Sits alongside"
          />
          <ol className="case-family-grid">
            {siblings.map((sibling) => (
              <li key={sibling.slug}>
                <Link className="case-family-card" href={projectPath(sibling)}>
                  <span className="case-family-name">{sibling.name}</span>
                  <span className="case-family-summary">{sibling.summary}</span>
                  <span className="case-family-open" aria-hidden="true">
                    Open
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
