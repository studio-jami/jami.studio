import { CTABand } from "@/components/marketing/cta-band";
import { FAQ } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsBand />
      <ShowcaseGrid variant="home" />
      <ProofBand
        eyebrow="One source of truth"
        statement="Everything here is generated from shared, version-controlled source data."
        points={[
          site.home.proof,
          "Project routes, subdomains, repositories, docs, and APIs resolve through one content layer.",
          "Marketing copy stays out of implementation status; the runtimes live in their own repos."
        ]}
      />
      <FAQ />
      <CTABand
        title="Explore the Studio family"
        lead="Five products, one governed foundation. Start with the project index or read the AI source."
        primary={site.home.primaryCta}
        secondary={site.home.secondaryCta}
      />
    </>
  );
}
