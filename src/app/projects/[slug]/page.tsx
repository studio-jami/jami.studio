import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/primitives/button";
import { Badge } from "@/components/primitives/badge";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { SectionHeading, Eyebrow, SectionNumber } from "@/components/primitives/section-heading";
import { CtaBand } from "@/components/marketing/cta-band";
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
        <Container>
          <Reveal className="project-hero-top">
            <Eyebrow>{project.subdomain}</Eyebrow>
            <Badge variant="outline">{statusLabel[project.internalStatus]}</Badge>
          </Reveal>
          <Reveal as="h1" className="project-hero-title" delay={50}>
            <span id="project-title">{project.name}</span>
          </Reveal>
          <Reveal as="p" className="project-hero-summary" delay={100}>
            {project.summary}
          </Reveal>
          <Reveal as="p" className="project-hero-positioning" delay={140}>
            {project.positioning}
          </Reveal>
          <Reveal className="project-hero-actions" delay={180}>
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
          </Reveal>
        </Container>
      </section>

      <Section className="project-audience" divided aria-label="Audience and positioning">
        <div className="pull-quote">
          <SectionNumber value="01" />
          <blockquote>
            <p>{project.audience}</p>
          </blockquote>
          <p className="pull-quote-ai">{project.aiSummary}</p>
        </div>
      </Section>

      <Section className="project-capabilities" divided aria-labelledby="capabilities-title">
        <SectionHeading
          number="02"
          eyebrow="What it provides"
          title="Capabilities"
          titleId="capabilities-title"
        />
        <ol className="capability-list">
          {project.capabilities.map((capability, index) => (
            <Reveal as="li" className="capability-item" key={capability} delay={index * 50}>
              <span className="capability-num">{String(index + 1).padStart(2, "0")}</span>
              <p className="capability-text">{capability}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section className="project-proof" divided aria-labelledby="proof-title">
        <SectionHeading
          number="03"
          eyebrow="Why the boundary holds"
          title="Proof posture"
          titleId="proof-title"
        />
        <ul className="proof-list">
          {project.proofPoints.map((point, index) => (
            <Reveal as="li" className="proof-item" key={point} delay={index * 50}>
              <span className="proof-bullet" aria-hidden="true" />
              <p>{point}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section className="project-links" divided aria-labelledby="links-title">
        <SectionHeading
          number="04"
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
      </Section>

      <Section className="project-family" divided aria-label="Studio family">
        <FamilyCrossLinks current={project} />
      </Section>

      <CtaBand
        eyebrow="Continue"
        title={`Open ${project.shortName}, or browse the rest of the family.`}
        titleId="project-cta-title"
        actions={[...ctaActions, { label: "All projects", href: "/projects", variant: "ghost" }]}
      />
    </article>
  );
}
