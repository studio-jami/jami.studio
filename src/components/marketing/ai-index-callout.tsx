import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/system/section-heading";
import { Button } from "@/components/ui/button";

/**
 * Blog Section → an AI-readable index callout, NOT a blog. No posts are invented. The slot
 * surfaces the machine-readable source files (llms.txt / llms-full.txt) so agents can
 * resolve the whole family from stable generated text.
 */
export function AIIndexCallout() {
  const files = [
    { name: "llms.txt", href: "/llms.txt", note: "Compact route + project index" },
    { name: "llms-full.txt", href: "/llms-full.txt", note: "Expanded per-project source" },
    { name: "sitemap.xml", href: "/sitemap.xml", note: "Canonical URL set" },
    { name: "robots.txt", href: "/robots.txt", note: "Crawl policy" }
  ];

  return (
    <Section className="aiindex-section" ariaLabelledby="aiindex-heading">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Readable by machines"
          id="aiindex-heading"
          title="An index for agents, not an article feed."
          align="between"
          lead="The hub publishes its structure as stable text. Point an agent at these files to resolve every route, summary, and source boundary."
        >
          <Button href="/llms.txt" variant="ghost">
            Read the AI index
          </Button>
        </SectionHeading>

        <ul className="aiindex-list">
          {files.map((file) => (
            <li key={file.href}>
              <a className="aiindex-row" href={file.href}>
                <span className="aiindex-name">{file.name}</span>
                <span className="aiindex-note">{file.note}</span>
                <span className="aiindex-arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
                    <path
                      d="M3.5 8h9M8.5 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
