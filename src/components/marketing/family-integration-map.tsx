import Link from "next/link";
import { projects } from "@/content/projects";

/**
 * Integrations slot — honest fit. Not a wall of third-party logos: the five
 * Studio products genuinely interconnect, so this is a real "how the family
 * fits together" map. Each node is a live family member (linking to its
 * detail); each flow is a real relationship described in the projects' content.
 */
const NODE_BLURB: Record<string, string> = {
  harness: "Governed run loop — the shared enforcement path.",
  registry: "Tokenized UI vocabulary and render contract.",
  orchestra: "Coordination, approvals, and supervised runs.",
  intercal: "Provenance, deltas, and temporal context.",
  collectiva: "Open society, reputation, and governance."
};

const FLOWS: { edge: string; body: string }[] = [
  {
    edge: "Orchestra → Harness",
    body: "Orchestra supervises Harness runs through event streams while the agent loop stays in Harness."
  },
  {
    edge: "Registry → every surface",
    body: "The UI Registry's tokens seed this site's own theme foundation and any agent-rendered interface."
  },
  {
    edge: "Intercal → the family",
    body: "Intercal exposes freshness and provenance as a shared substrate for products that reason over change."
  },
  {
    edge: "Collectiva → Harness · Orchestra · Registry · Intercal",
    body: "Collectiva composes the rest into an open, governed agent society with public participation."
  }
];

export function FamilyIntegrationMap() {
  return (
    <div className="family-map">
      <div className="family-hub">
        {projects.map((project) => (
          <Link className="family-node" key={project.slug} href={project.route}>
            <span className="family-name">{project.shortName}</span>
            <p>{NODE_BLURB[project.slug] ?? project.summary}</p>
          </Link>
        ))}
      </div>
      <div className="family-flows">
        {FLOWS.map((flow) => (
          <article className="family-flow" key={flow.edge}>
            <span className="flow-edge">{flow.edge}</span>
            <p>{flow.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
