import Link from "next/link";
import type { ReactNode } from "react";
import { Atmosphere } from "@/components/layout/atmosphere";
import { CtaBand } from "@/components/marketing/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { Tag } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section, Shell } from "@/components/ui/section";
import { SectionHeading, formatIndex } from "@/components/ui/section-heading";
import { projects, type StudioProject } from "@/content/projects";
import { projectDocsUrl, projectLinkTargets, projectPath } from "@/lib/routes";

type ProjectDetailProps = {
  project: StudioProject;
  /** Optional exhibit slot rendered between proof and family sections. */
  children?: ReactNode;
};

type DetailAction = {
  label: string;
  href: string;
};

/**
 * Outward-facing actions for a project page: its own registry CTAs minus the
 * self-referencing route link, with the live subdomain surfaced first so
 * registry.jami.studio and harness.jami.studio stay one click away.
 */
function detailActions(project: StudioProject): DetailAction[] {
  const external = project.ctas.filter((cta) => cta.href !== project.route);
  const hasSubdomain = external.some((cta) => cta.target === "subdomain");

  const actions: DetailAction[] = hasSubdomain
    ? []
    : [{ label: project.subdomain, href: project.domainTarget }];

  for (const cta of external) {
    actions.push({ label: cta.label, href: cta.href });
  }

  return actions.filter(
    (action, index, all) => all.findIndex((other) => other.href === action.href) === index
  );
}

/** Case-study composition for one Studio product, driven by registry data. */
export function ProjectDetail({ project, children }: ProjectDetailProps) {
  const linkTargets = projectLinkTargets(project);
  const actions = detailActions(project);
  const siblings = projects
    .map((entry, index) => ({ entry, position: index + 1 }))
    .filter(({ entry }) => entry.slug !== project.slug);

  return (
    <article className="project-detail">
      <section className="detail-hero" aria-label={`${project.name} overview`}>
        <Atmosphere variant="hero" />
        <Shell className="detail-hero-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/projects">Index</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.shortName}</span>
          </nav>
          <div className="detail-hero-grid">
            <div className="detail-hero-copy">
              <p className="eyebrow">{project.subdomain}</p>
              <h1 className="detail-title">{project.name}</h1>
              <p className="detail-summary">{project.summary}</p>
              <p className="detail-positioning">{project.positioning}</p>
              <div className="detail-actions">
                {actions.map((action, index) => (
                  <ButtonLink
                    key={action.href}
                    href={action.href}
                    variant={index === 0 ? "primary" : "secondary"}
                  >
                    {action.label}
                  </ButtonLink>
                ))}
              </div>
            </div>
            <aside className="link-rail" aria-label={`${project.name} public surfaces`}>
              <p className="link-rail-title">Public surface</p>
              <ul>
                {linkTargets.map((target) => {
                  if (!target.href) return null;
                  const external = target.href.startsWith("http");

                  return (
                    <li key={target.label}>
                      <a
                        href={target.href}
                        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        <span className="link-rail-label">{target.label}</span>
                        <span className="link-rail-value">{target.value}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </aside>
          </div>
        </Shell>
      </section>

      <Section className="detail-statement">
        <Reveal>
          <SectionHeading
            number="01"
            kicker="Positioning"
            title="Who it serves, in plain terms."
          />
        </Reveal>
        <div className="statement-grid">
          <Reveal>
            <div className="statement-panel">
              <Tag>Audience</Tag>
              <p>{project.audience}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="statement-panel">
              <Tag>Agent-readable shape</Tag>
              <p>{project.aiSummary}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="detail-capabilities">
        <Reveal>
          <SectionHeading number="02" kicker="Capabilities" title="What it provides." />
        </Reveal>
        <ol className="capability-list">
          {project.capabilities.map((capability, index) => (
            <li key={capability}>
              <Reveal delay={index * 50}>
                <span className="capability-row">
                  <span className="capability-no" aria-hidden="true">
                    {formatIndex(index + 1)}
                  </span>
                  <span className="capability-text">{capability}</span>
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <section className="section section--band detail-proof" aria-label="Proof points">
        <Atmosphere variant="band" />
        <Shell>
          <Reveal>
            <SectionHeading number="03" kicker="Proof points" title="Why the boundary holds." />
          </Reveal>
          <ul className="proof-list">
            {project.proofPoints.map((point, index) => (
              <li key={point}>
                <Reveal delay={index * 60} className="proof-item">
                  <span className="proof-marker" aria-hidden="true">
                    ◆
                  </span>
                  <span className="proof-text">{point}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </Shell>
      </section>

      {children}

      <Section className="detail-family">
        <Reveal>
          <SectionHeading
            number="04"
            kicker="Family"
            title="Part of the Studio family."
          />
        </Reveal>
        <ul className="family-list">
          {siblings.map(({ entry, position }) => (
            <li key={entry.slug}>
              <Link href={projectPath(entry)} className="family-link">
                <span className="family-no" aria-hidden="true">
                  {formatIndex(position)}
                </span>
                <span className="family-name">{entry.shortName}</span>
                <span className="family-sum">{entry.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand
        kicker="Next step"
        title={
          <>
            Build with <em className="cta-em">{project.shortName}</em>.
          </>
        }
        lead={project.summary}
        actions={actions}
        asideLinks={[{ label: "Documentation", href: projectDocsUrl(project) }]}
      />
    </article>
  );
}
