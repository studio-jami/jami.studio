import Link from "next/link";
import { CTABand } from "@/components/marketing/cta-band";
import { CapabilityBand } from "@/components/marketing/capability-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { Reveal } from "@/components/system/reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";

function ctaIcon(target: StudioProject["ctas"][number]["target"]): "arrow" | "external" {
  return target === "route" ? "arrow" : "external";
}

/**
 * The case-study composition (reference-brief §5): hero + public links, audience/positioning,
 * numbered capabilities, proof band, family cross-links, and a final CTA. All hrefs come from the
 * resolved content layer (project.ctas / projectLinkTargets) — none are hand-built.
 */
export function ProjectDetail({ project }: { project: StudioProject }) {
  const linkTargets = projectLinkTargets(project);
  const siblings = projects.filter((item) => item.slug !== project.slug);
  const primaryCta = project.ctas[0];

  return (
    <article className="project-detail">
      {/* Hero */}
      <Section className="page-hero" aria-labelledby="project-title">
        <p className="breadcrumb">
          <Link href="/projects">Projects</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            /
          </span>
          <span>{project.shortName}</span>
        </p>
        <div className="project-hero">
          <div className="project-hero-copy">
            <h1 id="project-title">{project.name}</h1>
            <p className="project-hero-summary">{project.summary}</p>
            <p className="project-hero-positioning">{project.positioning}</p>
            <div className="button-row">
              {project.ctas.map((cta, index) => (
                <Button
                  key={cta.href}
                  href={cta.href}
                  variant={index === 0 ? "primary" : "secondary"}
                  icon={ctaIcon(cta.target)}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
          <aside className="project-facts" aria-label={`${project.name} public links`}>
            <p className="project-facts-title">Public links</p>
            {linkTargets.map((target) => (
              <div className="project-fact" key={target.label}>
                <span>{target.label}</span>
                <a href={target.href} target="_blank" rel="noreferrer noopener">
                  {target.value}
                </a>
              </div>
            ))}
          </aside>
        </div>
      </Section>

      {/* Audience / positioning */}
      <Section aria-label="Audience and shape">
        <Reveal>
          <div className="split-grid">
            <div className="split-block">
              <SectionHeading number="01" eyebrow="Who it serves" title="Audience" />
              <p>{project.audience}</p>
            </div>
            <div className="split-block">
              <SectionHeading number="02" eyebrow="Agent-readable shape" title="Summary" />
              <p>{project.aiSummary}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Capabilities */}
      <Section aria-labelledby="capabilities-title">
        <SectionHeading
          number="03"
          eyebrow="What it provides"
          title="Capabilities"
          id="capabilities-title"
        />
        <Reveal style={{ marginTop: "2.5rem" }}>
          <CapabilityBand capabilities={project.capabilities} />
        </Reveal>
      </Section>

      {/* Proof */}
      <Section aria-label="Why the boundary holds">
        <Reveal>
          <ProofBand
            eyebrow="Why the boundary holds"
            title="Built as its own surface"
            points={project.proofPoints}
          />
        </Reveal>
      </Section>

      {/* Family cross-links */}
      <Section aria-labelledby="family-title">
        <SectionHeading
          number="04"
          eyebrow="Part of the family"
          title="Explore the rest of the Studio"
          id="family-title"
        />
        <div className="family-grid" style={{ marginTop: "2.5rem" }}>
          {siblings.map((sibling) => (
            <Link className="family-card" href={sibling.route} key={sibling.slug}>
              <strong>{sibling.shortName}</strong>
              <span>{sibling.summary}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section aria-label="Continue">
        <Reveal>
          <CTABand
            eyebrow="Continue"
            title={`Work with ${project.shortName}`}
            body="Open the live surface or repository, or step back to the full project family."
            primary={primaryCta}
            secondary={{ label: "All projects", href: "/projects" }}
          />
        </Reveal>
      </Section>
    </article>
  );
}
