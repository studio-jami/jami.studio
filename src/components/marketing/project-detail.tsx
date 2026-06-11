import Link from "next/link";
import { CapabilityBand } from "@/components/marketing/capability-band";
import { CTABand, type CtaAction } from "@/components/marketing/cta-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";
import styles from "./project-detail.module.css";

type ProjectDetailProps = {
  project: StudioProject;
  siblings: StudioProject[];
};

const ctaVariant: Record<string, "primary" | "secondary"> = {
  primary: "primary",
  repo: "secondary",
  secondary: "secondary",
  docs: "secondary",
  api: "secondary"
};

export function ProjectDetail({ project, siblings }: ProjectDetailProps) {
  const linkTargets = projectLinkTargets(project);

  const ctaActions: CtaAction[] = project.ctas.map((cta) => ({
    label: cta.label,
    href: cta.href,
    variant: ctaVariant[cta.kind] ?? "secondary",
    external: cta.target !== "route",
    withArrow: cta.kind === "primary"
  }));

  return (
    <article>
      <header className={styles.hero}>
        <Container width="wide">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>{project.subdomain}</p>
              <h1 className={styles.title}>{project.name}</h1>
              <p className={styles.summary}>{project.summary}</p>
              <p className={styles.positioning}>{project.positioning}</p>
              <div className={styles.actions}>
                {project.ctas.map((cta, i) => (
                  <Button
                    key={cta.href}
                    href={cta.href}
                    variant={i === 0 ? "primary" : "secondary"}
                    size="lg"
                    external={cta.target !== "route"}
                    withArrow={i === 0}
                  >
                    {cta.label}
                  </Button>
                ))}
              </div>
            </div>

            <aside className={styles.facts} aria-label={`${project.name} public links`}>
              <p className={styles.factsLabel}>Public surface</p>
              <dl className={styles.factsList}>
                {linkTargets.map((target) => {
                  const external = target.label !== "Route";
                  return (
                    <div key={target.label} className={styles.fact}>
                      <dt className={styles.factKey}>{target.label}</dt>
                      <dd className={styles.factVal}>
                        {external ? (
                          <a href={target.href} target="_blank" rel="noreferrer noopener">
                            {target.value}
                          </a>
                        ) : (
                          <span>{target.value}</span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </aside>
          </div>
        </Container>
      </header>

      <Section width="wide" divided aria-labelledby="audience-heading">
        <div className={styles.positionGrid}>
          <div className={styles.positionCol}>
            <p className={styles.colNum}>
              <span className={styles.colNumIndex}>01</span> Audience
            </p>
            <h2 id="audience-heading" className={styles.colHeading}>
              Who it serves
            </h2>
            <p className={styles.colBody}>{project.audience}</p>
          </div>
          <div className={styles.positionCol}>
            <p className={styles.colNum}>
              <span className={styles.colNumIndex}>02</span> Agent shape
            </p>
            <h2 className={styles.colHeading}>How agents read it</h2>
            <p className={styles.colBody}>{project.aiSummary}</p>
          </div>
        </div>
      </Section>

      <Section width="wide" divided>
        <CapabilityBand
          index="03"
          eyebrow="Capabilities"
          title="What it provides"
          description={`The capability surface ${project.shortName} commits to as a product, kept separate from this marketing repository.`}
          items={project.capabilities}
          headingId="capabilities-heading"
        />
      </Section>

      <ProofBand
        index="04"
        eyebrow="Proof posture"
        statement={project.proofPoints[0]}
        stats={project.proofPoints.slice(1).map((point, i) => ({
          value: String(i + 2).padStart(2, "0"),
          label: point
        }))}
      />

      <Section width="wide" divided aria-labelledby="family-heading">
        <p className={styles.familyEyebrow}>
          <span className={styles.colNumIndex}>05</span> Studio family
        </p>
        <h2 id="family-heading" className={styles.familyHeading}>
          Part of the same foundation
        </h2>
        <ul className={styles.family}>
          {siblings.map((sibling) => (
            <li key={sibling.slug}>
              <Link href={sibling.route} className={styles.familyCard}>
                <span className={styles.familyName}>{sibling.name}</span>
                <span className={styles.familySummary}>{sibling.summary}</span>
                <span className={styles.familyArrow} aria-hidden="true">
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CTABand
        eyebrow="Work with it"
        title={`Build on ${project.name}`}
        description="Open the repository, read the docs, or jump to the live surface — every link is resolved from the centralized project metadata."
        actions={ctaActions}
      />
    </article>
  );
}
