import { CapabilityBand } from "@/components/marketing/capability-band";
import { CTABand } from "@/components/marketing/cta-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { Button } from "@/components/ui/button";
import { Badge, Eyebrow, Section, SectionHeading } from "@/components/ui/primitives";
import { SmartLink } from "@/components/ui/smart-link";
import { Reveal } from "@/components/system/reveal";
import { projects, type StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";

const CTA_VARIANT: Record<StudioProject["ctas"][number]["kind"], "primary" | "secondary"> = {
  primary: "primary",
  secondary: "secondary",
  repo: "secondary",
  docs: "secondary",
  api: "secondary"
};

/**
 * Case-study composition for /projects/[slug]: project hero with resolved CTAs + a public
 * links aside, an audience/positioning statement, a numbered capability band, a proof band,
 * sibling cross-links ("part of the Studio family"), and a closing CTA band. All copy and
 * every href come from the project content/route layer.
 */
export function ProjectDetail({ project }: { project: StudioProject }) {
  const links = projectLinkTargets(project);
  const family = projects.filter((sibling) => sibling.slug !== project.slug);
  const primaryCta = project.ctas[0];

  return (
    <article>
      <Section as="div" aria-label={`${project.name} overview`}>
        <div className="detail-hero">
          <Reveal className="detail-hero-copy">
            <Eyebrow>{project.shortName}</Eyebrow>
            <h1>{project.name}</h1>
            <p className="detail-hero-summary">{project.summary}</p>
            <p className="detail-hero-positioning">{project.positioning}</p>
            <div className="button-row">
              {project.ctas.map((cta) => (
                <Button
                  key={cta.href}
                  href={cta.href}
                  variant={CTA_VARIANT[cta.kind]}
                  withArrow={cta === primaryCta}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          </Reveal>

          <Reveal as="aside" className="detail-facts">
            <p className="detail-facts-title">Public surface</p>
            {links
              .filter((link): link is typeof link & { href: string } => Boolean(link.href))
              .map((link) => (
                <SmartLink key={link.label} href={link.href} className="detail-fact">
                  <span>{link.label}</span>
                  <strong>{link.value}</strong>
                </SmartLink>
              ))}
          </Reveal>
        </div>
      </Section>

      <Section as="div" aria-label="Audience and positioning" tight>
        <div className="detail-block">
          <div className="detail-block-aside">
            <Eyebrow>Who it serves</Eyebrow>
          </div>
          <p className="audience-statement">{project.audience}</p>
        </div>

        <div className="detail-block">
          <div className="detail-block-aside">
            <Eyebrow>Capabilities</Eyebrow>
            <h2>What it provides</h2>
            <p>The contract this product owns inside the family.</p>
          </div>
          <CapabilityBand capabilities={project.capabilities} />
        </div>
      </Section>

      <ProofBand
        eyebrow="Why the boundary holds"
        statement={project.aiSummary}
        points={project.proofPoints}
      />

      <Section aria-labelledby="family-heading">
        <Reveal>
          <SectionHeading
            eyebrow="The family"
            title="Part of the Studio project family"
            lead="Every product shares the same foundation; explore the rest of the family."
            headingId="family-heading"
          />
        </Reveal>
        <Reveal>
          <div className="family-grid">
            {family.map((sibling) => (
              <SmartLink key={sibling.slug} href={sibling.route} className="family-card">
                <Badge dot>{sibling.shortName}</Badge>
                <strong>{sibling.name}</strong>
                <span>{sibling.summary}</span>
              </SmartLink>
            ))}
          </div>
        </Reveal>
      </Section>

      <CTABand
        eyebrow="Next step"
        title={`Explore ${project.name} in context`}
        lead="Jump into the source, the docs, or the live surface — or browse the rest of the family."
        primary={primaryCta}
        secondary={{ label: "All projects", href: "/projects" }}
      />
    </article>
  );
}
