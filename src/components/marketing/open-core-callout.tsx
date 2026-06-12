import { site } from "@/content/site";
import { studioLinks } from "@/content/links";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/system/section-heading";
import { Button } from "@/components/ui/button";

/**
 * Pricing Section → an open-core stance, NOT pricing tiers. This is open-core dev tooling;
 * there is nothing to buy. The slot states the model honestly and points at the source.
 */
export function OpenCoreCallout() {
  return (
    <Section className="opencore-section" ariaLabelledby="opencore-heading">
      <Container>
        <div className="opencore-panel">
          <SectionHeading
            index="05"
            eyebrow="How it's licensed"
            id="opencore-heading"
            title="Open-core, not a price list."
            lead="Every runtime in the family is built in the open. There are no tiers, seats, or paywalls on the hub — the product is the source and the contracts around it."
          />
          <div className="opencore-actions">
            <Button href={studioLinks.githubOrg} variant="primary">
              Browse the source on GitHub
            </Button>
            <Button href={site.nav[0].href} variant="link">
              See what&apos;s in the family
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
