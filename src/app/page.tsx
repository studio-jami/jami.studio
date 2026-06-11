import { CTABand } from "@/components/marketing/cta-band";
import { FAQ } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { site } from "@/content/site";

const proofItems = [
  { label: "Single source", body: "Routes, metadata, sitemap, and AI files are generated from one content layer." },
  { label: "No hand-built links", body: "Every project CTA resolves through the shared route and link contract." },
  { label: "Token-driven", body: "Color, type, space, and motion all flow from one validated token preset." }
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsBand />
      <ShowcaseGrid />
      <ProofBand
        number="03"
        eyebrow="How it holds together"
        statement={site.home.proof}
        items={proofItems}
      />
      <FAQ />
      <CTABand
        eyebrow="Start exploring"
        title="See the work, then read the source."
        body="Open the project gallery, or hand an agent the generated AI index."
        primary={site.home.primaryCta}
        secondary={site.home.secondaryCta}
      />
    </>
  );
}
