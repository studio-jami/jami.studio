import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { Button } from "@/components/ui/button";

/**
 * Kirimo hero: a row of three numbered eyebrow facts (01/02/03 — terra-cotta
 * numbers over two-line sand uppercase facts), then the oversized uppercase
 * display H1, the lead paragraph on the editorial measure, and a single
 * circle-arrow text CTA. Left-aligned, content-height, flat canvas.
 */
const heroFacts = [
  { num: "01", text: "Open-core, agent-native product studio" },
  { num: "02", text: `${projects.length} projects generated from one shared source` },
  { num: "03", text: "Readable by humans and agents alike" }
] as const;

export function Hero() {
  return (
    <div className="hero">
      <ol className="hero__facts" aria-label="Studio facts">
        {heroFacts.map((fact) => (
          <li key={fact.num} className="hero__fact">
            <span className="hero__fact-num" aria-hidden="true">
              {fact.num}
            </span>
            <span className="hero__fact-text">{fact.text}</span>
          </li>
        ))}
      </ol>

      <h1 className="hero__title">{site.home.title}</h1>

      <p className="hero__lead">{site.home.lead}</p>

      <div className="hero__cta">
        <Button href={site.home.primaryCta.href} variant="text">
          {site.home.primaryCta.label}
        </Button>
      </div>
    </div>
  );
}
