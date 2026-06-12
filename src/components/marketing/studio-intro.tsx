import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/primitives/section";
import { SectionNumber, Eyebrow } from "@/components/primitives/section-heading";
import { site } from "@/content/site";

/**
 * Intro — the "about the studio" editorial statement. An oversized section number and a
 * hairline rule frame the studio framing (from `site.description`), then teases the four
 * pillar titles as an index the Features section expands. Mirrors Nouva's Intro rhythm
 * (oversized number + statement + a compact set of cards).
 */
export function StudioIntro() {
  return (
    <Section className="intro" divided aria-labelledby="intro-title">
      <div className="intro-grid">
        <div className="intro-marker">
          <SectionNumber value="01" />
          <Eyebrow>The studio</Eyebrow>
        </div>
        <div className="intro-body">
          <Reveal as="h2" className="intro-title">
            <span id="intro-title">
              Separate products, built over shared foundations and one public hub.
            </span>
          </Reveal>
          <Reveal as="p" className="intro-lead" delay={70}>
            {site.description}
          </Reveal>
          <Reveal as="ol" className="intro-index" delay={140}>
            {site.home.pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <span className="intro-index-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="intro-index-label">{pillar.title}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
