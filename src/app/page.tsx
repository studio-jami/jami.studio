import { Hero } from "@/components/marketing/hero";
import { IntroCards } from "@/components/marketing/feature-grid";
import { UseCases } from "@/components/marketing/use-cases";
import { HowItWorksSteps } from "@/components/marketing/how-it-works";
import { WhyItWorksGrid } from "@/components/marketing/why-it-works";
import { ProofSlideshow } from "@/components/marketing/proof-slideshow";
import { OpenCoreCallout } from "@/components/marketing/open-core-callout";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { Container, Section } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { projects } from "@/content/projects";

/**
 * Home — built to Message AI's real 9-section `pageTrees` spine:
 *   Hero → Features (3 photo intro cards) → Features (tabbed use-case panel →
 *   the five-project showcase) → HowItWorks (1-2-3) → WhyItWorks (6-card) →
 *   Testimonials (proof slideshow) → Pricing (open-core frame) → FAQ →
 *   FinalCTA. Uniformly dark; the photographic glow bookends (hero + final
 *   CTA) are the only tonal shifts. Every section opens with a ghost-pill
 *   label above its heading.
 */
export default function HomePage() {
  return (
    <>
      {/* 1 — Hero (glowing photographic bookend) */}
      <Hero />

      {/* 2 — Features: three photo intro cards with floating UI chips */}
      <Section id="introducing" ariaLabelledby="introducing-title">
        <IntroCards id="introducing-title" />
      </Section>

      {/* 3 — Features: tabbed use-case panel → the five-project showcase */}
      <Section ariaLabelledby="usecases-title">
        <Container as="div">
          <Reveal className="section-head">
            <GhostBadge>Use cases</GhostBadge>
            <h2 id="usecases-title">
              Five products to explore,{" "}
              <span className="heading-soft">all built on one shared source.</span>
            </h2>
          </Reveal>
          <Reveal>
            <UseCases projects={projects} />
          </Reveal>
        </Container>
      </Section>

      {/* 4 — HowItWorks: photo card + numbered 1-2-3 steps */}
      <Section ariaLabelledby="howitworks-title">
        <HowItWorksSteps id="howitworks-title" />
      </Section>

      {/* 5 — WhyItWorks: the denser 6-card benefit matrix */}
      <Section ariaLabelledby="benefits-title">
        <WhyItWorksGrid id="benefits-title" />
      </Section>

      {/* 6 — Testimonials slot: honest proof-point slideshow */}
      <Section ariaLabelledby="proof-title">
        <Container as="div">
          <Reveal className="section-head">
            <GhostBadge>Proof</GhostBadge>
            <h2 id="proof-title">
              What the designs promise, <span className="heading-soft">in their own words.</span>
            </h2>
          </Reveal>
          <Reveal>
            <ProofSlideshow projects={projects} />
          </Reveal>
        </Container>
      </Section>

      {/* 7 — Pricing slot: open-core frame, the airiest section */}
      <Section className="section-airy" ariaLabelledby="opencore-title">
        <OpenCoreCallout id="opencore-title" />
      </Section>

      {/* 8 — FAQ */}
      <Section ariaLabelledby="faq-title">
        <Faq id="faq-title" />
      </Section>

      {/* 9 — FinalCTA (closing photographic bookend) */}
      <Section rhythm="tight" ariaLabelledby="finalcta-title">
        <Reveal>
          <FinalCta id="finalcta-title" />
        </Reveal>
      </Section>
    </>
  );
}
