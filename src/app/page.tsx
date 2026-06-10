import { CtaBand } from "@/components/marketing/cta-band";
import { Faq } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ProjectShowcase } from "@/components/marketing/project-showcase";
import { ProofBand } from "@/components/marketing/proof-band";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function HomePage() {
  const proofPoints = [
    "One enforcement path for agent runtime, not UI backdoors",
    "A tokenized UI vocabulary agents render without injecting code",
    "Coordination state as durable source, separate from the agent loop",
    "Provenance, freshness, and open governance as first-class surfaces"
  ];

  return (
    <>
      <Hero />

      <Section id="principles" width="wide" size="compact">
        <SectionHeading
          index="01"
          eyebrow="What this studio stands for"
          title="Four foundations, one coherent surface."
          lead={site.home.proof}
        />
        <PillarsBand />
      </Section>

      <Section id="work" width="wide" bordered>
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="The product family."
          lead="Separate products over shared foundations: governed runtime, trusted interfaces, durable coordination, and agent-readable knowledge."
        />
        <ProjectShowcase feature />
      </Section>

      <Section id="approach" width="wide" tone="sunken" bordered>
        <div className="lead-block">
          <SectionHeading
            index="03"
            eyebrow="The approach"
            title="Built to be read by humans and agents alike."
          />
          <p className="lead-block__aside">
            Every public route, project link, metadata field, sitemap entry, and AI-ingestion file is
            generated from one shared source of truth — so the family stays consistent as it grows.
          </p>
        </div>
        <ProofBand
          points={proofPoints}
          caption="Open-core foundations, published as public product infrastructure."
        />
      </Section>

      <Section id="faq" width="wide" size="compact">
        <SectionHeading index="04" eyebrow="Questions" title="What this repository owns." />
        <Faq />
      </Section>

      <Section width="wide" size="compact">
        <CtaBand
          eyebrow={`${projects.length} products · open core`}
          title="Explore the Studio family."
          lead="Browse the products, or read the AI index for the agent-readable map of the whole surface."
          actions={[
            { label: site.home.primaryCta.label, href: site.home.primaryCta.href },
            { label: site.home.secondaryCta.label, href: site.home.secondaryCta.href }
          ]}
        />
      </Section>
    </>
  );
}
