import Link from "next/link";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { CapabilityList } from "@/components/marketing/capability-list";
import { CtaBand } from "@/components/marketing/cta-band";
import { FamilyLinks } from "@/components/marketing/family-links";
import { ProjectLinks } from "@/components/marketing/project-links";
import { ProofBand } from "@/components/marketing/proof-band";
import type { StudioProject } from "@/content/projects";
import { projectDocsUrl, projectRepositoryUrl } from "@/lib/routes";

/** Maps a registry CTA to a rendered button, resolving internal vs. external. */
function renderCta(project: StudioProject, cta: StudioProject["ctas"][number], primary: boolean) {
  const variant = primary ? "primary" : "secondary";
  const internal = cta.target === "route";

  if (internal) {
    // The detail page is the route CTA's destination — surface docs instead so
    // the in-page action always advances the reader.
    return (
      <Button key={cta.label} href={project.docsUrl} external variant={variant} size="lg" withArrow>
        Read the docs
      </Button>
    );
  }

  return (
    <Button
      key={cta.label}
      href={cta.href}
      external
      variant={variant}
      size="lg"
      withArrow={primary}
    >
      {cta.label}
    </Button>
  );
}

/**
 * The case-study composition (§5): project hero with resolved CTAs + public link
 * map, positioning statement, numbered capabilities, proof posture, family
 * cross-links, and a final CTA band. Driven entirely by registry data.
 */
export function ProjectDetail({ project }: { project: StudioProject }) {
  // Secondary deep-link: prefer a registry-declared public surface CTA when the
  // shared data lists one; otherwise fall back to the docs target. Both resolve
  // from central project data — no status reads, no hand-built hrefs.
  const surfaceCta = project.ctas.find((cta) => cta.target === "subdomain");

  return (
    <article className="project-detail">
      <section className="project-hero" aria-labelledby="project-title">
        <div className="project-hero-glow" aria-hidden="true" />
        <Container>
          <Link href="/projects" className="project-back">
            <span aria-hidden="true">←</span> All projects
          </Link>
          <div className="project-hero-grid">
            <div className="project-hero-main">
              <div className="project-hero-meta">
                <Eyebrow>{project.subdomain}</Eyebrow>
                <Badge tone="accent">Studio family</Badge>
              </div>
              <h1 id="project-title" className="project-hero-title">
                {project.name}
              </h1>
              <p className="project-hero-summary">{project.summary}</p>
              <p className="project-hero-positioning">{project.positioning}</p>
              <div className="project-hero-actions">
                {project.ctas.map((cta, index) => renderCta(project, cta, index === 0))}
              </div>
            </div>
            <ProjectLinks project={project} />
          </div>
        </Container>
      </section>

      <Section rhythm="default" divider aria-labelledby="audience-title">
        <div className="project-statement">
          <SectionHeading
            eyebrow="Who it serves"
            index="01"
            id="audience-title"
            title="Built for a specific reader."
            className="project-statement-head"
          />
          <div className="project-statement-body">
            <p className="project-statement-lead">{project.audience}</p>
            <p className="project-statement-note">{project.aiSummary}</p>
          </div>
        </div>
      </Section>

      <Section rhythm="default" aria-labelledby="capabilities-title">
        <SectionHeading
          eyebrow="Capabilities"
          index="02"
          id="capabilities-title"
          title="What it provides."
          lead="The surface area this layer owns, expressed as a structured contract."
        />
        <CapabilityList items={project.capabilities} />
      </Section>

      <Section rhythm="default" aria-labelledby="proof-title">
        <ProofBand
          eyebrow="Proof posture"
          index="03"
          title="Why the boundary holds."
          lead="This site markets the product; separate repositories build it. The proof is in the seams."
          items={project.proofPoints.map((point, position) => ({
            label: `Principle ${String(position + 1).padStart(2, "0")}`,
            body: point
          }))}
        />
      </Section>

      <Section rhythm="default" divider aria-labelledby="family-title">
        <SectionHeading
          eyebrow="The family"
          index="04"
          id="family-title"
          title="Part of one coherent system."
          lead="Each Studio product composes with the others over shared contracts."
        />
        <FamilyLinks current={project} />
      </Section>

      <Section rhythm="default">
        <CtaBand
          eyebrow="Go deeper"
          title={`Work with ${project.shortName}.`}
          lead="Jump to the repository, the documentation, or the live surface — all resolved from shared project data."
          primary={{ label: "Repository", href: projectRepositoryUrl(project), external: true }}
          secondary={
            surfaceCta
              ? { label: surfaceCta.label, href: surfaceCta.href, external: true }
              : { label: "Documentation", href: projectDocsUrl(project), external: true }
          }
        />
      </Section>
    </article>
  );
}
