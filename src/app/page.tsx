import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { Section } from "@/components/layout/section";
import { BenefitsList } from "@/components/marketing/benefits-list";
import { CtaBand } from "@/components/marketing/cta-band";
import { FamilyIntegrationMap } from "@/components/marketing/family-integration-map";
import { Faq } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarCards } from "@/components/marketing/pillar-cards";
import { ProofLine } from "@/components/marketing/proof-line";
import { ProofPointBand } from "@/components/marketing/proof-point-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/**
 * Home — built to Synk's real exported IA:
 *   Hero → Trusted By → Features ┃ Benefits ┃ Features-2 ┃ Reviews ┃ Integrations ┃ FAQ → CTA
 * An explicit, token-driven Divider separates every section (Synk's signature).
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <ProofLine />

      <Section id="foundations" label="What this studio stands for">
        <SectionHeading
          index="01"
          eyebrow="Foundations"
          title="Four foundations the family is built on"
          lead="Governed runtime, trusted interfaces, durable coordination, and agent-readable knowledge — the stance behind every product."
        />
        <PillarCards />
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section id="benefits" label="Cross-family benefits">
        <SectionHeading
          index="02"
          eyebrow="Benefits"
          title="What stays true across the whole family"
          lead="Distilled themes the products share — each drawn from a real Studio surface, not a slogan."
          align="start"
        />
        <BenefitsList />
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section id="projects" label="The Studio product family">
        <SectionHeading
          index="03"
          eyebrow="Product family"
          title="Five products, one coherent surface"
          lead="The portfolio: separate implementation surfaces presented as one integrated family. Open any project for the full case."
        />
        <ShowcaseGrid />
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section id="posture" label="Proof posture">
        <SectionHeading
          index="04"
          eyebrow="Proof posture"
          title="Credibility from boundaries, not claims"
          lead="Real design-posture facts pulled from each product's own content — the boundaries that keep the family honest."
        />
        <ProofPointBand />
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section id="integrations" label="How the family fits together">
        <SectionHeading
          index="05"
          eyebrow="How it fits"
          title="An integrated family, not a logo wall"
          lead="The five products genuinely interconnect. Here is how runtime, interface, coordination, knowledge, and society plug together."
        />
        <FamilyIntegrationMap />
      </Section>

      <Container>
        <Divider />
      </Container>

      <Section id="faq" label="Frequently asked questions">
        <SectionHeading
          index="06"
          eyebrow="FAQ"
          title="Clear answers on scope and boundaries"
        />
        <Faq />
      </Section>

      <Container>
        <Divider />
      </Container>

      <CtaBand
        eyebrow="Next step"
        title="Explore the projects or read the AI index"
        lead="Open the full portfolio, or pull the family, routes, and source boundaries from stable generated text."
        primary={site.home.primaryCta}
        secondary={site.home.secondaryCta}
      />
    </>
  );
}
