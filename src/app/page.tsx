import { CTABand } from "@/components/marketing/cta-band";
import { FAQ } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/ui/section";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <PillarsBand />

      <ShowcaseGrid />

      <Section id="proof" aria-label="Why it holds together">
        <Reveal>
          <ProofBand
            eyebrow="Why it holds together"
            title="One source of truth, every surface"
            lead="The hub never duplicates product copy. Routes, metadata, and AI files are derived, so the family stays consistent as it grows."
            points={[
              site.home.proof,
              "Subdomain, repository, docs, and API links stay data-driven, so any surface can move hosts without a content rewrite.",
              "Human readers and agents read the same structured source: clean headings, canonical URLs, and generated AI files."
            ]}
          />
        </Reveal>
      </Section>

      <FAQ />

      <Section id="get-started" aria-label="Get started">
        <Reveal>
          <CTABand
            title="Explore the projects, or read the AI index"
            body="Start with the project family, or pull the agent-readable source the whole site is generated from."
            primary={site.home.primaryCta}
            secondary={site.home.secondaryCta}
          />
        </Reveal>
      </Section>
    </>
  );
}
