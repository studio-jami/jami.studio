import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { TextTicker } from "@/components/ui/text-ticker";

const HIGHLIGHT = "generated from shared source data";

/**
 * Kirimo's "Our Client" slot, substituted honestly: the centered credibility
 * line (`site.home.proof`, key phrase in terra-cotta) over a slow marquee of
 * the five real product names — the template's logo-wall treatment without a
 * fabricated logo in sight.
 */
export function ProofLine() {
  const proof = site.home.proof;
  const splitAt = proof.indexOf(HIGHLIGHT);
  const before = splitAt >= 0 ? proof.slice(0, splitAt) : proof;
  const highlighted = splitAt >= 0 ? proof.slice(splitAt) : "";

  return (
    <div className="proof">
      <p className="proof__line">
        {before}
        {highlighted ? <em className="proof__highlight">{highlighted}</em> : null}
      </p>

      <div className="proof__marquee">
        <TextTicker label={`The Studio family: ${projects.map((p) => p.shortName).join(", ")}`} size="line">
          {projects.map((project) => (
            <span className="proof__name" key={project.slug}>
              {project.shortName}
              <span className="proof__sep" aria-hidden="true">
                ·
              </span>
            </span>
          ))}
        </TextTicker>
      </div>
    </div>
  );
}
