import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { ButtonLink } from "@/components/primitives/button";
import { projects } from "@/content/projects";
import { studioLinks } from "@/content/links";

/**
 * Pricing → open-core panel. Nouva's pricing slot is resolved to an honest open-core /
 * OSS callout — no tiers, no invented prices. The repo list links the five real
 * repositories, and the Nouva logo-ticker marquee becomes an honest product-name
 * marquee ("one shared source"), never fabricated company logos.
 */
export function OpenCoreCallout() {
  const marqueeItems = [
    ...projects.map((project) => project.shortName),
    "One shared source"
  ];

  return (
    <section className="section" aria-labelledby="opencore-title">
      <Container>
        <SectionHeading
          eyebrow="Open core, no tiers"
          title={
            <>
              Start in the open,{" "}
              <span className="title-soft">scale when you&apos;re ready.</span>
            </>
          }
          titleId="opencore-title"
          align="center"
        />

        <div className="opencore-panel">
          <div className="opencore-head">
            <h3 className="opencore-title">Every product is OSS-first.</h3>
            <p className="opencore-body">
              There is no paywall and no pricing table here. Each surface links to its public
              repository, docs, and live deployment. Build on the foundations directly, or read
              the AI-readable source for the whole family.
            </p>
            <ButtonLink href={studioLinks.githubOrg} variant="primary">
              View on GitHub
            </ButtonLink>
          </div>

          <div className="opencore-repos">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={project.route as Route}
                className="opencore-repo"
                aria-label={`${project.name} project`}
              >
                <span className="opencore-repo-name">{project.shortName}</span>
                <span className="opencore-repo-path">{project.subdomain}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="marquee" aria-hidden="true">
          <span className="marquee-label">Generated from one source</span>
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
