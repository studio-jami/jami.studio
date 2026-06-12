import { Hero } from "@/components/marketing/hero";
import { NumberedWorkGrid } from "@/components/marketing/numbered-work-grid";
import { NumberedServiceList } from "@/components/marketing/numbered-service-list";
import { HonestFactsRow } from "@/components/marketing/honest-facts-row";
import { ProofPointBand } from "@/components/marketing/proof-point-band";
import { OpenCoreCallout } from "@/components/marketing/open-core-callout";
import { AIIndexCallout } from "@/components/marketing/ai-index-callout";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { site } from "@/content/site";

/**
 * Home — built to Noir's real exported home IA (numbered editorial spine):
 *
 *   Hero (00) → Selected work / Project Section (01) → Services (02) → Honest facts / Stats (03)
 *   → Proof band / Feedback (04) → Open-core / Pricing (05) → AI index / Blog (06)
 *   → FAQ (07) → closing CTA band → footer
 *
 * Each Noir template section maps to a real content job; the Stats/Feedback/Pricing/Blog
 * slots are honestly remapped (no fabricated metrics, testimonials, tiers, or posts).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <NumberedWorkGrid />
      <NumberedServiceList />
      <HonestFactsRow />
      <ProofPointBand />
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
