import Link from "next/link";
import { CapabilityBand } from "@/components/marketing/capability-band";
import { CTABand } from "@/components/marketing/cta-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";

const ctaVariant = (kind: StudioProject["ctas"][number]["kind"], index: number) =>
  index === 0 || kind === "primary" ? "primary" : "secondary";

/**
 * Case-study composition for /projects/[slug]: hero (name / summary / positioning
 * + resolved CTAs + public link board), audience + AI shape, numbered
 * capabilities, proof posture, sibling cross-links, and a final CTA band. All
 * hrefs come pre-resolved from the content layer.
 */
export function ProjectDetail({ project }: { project: StudioProject }) {
  const linkTargets = projectLinkTargets(project);
  const siblings = projects.filter((entry) => entry.slug !== project.slug);
  const primaryCta = project.ctas[0];
  const repoCta = project.ctas.find((cta) => cta.kind === "repo") ?? project.ctas[project.ctas.length - 1];

  return (
    <article className="project-detail">
      <section className="project-hero" aria-labelledby="project-title">
        <div className="project-hero-grid-bg" aria-hidden="true" />
        <Container className="project-hero-inner">
          <div className="project-hero-copy">
            <Eyebrow>{project.subdomain}</Eyebrow>
            <div className="project-hero-titlerow">
              <h1 id="project-title">{project.name}</h1>
            </div>
            <p className="project-hero-summary">{project.summary}</p>
            <p className="project-hero-positioning">{project.positioning}</p>
            <div className="button-row">
              {project.ctas.map((cta, index) => (
                <Button key={cta.href} href={cta.href} variant={ctaVariant(cta.kind, index)} size="lg">
                  {cta.label}
                </Button>
              ))}
            </div>
          </div>
          <aside className="project-links" aria-label={`${project.name} public links`}>
            <p className="project-links-title">Public surface</p>
            <ul>
              {linkTargets.map((target) => {
                const href = target.href ?? "";
                const external = /^https?:/.test(href);
                return (
                  <li key={target.label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    >
                      <span className="project-links-key">{target.label}</span>
                      <span className="project-links-val">{target.value}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </aside>
        </Container>
      </section>

      <Section divider aria-labelledby="audience-title">
        <div className="project-overview">
          <div>
            <SectionHeading
              number="01"
              eyebrow="Audience"
              title={<span id="audience-title">Who it serves</span>}
            />
            <p className="project-overview-body">{project.audience}</p>
          </div>
          <div>
            <SectionHeading number="02" eyebrow="Agent-readable shape" title="How agents read it" />
            <p className="project-overview-body">{project.aiSummary}</p>
          </div>
        </div>
      </Section>

      <Section divider aria-labelledby="capabilities-title">
        <SectionHeading
          number="03"
          eyebrow="Capabilities"
          title={<span id="capabilities-title">What it provides</span>}
          lead="The core surface area, kept to what the contracts actually describe."
        />
        <CapabilityBand capabilities={project.capabilities} />
      </Section>

      <ProofBand
        number="04"
        eyebrow="Why the boundary holds"
        statement={`${project.shortName} stays its own product surface — this site only markets it.`}
        items={project.proofPoints.map((point, index) => ({
          label: String(index + 1).padStart(2, "0"),
          body: point
        }))}
      />

      <Section divider aria-labelledby="family-title">
        <SectionHeading
          number="05"
          eyebrow="Part of the family"
          title={<span id="family-title">Composable with the rest of the Studio.</span>}
        />
        <ul className="family-grid">
          {siblings.map((sibling) => (
            <li key={sibling.slug}>
              <Link href={sibling.route} className="family-card">
                <span className="family-card-name">{sibling.shortName}</span>
                <span className="family-card-summary">{sibling.summary}</span>
                <span className="family-card-cta" aria-hidden="true">
                  Explore
                  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 8h9M8 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        eyebrow="Go deeper"
        title={`Build on ${project.name}.`}
        body="Source, docs, and live surfaces live in the project's own repositories and subdomains."
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={repoCta ? { label: repoCta.label, href: repoCta.href } : undefined}
      />
    </article>
  );
}
