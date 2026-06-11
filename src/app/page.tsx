import { CTABand } from "@/components/marketing/cta-band";
import { FAQ } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <Reveal>
        <PillarsBand />
      </Reveal>

      <Reveal>
        <ShowcaseGrid />
      </Reveal>

      <Reveal>
        <ProofBand
          eyebrow="Generated from one source"
          number="03"
          title="Everything public is generated from shared source data."
          lead={site.home.proof}
          points={[
            "Every project route and CTA resolves through centralized metadata.",
            "Sitemap, robots, and metadata fields are derived, never hand-maintained.",
            "AI-readable files publish the same source the pages render from."
          ]}
        />
      </Reveal>

      <Reveal>
        <FAQ />
      </Reveal>

      <Reveal>
        <CTABand
          eyebrow="Start exploring"
          title="See the work, read the source."
          lead="Browse the five Studio products or read the AI index built for agents."
          primary={site.home.primaryCta}
          secondary={site.home.secondaryCta}
        />
      </Reveal>
    </>
  );
}
