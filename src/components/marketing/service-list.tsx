import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { BandLabel } from "@/components/system/band-label";

/**
 * Services — the four `site.home.pillars` as Noir's divider-ruled vertical list: numbered
 * 01–04 rows separated by hairline dividers (NOT a card grid). Number left, title center,
 * mono description right, quiet glyph at the far edge.
 */
export function ServiceList() {
  const pillars = site.home.pillars;

  return (
    <section aria-labelledby="services-heading" className="services-section section">
      <BandLabel word="Services" count={pillars.length} id="services-heading" />
      <Container>
        <ol className="service-list">
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="service-row">
              <span className="service-index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="service-title">{pillar.title}</h3>
              <p className="service-body">{pillar.body}</p>
              <span className="service-glyph" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                  <path
                    d="M4 12 12 4M5.5 4H12v6.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
