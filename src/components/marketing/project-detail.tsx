import Link from "next/link";
import type { Route } from "next";
import { Container, Section } from "@/components/ui/layout";
import { Badge, ExternalButton, GhostBadge, LinkButton } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import type { ProjectLink, StudioProject } from "@/content/projects";
import { projectLinkTargets, projectPath } from "@/lib/routes";

function CtaButton({
  cta,
  primary
}: {
  cta: ProjectLink;
  primary: boolean;
}) {
  const variant = primary ? "primary" : "secondary";
  if (cta.target === "route") {
    return (
      <LinkButton href={cta.href as Route} variant={variant} size="lg">
        {cta.label}
      </LinkButton>
    );
  }
  return (
    <ExternalButton href={cta.href} variant={variant} size="lg">
      {cta.label}
    </ExternalButton>
  );
}

/**
 * ProjectDetail — the case study in the cinematic idiom: a focused vertical
 * descent rather than a fixed band stack. Hero + link aside → positioning/
 * audience statement → capabilities as a numbered progressive list → proof
 * points band → "part of the Studio family" cross-links → final CTA. Every href
 * resolves through the content/route layer.
 */
export function ProjectDetail({
  project,
  siblings
}: {
  project: StudioProject;
  siblings: StudioProject[];
}) {
  const links = projectLinkTargets(project).filter(
    (link): link is { label: string; href: string; value: string } =>
      typeof link.href === "string" && typeof link.value === "string"
  );

  return (
    <article className="detail">
      {/* Hero */}
      <Container as="div">
        <div className="detail-hero">
          <Reveal className="detail-hero-copy">
            <span className="detail-breadcrumb">
              <Link href="/projects">Projects</Link>
              <span aria-hidden="true">/</span>
              <span>{project.shortName}</span>
            </span>
            <GhostBadge>{project.subdomain}</GhostBadge>
            <h1>{project.name}</h1>
            <p className="detail-summary">{project.summary}</p>
            <div className="detail-ctas">
              {project.ctas.map((cta, i) => (
                <CtaButton key={cta.href} cta={cta} primary={i === 0} />
              ))}
            </div>
          </Reveal>

          <Reveal className="detail-aside" as="aside" delay={80}>
            <p className="detail-aside-title">Public links</p>
            {links.map((link) =>
              /^https?:/.test(link.href) ? (
                <a
                  key={link.label}
                  className="detail-link"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                </a>
              ) : (
                <Link key={link.label} className="detail-link" href={link.href as Route}>
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                </Link>
              )
            )}
          </Reveal>
        </div>
      </Container>

      {/* Positioning + audience statement */}
      <Container as="div">
        <Reveal className="detail-statement">
          <span className="detail-statement-label">Positioning</span>
          <div>
            <p className="detail-statement-body">{project.positioning}</p>
            <p className="detail-statement-audience">
              <strong>Who it serves.</strong> {project.audience}
            </p>
          </div>
        </Reveal>
      </Container>

      {/* Capabilities — numbered progressive list */}
      <Section rhythm="tight" as="div">
        <Container as="div">
          <Reveal className="detail-block-head">
            <GhostBadge>Capabilities</GhostBadge>
            <h2>What {project.shortName} provides</h2>
          </Reveal>
          <Reveal>
            <ul className="capability-list">
              {project.capabilities.map((capability) => (
                <li className="capability-row" key={capability}>
                  <p>{capability}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Proof points band */}
      <Section rhythm="tight" tone="raised" as="div">
        <Container as="div">
          <Reveal className="detail-block-head">
            <GhostBadge>Why the boundary holds</GhostBadge>
            <h2>Proof posture</h2>
          </Reveal>
          <Reveal>
            <div className="detail-proof">
              {project.proofPoints.map((point) => (
                <article className="detail-proof-cell" key={point}>
                  <span className="detail-proof-cell-mark" aria-hidden="true">
                    ✓
                  </span>
                  <p>{point}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Family cross-links */}
      <Section rhythm="tight" as="div">
        <Container as="div">
          <Reveal className="detail-block-head">
            <GhostBadge>The Studio family</GhostBadge>
            <h2>Part of a coherent family</h2>
          </Reveal>
          <Reveal>
            <div className="family-grid">
              {siblings.map((sibling) => (
                <Link className="family-link" href={projectPath(sibling)} key={sibling.slug}>
                  <span>
                    <span className="family-link-name">{sibling.name}</span>
                    <span className="family-link-summary">{sibling.summary}</span>
                  </span>
                  <span className="family-link-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section rhythm="tight" as="div">
        <Container as="div">
          <Reveal>
            <div className="final-cta">
              <Badge tone="accent">{project.shortName}</Badge>
              <h2 className="display-2">Read the source and the docs</h2>
              <p className="lead">
                {project.name} is built in the open. Jump to its repository, docs, or live
                surface — every link is data-driven.
              </p>
              <div className="final-cta-ctas">
                {project.ctas.map((cta, i) => (
                  <CtaButton key={`final-${cta.href}`} cta={cta} primary={i === 0} />
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </article>
  );
}
