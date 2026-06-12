import { Hero } from "@/components/marketing/hero";
import { ThesisStatement } from "@/components/marketing/thesis-statement";
import { StudioIntro } from "@/components/marketing/studio-intro";
import { PillarFeatures } from "@/components/marketing/pillar-features";
import { BenefitsList } from "@/components/marketing/benefits-list";
import { SingleSourceContrast } from "@/components/marketing/single-source-contrast";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { OpenCoreCallout } from "@/components/marketing/open-core-callout";
import { Faq } from "@/components/marketing/faq";
import { CtaBand } from "@/components/marketing/cta-band";
import { site } from "@/content/site";

/**
 * Home — composed in Nouva's real exported section order:
 * Hero → Why It Matters → Intro → Features → Benefits → Comparison →
 * Testimonials(showcase) → Pricing(open-core) → FAQ → CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ThesisStatement />
      <StudioIntro />
      <PillarFeatures />
      <BenefitsList />
      <SingleSourceContrast />
      <ShowcaseGrid />
      <OpenCoreCallout />
      <Faq />
      <CtaBand
        eyebrow="Start here"
        title="Open the work, or read the source built for agents."
        lead={site.home.lead}
        titleId="home-cta-title"
        actions={[
          { label: site.home.primaryCta.label, href: site.home.primaryCta.href, variant: "primary" },
          { label: site.home.secondaryCta.label, href: site.home.secondaryCta.href, variant: "ghost" }
        ]}
      />
    </>
  );
}
