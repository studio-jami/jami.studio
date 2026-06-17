import { site } from "@/content/site";
import { SectionHead } from "@/components/ui/section-head";
import { SmartLink } from "@/components/ui/smart-link";

const aiIndexHref = (site.nav.find((item) => item.label === "AI index") ?? site.nav[0]).href;
const sitemapHref =
  site.footerLinks.find((item) => item.label === "Sitemap")?.href ?? "/sitemap.xml";
const robotsHref = site.footerLinks.find((item) => item.label === "Robots")?.href ?? "/robots.txt";

/**
 * Kirimo's "Our News" list rows (label | meta | title over hairlines), used
 * honestly: there is no blog, so the rows are the real machine-readable
 * surfaces this site publishes. No invented articles, no fabricated dates —
 * the middle column carries the actual path.
 */
const surfaces = [
  {
    format: "TXT",
    href: aiIndexHref,
    path: aiIndexHref,
    title: "Compact AI index — every public route and project summary."
  },
  {
    format: "TXT",
    href: "/llms-full.txt",
    path: "/llms-full.txt",
    title: "Expanded AI source — positioning, capabilities, and link contracts."
  },
  {
    format: "XML",
    href: sitemapHref,
    path: sitemapHref,
    title: "Sitemap — every canonical URL, generated from shared source data."
  },
  {
    format: "TXT",
    href: robotsHref,
    path: robotsHref,
    title: "Robots policy — an open crawl posture for agents and indexes."
  }
] as const;

export function AIIndexCallout({ titleId }: { titleId: string }) {
  return (
    <div className="ai-callout">
      <SectionHead
        eyebrow="For agents and humans"
        title="Read the source, not a feed."
        titleId={titleId}
        lead="No newsroom here — the studio publishes stable machine-readable text instead. Resolve the whole family from these generated files."
      />

      <ul className="news-list">
        {surfaces.map((surface) => (
          <li key={surface.path} className="news-list__row">
            <SmartLink href={surface.href} className="news-list__link">
              <span className="news-list__label">{surface.format}</span>
              <span className="news-list__meta">{surface.path}</span>
              <span className="news-list__title">{surface.title}</span>
              <span className="news-list__arrow btn__arrow" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none" focusable="false" aria-hidden="true">
                  <path
                    d="M4.5 11.5 11.5 4.5M11.5 4.5H5.8M11.5 4.5v5.7"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
