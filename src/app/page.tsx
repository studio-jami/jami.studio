import { CtaBand } from "@/components/marketing/cta-band";
import { Faq } from "@/components/marketing/faq";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />

      <PillarsBand />

      <Section id="work" rhythm="default" divider aria-labelledby="work-title">
        <SectionHeading
          eyebrow="Selected work"
          index="02"
          id="work-title"
          title="The product family."
          lead="Five independent surfaces over shared foundations. Each one is its own product; together they are the studio."
          actions={null}
        />
        <ShowcaseGrid projects={projects} featureFirst />
      </Section>

      <Section rhythm="default" aria-labelledby="proof-title">
        <ProofBand
          eyebrow="How it stays coherent"
          index="03"
          title="Generated from one source of truth."
          lead={site.home.proof}
          items={[
            {
              label: "Centralized content",
              body: "Every project name, link, summary, and CTA resolves from shared content data — never hand-typed in a page."
            },
            {
              label: "Tokenized system",
              body: "Color, type, spacing, radii, and motion run through one token contract, themed dark and light over the same variables."
            },
            {
              label: "Agent-readable surface",
              body: "Canonical metadata, sitemap, robots, and llms.txt files publish the same structure machines and people read."
            }
          ]}
        />
      </Section>

      <Section id="faq" rhythm="default" divider aria-labelledby="faq-title">
        <div className="faq-layout">
          <SectionHeading
            eyebrow="Questions"
            index="04"
            id="faq-title"
            title="What this hub is, and isn't."
            lead="The marketing surface is one repository. The runtimes live in their own."
            className="faq-layout-head"
          />
          <Faq />
        </div>
      </Section>

      <Section rhythm="default">
        <CtaBand
          eyebrow="Start exploring"
          title="See the work."
          lead="Browse the full project family, or read the AI index for the machine-readable map."
          primary={{ label: site.home.primaryCta.label, href: site.home.primaryCta.href }}
          secondary={{ label: site.home.secondaryCta.label, href: site.home.secondaryCta.href }}
        />
      </Section>
    </>
  );
}
