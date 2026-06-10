import type { Route } from "next";
import { CtaBand } from "@/components/marketing/cta-band";
import { ProjectCrossLinks } from "@/components/marketing/project-cross-links";
import { Badge } from "@/components/primitives/badge";
import { ButtonAnchor, ButtonLink } from "@/components/primitives/button";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import type { ProjectLink, StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";

const statusLabel: Record<StudioProject["internalStatus"], string> = {
  live: "Live surface",
  foundation: "Reference foundation",
  planned: "On the roadmap"
};

function ctaVariant(kind: ProjectLink["kind"], index: number): "primary" | "secondary" {
  if (kind === "primary" || index === 0) return "primary";
  return "secondary";
}

function CtaButton({ cta, index }: { cta: ProjectLink; index: number }) {
  const variant = ctaVariant(cta.kind, index);
  // `route` CTAs are typed in-app routes; everything else is an external/href.
  if (cta.target === "route") {
    return (
      <ButtonLink to={cta.href as Route} variant={variant} size="lg" trailingIcon>
        {cta.label}
      </ButtonLink>
    );
  }
  return (
    <ButtonAnchor href={cta.href} variant={variant} size="lg" trailingIcon>
      {cta.label}
    </ButtonAnchor>
  );
}

export function ProjectDetail({ project }: { project: StudioProject }) {
  const linkTargets = projectLinkTargets(project);
  const repoCta = project.ctas.find((cta) => cta.kind === "repo");
  const docsHref = project.docsUrl;

  const ctaActions = [
    ...project.ctas
      .filter((cta) => cta.target !== "route")
      .map((cta) => ({ label: cta.label, href: cta.href })),
    { label: "Read the docs", href: docsHref }
  ].filter((action, index, all) => all.findIndex((a) => a.href === action.href) === index);

  return (
    <article className="project">
      {/* Hero */}
      <header className="project-hero">
        <div className="container container--wide">
          <div className="project-hero__top">
            <Eyebrow>{project.shortName}</Eyebrow>
            <Badge tone={project.internalStatus === "live" ? "accent" : "outline"}>
              {statusLabel[project.internalStatus]}
            </Badge>
          </div>

          <div className="project-hero__grid">
            <div className="project-hero__lead">
              <h1 className="project-hero__title">{project.name}</h1>
              <p className="project-hero__summary">{project.summary}</p>
              <p className="project-hero__positioning">{project.positioning}</p>
              <div className="project-hero__ctas">
                {project.ctas.map((cta, index) => (
                  <CtaButton key={cta.href} cta={cta} index={index} />
                ))}
              </div>
            </div>

            <aside
              className="project-facts"
              aria-label={`${project.name} public links`}
            >
              <p className="project-facts__title">Public surface</p>
              <ul className="project-facts__list">
                {linkTargets.map((target) => {
                  const external = /^https?:\/\//.test(target.href ?? "");
                  return (
                    <li key={target.label}>
                      <a
                        href={target.href}
                        className="project-fact"
                        {...(external
                          ? { target: "_blank", rel: "noreferrer noopener" }
                          : {})}
                      >
                        <span className="project-fact__label">{target.label}</span>
                        <span className="project-fact__value">{target.value}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </div>
      </header>

      {/* Positioning / audience */}
      <Section bordered>
        <div className="project-positioning">
          <Reveal className="project-positioning__main">
            <Eyebrow index="01">Positioning</Eyebrow>
            <p className="project-positioning__statement">{project.positioning}</p>
          </Reveal>
          <Reveal className="project-positioning__aside" delay={80}>
            <div className="project-meta-block">
              <p className="project-meta-block__label">Who it serves</p>
              <p className="project-meta-block__body">{project.audience}</p>
            </div>
            <div className="project-meta-block">
              <p className="project-meta-block__label">Agent-readable shape</p>
              <p className="project-meta-block__body">{project.aiSummary}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Capabilities */}
      <Section size="compact">
        <SectionHeading
          index="02"
          eyebrow="Capabilities"
          title="What it provides"
          lead="A focused capability set, kept honest to the runtime boundary."
        />
        <ol className="capabilities">
          {project.capabilities.map((capability, index) => (
            <Reveal as="li" key={capability} className="capability" delay={index * 50}>
              <span className="capability__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="capability__text">{capability}</span>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Proof posture */}
      <Section size="compact" tone="sunken" bordered>
        <SectionHeading
          index="03"
          eyebrow="Why the boundary holds"
          title="Proof posture"
        />
        <ul className="proof proof--detail">
          {project.proofPoints.map((point, index) => (
            <li key={point} className="proof__item">
              <span className="proof__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="proof__text">{point}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Family / cross-links */}
      <Section size="compact">
        <SectionHeading
          index="04"
          eyebrow="The Studio family"
          title="Part of one coherent surface"
          lead="Separate products over shared foundations — explore the rest of the family."
        />
        <ProjectCrossLinks current={project} />
      </Section>

      {/* CTA band */}
      <Section size="compact">
        <CtaBand
          eyebrow={project.subdomain}
          title={`Build with ${project.shortName}`}
          lead={
            repoCta
              ? "Read the source, follow the docs, or open the live surface."
              : "Follow the docs or open the live surface."
          }
          actions={ctaActions}
        />
      </Section>
    </article>
  );
}
