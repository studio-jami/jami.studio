import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { Section } from "@/components/layout/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { FamilyGlyph, PixelArrow, PixelStair } from "@/components/system/pixel-icons";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects, type StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";

const STATUS_LABEL: Record<StudioProject["internalStatus"], string> = {
  planned: "Planned",
  foundation: "Foundation",
  live: "Live"
};

/**
 * Project detail — the Synk case-study rhythm: dotted hero (name, summary,
 * positioning, pill CTAs) ┃ capabilities lattice ┃ proof block with pixel
 * stairs ┃ family cross-link lattice ┃ closing CTA — a hatch Divider between
 * every section. All hrefs resolve through the content/route layer.
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
        <section className="detail-hero" aria-labelledby="detail-title">
          <Badge dot={project.internalStatus === "live"}>
            {STATUS_LABEL[project.internalStatus]} · {project.subdomain}
          </Badge>
          <h1 id="detail-title">{project.name}</h1>
          <p className="lead">{project.summary}</p>
          <p className="detail-positioning">{project.positioning}</p>
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
        </section>
      </Container>

      <Divider />

      <Section label="Capabilities" tight>
        <SectionHeading
          title="What it provides"
          lead={project.audience}
          headingId="capabilities-title"
        />
        <div className="lattice cols-2">
          {project.capabilities.map((capability) => (
            <article className="capability-cell" key={capability}>
              <PixelArrow />
              <p>{capability}.</p>
            </article>
          ))}
        </div>
      </Section>

      <Divider />

      <Section label="Proof posture">
        <SectionHeading
          title="Credibility from boundaries"
          lead="Real design-posture facts from the product's own content — not claims."
        />
        <div className="proof-block">
          <span className="px-stair tl" aria-hidden="true">
            <PixelStair />
          </span>
          {project.proofPoints.map((point, index) => (
            <p className="proof-item" key={point}>
              <span className="proof-index">{String(index + 1).padStart(2, "0")}</span>
              {point}.
            </p>
          ))}
          <span className="px-stair br" aria-hidden="true">
            <PixelStair />
          </span>
        </div>
      </Section>

      <Divider />

      <Section label="Public surfaces" tight>
        <SectionHeading
          title="Every public surface, one contract"
          lead="Routes, subdomain, repository, docs, and API resolve from centralized metadata."
        />
        <div className="link-row">
          {linkTargets.map((target) => (
            <ButtonLink
              key={target.label}
              href={target.href}
              external={target.href.startsWith("http")}
              variant="ghost"
            >
              {target.label}
            </ButtonLink>
          ))}
        </div>
      </Section>

      <Divider />

      <Section label="Part of the Studio family">
        <SectionHeading
          title="Part of the Studio family"
          lead="Separate implementation surfaces, one coherent hub. Explore the siblings this product composes with."
        />
        <div className="lattice cols-2">
          {siblings.map((sibling) => (
            <Link key={sibling.slug} href={sibling.route} className="family-tile">
              <span className="family-tile-head">
                <span className="family-glyph" aria-hidden="true">
                  <FamilyGlyph kind={sibling.slug} />
                </span>
                <span className="name-pill">{sibling.shortName}</span>
              </span>
              <p>{sibling.summary}</p>
              <span className="tile-link" aria-hidden="true">
                Explore {sibling.shortName} →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Divider />

      <CtaBand
        title={`Build with ${project.shortName}`}
        lead={project.aiSummary}
        primary={{ label: primaryCta.label, href: primaryCta.href }}
      />
    </>
  );
}
