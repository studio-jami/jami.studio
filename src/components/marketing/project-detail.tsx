import Link from "next/link";
import type { Route } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { StudioProject } from "@/content/projects";
import { projects } from "@/content/projects";
import { projectLinkTargets, projectPath } from "@/lib/routes";
import { CapabilityBand } from "./capability-band";
import { CTABand } from "./cta-band";
import { ProofBand } from "./proof-band";

function ctaVariant(kind: StudioProject["ctas"][number]["kind"], index: number) {
  if (index === 0) return "primary" as const;
  if (kind === "repo" || kind === "docs" || kind === "api") return "secondary" as const;
  return "secondary" as const;
}

/**
 * Case-study composition for `/projects/[slug]` (registry candidate `ProjectDetail`):
 * hero (name/summary/positioning + resolved CTAs + public link facts) → audience/positioning
 * → numbered capabilities → proof band → Studio-family cross-links → CTA band. Every href is
 * resolved by the content/route layer.
 */
export function ProjectDetail({ project }: { project: StudioProject }) {
  const linkTargets = projectLinkTargets(project);
  const siblings = projects.filter((entry) => entry.slug !== project.slug);
  const repoCta = project.ctas.find((cta) => cta.kind === "repo");

  return (
    <article className="project-detail">
      <section className="project-hero" aria-labelledby="project-title">
        <div className="hero-glow" aria-hidden="true" />
        <Container className="project-hero-inner">
          <div className="project-hero-copy">
            <Eyebrow>{project.subdomain}</Eyebrow>
            <h1 id="project-title" className="project-hero-title">
              {project.name}
            </h1>
            <p className="project-hero-summary">{project.summary}</p>
            <p className="project-hero-positioning">{project.positioning}</p>
            <div className="hero-actions">
              {project.ctas.map((cta, index) => (
                <Button key={cta.href} href={cta.href} variant={ctaVariant(cta.kind, index)}>
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>

          <aside className="project-facts" aria-label={`${project.name} public links`}>
            <Eyebrow as="span">Public surface</Eyebrow>
            <ul>
              {linkTargets.map((target) => (
                <li key={target.label}>
                  <a href={target.href} target="_blank" rel="noreferrer noopener">
                    <span className="project-fact-label">{target.label}</span>
                    <span className="project-fact-value">{target.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>

      <Section className="project-positioning" aria-label="Audience and positioning">
        <div className="positioning-grid">
          <div className="positioning-block">
            <Eyebrow number="01">Who it serves</Eyebrow>
            <p>{project.audience}</p>
          </div>
          <div className="positioning-block">
            <Eyebrow number="02">Agent-readable shape</Eyebrow>
            <p>{project.aiSummary}</p>
          </div>
        </div>
      </Section>

      <CapabilityBand number="03" title="What it provides." capabilities={project.capabilities} />

      <ProofBand
        eyebrow="Why the boundary holds"
        number="04"
        title="Earned posture, not implementation claims."
        points={project.proofPoints}
      />

      <Section className="project-family" aria-labelledby="family-title">
        <SectionHeading
          eyebrow="Part of the Studio family"
          number="05"
          title="One family, separate surfaces."
        />
        <ul className="family-grid">
          {siblings.map((sibling) => (
            <li key={sibling.slug}>
              <Link href={projectPath(sibling) as Route} className="family-card">
                <span className="family-card-name">{sibling.name}</span>
                <span className="family-card-summary">{sibling.summary}</span>
                <span className="family-card-cta" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        eyebrow="Explore the source"
        title={`Go deeper on ${project.shortName}.`}
        lead="Open the live surface, repository, and docs — all resolved from centralized project metadata."
        primary={{ label: "View all projects", href: "/projects" }}
        secondary={
          repoCta
            ? { label: "Open repository", href: repoCta.href }
            : { label: "Read AI index", href: "/llms.txt" }
        }
      />
    </article>
  );
}
