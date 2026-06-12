import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/primitives/button";
import { Badge } from "@/components/primitives/badge";
import { Container } from "@/components/primitives/container";
import { SectionHeading, Eyebrow } from "@/components/primitives/section-heading";
import { CtaCard } from "@/components/marketing/cta-card";
import { FamilyCrossLinks } from "@/components/marketing/family-cross-links";
import { Reveal } from "@/components/system/reveal";
import { getProject, projects } from "@/content/projects";
import { createMetadata, createProjectMetadata, projectJsonLd } from "@/lib/metadata";
import { projectLinkTargets } from "@/lib/routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const statusLabel = {
  planned: "In design",
  foundation: "Foundation",
  live: "Live surface"
} as const;

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
  const ctaActions = project.ctas.map((cta, index) => ({
    label: cta.label,
    href: cta.href,
    variant: (index === 0 ? "primary" : "ghost") as "primary" | "ghost"
  }));

  return (
    <article className="project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="project-hero" aria-labelledby="project-title">
        <div className="page-hero-atmosphere" aria-hidden="true" />
        <Container>
          <Reveal className="project-hero-top">
            <Eyebrow>{project.subdomain}</Eyebrow>
            <Badge variant="outline">{statusLabel[project.internalStatus]}</Badge>
          </Reveal>
          <Reveal className="project-hero-card" delay={60}>
            <h1 className="project-hero-title" id="project-title">
              {project.name}
            </h1>
            <p className="project-hero-summary">{project.summary}</p>
            <p className="project-hero-positioning">{project.positioning}</p>
            <div className="project-hero-actions">
              {project.ctas.map((cta, index) => (
                <ButtonLink
                  key={cta.href}
                  href={cta.href}
                  variant={index === 0 ? "primary" : "secondary"}
                  size="lg"
                >
                  {cta.label}
                </ButtonLink>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="project-block" aria-label="Audience and positioning">
        <Container>
          <div className="project-audience-quote">
            <Eyebrow>Who it&apos;s for</Eyebrow>
            <blockquote>
              <p>{project.audience}</p>
            </blockquote>
            <p className="project-audience-ai">{project.aiSummary}</p>
          </div>
        </Container>
      </section>

      <section className="project-block" aria-labelledby="capabilities-title">
        <Container>
          <SectionHeading
            eyebrow="What it provides"
            title="Capabilities"
            titleId="capabilities-title"
          />
          <div className="capability-grid">
            {project.capabilities.map((capability, index) => (
              <Reveal as="article" className="capability-card" key={capability} delay={index * 50}>
                <span className="capability-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="capability-text">{capability}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="project-block" aria-labelledby="proof-title">
        <Container>
          <SectionHeading
            eyebrow="Why the boundary holds"
            title="Proof posture"
            titleId="proof-title"
          />
          <div className="proof-row">
            {project.proofPoints.map((point, index) => (
              <Reveal as="article" className="proof-card" key={point} delay={index * 50}>
                <span className="proof-bullet" aria-hidden="true" />
                <p>{point}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="project-block" aria-labelledby="links-title">
        <Container>
          <SectionHeading
            eyebrow="Public surfaces"
            title="Where it lives"
            titleId="links-title"
          />
          <ul className="link-target-grid">
            {linkTargets.map((target) => (
              <li key={target.label}>
                <a className="link-target" href={target.href} target="_blank" rel="noreferrer">
                  <span className="link-target-label">{target.label}</span>
                  <span className="link-target-value">{target.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="project-block" aria-label="Studio family">
        <Container>
          <FamilyCrossLinks current={project} />
        </Container>
      </section>

      <CtaCard
        eyebrow="Continue"
        title={`Open ${project.shortName}, or browse the rest of the family.`}
        titleId="project-cta-title"
        actions={[...ctaActions, { label: "All projects", href: "/projects", variant: "ghost" }]}
      />
    </article>
  );
}
