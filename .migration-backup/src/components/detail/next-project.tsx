import type { StudioProject } from "@/content/projects";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SmartLink } from "@/components/ui/smart-link";

/**
 * Kirimo "Next" block: terra-cotta eyebrow, a colossal uppercase link to the
 * next project, and the rest of the family as a quiet uppercase row beneath.
 */
export function NextProject({
  next,
  family
}: {
  next: StudioProject;
  family: StudioProject[];
}) {
  return (
    <div className="next-project">
      <Eyebrow>Next project</Eyebrow>
      <SmartLink href={next.route} className="next-project__link">
        <span className="next-project__name">{next.name}</span>
        <span className="next-project__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" focusable="false" aria-hidden="true">
            <path
              d="M6 18 18 6M18 6H8.4M18 6v9.6"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </SmartLink>
      <p className="next-project__summary">{next.summary}</p>

      <ul className="next-project__family" aria-label="The rest of the family">
        {family.map((member) => (
          <li key={member.slug}>
            <SmartLink href={member.route} className="next-project__family-link">
              {member.shortName}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
