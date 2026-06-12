import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { Section } from "@/components/layout/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";

const STATUS_LABEL: Record<StudioProject["internalStatus"], string> = {
  planned: "Planned",
  foundation: "Foundation",
  live: "Live"
};

/**
 * Project detail — systematized case study with Divider seams between sections:
 * hero (name/summary/positioning + resolved CTAs + public-link facts) → audience
 * & agent shape → capabilities → proof points → family cross-links → CTA band.
 * All hrefs resolve through the content/route layer (projectLinkTargets, ctas).
 */
export function ProjectDetail({ project }: { project: StudioProject }) {
  const linkTargets = projectLinkTargets(project).filter(
    (target): target is { label: string; href: string; value: string } =>
      typeof target.href === "string" && typeof target.value === "string"
  );
  const [primaryCta, ...restCtas] = project.ctas;
  const siblings = projects.filter((item) => item.slug !== project.slug);

  return (
    <>
      <Container>
        <section className="lattice detail-hero" aria-labelledby="detail-title">
          <div className="detail-headline">
            <Eyebrow plain>{project.subdomain}</Eyebrow>
            <h1 id="detail-title">{project.name}</h1>
            <p className="detail-lead">{project.positioning}</p>
            <div className="btn-row">
              <ButtonLink href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </ButtonLink>
              {restCtas.map((cta) => (
                <ButtonLink key={cta.href} href={cta.href} external variant="secondary">
                  {cta.label}
                </ButtonLink>
              ))}
            </div>
          </div>

          <aside className="detail-facts" aria-label={`${project.name} public links`}>
            {linkTargets.map((target) => (
              <a
                key={target.label}
                href={target.href}
                {...(target.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                <span className="fact-label">{target.label}</span>
                <span className="fact-value">{target.value}</span>
              </a>
            ))}
          </aside>
        </section>
      </Container>

      <Container>
        <Divider />
      </Container>

      <Section label="Audience and agent shape">
        <SectionHeading
          index="01"
          eyebrow="Positioning"
          title="Who it serves and how agents read it"
          align="start"
        />
        <div className="detail-two-col">
          <article className="cell cell-card">
            <div className="cell-head">
              <Badge>{STATUS_LABEL[project.internalStatus]}</Badge>
            </div>
            <p>{project.audience}</p>
          </article>
          <article className="cell cell-card">
            <div className="cell-head">
              <Badge dot>Agent summary</Badge>
            </div>
            <p>{project.aiSummary}</p>
          </article>
        </div>
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section label="Capabilities and proof">
        <SectionHeading index="02" eyebrow="Capabilities" title="What it provides" align="start" />
        <div className="detail-two-col">
          <ol className="numbered-list">
            {project.capabilities.map((capability, index) => (
              <li key={capability}>
                <span className="list-num">{String(index + 1).padStart(2, "0")}</span>
                <span>{capability}</span>
              </li>
            ))}
          </ol>
          <ol className="numbered-list">
            {project.proofPoints.map((point, index) => (
              <li key={point}>
                <span className="list-num">P{index + 1}</span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section label="Part of the Studio family">
        <SectionHeading
          index="03"
          eyebrow="The family"
          title="Part of the Studio family"
          lead="Separate implementation surfaces, one coherent hub. Explore the siblings this product composes with."
          align="start"
        />
        <div className="cross-links">
          {siblings.map((sibling) => (
            <Link key={sibling.slug} href={sibling.route} className="cross-link">
              <strong>{sibling.shortName}</strong>
              <span>{sibling.summary}</span>
            </Link>
          ))}
        </div>
      </Section>

      <Container>
        <Divider />
      </Container>

      <CtaBand
        eyebrow="Next step"
        title={`Build with ${project.shortName}`}
        lead={project.summary}
        primary={{ label: primaryCta.label, href: primaryCta.href }}
        secondary={{
          label: "Back to projects",
          href: "/projects"
        }}
      />
    </>
  );
}
