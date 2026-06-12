import { Container } from "@/components/ui/layout";
import { ExternalButton, GhostBadge, LinkButton } from "@/components/ui/primitives";
import { studioLinks } from "@/content/links";

/**
 * OpenCoreCallout — replaces the template's Pricing slot. We are open-core, not a
 * SaaS funnel, so there are no tiers to invent. This is an honest OSS callout:
 * what the model is, and where to read the source. Links come from the content
 * layer (`studioLinks`, `site.nav`).
 */
export function OpenCoreCallout({ id }: { id: string }) {
  const facets = [
    {
      title: "Open-core foundations",
      body: "The shared runtime, UI, and coordination layers are built in the open under the studio-jami organization."
    },
    {
      title: "No gates, no tiers",
      body: "This hub is a marketing and OSS surface — it links to repositories and docs rather than selling plans."
    },
    {
      title: "Move freely",
      body: "Each product can route to its own domain or repository through centralized metadata, with no rewrites."
    }
  ];

  return (
    <Container as="div" className="opencore">
      <div className="opencore-text">
        <GhostBadge>Open-core, not pricing</GhostBadge>
        <h2 id={id} className="display-2">
          Read the source instead of a pricing table
        </h2>
        <p className="prose">
          The Studio family is open foundations for agent-native products. Everything links back
          to public repositories and docs — start where you like.
        </p>
        <div className="opencore-ctas">
          <ExternalButton href={studioLinks.githubOrg} variant="primary" size="lg">
            View on GitHub
          </ExternalButton>
          <LinkButton href="/projects" variant="secondary" size="lg">
            Browse the projects
          </LinkButton>
        </div>
      </div>

      <ul className="opencore-facets">
        {facets.map((facet) => (
          <li className="opencore-facet" key={facet.title}>
            <span className="opencore-facet-mark" aria-hidden="true" />
            <span>
              <strong>{facet.title}</strong>
              <span>{facet.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
