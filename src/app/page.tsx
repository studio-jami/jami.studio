import { CtaBand } from "@/components/marketing/cta-band";
import { Faq } from "@/components/marketing/faq";
import { FamilyShowcase } from "@/components/marketing/family-showcase";
import { Hero } from "@/components/marketing/hero";
import { PillarsBand } from "@/components/marketing/pillars-band";
import { ProofBand } from "@/components/marketing/proof-band";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarsBand number="01" />
      <FamilyShowcase number="02" />
      <ProofBand number="03" />
      <Faq number="04" />
      <CtaBand
        kicker="Enter the studio"
        title={
          <>
            Explore the <em className="cta-em">work</em>.
          </>
        }
        lead={site.description}
        actions={[
          { label: site.home.primaryCta.label, href: site.home.primaryCta.href },
          { label: site.home.secondaryCta.label, href: site.home.secondaryCta.href }
        ]}
      />
    </>
  );
}
