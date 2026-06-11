import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "@/components/ui/icons";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

// Trailing function words that read as broken when a tease ends on them.
const DANGLING = new Set([
  "with",
  "for",
  "through",
  "and",
  "or",
  "of",
  "to",
  "the",
  "a",
  "an",
  "in",
  "on",
  "by"
]);

/**
 * Condense a capability into a short noun-phrase tease without dangling on a function word.
 * Takes the first few words, then trims any trailing preposition/conjunction/article so the pill
 * never reads as a mid-sentence truncation ("Shared contracts for" → "Shared contracts").
 */
function capabilityTease(capability: string): string {
  const words = capability.split(/\s+/).slice(0, 3);
  while (words.length > 1 && DANGLING.has(words[words.length - 1].toLowerCase())) {
    words.pop();
  }
  return words.join(" ");
}

/**
 * The portfolio unit — one Studio product. Name, summary, positioning hook, a short capability tease,
 * and a full-card link into the detail page. Looks intentional in a grid and standalone.
 */
export function ProjectCard({ project, index }: { project: StudioProject; index?: number }) {
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <article className="project-card">
      <div className="project-card-top">
        {number ? <span className="project-card-index">{number}</span> : null}
      </div>

      <div className="stack" style={{ gap: "0.6rem" }}>
        <h3>{project.name}</h3>
        <p className="project-card-summary">{project.summary}</p>
      </div>

      <p className="project-card-positioning">{project.positioning}</p>

      <div className="project-card-tags">
        {project.capabilities.slice(0, 3).map((capability) => (
          <Badge key={capability}>{capabilityTease(capability)}</Badge>
        ))}
      </div>

      <span className="project-card-link">
        Open project <ArrowUpRight />
      </span>

      <Link
        href={projectPath(project)}
        className="project-card-cover"
        aria-label={`Open ${project.name}`}
      />
    </article>
  );
}
