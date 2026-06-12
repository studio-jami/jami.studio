import { site } from "@/content/site";
import { studioLinks } from "@/content/links";
import { Container } from "@/components/layout/container";
import { BandLabel } from "@/components/system/band-label";
import { Button } from "@/components/ui/button";

/**
 * Pricing slot → open-core panel. Keeps Noir's colossal band heading + elevated panel
 * with the copper/purple gradient bloom, but resolves honestly: this is an open-core OSS
 * family — no tiers, no toggle prices, no "Get Started Now" funnels. Real handles, real
 * repository links.
 */
export function OpenCoreCallout() {
  return (
    <section aria-labelledby="opencore-heading" className="opencore-section section">
      <BandLabel word="Open core" id="opencore-heading" />
      <Container>
        <div className="opencore-panel">
          <div className="opencore-grid">
            <div>
              <h3 className="opencore-title">No tiers. The foundations are public.</h3>
              <p className="opencore-copy">
                Every project in the family is built in the open under one GitHub
                organization — runtimes, contracts, and this hub itself. Read the source,
                open an issue, or point an agent at the AI index.
              </p>
              <div className="opencore-actions">
                <Button href={studioLinks.githubOrg} variant="solid">
                  Visit the GitHub org
                </Button>
                <Button href="/llms.txt" variant="secondary">
                  Read the AI index
                </Button>
              </div>
            </div>

            <div className="opencore-meta">
              <p className="mono-label">Where to find us</p>
              <div className="opencore-handles">
                <span>github / {site.handles.github}</span>
                <span>npm / {site.handles.npm}</span>
                <span>x / {site.handles.x}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
