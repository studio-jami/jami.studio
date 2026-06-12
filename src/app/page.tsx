import { Hero } from "@/components/marketing/hero";
import { FeatureBeat } from "@/components/marketing/feature-beat";
import {
  InterfaceVocabVisual,
  RuntimeFlowVisual
} from "@/components/marketing/feature-visuals";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { ProofConviction } from "@/components/marketing/proof-conviction";
import { ProofPointBand } from "@/components/marketing/proof-point-band";
import { OpenCoreCallout } from "@/components/marketing/open-core-callout";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { Container, Section } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Home — built to the real Message AI `pageTrees` order:
 *   Hero → Features ×3 (progressive value cadence) → WhyItWorks → Testimonials
 *   → Pricing → FAQ → FinalCTA
 * Each template section is mapped to our content; the three sequential Features
 * beats are kept as the signature cadence rather than flattened into one grid.
 */
export default function HomePage() {
  const [governed, trusted, durable, knowledge] = site.home.pillars;

  return (
    <>
      {/* 1 — Hero */}
      <Hero />

      {/* 2 — Features · beat 1 (Governed runtime + Trusted interfaces) */}
      <Section rhythm="tight" ariaLabelledby="beat-1">
        <Reveal>
          <FeatureBeat
            index="01"
            kicker="The runtime"
            labelledById="beat-1"
            heading="A governed loop and a trusted vocabulary, sharing one contract"
            body={governed.body}
            points={[
              { title: governed.title, body: governed.body },
              { title: trusted.title, body: trusted.body }
            ]}
            visual={<RuntimeFlowVisual />}
          />
        </Reveal>
      </Section>

      {/* 3 — Features · beat 2 (Durable coordination + Agent-readable knowledge) */}
      <Section rhythm="tight" tone="raised" ariaLabelledby="beat-2">
        <Reveal>
          <FeatureBeat
            index="02"
            kicker="The fabric"
            labelledById="beat-2"
            flip
            heading="Coordination and knowledge that stay durable and legible"
            body={durable.body}
            points={[
              { title: durable.title, body: durable.body },
              { title: knowledge.title, body: knowledge.body }
            ]}
            visual={<InterfaceVocabVisual />}
          />
        </Reveal>
      </Section>

      {/* 4 — Features · beat 3 → the five-project showcase (centerpiece) */}
      <Section ariaLabelledby="showcase">
        <Container as="div">
          <Reveal className="showcase-head">
            <GhostBadge>The product family</GhostBadge>
            <h2 id="showcase" className="display-2">
              Five products, shown like a studio shows its work
            </h2>
            <p className="lead">
              Separate implementation surfaces over shared foundations. Each card opens a full
              case study.
            </p>
          </Reveal>
          <Reveal>
            <ShowcaseGrid projects={projects} />
          </Reveal>
        </Container>
      </Section>

      {/* 5 — WhyItWorks → ProofConviction */}
      <Section tone="raised" ariaLabelledby="conviction">
        <Reveal>
          <ProofConviction id="conviction" />
        </Reveal>
      </Section>

      {/* 6 — Testimonials slot → ProofPointBand (earned, never fabricated) */}
      <Section ariaLabelledby="proof">
        <Reveal>
          <ProofPointBand projects={projects} id="proof" />
        </Reveal>
      </Section>

      {/* 7 — Pricing slot → OpenCoreCallout (open-core, no tiers) */}
      <Section tone="raised" ariaLabelledby="opencore">
        <Reveal>
          <OpenCoreCallout id="opencore" />
        </Reveal>
      </Section>

      {/* 8 — FAQ */}
      <Section ariaLabelledby="faq">
        <Reveal>
          <Faq id="faq" />
        </Reveal>
      </Section>

      {/* 9 — FinalCTA */}
      <Section rhythm="tight" ariaLabelledby="final-cta">
        <Reveal>
          <FinalCta id="final-cta" />
        </Reveal>
      </Section>
    </>
  );
}
