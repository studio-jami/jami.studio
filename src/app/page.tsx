import { Hero } from "@/components/marketing/hero";
import { WorkGrid } from "@/components/marketing/work-grid";
import { ServiceList } from "@/components/marketing/service-list";
import { StatsSection } from "@/components/marketing/stats-section";
import { ProofBand } from "@/components/marketing/proof-band";
import { OpenCoreCallout } from "@/components/marketing/open-core-callout";
import { AIIndexCallout } from "@/components/marketing/ai-index-callout";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { BandLabel } from "@/components/system/band-label";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Home — Noir's real exported spine, reproduced:
 *
 *   Hero (split + ticker) → WORKS (asymmetric over-spaced photo grid) → SERVICES
 *   (divider list) → Stats (the ONE inverted white grain section) → Feedback (honest
 *   proof band) → Pricing (open-core panel) → Blog (AI-index cards) → FAQ (split
 *   accordion) → CTA (burst + bloom) → colossal JAMI footer wordmark.
 *
 * Every template slot maps to a real content job; nothing is fabricated (no fake
 * metrics, testimonials, tiers, or posts).
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="works-section" aria-labelledby="works-heading">
        <BandLabel word="Works" count={projects.length} id="works-heading" />
        <WorkGrid />
      </section>

      <ServiceList />
      <StatsSection />
      <ProofBand />
      <OpenCoreCallout />
      <AIIndexCallout />
      <FaqSection />
      <CtaBand
        eyebrow="Start here"
        title="See the work, or read the source."
        lead="Every route, link, and summary on this hub is generated from one set of content. Open a project, or hand an agent the index."
        primary={site.home.primaryCta}
        secondary={site.home.secondaryCta}
      />
    </>
  );
}
