import { ButtonLink } from "@/components/primitives/button";
import { Badge } from "@/components/primitives/badge";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { studioLinks } from "@/content/links";
import { projects } from "@/content/projects";

/**
 * Pricing slot replaced with an open-core stance callout — no tiers, no invented prices.
 * States the OSS posture and links to the GitHub organization, with each product's repo
 * named so the claim is verifiable.
 */
export function OpenCoreCallout() {
  return (
    <Section className="opencore" divided aria-labelledby="opencore-title">
      <SectionHeading
        number="06"
        eyebrow="Open core"
        title="No tiers to compare. The source is the product."
        titleId="opencore-title"
        lead="Every product in the family is developed in the open. Read the contracts, run them locally, and follow the work in each repository."
      />

      <Reveal className="opencore-panel">
        <div className="opencore-panel-head">
          <Badge variant="solid">OSS</Badge>
          <p className="opencore-panel-copy">
            The Studio family lives under one GitHub organization. Each surface keeps its own
            repository, docs, and route contract.
          </p>
          <ButtonLink href={studioLinks.githubOrg} variant="primary" size="lg">
            View on GitHub
          </ButtonLink>
        </div>
        <ul className="opencore-repos">
          {projects.map((project) => (
            <li key={project.slug}>
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="opencore-repo">
                <span className="opencore-repo-name">{project.shortName}</span>
                <span className="opencore-repo-path">
                  {project.repoUrl.replace("https://github.com/", "")}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
