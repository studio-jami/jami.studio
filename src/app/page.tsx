import { Hero } from "@/components/marketing/hero";
import { WhyItMatters } from "@/components/marketing/why-it-matters";
import { IntroGrid } from "@/components/marketing/intro-grid";
import { StickyFeatures } from "@/components/marketing/sticky-features";
import { BenefitsSplit } from "@/components/marketing/benefits-split";
import { ComparisonPanel } from "@/components/marketing/comparison-panel";
import { FamilyMasonry } from "@/components/marketing/family-masonry";
import { OpenCoreCallout } from "@/components/marketing/open-core-callout";
import { Faq } from "@/components/marketing/faq";
import { CtaCard } from "@/components/marketing/cta-card";
import { site } from "@/content/site";

/**
 * Home — composed in Nouva's real exported 10-section order:
 * Hero → Why It Matters (staggered count-up stats) → Intro (3-col cards) →
 * Features (sticky stack) → Benefits (asymmetric split) → Comparison (us-vs-them) →
 * Testimonials → the five-project family masonry → Pricing → open-core →
 * FAQ (accordion) → CTA (card-on-void).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyItMatters />
      <IntroGrid />
      <StickyFeatures />
      <BenefitsSplit />
      <ComparisonPanel />
      <FamilyMasonry />
      <OpenCoreCallout />
      <Faq />
      <CtaCard
        eyebrow="Start here"
        title={
          <>
            The work doesn&apos;t stop. <span className="title-soft">Neither does the family.</span>
          </>
        }
        lead={site.home.lead}
        titleId="home-cta-title"
        photo="/assets/cta.png"
        actions={[
          { label: site.home.primaryCta.label, href: site.home.primaryCta.href, variant: "primary" },
          { label: site.home.secondaryCta.label, href: site.home.secondaryCta.href, variant: "ghost" }
        ]}
      />
    </>
  );
}
