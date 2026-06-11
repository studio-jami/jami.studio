import { CTABand } from "@/components/marketing/cta-band";
import { FAQ } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

// Honest, derived figures — counts straight from the content contract, never invented.
const capabilityCount = projects.reduce((total, project) => total + project.capabilities.length, 0);

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsBand index="01" />
      <ShowcaseGrid index="02" />
      <ProofBand
        index="03"
        statement={site.home.proof}
        stats={[
          { value: String(projects.length), label: "Open-core products in the family" },
          { value: "1", label: "Shared token, content, and metadata foundation" },
          { value: String(capabilityCount), label: "Documented capabilities across the family" },
          { value: "100%", label: "Routes, metadata, and AI files from source data" }
        ]}
      />
      <FAQ index="04" />
      <CTABand
        index="05"
        eyebrow="Start here"
        title="Explore the Studio family"
        description="Open the project index for the full portfolio, or read the AI index for a machine-readable map of every route and product."
        actions={[
          { label: site.home.primaryCta.label, href: site.home.primaryCta.href, variant: "primary", withArrow: true },
          { label: site.home.secondaryCta.label, href: site.home.secondaryCta.href, variant: "secondary" }
        ]}
      />
    </>
  );
}
