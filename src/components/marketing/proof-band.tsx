import { projects } from "@/content/projects";
import { Container } from "@/components/layout/container";
import { GuideLines } from "@/components/system/guide-lines";

/**
 * Feedback slot → honest proof band. The template renders a Who / Rating & Feedback /
 * Company ledger; we keep the exact table rhythm but fill it with REAL `proofPoints[]`
 * from the content layer — one distilled posture line per project. No invented quotes,
 * no avatars, no star ratings.
 */
export function ProofBand() {
  return (
    <section className="proof-section section" aria-labelledby="proof-heading">
      <Container className="proof-inner">
        <GuideLines count={2} />
        <h2 id="proof-heading" className="visually-hidden">
          Proof posture across the family
        </h2>

        <div className="proof-head" aria-hidden="true">
          <span className="mono-label">Project</span>
          <span className="mono-label">Proof posture</span>
          <span className="mono-label">Source</span>
        </div>

        <ul>
          {projects.map((project, i) => (
            <li key={project.slug} className="proof-row">
              <div className="proof-project">
                <span className="proof-project-index" aria-hidden="true">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className="proof-project-name">{project.name}</span>
              </div>
              <p className="proof-text">{project.proofPoints[0]}</p>
              <a
                className="proof-source"
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                {project.repoUrl.replace("https://", "")}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
